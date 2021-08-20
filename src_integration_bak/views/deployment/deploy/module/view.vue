<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="'部署状态'" width="550px">
    <div :model="form">
      <el-table :data="data" style="width: 100%;">
        <el-table-column prop="name" label="名称" width="180">
        </el-table-column>
        <el-table-column prop="apply_status" label="状态" width="180">
        </el-table-column>
        <el-table-column prop="approver" label="当前审批人">
        </el-table-column>
      </el-table>
      <el-pagination
        :total="sup_this.total"
        style="margin-top: 8px;"
        layout="total, prev, pager, next, sizes"
        @size-change="sup_this.sizeChange"
        @current-change="sup_this.pageChange"/>
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
    sup_this: {
      type: Object,
      required: true
    },
    data: {
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
      },
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
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
