<template>
  <div>
    <!--表格渲染-->
    <el-table v-loading="sup_this.loading" :data="sup_this.data" size="small" border style="width: 100%;">
      <el-table-column prop="name" label="名称"/>
      <!--
      <el-table-column label="初始化状态" width="150">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 'Succeed'" style="color:#00CC00">成功</span>
          <span v-else style="color:red">失败</span>
        </template>
      </el-table-column>
      -->
      <el-table-column label="操作" width="400px" align="center">
        <template slot-scope="scope">
          <el-popover
            v-if="checkPermission(['admin','project_all','project_delete'])"
            :ref="scope.row.id"
            placement="top"
            width="180">
            <p>确定删除本条数据吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消</el-button>
              <el-button :loading="delLoading" type="primary" size="mini" @click="subDelete(scope.row.id)">确定</el-button>
            </div>
            <el-button slot="reference" type="primary" size="mini" @click="depolyApply">部署申请</el-button>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :total="sup_this.total"
      style="margin-top: 8px;"
      layout="total, prev, pager, next, sizes"
      @size-change="sup_this.sizeChange"
      @current-change="sup_this.pageChange"/>
  </div>
</template>

<script>
import checkPermission from '@/utils/permission' // 权限判断函数
import member from './member'
import { del, copy } from '@/api/project'
import { DeployExcu } from '@/api/deploy'
import { parseTime } from '@/utils/index'
export default {
  components: { member },
  props: {
    sup_this: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      initLoading: false,
      delLoading: false
    }
  },
  methods: {
    parseTime,
    checkPermission,
    // 初始化
    toInit(id) {
      this.initLoading = true
      DeployExcu({
        'excu': 'init',
        'id': id
      }).then(res => {
        this.initLoading = false
        this.$message({
          showClose: true,
          type: 'success',
          message: '初始化成功!',
          duration: 2500
        })
        this.sup_this.init()
      }).catch(err => {
        this.initLoading = false
        console.log(err)
      })
    },
    // 详情
    toDetail(id) {
      this.$router.push({
        path: 'projects/detail',
        query: { id: id }
      })
    },
    subDelete(id) {
      this.delLoading = true
      del(id).then(res => {
        this.delLoading = false
        this.$refs[id].doClose()
        this.sup_this.init()
        this.$message({
          showClose: true,
          type: 'success',
          message: '删除成功!',
          duration: 2500
        })
      }).catch(err => {
        this.delLoading = false
        this.$refs[id].doClose()
        console.log(err)
      })
    },
    toCopy(id) {
      this.$confirm('是否复制本项目?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const form = { id: id }
        copy(form).then(res => {
          this.delLoading = false
          console.log(this)
          this.sup_this.init()
          this.$message({
            showClose: true,
            type: 'success',
            message: '复制成功!',
            duration: 2500
          })
        }).catch(err => {
          this.delLoading = false
          console.log(err)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消操作'
        })
      })
    },
    depolyApply() {
      this.loading = false
      this.$router.push({ path: this.redirect || '/cmdb/apply' })
    }
  }
}
</script>

<style scoped>

</style>
