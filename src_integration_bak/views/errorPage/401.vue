<template>
  <div class="errPage-container">
    <el-row>
      <el-col :span="12">
        <h1 class="text-jumbo text-ginormous">Oops!</h1>
        <!--图片来源<a href="https://zh.airbnb.com/" target="_blank">airbnb</a> 页面-->
        <h2>你没有权限去该页面</h2>
        <h2>{{ value }}s 后自动跳转到首页</h2>
        <ul class="list-unstyled">
          <li class="link-type">
            <router-link to="/index">回首页</router-link>
          </li>
        </ul>
      </el-col>
      <el-col :span="12">
        <img :src="errGif" width="313" height="428" alt="Girl has dropped her ice cream.">
      </el-col>
    </el-row>
  </div>
</template>

<script>
import errGif from '@/assets/401_images/401.gif'

export default {
  name: 'Page401',
  data() {
    return {
      timer: '',
      value: 10,
      errGif: errGif + '?' + +new Date(),
      ewizardClap: 'https://wpimg.wallstcn.com/007ef517-bafd-4066-aae4-6883632d9646',
      dialogVisible: false
    }
  },
  mounted() {
    this.timer = setInterval(this.get, 1000)
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods: {
    back() {
      if (this.$route.query.noGoBack) {
        this.$router.push({ path: '/index' })
      } else {
        this.$router.go(-1)
      }
    },
    get() {
      if (this.value < 1) {
        console.log(22222)
        this.$router.push({ path: this.redirect || '/' })
      } else {
        this.value--
        console.log(this.value)
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .errPage-container {
    width: 600px;
    max-width: 100%;
    margin: 100px auto;
    .pan-back-btn {
      background: #008489;
      color: #fff;
      border: none!important;
    }
    .pan-gif {
      margin: 0 auto;
      display: block;
    }
    .pan-img {
      display: block;
      margin: 0 auto;
      width: 100%;
    }
    .text-jumbo {
      font-size: 60px;
      font-weight: 700;
      color: #484848;
    }
    .list-unstyled {
      font-size: 14px;
      li {
        padding-bottom: 5px;
      }
      a {
        color: #008489;
        text-decoration: none;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
</style>
