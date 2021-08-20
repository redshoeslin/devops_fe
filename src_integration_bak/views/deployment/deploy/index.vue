<template>
  <div class="app-container">
    <div class="head-container">
      <!-- 搜索 -->
      <el-input v-model="value" clearable placeholder="输入名称搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>
      <el-button class="filter-item" size="mini" type="primary" icon="el-icon-search" @click="toQuery">搜索</el-button>
      <!-- 新增 -->
      <div style="display: inline-block;margin: 0px 2px;">
        <el-button
          v-if="checkPermission(['admin','project_all','project_create'])"
          class="filter-item"
          size="mini"
          type="primary"
          icon="el-icon-plus"
          @click="toCreate">新增</el-button>
      </div>
    </div>
    <div class="tab-container">
      <el-tabs v-model="activeName" style="margin-top:15px;" type="card" @tab-click="handleClick">
        <Tables :sup_this="sup_this"/>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import checkPermission from '@/utils/permission'
import Tables from './module/tables'
import initData from '@/mixins/initData'
import { getKey } from '@/api/dict'
export default {
  components: { Tables },
  mixins: [initData],
  data() {
    return {
      sup_this: this,
      activeName: 'all',
      dialog: false,
      loading: false,
      versions: [],
      value: null
    }
  },
  created() {
    getKey('BUILD_VERSION').then(res => {
      this.versions = res[0].BUILD_VERSION
    })
    this.$nextTick(() => {
      this.init()
    })
  },
  mounted() {
    console.log(this)
  },
  methods: {
    checkPermission,
    beforeInit() {
      this.url = 'api/dicts/'
      const sort = 'id'
      this.params = { page: this.page, size: this.size, ordering: sort, search: 'sample' }
      return true
    },
    handleClick() {
      this.$nextTick(() => {
        this.init()
      })
    },
    toQuery() {
      this.page = 1
      this.query.value = this.value
      this.init()
    },
    toCreate() {
      this.$router.push({
        path: 'projects/create'
      })
    }
  }
}
</script>

<style scoped>

</style>
