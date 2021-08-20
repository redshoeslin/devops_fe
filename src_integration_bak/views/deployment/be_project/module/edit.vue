<template>
  <div>
    <el-button size="mini" type="success" @click="to">编辑</el-button>
    <eForm ref="form" :data="data" :is-add="false" :item_types="item_types" :sup_this="sup_this"/>
  </div>
</template>
<script>
import eForm from './form'
export default {
  components: { eForm },
  props: {
    sup_this: {
      type: Object,
      required: true
    },
    data: {
      type: Object,
      required: true
    },
    item_types: {
      type: Array,
      default: null
    }
  },
  methods: {
    to() {
      const _this = this.$refs.form
      _this.form = {
        id: this.data.id,
        repo_url: this.data.repo_url,
        name: this.data.name,
        project_owner: this.data.project_owner,
        project_tester: this.data.project_tester,
        project_leader: this.data.project_tester,
        project_manager: this.data.project_manager,
        sit_deploy_job: this.data.sit_deploy_job,
        sit_entry_tag: this.data.sit_entry_tag,
        sit_tag: this.data.sit_tag,
        uat_deploy_job: this.data.uat_deploy_job
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
