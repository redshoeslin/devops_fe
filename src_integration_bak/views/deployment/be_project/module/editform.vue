<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增模块' : '编辑模块'" width="550px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="100px">
      <el-form-item label="name" prop="name">
        <el-input v-model="form.name" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="Git repo url" prop="repo_url">
        <el-input v-model="form.repo_url" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="SIT deploy job" prop="sit_deploy_job">
        <el-input v-model="form.sit_deploy_job" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="SIT entry tag job" prop="sit_entry_tag">
        <el-input v-model="form.sit_entry_tag" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="SIT tag job" prop="sit_tag">
        <el-input v-model="form.sit_tag" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="UAT deploy job" prop="uat_deploy_job">
        <el-input v-model="form.uat_deploy_job" style="width: 370px;"/>
      </el-form-item>
      <!--
      <el-form-item label="组件类型" prop="project_type">
        <el-select v-model="form.project_type" style="width: 370px;" placeholder="请选择组件类型">
          <el-option v-for="item in item_types" :key="item.key" :label="item.value" :value="item.value"/>
        </el-select>
      </el-form-item>
      -->
      <el-form-item label="开发负责人" prop="project_owner">
        <el-autocomplete
          v-model="form.project_owner"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入开发负责人"
          style="width: 370px;"
          @select="handleSelect"
        >
        </el-autocomplete>
      </el-form-item>
      <el-form-item label="测试负责人" prop="project_tester">
        <el-autocomplete
          v-model="form.project_tester"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入开发负责人"
          style="width: 370px;"
          @select="handleSelect"
        >
        </el-autocomplete>
      </el-form-item>
      <el-form-item label="开发leader" prop="project_leader">
        <el-autocomplete
          v-model="form.project_leader"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入开发负责人"
          style="width: 370px;"
          @select="handleSelect"
        >
        </el-autocomplete>
      </el-form-item>
      <el-form-item label="project manager" prop="project_manager">
        <el-autocomplete
          v-model="form.project_manager"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入project manager"
          style="width: 370px;"
          @select="handleSelect"
        >
        </el-autocomplete>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit } from '@/api/project'
import { getUserList } from '@/api/user'
export default {
  props: {
    isAdd: {
      type: Boolean,
      required: true
    },
    sup_this: {
      type: Object,
      default: null
    },
    item_types: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      loading: false, dialog: false,
      form: {
        name: '',
        id: '',
        repo_url: '',
        project_type: '',
        project_leader: '',
        project_tester: '',
        project_owner: '',
        repo_mode: null,
        server_ids: null,
        last_task_status: null,
        user_id: null
      },
      rules: {
        repo_url: [
          { required: true, message: '请输入Git repo url', trigger: 'blur' }
        ],
        project_type: [
          { required: true, message: '请选择组件类型', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      getUserList().then(res => {
        this.user_data = []
        const _userdata = this.user_data
        res.forEach(function(data, index) {
          const new_data = {
            key: data.email,
            value: data.name
          }
          if (new_data.value.indexOf('管理员') === 0) {
            console.log('admin')
          } else {
            _userdata.push(new_data)
          }
        })
        this.userlist = _userdata
      })
    },
    querySearchAsync(queryString, cb) {
      /*
      getUserList().then(res => {
        this.user_data = []
        const _userdata = this.user_data
        res.forEach(function(data, index) {
          const new_data = {
            key: data.email,
            value: data.name
          }
          if (new_data.value.indexOf('管理员') === 0) {
            console.log('admin')
          } else {
            _userdata.push(new_data)
          }
        })
        this.userlist = _userdata
        var results = queryString ? this.userlist.filter(this.createStateFilter(queryString)) : this.userlist
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 3000 * Math.random())
      })
      */
      var results = queryString ? this.userlist.filter(this.createStateFilter(queryString)) : this.userlist
      cb(results)
    },
    createStateFilter(queryString) {
      return (state) => {
        return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1)
      }
    },
    handleSelect(item) {
      console.log(item)
    },
    cancel() {
      this.resetForm()
    },
    doSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.loading = true
          if (this.isAdd) {
            this.doAdd()
          } else this.doEdit()
        } else {
          return false
        }
      })
    },
    doAdd() {
      add(this.form).then(res => {
        this.resetForm()
        this.$message({
          showClose: true,
          type: 'success',
          message: '添加成功!',
          duration: 2500
        })
        this.loading = false
        this.$parent.init()
      }).catch(err => {
        this.loading = false
        console.log(err)
      })
    },
    doEdit() {
      edit(this.form.id, this.form).then(res => {
        this.resetForm()
        this.$message({
          showClose: true,
          type: 'success',
          message: '修改成功!',
          duration: 2500
        })
        this.loading = false
        this.sup_this.init()
      }).catch(err => {
        this.loading = false
        console.log(err)
      })
    },
    resetForm() {
      this.dialog = false
      this.$refs['form'].resetFields()
      this.form = { hostname: '', auth_type: '22', build_varit: null, username: '', password: '', is_public: 'false', port: 0, desc: '' }
    }
  }
}
</script>

<style scoped>

</style>
