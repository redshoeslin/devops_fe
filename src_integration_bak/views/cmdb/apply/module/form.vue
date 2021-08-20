<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增工单' : 'SDK工单'" width="650px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="150px">
      <el-form-item label="工单类型(不用填)" prop="value">
        <el-input v-model="form.apply_type" readonly unselectable="on" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="Git repo url" prop="git_repo_url">
        <el-input v-model="form.git_repo_url" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="Branch" prop="branch">
        <el-input v-model="form.branch" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="develop approver" prop="approver">
        <el-autocomplete
          v-model="form.approver"
          :fetch-suggestions="querySearchAsync"
          style="width: 370px"
          placeholder="">
        </el-autocomplete>
      </el-form-item>
      <el-form-item label="test approver" prop="test_approver">
        <!--<el-input v-model="form.test_approver" style="width: 370px;"/>-->
        <el-autocomplete
          v-model="form.test_approver"
          :fetch-suggestions="querySearchAsync"
          style="width: 370px"
          placeholder="">
        </el-autocomplete>
      </el-form-item>
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
import { add, edit } from '@/api/connection'
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
    service_types: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      loading: false, dialog: false,
      form: {
        id: '',
        git_repo_url: '',
        build_variant: '',
        approver: '',
        test_approver: '',
        develop_approver: '',
        apply_type: '',
        value: '',
        branch: '',
        app_stype: '',
        auth_type: '22',
        is_public: 'false',
        port: 0,
        desc: ''
      },
      rules: {
        git_repo_url: [
          { required: true, message: '请输入Git repo url', trigger: 'blur' }
        ],
        build_variant: [
          { required: true, message: '请选择Build_variant', trigger: 'blur' }
        ],
        branch: [
          { required: true, message: '请输入Branch', trigger: 'blur' }
        ],
        app_stype: [
          { required: true, message: '请选择App stype', trigger: 'blur' }
        ],
        is_public: [
          { required: true, message: '是否要公开该密码', trigger: 'blur' }
        ],
        develop_approver: [
          { required: true, message: '请输入开发审批人', change: 'blur' }
        ],
        test_approver: [
          { required: true, message: '请输入测试审批人', change: 'blur' }
        ]
      }
    }
  },
  mounted() {
    getUserList().then(res => {
      this.user_data = []
      const _userdata = this.user_data
      res.forEach(function(data, index) {
        const new_data = {
          key: 'name',
          value: data.name
        }
        if (new_data.value.indexOf('管理员') === 0) {
          console.log(new_data)
        } else {
          _userdata.push(new_data)
          console.log(_userdata)
        }
      })
      this.restaurants = _userdata
    })
  },
  methods: {
    cancel() {
      this.resetForm()
    },
    querySearchAsync(queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants

      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results)
      }, 3000 * Math.random())
    },
    createStateFilter(queryString) {
      return (approver) => {
        // return (approver.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
        return (approver.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1)
      }
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
      add(this.form).then(res => {
        this.resetForm()
        this.$message({
          showClose: true,
          type: 'success',
          message: '添加成功!',
          duration: 2500
        })
        this.loading = false
        this.$parent.$parent.init()
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
      this.form = { git_repo_url: '', auth_type: '22', build_varit: null, branch: '', app_stype: '', is_public: 'false', port: 0, desc: '' }
    }
  }
}
</script>

<style scoped>

</style>
