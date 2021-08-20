<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增工单' : '编辑sdk工单'" width="550px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="100px">
      <el-form-item label="Git repo url" prop="git_repo_url">
        <el-input v-model="form.git_repo_url" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="Branch" prop="branch">
        <el-input v-model="form.branch" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="develop approver" prop="approver">
        <el-input v-model="form.approver" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="test approver" prop="test_approver">
        <el-input v-model="form.test_approver" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.desc" style="width: 370px;" rows="4" type="textarea"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit } from '@/api/connection'
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
    },
    build_versions: {
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
        build_variant: null,
        build_version: null,
        branch: '',
        app_stype: 'AndroidAPK',
        auth_type: '22',
        is_public: 'false',
        port: 0,
        desc: ''
      },
      rules: {
        git_repo_url: [
          { required: true, message: '请输入Git repo url', trigger: 'blur' }
        ],
        branch: [
          { required: true, message: '请输入Branch', trigger: 'blur' }
        ],
        approver: [
          { required: true, message: '请输入开发审批人邮箱', trigger: 'blur' }
        ],
        test_approver: [
          { required: true, message: '请输入测试审批人邮箱', trigger: 'blur' }
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
      this.form = { git_repo_url: '', build_varit: null, desc: '' }
    }
  }
}
</script>

<style scoped>

</style>
