<!--
  修改密码
-->
<template>
  <div class="addAcceInfo">
    <el-dialog
      title="修改密码"
      width="600px"
      center
      top="0"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :visible.sync="dialogVisiable"
      @closed="handleClosed"
    >
      <div class="content">
        <el-form
          :model="infoData"
          :rules="rules"
          ref="formRef"
          label-width="120px"
          class="demo-ruleForm"
        >
          <el-form-item label="旧密码" prop="oldPwd">
            <el-input v-model="infoData.oldPwd" type="password" maxlength="100" placeholder="请输入旧密码"></el-input>
          </el-form-item>

          <el-form-item label="新密码" prop="newPwd">
            <el-input v-model="infoData.newPwd" type="password" maxlength="100" placeholder="请输入新密码"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button @click.stop="dialogVisiable = false">取 消</el-button>
            <el-button type="primary" @click="onComfirm">确认</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { updateAccountInfo } from '@/api/content'
import { Base64 } from 'js-base64'
export default {
  name: '',
  data() {
    return {
      rules: {
        oldPwd: [{ required: true, message: '请输入旧密码', trigger: 'blur' }],
        newPwd: [{ required: true, message: '请输入新密码', trigger: 'blur' }]
      }
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    infoData: {
      type: Object,
      default() {
        return {}
      }
    },
    OldPassword: {
      type: String,
      default: ''
    }
  },
  computed: {
    dialogVisiable: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      }
    }
  },
  components: {},
  created() {},
  mounted() {},
  methods: {
    handleClosed() {
      this.dialogVisiable = false
      this.$refs.formRef.clearValidate()
    },
    // 确认提交
    onComfirm() {
      // console.log(this.infoData)
      this.validateFunc(() => {
        const { oldPwd, newPwd } = this.infoData
        const params = { oldPwd: Base64.encode(oldPwd), newPwd: Base64.encode(newPwd) }
        console.log('-params-', params)
        updateAccountInfo(params)
          .then(res => {
            this.$message({
              message: '操作成功!',
              type: 'success'
            })
            this.dialogVisiable = false
            this.$store.dispatch('user/logout')
            this.$router.push(`/login?redirect=${this.$route.fullPath}`)
            localStorage.clear()
          })
          .catch(err => {
            console.log(err)
          })
      })
    },
    validateFunc(callback) {
      this.$refs.formRef.validate(valid => {
        if (!valid) {
          return false
        }
        callback()
      })
    }
  }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
/deep/ .el-dialog {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
/deep/ .el-input {
  width: 200px;
}

/deep/ .el-input.is-disabled .el-input__inner {
  color: #606266;
}
.el-textarea {
  width: 360px;
}
.no-list-box {
  line-height: 32px;
  color: red;
  padding-bottom: 12px;
}

.tipsWrap {
  display: inline-block;
  margin-left: 10px;
}

.icon {
  width: 18px;
  vertical-align: middle;
  cursor: pointer;
  color: #e6a23c;
  font-size: 18px;
}
</style>
