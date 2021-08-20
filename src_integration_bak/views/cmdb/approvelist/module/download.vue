<template>
  <div>
    <el-button size="mini" type="primary" @click="doDownload">下载</el-button>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isagree: true, submit_name: '同意', attachment_info: []
    }
  },
  methods: {
    doDownload() {
      // return 'http://192.168.30.62:8000/api/upload?name=' + this.data.name + '&apply_id=' + this.data.apply_id
      const a = document.createElement('a')
      a.href = 'http://192.168.30.62:8000/api/upload?name=' + this.data.name + '&apply_id=' + this.data.apply_id
      a.click()
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
