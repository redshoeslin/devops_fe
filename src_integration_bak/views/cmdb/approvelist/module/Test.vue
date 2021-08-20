<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" title="工单" width="750px">
    <vue-flowy :chart="chart"></vue-flowy>
  </el-dialog>
</template>

<script>
import { VueFlowy, FlowChart } from 'vue-flowy'
export default {
  components: {
    VueFlowy, FlowChart
  },
  data: function() {
    return {
      chart: new FlowChart({ direction: 'LR' }), dialog: false, idea: ''
    }
  },
  mounted() {
    this.idea = this.chart.addElement('idea')
    const A = this.chart.addElement('A', { label: 'vscode' })
    const B = this.chart.addElement('B', { label: 'github' })
    const C = this.chart.addElement('C', { label: 'npm' })
    this.idea.leadsTo(A).leadsTo(B)
    A.leadsTo(C)
    A.on('click', function() {
      console.log('click!')
    })
  }
}
</script>

