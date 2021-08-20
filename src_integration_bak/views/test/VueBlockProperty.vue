<template>
  <div class="blocks-properties">
    <div v-for="p in properties" :key="p.name" class="property">
      <label :for="p.name">{{ p.label||p.name }}:</label>
      <br>
      <input v-model="p.value" type="text">
    </div>
    <button @click.prevent="save">Save</button>
  </div>
</template>

<script>
export default {
  name: 'VueBlockProperty',
  props: {
    property: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      properties: []
    }
  },
  watch: {
    property() {
      this.loadProperties()
    }
  },
  methods: {
    loadProperties() {
      this.properties = this.property
    },
    save() {
      this.$emit('save', this.properties)
    }
  }
}
</script>

<style lang="scss" scoped>
  .blocks-properties {
    position: absolute;
    right: 0;
    top: 0;

    width: 300px;
    min-height: 200px;
    box-sizing: border-box;
    padding: 10px;

    background: #ffffff;
    border: 1px solid red;
    .property {

    }
  }
</style>
