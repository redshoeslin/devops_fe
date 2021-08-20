<template>
  <div>
    <!--表格渲染-->
    <el-table v-loading="sup_this.loading" :data="sup_this.data" size="small" border style="width: 100%;">
      <el-table-column prop="name" label="名称"/>
      <el-table-column label="操作" width="400px" align="center">
        <template slot-scope="scope">
          <edit v-if="checkPermission(['admin','connection_all','connection_edit'])" :data="scope.row" :item_types="item_types"/>
          <el-popover
            v-if="checkPermission(['admin','project_all','project_delete'])"
            :ref="scope.row.id"
            placement="top"
            width="180">
            <p>确定删除这个项目吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消</el-button>
              <el-button :loading="delLoading" type="primary" size="mini" @click="subDelete(scope.row.id)">确定</el-button>
            </div>
            <el-button slot="reference" type="danger" size="mini">删除</el-button>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="申请" width="400px" align="center">
        <template slot-scope="scope">
          <dpForm v-if="checkPermission(['admin','connection_all','connection_edit'])" :data="scope.row" :sup_this="sup_this" :build_versions="build_versions" :service_types="service_types"/>
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
import edit from './edit'
import dpForm from './depoly'
export default {
  components: { dpForm, edit },
  props: {
    sup_this: {
      type: Object,
      required: true
    },
    service_types: {
      type: Array,
      default: null
    },
    item_types: {
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
      initLoading: false,
      delLoading: false
    }
  },
  methods: {
    checkPermission
  }
}
</script>

<style scoped>

</style>
