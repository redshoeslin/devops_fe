<template>
  <div class="app-container">
    <eHeader :query="query" :service_types="service_types"/>
    <!--<vue-flowy :chart="chart"></vue-flowy>-->
    <!--<el-button size="mini" type="primary" @click="view_workflow">查看流程图</el-button>-->
    <!--表格渲染-->
    <el-table v-loading="loading" ref="table" :data="data" size="small" border style="width: 100%;" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center">
      </el-table-column>
      <el-table-column label="序号" width="60" align="center">
        <template slot-scope="scope">
          <div>{{ scope.$index + 1 }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="apply_type" label="集成部署" width="100"/>
      <el-table-column prop="build_version" label="版本" width="100"/>
      <el-table-column prop="name" label="名称" width="150"/>
      <el-table-column prop="apply_status" label="申请状态" width="150"/>
      <!--<el-table-column label="申请状态" width="150">
        <template slot-scope="scope">
          <a :href="scope.row.apply_status" target="_blank" class="buttonText">{{ scope.row.apply_status }}</a>
        </template>
      </el-table-column>
      -->
      <el-table-column prop="applyname" label="申请人" width="100"/>
      <!--<el-table-column prop="desc" label="备注" />-->
      <el-table-column prop="apk_url" label="下载" >
        <template slot-scope="scope">
          <download v-if="checkPermission(['admin','connection_all','connection_edit'])" :wfinfo="scope.row" />
          <!--<a :href="'{{ scope.row.apk_url }}'" download="2.jpg">下载apk</a>-->
        </template>
      </el-table-column>
      <el-table-column label="操作" width="250px" align="center">
        <!--
        <template slot-scope="scope">
          <edit v-if="checkPermission(['admin','connection_all','connection_edit'])" :wfinfo="scope.row" :sup_this="sup_this" :service_types="service_types"/>
        </template>
        -->
        <template slot-scope="scope">
          <approve v-if="checkPermission(['admin','connection_all','connection_edit'])" :wfinfo="scope.row" :sup_this="sup_this" :service_types="service_types"/>
          <edit v-if="checkPermission(['admin','connection_all','connection_edit'])" :data="scope.row" :sup_this="sup_this" :build_versions="build_versions" :service_types="service_types"/>
          <viewworkflow v-if="checkPermission(['admin','connection_all','connection_edit'])" :wfinfo="scope.row" :sup_this="sup_this" :service_types="service_types"/>
          <el-popover
            v-if="checkPermission(['admin','connection_all','connection_delete'])"
            :ref="scope.row.id"
            placement="top"
            width="100">
            <p>确定删除这个申请吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消</el-button>
              <el-button :loading="delLoading" type="primary" size="mini" @click="subDelete(scope.row.id)">确定</el-button>
            </div>
            <el-button slot="reference" type="danger" size="mini">删除</el-button>
          </el-popover>
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
import approve from './module/approve'
import viewworkflow from './module/viewworkflow'
import download from './module/download_apk'
export default {
  components: { eHeader, edit, download, approve, viewworkflow },
  mixins: [initData],
  data() {
    return {
      delLoading: false, sup_this: this, service_types: [], filter_data: [], build_versions: []
    }
  },
  created() {
    this.$nextTick(() => {
      this.init(
        getKey('SERVICE_TYPE').then(res => {
          this.service_types = res[0].SERVICE_TYPE
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
      this.params = { page: this.page, size: this.size, ordering: sort, search: 'incomplete' }
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
