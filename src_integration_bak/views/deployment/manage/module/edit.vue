<template>
  <div>
    <el-button size="mini" type="success" @click="to">编辑</el-button>
    <eForm ref="form" :data="data" :is-add="false" :item_types="item_types"/>
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
        project_leader: this.data.project_tester
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
