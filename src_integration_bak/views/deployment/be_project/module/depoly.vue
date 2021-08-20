<template>
  <div>
    <el-button size="mini" type="primary" @click="depoly">部署申请</el-button>
    <eForm ref="form" :is-add="false" :userlist="userlist" :sup_this="sup_this" :build_versions="build_versions" :service_types="service_types"/>
  </div>
</template>
<script>
import eForm from './deform'
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
  data() {
    return {
      userlist: []
    }
  },
  methods: {
    depoly() {
      const _this = this.$refs.form
      _this.form = {
        id: this.data.id,
        name: this.data.name,
        git_repo_url: this.data.repo_url,
        apply_type: '后端服务部署申请',
        project_manager: this.data.project_manager,
        project_tester: this.data.project_tester,
        project_owner: this.data.project_owner,
        project_leader: this.data.project_leader,
        desc: '',
        sit_deploy_job_branch: 'release_V0.23.0',
        sit_entry_tag_project_version: 'Waiting for Devops add',
        sit_tag_project_version: 'CNS3SOP2_0.23.0',
        uat_deploy_job_project_version: 'CNS3SOP2_0.23.0_02_weather-be-service_20201217'
      }
      _this.dialog = true
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
