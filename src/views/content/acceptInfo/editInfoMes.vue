<!--
  编辑承兑商基本信息
-->
<template>
  <div class="addAcceInfo">
    <div class="content">
      <el-form :model="infoData" :rules="rules" ref="formRef" label-width="130px" class="demo-ruleForm">
        <el-form-item label="承兑商名称" prop="providerName">
          <el-input v-model="infoData.providerName" maxlength="100" placeholder="请输入承兑商名称" clearable></el-input>
        </el-form-item>

        <el-form-item label="头像" prop="pic">
          <imgUpload ref="imgUploadRef" v-model="infoData.pic" :limit="1" @success="handleImgUploadSuccess" />
        </el-form-item>

        <el-form-item label="国家" prop="country">
          <el-input v-model="infoData.country" maxlength="100" placeholder="请输入国家" clearable></el-input>
        </el-form-item>

        <el-form-item label="地址" prop="address">
          <el-input v-model="infoData.address" maxlength="100" placeholder="请输入地址" clearable></el-input>
        </el-form-item>

        <el-form-item label="城市" prop="city">
          <el-input v-model="infoData.city" maxlength="100" placeholder="请输入城市" clearable></el-input>
        </el-form-item>

        <el-form-item label="简介" prop="introduce" size="small">
          <el-input
            v-model="infoData.introduce"
            type="textarea"
            :rows="4"
            placeholder="请输入个人简介"
            maxlength="100"
            show-word-limit
            clearable
          ></el-input>
        </el-form-item>

        <el-form-item label="是否禁止承兑状态" prop="banRecharge">
          <el-switch v-model="infoData.banRecharge"></el-switch>
        </el-form-item>

        <el-form-item label="是否禁止提现状态" prop="banWithdraw">
          <el-switch v-model="infoData.banWithdraw"></el-switch>
        </el-form-item>

        <el-form-item label="是否上下线" prop="status">
          <el-switch v-model="infoData.status"></el-switch>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onComfirm">确认</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import imgUpload from '@/components/imgUpload'
import { updateAccountInfo } from '@/api/content'
import storage from '@/utils/storage'
export default {
  name: '',
  data() {
    return {
      infoData: {},
      rules: {
        providerName: [{ required: true, message: '请输入承兑商名称！', trigger: 'blur' }],

        pic: [{ required: true, message: '请上传头像！', trigger: 'change' }],

        address: [{ required: true, message: '请输入详细地址', trigger: 'blur' }],

        city: [{ required: true, message: '请输入所在城市', trigger: 'blur' }],

        country: [{ required: true, message: '请输入国家', trigger: 'blur' }],

        introduce: [{ required: true, message: '请输入承兑简介', trigger: 'blur' }]
      }
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
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
  components: { imgUpload },
  created() {
    const { pic, userId, key, ...other } = storage.getItem('account_userInfo')
    this.infoData = { pic: [pic], ...other }
  },
  mounted() {},
  methods: {
    handleImgUploadSuccess() {
      this.$refs.formRef.clearValidate('headImg')
    },
    // 确认提交
    onComfirm() {
      console.log('-infoData-', this.infoData)
      const { pic, id, ...other } = this.infoData
      // 头像
      const headimg = pic.join(',')
      const params = { pic: headimg, ...other }
      // console.log('params', params)
      this.validateFunc(() => {
        updateAccountInfo(params).then(res => {
          this.$message({
            message: '操作成功!',
            type: 'success'
          })
          this.$store.commit('user/SET_USERINFO', this.infoData)
          this.$router.push({ name: 'AcceptInfo' })
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

/deep/ .el-input.is-disabled .el-input__inner {
  color: #606266;
}
/deep/ .el-input {
  width: 200px;
}
/deep/.el-textarea {
  position: relative;
  width: 360px;
}
/deep/ .el-input__count {
  position: absolute;
}
.content {
  padding-top: 25px;
  /deep/ .el-input.is-disabled .el-input__inner {
    color: #606266;
  }
  /deep/ .el-input {
    width: 200px;
  }
  /deep/ .el-textarea__inner {
    width: 360px;
  }
}
</style>
