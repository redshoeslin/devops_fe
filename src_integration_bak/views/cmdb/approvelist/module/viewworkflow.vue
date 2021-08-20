<template>
  <div>
    <el-button size="mini" type="primary" @click="view_workflow">查看流程图</el-button>
    <!--<vue-flowy :chart="chart"></vue-flowy>-->
    <el-dialog
      :visible.sync="dialogVisible"
      :append-to-body="true"
      title="MA Workflow"
      overflow-y="auto"
      width="70%">
      <div style="align-center">
        <vue-flowy :chart="chart"></vue-flowy>
        <el-steps :active="step_num" finish-status="success">
          <!--<el-step title="已申请,待审批" description="这"></el-step>-->
          <el-step title="已申请,待审批"></el-step>
          <el-step v-show="isShowjob1" title="SIT job failed"></el-step>
          <el-step title="SIT部署"></el-step>
          <el-step v-show="isShowjob2" title="SIT ENTRY TAG job failed"></el-step>
          <el-step title="SIT_ENTRY_TAG"></el-step>
          <el-step v-show="isShowjob3" title="SIT TAG job failed"></el-step>
          <el-step title="SIT_TAG"></el-step>
          <el-step v-show="isShowjob4" title="UAT job failed"></el-step>
          <el-step title="UAT部署"></el-step>
        </el-steps>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { VueFlowy, FlowChart } from 'vue-flowy'
export default {
  components: {
    VueFlowy
  },
  props: {
    sup_this: {
      type: Object,
      default: null
    },
    wfinfo: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      chart: new FlowChart({ direction: 'LR' }), dialogVisible: false, step_num: 1, isShowjob1: false, isShowjob2: false, isShowjob3: false, isShowjob4: false
    }
  },
  mounted() {
    const idea = this.chart.addElement('idea1')
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
      }
    }
  }
}
</script>

