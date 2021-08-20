<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isShowbe ? '后端服务部署申请详情' : 'APK集成申请详情'" width="550px">
    <div :wfinfo="wfinfo" :attachment_info="attachment_info" class="dialog-footer" >
      <el-collapse v-model="activeName" style="border: none" accordion>
        <el-collapse-item name="1">
          <span slot="title" class="collapse-title">Details</span>
          <p>module name: {{ wfinfo.name }}</p>
          <p>apply name: {{ wfinfo.applyname }}</p>
          <!--<img src="approvelist/module/lo1.png" style="height:50px;width:100%;" />-->
          <!--<img :src="logo" style="height:50px;width:100%;" />-->
          <!--<el-button type="text" @click="open">View Workflow</el-button>-->
          <p>apply_status: {{ wfinfo.apply_status }}</p>
          <p>apply reason: {{ wfinfo.desc }}</p>
          <!--<el-button size="mini" type="text" @click="view_workflow">View Workflow</el-button>-->
          <el-dialog
            :visible.sync="dialogVisible"
            :append-to-body="true"
            title="MA Workflow"
            width="80%"
            height="60%">
            <!--<span>这是一段信息</span>-->
            <el-steps :space="200" :active="step_num" finish-status="success">
              <el-step title="已申请,待审批"></el-step>
              <el-step v-show="isShowjob1" title="SIT job failed"></el-step>
              <el-step title="已完成SIT部署,下一步SIT_ENTRY_TAG"></el-step>
              <el-step v-show="isShowjob2" title="SIT ENTRY TAG job failed"></el-step>
              <el-step title="已完成SIT_ENTRY_TAG,下一步SIT_TAG"></el-step>
              <el-step v-show="isShowjob3" title="SIT TAG job failed"></el-step>
              <el-step title="已完成SIT_TAG,下一步UAT部署"></el-step>
              <el-step v-show="isShowjob4" title="UAT job failed"></el-step>
              <el-step title="已完成UAT部署"></el-step>
            </el-steps>
            <span slot="footer" class="dialog-footer">
              <!--<el-button @click="dialogVisible = false">取 消</el-button>-->
              <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
          </el-dialog>
          <div>
            <el-button collapse="true" size="mini" type="primary" style="border: none;outline: 0;" @click="handleShowdetail()">更多详情</el-button>
          </div>
          <div v-show="isShowdetail">
            <div v-show="isShowfe">
              <p>git repo url:  {{ wfinfo.git_repo_url }}</p>
              <p>build branch:  {{ wfinfo.branch }}</p>
              <p>develop approver:{{ wfinfo.develop_approver }}</p>
              <p>test approver:{{ wfinfo.test_approver }}</p>
            </div>
            <div v-show="isShowbe">
              <p>git repo url:  {{ wfinfo.git_repo_url }}</p>
              <p>sit deploy job branch: {{ wfinfo.sit_deploy_job_branch }}</p>
              <p>sit entry tag project version: {{ wfinfo.sit_entry_tag_project_version }}</p>
              <p>sit tag project version: {{ wfinfo.sit_tag_project_version }}</p>
              <p>uat deploy job project version: {{ wfinfo.uat_deploy_job_project_version }}</p>
              <p>project leader: {{ wfinfo.project_leader }}</p>
              <p>project manager: {{ wfinfo.project_manager }}</p>
              <p>project owner: {{ wfinfo.project_owner }}</p>
              <p>project tester: {{ wfinfo.project_tester }}</p>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
      <el-collapse style="border: none">
        <el-collapse-item name="2">
          <span slot="title" class="collapse-title">Commnets</span>
          <div v-for="item in data" :key="item.id" :name="item.name" class="border">
            <p><font color="blue">{{ item.name }}</font>  added a comment - {{ date_change(item.add_time) }}</p>
            <p>{{ item.comments }}</p>
          </div>
        </el-collapse-item>
      </el-collapse>
      <!--
      <div>
        <el-button collapse="true" style="border: none;outline: 0;" @click="handlecommentsshow()">comments</el-button>
        <div v-for="item in data" v-show="showcomments" :key="item.id" :name="item.name" class="border">
          <p><font color="blue">{{ item.name }}</font>  added a comment - {{ date_change(item.add_time) }}</p>
          <p>{{ item.comments }}</p>
        </div>
      </div>
      -->
      <el-pagination
        :total="total"
        style="margin-top: 8px;"
        layout="total, prev, pager, next, sizes"
        @size-change="sizeChange"
        @current-change="pageChange"/>
      <p></p>
      <p>附件</p>
      <el-table v-loading="loading" ref="table" :data="attachment_info" size="small" border style="width: 100%;">
        <el-table-column prop="name" label="附件名称" width="200"/>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <download v-if="checkPermission(['admin','connection_all','connection_edit'])" :data="scope.row"/>
            <el-popover
              v-if="checkPermission(['admin','connection_all','connection_delete'])"
              :ref="scope.row.id"
              placement="top"
              width="180">
              <p>确定删除这个附件吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消</el-button>
                <el-button :loading="delLoading" type="primary" size="mini" @click="subDelete(scope.row.id)">确定</el-button>
              </div>
              <el-button slot="reference" type="danger" size="mini">删除</el-button>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-form ref="form" :model="form" size="small" label-width="100px">
      <el-form-item label="comments" prop="comments">
        <!--<el-input v-model="form.comments" style="width: 370px;" rows="4" type="textarea"/>-->
        <vue-mention v-model="form.comments" :config="config" :list="userlist" valname="val">
          <template slot="item" slot-scope="props">
            <b>{{ props.item.val }}</b>
          </template>
        </vue-mention>
      </el-form-item>
    </el-form>
    <el-upload
      :action="doUpload"
      :data="form"
      :on-error="uploadError"
      :on-success="uploadSuccess"
      :before-upload="beforeAvatarUpload"
      class="upload-file">
      <el-button size="small" type="primary"><em>上传附件</em></el-button>
    </el-upload>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doAgree">同意</el-button>
      <el-button :loading="loading" type="danger" @click="doReject">拒绝</el-button>
    </div>
  </el-dialog>
