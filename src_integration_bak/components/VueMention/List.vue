<template>
  <div :style="{ top: pos.top + 'px', left: pos.left + 'px' }" class="at-open" >
    <div :class="calc()" :style="{width:listW+'px'}" class="at-list" >
      <div
        v-for="(item, i) in listC"
        :key="i"
        :class="{'sel':i==now}"
        class="at-list-item"
        @mousedown="handleMD($event,i)"
        @mouseenter="now=i"
      >
        <slot :item="item" name="item">{{ item }}</slot>
      </div>
      <div v-show="listC.length==0" class="at-list-item" style="text-align:center;color:#aaa;">
        <div>无匹配项</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 列表数据
    list: {
      type: Array,
      default: null
    },
    // 顶部打开
    top: {
      type: Boolean,
      required: true
    },
    // 输入框对象
    taw: {
      type: Number,
      default: null
    },
    // 位置
    pos: {
      type: Object,
      default: null
    },
    // 筛选关键字
    kw: {
      type: String,
      default: null
    },
    // 获取item的value
    getvalue: {
      type: Function,
      default: null
    },
    // value字段名
    valname: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      now: 0,
      listW: 140
    }
  },
  computed: {
    listC() {
      // return this.list;
      return this.list.filter(
        item =>
          this.getvalue(item)
            .toLowerCase()
            .indexOf(this.kw.toLowerCase()) > -1
      )
    }
  },
  methods: {
    key(type) {
      if (type === 'ArrowDown') this.now = ++this.now % this.listC.length
      if (type === 'ArrowUp') {
        this.now = (--this.now + this.listC.length) % this.listC.length
        this.$nextTick(() => {
          this.$el.querySelector('.sel').scrollIntoView(false)
        })
      }
    },
    sel() {
      // const name = this.getvalue(this.listC[this.now]) + ' '
      // this.$emit('sel', name)
      this.$emit('sel', this.getvalue(this.listC[this.now]))
    },
    handleMD(e, i) {
      this.now = i
      this.sel()
      e.preventDefault()
      e.stopPropagation()
    },
    // 避免在最右侧被遮挡
    calc() {
      if (this.pos.left + this.listW > this.taw + 40) {
        return 'at-right' + (this.top ? ' at-top' : '')
      } else {
        return 'at-left' + (this.top ? ' at-top' : '')
      }
    }
  }
}
</script>

<style>
.at-open {
  position: absolute;
  z-index: 99;
}
.at-list {
  position: absolute;
  top: 1.5em;
  background: #fff;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  overflow: auto;
  max-height: 200px;
}
.at-list.at-top {
  top: auto;
  bottom: 0.2em;
}
.at-list.at-left {
  left: 0;
}
.at-list.at-right {
  right: 0;
}
.at-list-item {
  line-height: 30px;
  padding: 0 10px;
  font-size: 13px;
}
.at-list-item.sel {
  cursor: pointer;
  background: rgb(2, 117, 216);
  color: #fff;
}
</style>
