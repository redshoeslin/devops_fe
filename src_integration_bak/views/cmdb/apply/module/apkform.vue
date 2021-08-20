<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增工单' : 'apk 工单'" width="650px">
    <el-form ref="apkform" :model="form" :rules="rules" size="small" label-width="150px">
      <el-form-item label="工单类型(不用填)" prop="value">
        <el-input v-model="form.apply_type" readonly unselectable="on" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="Git repo url" prop="git_repo_url">
        <el-input v-model="form.git_repo_url" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="Branch" prop="branch">
        <el-input v-model="form.branch" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="Build_variant" prop="build_variant">
        <el-select v-model="form.build_variant" style="width: 370px;" placeholder="请选择Build类型">
          <el-option v-for="item in service_types" :key="item.key" :label="item.value" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="Build_version" prop="build_version">
        <el-select v-model="form.build_version" style="width: 370px;" placeholder="请选择Build版本">
          <el-option v-for="item in build_versions" :key="item.key" :label="item.value" :value="item.value"/>
        </el-select>
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
      <el-button :loading="loading" type="primary" @click="doSubmit">提交申请</el-button>
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
        build_variant: '',
        build_version: null,
        apply_type: '',
        value: '',
        branch: '',
        app_stype: 'AndroidAPK',
        auth_type: '22',
        is_public: 'false',
        port: 0,
        desc: '',
        approver: '',
        test_approver: ''
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
      this.$refs['apkform'].validate((valid) => {
        console.log(this)
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
        // this.$parent.$parent.init()
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
      this.$refs['apkform'].resetFields()
      this.form = { git_repo_url: '', auth_type: '22', build_varit: null, branch: '', app_stype: '', is_public: 'false', port: 0, desc: '' }
    }
  }
}
</script>

<style scoped>

</style>
