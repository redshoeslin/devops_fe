<template>
  <div>
    <el-button size="mini" type="success" @click="agree">同意</el-button>
    <el-button size="mini" type="danger" @click="reject">拒绝</el-button>
    <eForm ref="form" :is-add="false" :sup_this="sup_this" :service_types="service_types"/>
  </div>
</template>
<script>
import eForm from './form'
import { run, reject } from '@/api/jenkinsrun'
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
    }
  },
  methods: {
    agree() {
      run(this.data).then(res => {
        this.$message({
          showClose: true,
          type: 'success',
          message: '已审批!',
          duration: 2500
        })
        console.log(this.data)
        this.loading = false
        this.$parent.$parent.$parent.init()
      }).catch(err => {
        this.loading = false
        console.log(err)
      })
    },
    reject() {
      reject(this.data).then(res => {
        this.$message({
          showClose: true,
          type: 'success',
          message: '已拒绝!',
          duration: 2500
        })
        console.log(this.data)
        this.loading = false
        this.$parent.$parent.$parent.init()
      }).catch(err => {
        this.loading = false
        console.log(err)
      })
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
