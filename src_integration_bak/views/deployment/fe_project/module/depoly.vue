<template>
  <div>
    <el-button size="mini" type="primary" @click="depoly">集成申请</el-button>
    <eForm ref="form" :is-add="false" :userlist="userlist" :sup_this="sup_this" :build_versions="build_versions" :service_types="service_types"/>
  </div>
</template>
<script>
import eForm from './form'
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
      console.log(this.data)
      const _this = this.$refs.form
      _this.form = {
        id: this.data.id,
        name: this.data.name,
        git_repo_url: this.data.repo_url,
        test_approver: this.data.project_tester,
        develop_approver: this.data.project_leader,
        apply_type: 'APK集成申请',
        branch: '',
        desc: '',
        build_variant: 'Release',
        app_stype: 'AndroidAPK'
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
