<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增工单' : '编辑工单'" width="550px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="100px">
      <el-form-item label="Git repo url" prop="hostname">
        <el-input v-model="form.hostname" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="Branch" prop="username">
        <el-input v-model="form.username" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="Build_variant" prop="build_variant">
        <el-select v-model="form.build_variant" style="width: 370px;" placeholder="请选择Build类型">
          <el-option v-for="item in service_types" :key="item.key" :label="item.value" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="App_style" prop="password">
        <el-input v-model="form.password" style="width: 370px;"/>
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
    }
  },
  data() {
    return {
      loading: false, dialog: false,
      form: {
        id: '',
        hostname: '',
        build_variant: null,
        username: '',
        password: '',
        auth_type: '22',
        is_public: 'false',
        port: 0,
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
      this.form = { hostname: '', auth_type: '22', build_varit: null, username: '', password: '', is_public: 'false', port: 0, desc: '' }
    }
  }
}
</script>

<style scoped>

</style>
