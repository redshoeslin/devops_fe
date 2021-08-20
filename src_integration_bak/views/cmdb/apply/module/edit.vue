<template>
  <div>
    <el-button size="mini" type="success" @click="to">申请</el-button>
    <Form ref="form" :data="data" :is-add="false" :sup_this="sup_this" :service_types="service_types"/>
    <apkForm ref="apkform" :data="data" :is-add="false" :sup_this="sup_this" :build_versions="build_versions" :service_types="service_types"/>
  </div>
</template>
<script>
import Form from './form'
import apkForm from './apkform'
export default {
  components: { Form, apkForm },
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
      const value = this.data.value
      if (value === 'android apk 编译工单') {
        _this = this.$refs.apkform
        _this.form = {
          id: this.data.id,
          apply_type: this.data.value,
          app_stype: 'apkk'
        }
        _this.dialog = true
      } else {
        _this = this.$refs.form
        _this.form = {
          id: this.data.id,
          apply_type: this.data.value
          // app_stype: this.data.app_stype
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
