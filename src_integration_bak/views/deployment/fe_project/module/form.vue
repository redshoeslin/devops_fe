<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" title="APK集成申请" width="650px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="150px">
      <el-form-item label="工单类型" prop="apply_type">
        <el-input v-model="form.apply_type" readonly style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="Git repo url" prop="git_repo_url">
        <el-input v-model="form.git_repo_url" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="Branch" prop="branch">
        <el-input v-model="form.branch" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="Build_version" prop="build_version">
        <el-select v-model="form.build_version" style="width: 370px;" placeholder="请选择Build版本">
          <el-option v-for="item in build_versions" :key="item.key" :label="item.value" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="开发leader审批人" prop="develop_approver">
        <el-input v-model="form.develop_approver" readonly style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="测试审批人" prop="test_approver">
        <el-input v-model="form.test_approver" readonly style="width: 370px;"/>
      </el-form-item>
      <!--
      <el-form-item label="develop_approver" prop="develop_approver">
        <el-autocomplete
          v-model="form.develop_approver"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入开发审批人"
          style="width: 370px;"
          @select="handleSelect"
        >
        </el-autocomplete>
      </el-form-item>
      <el-form-item label="test_approver" prop="test_approver">
        <el-autocomplete
          v-model="form.test_approver"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入测试审批人"
          style="width: 370px;"
          @select="handleSelect"
        >
        </el-autocomplete>
      </el-form-item>
      -->
      <el-form-item label="备注">
        <el-input v-model="form.desc" style="width: 370px;" rows="4" type="textarea"/>
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
      loading: false, dialog: false, readonly: true,
      form: {
        id: '',
        git_repo_url: '',
        build_variant: '',
        app_stype: '',
        branch: '',
        apply_type: '',
        build_version: '',
        develop_approver: '',
        approver: '',
        test_approver: '',
        apply_status: '待审批',
        desc: ''
      },
      userlist: [],
      rules: {
        git_repo_url: [
          { required: true, message: '请输入Git repo url', trigger: 'blur' }
        ],
        build_version: [
          { required: true, message: '请选择Build_version', trigger: 'blur' }
        ],
        branch: [
          { required: true, message: '请输入Branch', trigger: 'blur' }
        ],
        develop_approver: [
          { required: true, message: '请选择开发审批', trigger: 'change' }
        ],
        test_approver: [
          { required: true, message: '请选择测试人员', trigger: 'change' }
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
          this.doAdd()
        } else {
          return false
        }
      })
    },
    doAdd() {
      this.form.approver = this.form.develop_approver
      console.log(this.form)
      add(this.form).then(res => {
        this.resetForm()
        this.$message({
          showClose: true,
          type: 'success',
          message: '申请成功!',
          duration: 2500
        })
        this.loading = false
        this.$parent.$parent.$parent.init()
      }).catch(err => {
        this.loading = false
        console.log(err)
      })
    },
    resetForm() {
      this.dialog = false
      this.$refs['form'].resetFields()
      this.form = { build_variant: 'Release', app_stype: 'AndroidAPK', branch: '', build_version: '', test_approver: '', develop_approver: '', desc: '' }
    }
  }
}
</script>

<style scoped>

</style>
