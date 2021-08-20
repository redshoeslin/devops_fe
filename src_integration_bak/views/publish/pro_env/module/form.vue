<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="'生成发布计划'" width="550px">
    <!--<el-form ref="form" :data="data" :model="form" :rules="rules" size="small" label-width="100px">-->
    <div :model="form">
      <p>本次部署的模块如下:</p>
      <div v-for="qu in query" :key="qu.git_repo_url">
        <p>git repo url: {{ qu.git_repo_url }} </p>
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="dotest">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit } from '@/api/project'
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
    },
    query: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      loading: false, dialog: false,
      form: {
        id: '',
        git_repo_url: ''
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
    dotest() {
      console.log(this)
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
      this.form = { git_repo_url: '', id: '' }
    }
  }
}
</script>

<style scoped>

</style>
