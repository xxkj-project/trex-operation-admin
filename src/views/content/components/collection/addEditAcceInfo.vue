<!--
  添加承兑
-->
<template>
  <div class="addAcceInfo">
    <el-dialog
      :title="(type == 'add' ? '添加' : '编辑') + '承兑商信息'"
      width="600px"
      center
      top="0"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :visible.sync="dialogVisiable"
      @closed="handleClosed"
    >
      <div class="content">
        <el-form :model="infoData" :rules="rules" ref="formRef" label-width="120px" class="demo-ruleForm">
          <!-- <el-form-item label="ID" prop="id" v-show="type !== 'add'">
            <el-input v-model="infoData.id" maxlength="100" placeholder="请输入银行名称"></el-input>
          </el-form-item> -->

          <el-form-item label="银行名称" prop="bankName">
            <el-input v-model="infoData.bankName" maxlength="100" placeholder="请输入银行名称"></el-input>
          </el-form-item>

          <el-form-item label="银行卡号" prop="bankNo">
            <el-input v-model="infoData.bankNo" maxlength="100" placeholder="请输入银行卡号"></el-input>
          </el-form-item>

          <el-form-item label="持卡人姓名" prop="cardUsername">
            <el-input v-model="infoData.cardUsername" maxlength="100" placeholder="请输入持卡人姓名"></el-input>
          </el-form-item>

          <el-form-item label="币种" prop="coin" v-if="type === 'add'">
            <el-input v-model="infoData.coin" maxlength="100" placeholder="请输入币种"></el-input>
          </el-form-item>

          <!-- <el-form-item label="币种" prop="currencyArr">
            <el-select v-model="infoData.currency" placeholder="请选择">
              <el-option v-for="item in infoData.currencyArr" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item> -->

          <el-form-item label="承兑手续费" prop="rechargeFee">
            <el-input v-model="infoData.rechargeFee" maxlength="100" placeholder="请输入承兑手续费"></el-input>
          </el-form-item>

          <el-form-item label="承兑上限" prop="rechargeMax">
            <el-input v-model="infoData.rechargeMax" maxlength="100" placeholder="请输入承兑上限"></el-input>
          </el-form-item>

          <el-form-item label="承兑下限" prop="rechargeMin">
            <el-input v-model="infoData.rechargeMin" maxlength="100" placeholder="请输入承兑下限"></el-input>
          </el-form-item>

          <el-form-item label="提现手续费" prop="withdrawFee">
            <el-input v-model="infoData.withdrawFee" maxlength="100" placeholder="请输入提现手续费"></el-input>
          </el-form-item>

          <el-form-item label="提现上限" prop="withdrawMax">
            <el-input v-model="infoData.withdrawMax" maxlength="100" placeholder="请输入提现上限"></el-input>
          </el-form-item>

          <el-form-item label="提现下限" prop="withdrawMin">
            <el-input v-model="infoData.withdrawMin" maxlength="100" placeholder="请输入提现下限"></el-input>
          </el-form-item>

          <el-form-item label="是否上下线" prop="status">
            <el-switch v-model="infoData.status"></el-switch>
          </el-form-item>
          <!-- <el-form-item label="头像" prop="headImg">
            <imgUpload ref="imgUploadRef" v-model="infoData.headImg" :limit="1" @success="handleImgUploadSuccess" />
          </el-form-item> -->

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
// import imgUpload from '@/components/imgUpload'
import { addAccount, updateAccount } from '@/api/content'
export default {
  name: '',
  data() {
    return {
      rules: {
        id: [{ required: true, message: '请输入ID', trigger: 'blur' }],
        bankName: [{ required: true, message: '请输入银行名称', trigger: 'blur' }],
        bankNo: [{ required: true, message: '请输入银行卡号', trigger: 'blur' }],
        cardUsername: [{ required: true, message: '请输入持卡人姓名', trigger: 'blur' }],
        coin: [{ required: true, message: '请输入币种户', trigger: 'blur' }],
        rechargeFee: [{ required: true, message: '请输入承兑手续费', trigger: 'blur' }],
        rechargeMax: [{ required: true, message: '请输入承兑上限', trigger: 'blur' }],
        rechargeMin: [{ required: true, message: '请输入承兑下限', trigger: 'blur' }],
        withdrawFee: [{ required: true, message: '请输入提现手续费', trigger: 'blur' }],
        withdrawMax: [{ required: true, message: '请输入提现下限', trigger: 'blur' }],
        withdrawMin: [{ required: true, message: '请输入提现下限', trigger: 'blur' }]
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
    type: {
      type: String,
      default: 'add'
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
      console.log(this.infoData)
      // console.log('-video-url-', this.currVideoUrl)
      this.validateFunc(() => {
        const params = { ...this.infoData }
        this.type === 'add' ? this.addRequest(params) : this.editRequest(params)
      })
    },
    addRequest(params) {
      addAccount(params).then(res => {
        this.$message({
          message: '操作成功!',
          type: 'success'
        })
        this.dialogVisiable = false
        this.$emit('success')
      })
    },
    editRequest(params) {
      updateAccount(params).then(res => {
        this.$message({
          message: '操作成功!',
          type: 'success'
        })
        this.dialogVisiable = false
        this.$emit('success')
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
