<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" title="编辑后端服务部署工单" width="750px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="200px">
      <el-form-item label="sit deploy job branch" prop="sit_deploy_job_branch">
        <el-input v-model="form.sit_deploy_job_branch" style="width: 400px;"/>
      </el-form-item>
      <el-form-item label="sit entry tag project version" prop="sit_entry_tag_project_version">
        <el-input v-model="form.sit_entry_tag_project_version" style="width: 400px;"/>
      </el-form-item>
      <el-form-item label="sit tag project version" prop="sit_tag_project_version">
        <el-input v-model="form.sit_tag_project_version" style="width: 400px;"/>
      </el-form-item>
      <el-form-item label="uat deploy job project version" prop="uat_deploy_job_project_version">
        <el-input v-model="form.uat_deploy_job_project_version" style="width: 400px;"/>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.desc" style="width: 400px;" rows="4" type="textarea"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { edit } from '@/api/connection'
export default {
  props: {
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
        sit_deploy_job_branch: '',
        sit_entry_tag_project_version: '',
        sit_tag_project_version: '',
        uat_deploy_job_project_version: '',
        desc: ''
      },
      rules: {
        hostname: [
          { required: true, message: '请输入Git repo url', trigger: 'blur' }
        ],
        build_variant: [
          { required: true, message: '请选择Build_variant', trigger: 'blur' }
        ],
        username: [
          { required: true, message: '请输入Branch', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请选择App stype', trigger: 'blur' }
        ],
        is_public: [
          { required: true, message: '是否要公开该密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
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
