<template>
  <div class="app-container">
    <eHeader :query="query" :service_types="service_types" :workflow_types="workflow_types" :build_versions="build_versions"/>
    <!--表格渲染-->
    <el-table v-loading="loading" ref="table" :data="workflow_types" size="small" border style="width: 100%;" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center">
      </el-table-column>
      <el-table-column label="序号" width="60" align="center">
        <template slot-scope="scope">
          <div>{{ scope.$index + 1 }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="value" label="名称" />
      <el-table-column prop="desc" label="描述" />
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <edit v-if="checkPermission(['admin','connection_all','connection_edit'])" :data="scope.row" :build_versions="build_versions" :service_types="service_types" :sup_this="sup_this" :workflow_types="workflow_types"/>
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <el-pagination
      :total="total"
      style="margin-top: 8px;"
      layout="total, prev, pager, next, sizes"
      @size-change="sizeChange"
      @current-change="pageChange"/>
  </div>
</template>

<script>
import checkPermission from '@/utils/permission'
import initData from '@/mixins/initData'
import { getKey } from '@/api/dict'
import { del } from '@/api/connection'
import eHeader from './module/header'
import edit from './module/edit'
export default {
  components: { eHeader, edit },
  mixins: [initData],
  data() {
    return {
      delLoading: false, sup_this: this, workflow_types: [], service_types: [], build_versions: []
    }
  },
  created() {
    this.$nextTick(() => {
      this.init(
        getKey('SERVICE_TYPE').then(res => {
          this.service_types = res[0].SERVICE_TYPE
        }),
        getKey('WORKFOLW_TYPE').then(res => {
          this.workflow_types = res[0].WORKFOLW_TYPE
        }),
        getKey('BUILD_VERSION').then(res => {
          this.build_versions = res[0].BUILD_VERSION
        })
      )
    })
  },
  methods: {
    checkPermission,
    beforeInit() {
      this.url = 'api/connections/'
      const sort = 'id'
      const query = this.query
      const value = query.value
      this.params = { page: this.page, size: this.size, ordering: sort, search: '已完成' }
      if (value) { this.params['search'] = value }
      return true
    },
    // 全选
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.table.toggleRowSelection(row, !this.allSelect)
        })
        this.allSelect = !this.allSelect
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 批量删除
    doSelectionDel() {
      const resultArr = []
      this.multipleSelection.forEach(function(data, index) {
        const result = del(data.id).catch(err => {
          console.log(err)
        })
        resultArr.push(result)
      })
      Promise.all(resultArr).then((resultArr) => {
        this.init()
      })
    },
    subDelete(id) {
      this.delLoading = true
      del(id).then(res => {
        this.delLoading = false
        this.$refs[id].doClose()
        this.init()
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
    }
  }
}
</script>

<style scoped>

</style>
