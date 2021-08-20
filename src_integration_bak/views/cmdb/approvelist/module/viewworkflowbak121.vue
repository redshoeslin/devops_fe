<template>
  <div>
    <el-button size="mini" type="primary" @click="view_workflow">查看流程图</el-button>
    <el-dialog
      :visible.sync="dialogVisible"
      :append-to-body="true"
      title="MA Workflow"
      width="80%"
      height="100%"
      overflow-y="auto">
      <div>
        <el-steps :active="step_num" space="200" finish-status="success">
          <el-step title="已申请,待审批" description="这是一"></el-step>
          <el-step v-show="isShowjob1" title="SIT job failed"></el-step>
          <el-step title="已完成SIT部署" description="这是一段很长很长很长的描述性文字"></el-step>
          <el-step v-show="isShowjob2" title="SIT ENTRY TAG job failed" description="这是一段很长很长很长的描述性文字"></el-step>
          <el-step title="已完成SIT_ENTRY_TAG" description="这是一段很长很长很长的描述性文字"></el-step>
          <el-step v-show="isShowjob3" title="SIT TAG job failed"></el-step>
          <el-step title="已完成SIT_TAG" description="这是一段很长很长很长的描述性文字"></el-step>
          <el-step v-show="isShowjob4" title="UAT job failed"></el-step>
          <el-step title="已完成UAT部署"></el-step>
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

export default {
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
      dialogVisible: false, step_num: 1, isShowjob1: false, isShowjob2: false, isShowjob3: false, isShowjob4: false
    }
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

<style scoped>
  div{
    display: inline-block;
    margin-right: 3px;
  }
</style>