</template>

<script>
import checkPermission from '@/utils/permission'
import { edit } from '@/api/connection'
import { add } from '@/api/comments'
import { run, reject } from '@/api/jenkinsrun'
import { getUserList } from '@/api/user'
import { mention_mail } from '@/api/mention'
import { getData } from '@/api/data'
import VueMention from '@/components/VueMention/'
import download from './download'
import initData from '@/mixins/initData'
import { del } from '@/api/attachment'
export default {
  components: { VueMention, download },
  mixins: [initData],
  props: {
    attachment_info: {
      type: Array,
      default: null
    },
    wfinfo: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    isAgree: {
      type: Boolean,
      required: true
    },
    isShowfe: {
      type: Boolean,
      required: true
    },
    isShowbe: {
      type: Boolean,
      required: true
    },
    sup_this: {
      type: Object,
      default: null
    },
    service_types: {
      type: Array,
      default: null
    },
    submit_name: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      loading: false, dialog: false, delLoading: false, showcomments: true, logo: '', dialogVisible: false, step_num: '', isShowjob1: false, isShowjob2: false, isShowjob3: false, isShowjob4: false, isShowdetail: false,
      form: {
        apply_id: '',
        comments: ''
      },
      config: {
        placeholder: '',
        rows: 6
      },
      doUpload: 'http://192.168.30.62:8000/api/upload/',
      userlist: [],
      activeName: '1'
    }
  },
  created() {
    this.$nextTick(() => {
      this.init()
    })
  },
  mounted() {
    this.logo = require('../../../../assets/logo/logo1.png')
    getUserList().then(res => {
      this.user_data = []
      const _userdata = this.user_data
      res.forEach(function(data, index) {
        const new_data = {
          key: data.email,
          val: data.name
        }
        if (new_data.val.indexOf('管理员') === 0) {
          // null
        } else {
          _userdata.push(new_data)
        }
      })
      this.userlist = _userdata
    })
  },
  methods: {
    checkPermission,
    beforeInit() {
      this.url = 'api/comments/'
      const sort = 'id'
      const query = this.query
      const value = query.value
      this.params = { page: this.page, size: this.size, ordering: sort, search: this.wfinfo.id }
      if (value) { this.params['search'] = value }
      return true
    },
    handlecommentsshow() {
      this.showcomments = !this.showcomments
      console.log(this.showcomments)
    },
    handleShowdetail() {
      console.log(this.isShowfe)
      this.isShowdetail = !this.isShowdetail
    },
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
        this.step_num = 2
      } else if (this.wfinfo.apply_status === 'SIT ENTRY TAG job failed') {
        this.isShowjob2 = true
        this.step_num = 4
      } else if (this.wfinfo.apply_status === 'SIT TAG job failed') {
        this.isShowjob3 = true
        this.step_num = 6
      } else if (this.wfinfo.apply_status === 'UAT 部署 job failed') {
        this.isShowjob4 = true
        this.step_num = 8
      }
    },
    open() {
      // const workflow_img = require('../../../../assets/logo/logo1.png')
      // this.$alert('<strong>这是 <i>HTML</i> 片段</strong>', 'Mobility Asia  Workflow', {
      // this.$alert('<img src="../../../../assets/logo/logo1.png" style="height:50px;width:100%;" />', 'Mobility Asia  Workflow', {
      // this.$alert('<strong><img src=' + workflow_img + ' width=6px height=3px></strong>', 'MA Workflow', {
      this.$alert('<div style="width:100%;height:100%;"><div style="border:1px solid red;">123</div></div>', {
        customClass: 'msgBox',
        dangerouslyUseHTMLString: true
      })
    },
    handleClose(done) {
      console.log('close')
      // this.$confirm('确认关闭？')
      //    .then(_ => {
      //     done()
      //   })
      //   .catch(_ => {})
    },
    date_change(date_time) {
      var dateee = new Date(date_time).toJSON()
      var date = new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
      return date
    },
    reload() {
      const url = 'api/attachment_info/'
      const sort = 'id'
      const value = this.form.apply_id
      const params = { ordering: sort, search: value }
      getData(url, params).then(res => {
        this.$parent.attachment_info = res.results
      })
    },
    // 上传成功后的回调
    uploadSuccess(response, file, fileList) {
      this.reload()
      console.log('上传文件成功', response)
    },
    // 上传错误
    uploadError(response, file, fileList) {
      console.log('上传失败，请重试！')
    },
    // 上传前对文件的大小的判断
    beforeAvatarUpload(file) {
      /*
      const extension = file.name.split('.')[1] === 'xls'
      const extension2 = file.name.split('.')[1] === 'xlsx'
      const extension3 = file.name.split('.')[1] === 'doc'
      const extension4 = file.name.split('.')[1] === 'docx'
      const isLt2M = file.size / 1024 / 1024 < 10
      if (!extension && !extension2 && !extension3 && !extension4) {
        console.log('上传模板只能是 xls、xlsx、doc、docx 格式!')
      }
      if (!isLt2M) {
        console.log('上传模板大小不能超过 10MB!')
      }
      return extension || extension2 || extension3 || extension4 && isLt2M
      */
    },
    cancel() {
      this.resetForm()
    },
    download(name) {
      return 'http://192.168.30.62:8000/api/upload?name=' + name + '&apply_id=' + this.form.apply_id
    },
    doAgree() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.loading = true
          this.doAdd()
          this.agree()
        } else {
          return false
        }
      })
    },
    doReject() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.loading = true
          this.doAdd()
          this.reject()
        } else {
          return false
        }
      })
    },
    doAdd() {
      // 改为后端处理
      /*
      if (this.form.comments.indexOf('@') !== -1) {
        const str = this.form.comments.match(/@(\S*) /g)
        this.mention()
      }*/
      add(this.form).then(res => {
        this.resetForm()
        this.$message({
          showClose: true,
          type: 'success',
          message: '添加成功!',
          duration: 2500
        })
        this.loading = false
        // this.$parent.init()
      }).catch(err => {
        this.loading = false
        console.log(err)
      })
    },
    doEdit() {
      edit(this.form.id, this.form).then(res => {
        this.resetForm()
        this.$message({
          showClose: true,
          type: 'success',
          message: '已审批!',
          duration: 2500
        })
        this.loading = false
        this.sup_this.init()
      }).catch(err => {
        this.loading = false
        console.log(err)
      })
    },
    agree() {
      run(this.wfinfo).then(res => {
        this.$message({
          showClose: true,
          type: 'success',
          message: '已审批!',
          duration: 2500
        })
        this.loading = false
      }).catch(err => {
        this.loading = false
        console.log(err)
      })
      this.sup_this.init()
    },
    mention() {
      mention_mail(this.form.comments).then(res => {
        this.$message({
          showClose: true,
          type: 'success',
          duration: 2500
        })
        this.loading = false
      }).catch(err => {
        this.loading = false
        console.log(err)
      })
    },
    reject() {
      reject(this.data).then(res => {
        this.$message({
          showClose: true,
          type: 'success',
          message: '已拒绝!',
          duration: 2500
        })
        this.loading = false
      }).catch(err => {
        this.loading = false
        console.log(err)
      })
    },
    resetForm() {
      this.dialog = false
      this.$refs['form'].resetFields()
      this.form = { desc: '' }
    },
    subDelete(id) {
      this.delLoading = true
      del(id).then(res => {
        this.delLoading = false
        this.$refs[id].doClose()
        this.reload()
        this.$message({
          showClose: true,
          type: 'success',
          message: '删除成功!',
          duration: 2500
        })
      }).catch(err => {
        this.delLoading = false
        this.$refs[id].doClose()
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
  .border {
    border-bottom:1px solid Silver;
  }
  .collapse-title {
    flex: 1 0 90%;
    order: 1;
    font-weight: bold;
  }
  .el-collapse-item__header {
    flex: 1 0 auto;
    order: -1;
  }
  .msgBox {
    width: 600px;
    height: 600px;
  }
</style>
