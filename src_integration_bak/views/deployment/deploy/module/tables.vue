<template>
  <div>
    <!--表格渲染-->
    <el-table v-loading="sup_this.loading" :data="sup_this.versions" size="small" border style="width: 100%;">
      <el-table-column prop="value" label="名称"/>
      <el-table-column label="最近状态" width="150">
        <template slot-scope="scope">
          <span v-if="scope.row.last_task_status == 'Succeed'" style="color:#00CC00">成功</span>
          <!--<span v-else style="color:red">失败</span>-->
          <span v-else style="color:#00CC00">成功</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="350px" align="center">
        <template slot-scope="scope">
          <!--
          <div style="display: inline-block;margin: 0px 2px;">
            <el-button
              v-if="checkPermission(['admin','project_all','project_create'])"
              class="filter-item"
              size="mini"
              type="primary"
              icon="el-icon-caret-right"
              @click="toGenerate">生成发布计划</el-button>
          </div>
          <eForm ref="form" :is-add="true" :query="data"/>
          -->
          <!--
          <div style="display: inline-block;margin: 0px 1px;">
            <el-button v-if="checkPermission(['admin','deploy_all','deploy_excu'])" size="mini" type="primary" icon="el-icon-plus" @click="view">查看</el-button>
          </div>
          -->
          <apkform v-if="checkPermission(['admin','connection_all','connection_edit'])" :quer="scope.row" />
          <div style="display: inline-block;margin: 0px 1px;">
            <el-button v-if="checkPermission(['admin','deploy_all','deploy_excu'])" size="mini" type="success" icon="el-icon-caret-right" @click="depoly(scope.row.id)">发布</el-button>
          </div>
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
import { parseTime } from '@/utils/index'
import initData from '@/mixins/initData'
import eForm from './form'
import apkform from './apkform'
export default {
  components: { eForm, apkform },
  mixins: [initData],
  props: {
    sup_this: {
      type: Object,
      required: true
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
    depoly() {
      this.loading = false
      this.$router.push({ path: this.redirect || '/cmdb/apply' })
    },
    toGenerate() {
      this.init()
      console.log(this.data)
      var _this
      _this = this.$refs.form
      _this.form = {
        id: this.data.id,
        git_repo_url: this.data.git_repo_url
        // branch: this.data.branch,
        // approver: this.data.approver,
        // test_approver: this.data.test_approver,
        // apply_type: this.data.apply_type
        // app_stype: this.data.app_stype
      }
      // _this.dialog = true
      this.$refs.form.dialog = true
    }
  }
}
</script>

<style scoped>

</style>
