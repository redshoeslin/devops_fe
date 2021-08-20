<template>
  <div>
    <!--表格渲染-->
    <el-table v-loading="sup_this.loading" :data="tabledata" size="small" border style="width: 100%;">
      <el-table-column prop="name" label="名称">
      </el-table-column>
      <el-table-column label="最近状态" width="150">
        <template slot-scope="scope">
          <span v-if="scope.row.last_task_status == 'Succeed'" style="color:#00CC00">成功</span>
          <!--<span v-else style="color:red">失败</span>-->
          <span v-else style="color:#00CC00">成功</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="350px" align="center">
        <template slot-scope="scope">
          <el-button slot="reference" type="primary" size="mini" @click="depoly">发布</el-button>
          <el-progress v-show="elgrogress" :percentage="nuw" color="#8e71c7"></el-progress>
          <h v-show="false">123</h>
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
import { publish } from '@/api/publish_pro'
import checkPermission from '@/utils/permission' // 权限判断函数
import { parseTime } from '@/utils/index'
import initData from '@/mixins/initData'
export default {
  mixins: [initData],
  props: {
    sup_this: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      nuw: 0,
      elgrogress: false,
      tabledata: [{
        name: '本机',
        status: '成功'
      }]
    }
  },
  methods: {
    parseTime,
    checkPermission,
    // 详情
    beforeInit() {
      this.url = 'api/connections/'
      const sort = 'id'
      const query = this.query
      const value = query.value
      this.params = { page: this.page, size: this.size, ordering: sort, search: '进行中' }
      if (value) { this.params['search'] = value }
      return true
    },
    toPublish(id) {
      this.$router.push({
        path: 'tasks/publish',
        query: { id: id }
      })
    },
    // 工具箱
    toTools(id) {
      this.$router.push({
        path: 'tasks/tools',
        query: { id: id }
      })
    },
    view() {
      this.loading = false
      this.$router.push({ path: this.redirect || '/cmdb/apply' })
    },
    depoly() {
      this.elgrogress = true
      // 定义定时器开始时间为0
      var progressnuw = 0
      // 顶一个定时器
      var timer = setInterval(() => {
        // 变量一直++
        progressnuw++
        // 清楚定时器
        if (progressnuw >= 100) {
          clearInterval(timer)
        }
        // 获取重新赋值
        this.nuw = progressnuw
      }, 30)
      publish().then(res => {
        this.$message({
          showClose: true,
          type: 'success',
          message: '已开始部署!',
          duration: 2500
        })
        this.loading = false
        this.$parent.$parent.$parent.init()
      }).catch(err => {
        this.loading = false
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>

</style>
