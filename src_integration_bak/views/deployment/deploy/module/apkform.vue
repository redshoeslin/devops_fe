<template>
  <div>
    <el-button size="mini" type="primary" @click="to">查看</el-button>
    <vform ref="form" :sup_this="sup_this" :data="data" :is-add="true"/>
  </div>
</template>
<script>
import vform from './view'
import initData from '@/mixins/initData'
export default {
  components: { vform },
  mixins: [initData],
  props: {
    quer: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      sup_this: this
    }
  },
  methods: {
    beforeInit() {
      this.url = 'api/connections/'
      const sort = 'id'
      const value = this.quer.value
      console.log(value)
      this.params = { page: this.page, size: this.size, ordering: sort }
      if (value) { this.params['search'] = value }
      return true
    },
    to() {
      this.init()
      var _this
      _this = this.$refs.form
      _this.form = {
        id: '111',
        git_repo_url: '2222'
      }
      this.$refs.form.dialog = true
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
