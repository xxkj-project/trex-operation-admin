<!--
  添加承兑
-->
<template>
  <div class="content">
    <el-form :model="infoData" :rules="rules" ref="formRef" label-width="120px" class="demo-ruleForm">
      <el-form-item label="ID" prop="id" v-if="type !== 'add'">
        <el-input v-model="infoData.id" maxlength="100" disabled></el-input>
      </el-form-item>

      <el-form-item label="银行名称" prop="bankName">
        <el-input v-model="infoData.bankName" maxlength="100" placeholder="请输入银行名称"></el-input>
      </el-form-item>

      <el-form-item label="银行卡号" prop="bankNo">
        <el-input v-model="infoData.bankNo" maxlength="100" type="number" placeholder="请输入银行卡号"></el-input>
      </el-form-item>

      <el-form-item label="持卡人姓名" prop="cardUsername">
        <el-input v-model="infoData.cardUsername" maxlength="100" placeholder="请输入持卡人姓名"></el-input>
      </el-form-item>

      <el-form-item label="币种" prop="coin" v-if="type === 'add'">
        <el-select v-model="infoData.coin" clearable placeholder="请选择币种">
          <el-option v-for="(v, i) in coinList" :key="i" :label="v.label" :value="v.value"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="承兑上限" prop="rechargeMax">
        <el-input v-model="infoData.rechargeMax" type="number" maxlength="100" placeholder="请输入承兑上限"></el-input>
      </el-form-item>

      <el-form-item label="承兑下限" prop="rechargeMin">
        <el-input v-model="infoData.rechargeMin" type="number" maxlength="100" placeholder="请输入承兑下限"></el-input>
      </el-form-item>

      <el-form-item label="提现上限" prop="withdrawMax">
        <el-input v-model="infoData.withdrawMax" type="number" maxlength="100" placeholder="请输入提现上限"></el-input>
      </el-form-item>

      <el-form-item label="提现下限" prop="withdrawMin">
        <el-input v-model="infoData.withdrawMin" type="number" maxlength="100" placeholder="请输入提现下限"></el-input>
      </el-form-item>

      <el-form-item label="是否上下线" prop="status">
        <el-switch v-model="infoData.status"></el-switch>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onComfirm">确认</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addAccount, updateAccount } from '@/api/content'
import storage from '@/utils/storage'
export default {
  name: '',
  data() {
    return {
      rules: {
        bankName: [{ required: true, message: '请输入银行名称', trigger: 'blur' }],
        bankNo: [{ required: true, message: '请输入银行卡号', trigger: 'blur' }],
        cardUsername: [{ required: true, message: '请输入持卡人姓名', trigger: 'blur' }],
        coin: [{ required: true, message: '请输入币种户', trigger: 'blur' }],
        rechargeMax: [{ required: true, message: '请输入承兑上限', trigger: 'blur' }],
        rechargeMin: [{ required: true, message: '请输入承兑下限', trigger: 'blur' }],
        withdrawMax: [{ required: true, message: '请输入提现下限', trigger: 'blur' }],
        withdrawMin: [{ required: true, message: '请输入提现下限', trigger: 'blur' }]
      },
      type: '',
      infoData: {},
      coinList: []
    }
  },
  computed: {},
  components: {},
  created() {
    this.infoData = {}
    this.infoData = storage.getItem('accept_collection_info')
    this.type = this.$route.query.type
    this.coinList = storage.getItem('add_accept_coin_list')
  },
  mounted() {},
  methods: {
    // 确认提交
    onComfirm() {
      console.log('-infoData-', this.infoData)
      this.validateFunc(() => {
        this.type === 'add' ? this.addRequest() : this.editRequest()
      })
    },
    addRequest() {
      const { coin, ...other } = this.infoData
      console.log(this.coinList)
      const currCoin = this.coinList.filter(item => {
        return item.value === coin
      })[0].label
      const params = { coin: currCoin, ...other }
      console.log('-params-', params)
      addAccount(params).then(res => {
        this.$message({
          message: '操作成功!',
          type: 'success'
        })
        this.$router.push({ name: 'Collection' })
      })
    },
    editRequest() {
      const params = { ...this.infoData }
      updateAccount(params).then(res => {
        this.$message({
          message: '操作成功!',
          type: 'success'
        })
        this.$router.push({ name: 'Collection' })
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
