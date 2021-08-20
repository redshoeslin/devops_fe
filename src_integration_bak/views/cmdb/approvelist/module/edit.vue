<template>
  <div>
    <el-button size="mini" type="success" @click="to">编辑</el-button>
    <eForm ref="form" :data="data" :is-add="false" :sup_this="sup_this" :build_versions="build_versions" :service_types="service_types"/>
    <apkForm ref="apkform" :sup_this="sup_this" :build_versions="build_versions" :service_types="service_types"/>
  </div>
</template>
<script>
import eForm from './form'
import apkForm from './apkform'
export default {
  components: { eForm, apkForm },
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
      var _this
      const apply_type = this.data.apply_type
      if (apply_type === 'APK集成申请') {
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
          sit_deploy_job_branch: this.data.sit_deploy_job_branch,
          sit_entry_tag_project_version: this.data.sit_entry_tag_project_version,
          sit_tag_project_version: this.data.sit_tag_project_version,
          uat_deploy_job_project_version: this.data.uat_deploy_job_project_version
        }
        _this.dialog = true
      }
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
