<template>
  <div id="app">
    <vue-flowy :chart="chart"></vue-flowy>
    <el-button size="mini" type="primary" @click="tt">查看流程图</el-button>
    <el-dialog
      :visible.sync="dialogVisible"
      :append-to-body="true"
      overflow-y="auto"
      title="MA Workflow"
      hight="750px"
      width="750px">
      <template slot>
        <vue-flowy :chart="chart"></vue-flowy>
      </template>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <!--<el-button type="primary" @click="dialogVisible = false">确 定</el-button>-->
        <el-button type="primary" @click="view_workflow">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { VueFlowy, FlowChart } from 'vue-flowy'
export default {
  name: 'App',
  components: {
    VueFlowy
  },
  data: function() {
    return {
      chart: new FlowChart({ direction: 'LR' }), dialogVisible: false
    }
  },
  /* mounted() {
    const idea = this.chart.addElement('已申请,待审批')
    const A = this.chart.addElement('A', { label: '已完成SIT部署' })
    const B = this.chart.addElement('B', { label: '已完成SIT_ENTRY_TAG' })
    const C = this.chart.addElement('C', { label: '已完成SIT_TAG' })
    const D = this.chart.addElement('D', { label: '已完成UAT部署' })
    const A1 = this.chart.addElement('A1', { label: 'SIT job failed' })
    const B1 = this.chart.addElement('B1', { label: 'SIT ENTRY TAG job failed' })
    const C1 = this.chart.addElement('C1', { label: 'SIT TAG job failed' })
    const D1 = this.chart.addElement('D1', { label: 'UAT job failed' })
    idea.leadsTo(A).leadsTo(B).leadsTo(C).leadsTo(D)
    idea.leadsTo(A1)
    A.leadsTo(B1)
    B.leadsTo(C1)
    C.leadsTo(D1)
    A.on('click', function() {
      console.log('click!')
    })
  },*/
  methods: {
    tt() {
      this.dialogVisible = true
    },
    view_workflow() {
      const idea = this.chart.addElement('已申请,待审批')
      const A = this.chart.addElement('A', { label: '已完成SIT部署' })
      const B = this.chart.addElement('B', { label: '已完成SIT_ENTRY_TAG' })
      const C = this.chart.addElement('C', { label: '已完成SIT_TAG' })
      const D = this.chart.addElement('D', { label: '已完成UAT部署' })
      const A1 = this.chart.addElement('A1', { label: 'SIT job failed' })
      const B1 = this.chart.addElement('B1', { label: 'SIT ENTRY TAG job failed' })
      const C1 = this.chart.addElement('C1', { label: 'SIT TAG job failed' })
      const D1 = this.chart.addElement('D1', { label: 'UAT job failed' })
      idea.leadsTo(A).leadsTo(B).leadsTo(C).leadsTo(D)
      idea.leadsTo(A1)
      A.leadsTo(B1)
      B.leadsTo(C1)
      C.leadsTo(D1)
      A.on('click', function() {
        console.log('click!')
      })
    }
  }
}
</script>

