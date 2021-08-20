<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="'sdk工单详情'" width="550px">
    <!--<el-form ref="form" :data="data" :model="form" :rules="rules" size="small" label-width="100px">-->
    <div :model="form">
      <p>git repo url:{{ form.git_repo_url }}</p>
      <p>build branch:{{ form.branch }}</p>
      <p>develop approver:{{ form.develop_approver }}</p>
      <p>test approver:{{ form.test_approver }}</p>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit } from '@/api/connection'
export default {
  data() {
    return {
      loading: false, dialog: false,
      form: {
        id: '',
        git_repo_url: '',
        build_variant: null,
        build_version: null,
        app_stype: '',
        auth_type: '22',
        is_public: 'false',
        port: 0,
        desc: ''
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
      this.form = { git_repo_url: '', auth_type: '22', build_varit: null, branch: '', app_stype: '', is_public: 'false', port: 0, desc: '' }
    }
  }
}
</script>

<style scoped>

</style>
