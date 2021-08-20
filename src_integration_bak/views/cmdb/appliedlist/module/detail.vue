<template>
  <div>
    <el-button size="mini" type="success" @click="to">工单详情</el-button>
    <eForm ref="form" :data="data" :is-add="false" :sup_this="sup_this" :build_versions="build_versions" :service_types="service_types"/>
  </div>
</template>
<script>
import eForm from './detailform'
export default {
  components: { eForm },
  props: {
    data: {
      type: Object,
      required: true
    },
    sup_this: {
      type: Object,
      required: true
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
  methods: {
    to() {
      console.log(this.data)
      var _this
      const apply_type = this.data.apply_type
      if (apply_type === 'android apk 编译工单') {
        _this = this.$refs.apkform
        _this.form = {
          id: this.data.id,
          git_repo_url: this.data.git_repo_url,
          branch: this.data.branch,
          build_variant: this.data.build_variant,
          build_version: this.data.build_version,
          apply_type: this.data.apply_type,
          app_stype: 'apk'
        }
        _this.dialog = true
      } else {
        _this = this.$refs.form
        _this.form = {
          id: this.data.id,
          git_repo_url: this.data.git_repo_url,
          branch: this.data.branch,
          approver: this.data.approver,
          develop_approver: this.data.develop_approver,
          test_approver: this.data.test_approver,
          apply_type: this.data.apply_type
          // app_stype: this.data.app_stype
        }
        _this.dialog = true
      }
      // const _this = this.$refs.form
      // _this.form = {
      // id: this.data.id,
      // git_repo_url: this.data.git_repo_url,
      // build_variant: this.data.build_variant,
      // build_version: this.data.build_version,
      // branch: this.data.branch,
      // app_stype: this.data.app_stype,
      // is_public: this.data.is_public.toString(),
      // port: this.data.port,
      // desc: this.data.desc
      // }
      // _this.dialog = true
    }
  }
}
</script>

<style scoped>
  div{
    display: inline-block;
    margin-right: 3px;
  }
</style>
