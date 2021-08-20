<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" title="后端服务部署申请" width="750px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="300px">
      <el-form-item v-show="isShow" label="工单类型" prop="apply_type">
        <el-input v-model="form.apply_type" readonly style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" readonly style="width: 370px;"/>
      </el-form-item>
      <el-form-item v-show="isShow" label="Git repo url" prop="git_repo_url">
        <el-input v-model="form.git_repo_url" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="SIT deploy job Branch" prop="sit_deploy_job_Branch">
        <el-input v-model="form.sit_deploy_job_branch" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="SIT entry tag Project Version" prop="sit_entry_tag_project_version">
        <el-input v-model="form.sit_entry_tag_project_version" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="SIT tag Project Version" prop="sit_tag_project_version">
        <el-input v-model="form.sit_tag_project_version" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="UAT deploy job Project Version" prop="uat_deploy_job_project_version">
        <el-input v-model="form.uat_deploy_job_project_version" style="width: 370px;"/>
      </el-form-item>
      <!--
      <el-form-item label="Build_version" prop="build_version">
        <el-select v-model="form.build_version" style="width: 370px;" placeholder="请选择Build版本">
          <el-option v-for="item in build_versions" :key="item.key" :label="item.value" :value="item.value"/>
        </el-select>
      </el-form-item>
      -->
      <el-form-item v-show="isShow" label="开发负责人" prop="project_owner">
        <el-autocomplete
          v-model="form.project_owner"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入开发负责人"
          style="width: 370px;"
          @select="handleSelect"
        >
        </el-autocomplete>
      </el-form-item>
      <el-form-item v-show="isShow" label="测试负责人" prop="project_tester">
        <el-autocomplete
          v-model="form.project_tester"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入测试负责人"
          style="width: 370px;"
          @select="handleSelect"
        >
        </el-autocomplete>
      </el-form-item>
      <el-form-item v-show="isShow" label="开发leader" prop="project_leader">
        <el-autocomplete
          v-model="form.project_leader"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入开发leader"
          style="width: 370px;"
          @select="handleSelect"
        >
        </el-autocomplete>
      </el-form-item>
      <el-form-item v-show="isShow" label="project manager" prop="project_manager">
        <el-autocomplete
          v-model="form.project_manager"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入project manager"
          style="width: 370px;"
          @select="handleSelect"
        >
        </el-autocomplete>
      </el-form-item>
      <el-form-item label="申请部署原因">
        <el-input v-model="form.desc" style="width: 370px;" rows="4" type="textarea" placeholder="fix bug:"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">提交申请</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add } from '@/api/connection'
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
    build_versions: {
      type: Array,
      default: null
    },
    service_types: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      loading: false, dialog: false, readonly: true, isShow: false,
      form: {
        id: '',
        name: '',
        git_repo_url: '',
        build_variant: null,
        branch: '',
        apply_type: '',
        approver: '',
        build_version: '',
        apply_status: '待审批',
        project_manager: '',
        project_tester: '',
        project_owner: '',
        project_leader: '',
        sit_deploy_job_branch: '',
        sit_entry_tag_project_version: '',
        sit_tag_project_version: '',
        uat_deploy_job_project_version: '',
        desc: ''
      },
      userlist: [],
      rules: {
        sit_deploy_job_branch: [
          { required: true, message: '请输入sit deploy job branch', trigger: 'blur' }
        ],
        sit_entry_tag_project_version: [
          { required: true, message: '请输入sit entry tag project version', trigger: 'blur' }
        ],
        sit_tag_project_version: [
          { required: true, message: '请输入sit tag project version', trigger: 'change' }
        ],
        uat_deploy_job_project_version: [
          { required: true, message: '请输入uat deploy job project version', trigger: 'change' }
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
          this.doAdd()
        } else {
          return false
        }
      })
    },
    doAdd() {
      this.form.approver = this.form.project_leader
      add(this.form).then(res => {
        this.resetForm()
        this.$message({
          showClose: true,
          type: 'success',
          message: '申请成功!',
          duration: 2500
        })
        this.loading = false
        this.$parent.$parent.init()
      }).catch(err => {
        this.loading = false
        console.log(err)
      })
    },
    resetForm() {
      this.dialog = false
      this.$refs['form'].resetFields()
      this.form = { branch: '', build_version: '', test_approver: '', develop_approver: '', desc: '' }
    }
  }
}
</script>

<style scoped>

</style>
