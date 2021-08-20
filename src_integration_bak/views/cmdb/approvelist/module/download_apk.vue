<template>
  <div>
    <a :href="download()">{{ apk_name }}</a>
  </div>
</template>
<script>
export default {
  props: {
    wfinfo: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isagree: true, submit_name: '同意', attachment_info: [], apk_name: ''
    }
  },
  mounted() {
    const url = this.wfinfo.apk_url
    this.apk_name = url.split('/')[url.split('/').length - 1]
  },
  methods: {
    download() {
      return this.wfinfo.apk_url
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
