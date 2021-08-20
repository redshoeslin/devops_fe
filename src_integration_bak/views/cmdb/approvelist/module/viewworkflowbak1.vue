<template>
  <div>
    <vue-flowy :chart="chart"></vue-flowy>
    <el-button size="mini" type="primary" @click="view_workflow">查看流程图</el-button>
    <el-dialog
      :visible.sync="dialogVisible"
      :append-to-body="true"
      title="MA Workflow"
      width="80%"
      height="100%">
      <p>111</p>
      <vue-flowy :chart="chart"></vue-flowy>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { VueFlowy, FlowChart } from 'vue-flowy'
export default {
  name: 'App',
  components: { VueFlowy, FlowChart },
  data: function() {
    return {
      chart: new FlowChart({ direction: 'LR' }), dialogVisible: false
    }
  },
  mounted() {
    const idea = this.chart.addElement('idea')
    const A = this.chart.addElement('A', { label: 'vscode' })
    const B = this.chart.addElement('B', { label: 'github' })
    const C = this.chart.addElement('C', { label: 'npm' })
    idea.leadsTo(A).leadsTo(B)
    A.leadsTo(C)
    A.on('click', function() {
      console.log('click!')
    })
  },
  methods: {
    view_workflow() {
      /*
      this.dialogVisible = true
      if (this.wfinfo.apply_status === '待审批') {
        this.step_num = 1
      } else if (this.wfinfo.apply_status === '已完成SIT部署,下一步SIT_ENTRY_TAG') {
        this.step_num = 2
      } else if (this.wfinfo.apply_status === '已完成SIT_ENTRY_TAG,下一步SIT_TAG') {
        this.step_num = 3
      } else if (this.wfinfo.apply_status === '已完成SIT_TAG,下一步UAT部署') {
        this.step_num = 4
      } else if (this.wfinfo.apply_status === '已完成UAT部署') {
        this.step_num = 5
      } else if (this.wfinfo.apply_status === 'SIT 部署 job failed') {
        this.isShowjob1 = true
        this.step_num = 1
      } else if (this.wfinfo.apply_status === 'SIT ENTRY TAG job failed') {
        this.isShowjob2 = true
        this.step_num = 3
      } else if (this.wfinfo.apply_status === 'SIT TAG job failed') {
        this.isShowjob3 = true
        this.step_num = 5
      } else if (this.wfinfo.apply_status === 'UAT 部署 job failed') {
        this.isShowjob4 = true
        this.step_num = 7
      }*/
      /*
      this.dialogVisible = true
      this.idea = this.chart.addElement('tt')
      const A = this.chart.addElement('A', { label: 'vscode' })
      // const B = this.chart.addElement('B', { label: 'github' })
      // const C = this.chart.addElement('C', { label: 'npm' })
      // this.idea.leadsTo(A).leadsTo(B)
      // A.leadsTo(C)
      A.on('click', function() {
        console.log('click!')
      })*/
      this.dialogVisible = true
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
