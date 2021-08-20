import { initData } from '@/api/data'

export default {
  data() {
    return {
      loading: true, data: [], page: 1, size: 10, total: 0, url: '', params: {}, query: {}, time: 170
    }
  },
  methods: {
    async init() {
      console.log(this.params)
      if (!await this.beforeInit()) {
        return
      }
      return new Promise((resolve, reject) => {
        this.loading = true
        initData(this.url, this.params).then(res => {
          this.total = res.count
          this.data = res.results
          setTimeout(() => {
            this.loading = false
          }, this.time)
          resolve(res)
        }).catch(err => {
          this.loading = false
          reject(err)
        })
      })
    },
    test() {
      const url = 'api/connections/'
      const params = { page: this.page, size: this.size, ordering: 'id', search: '待' }
      initData(url, params).then(res => {
        this.total = res.count
        this.data = res.results
        console.log(this.data)
      })
      return true
    },
    test1() {
      this.data = '111111'
      return true
    },
    pageChange(e) {
      this.page = e
      this.init()
    },
    sizeChange(e) {
      this.page = 1
      this.size = e
      this.init()
    }
  }
}
