<template>
  <div>
    <el-button size="mini" type="primary" @click="agree">审批</el-button>
    <eForm ref="form" :wfinfo="wfinfo" :attachment_info="attachment_info" :is-agree="isagree" :is-showfe="isShowfe" :is-showbe="isShowbe" :submit_name="submit_name" :sup_this="sup_this"/>
  </div>
</template>
<script>
import eForm from './approveform'
import initData from '@/mixins/initData'
import { getData } from '@/api/data'
export default {
  components: { eForm },
  mixins: [initData],
  props: {
    wfinfo: {
      type: Object,
      required: true
    },
    sup_this: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isagree: true, submit_name: '同意', attachment_info: [], isShowfe: false, isShowbe: false
    }
  },
  methods: {
    get_att_info() {
      const url = 'api/attachment_info/'
      const sort = 'id'
      const value = this.wfinfo.id
      const params = { ordering: sort, search: value }
      getData(url, params).then(res => {
        this.attachment_info = res.results
      })
    },
    agree() {
      console.log(this.wfinfo)
      if (this.wfinfo.apply_type === '后端服务部署申请') {
        this.isShowbe = true
      } else {
        this.isShowfe = true
      }
      this.get_att_info()
      this.isagree = true
      this.submit_name = '同意'
      const _this = this.$refs.form
      _this.form = {
        apply_id: this.wfinfo.id
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
