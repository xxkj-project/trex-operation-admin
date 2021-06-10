<!--
  提现
-->
<template>
  <div class="addAcceInfo">
    <el-dialog
      title="提现信息"
      width="600px"
      center
      top="0"
      :close-on-click-modal="true"
      :close-on-press-escape="false"
      :visible.sync="dialogVisiable"
      @closed="handleClosed"
    >
      <div class="content">
        <el-form :model="infoData" :rules="rules" ref="formRef" label-width="120px" class="demo-ruleForm">
          <el-form-item label="承兑商ID" prop="coin">
            <el-select v-model="infoData.coin" placeholder="请选择提现币种" clearable>
              <el-option v-for="(v, i) in coinList" :key="i" :label="v.label" :value="v.value"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="金额" prop="price">
            <el-input v-model="infoData.price" type="number" maxlength="100" clearable></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit('ruleForm')">确认</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { operaWithdraw } from '@/api/finance'
export default {
  name: '',
  data() {
    return {
      rules: {
        coin: [{ required: true, message: '请选择一种币种', trigger: 'change' }],
        price: [{ required: true, message: '请输入提现金额', trigger: 'blur' }]
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
    coinList: {
      type: Array,
      default() {
        return []
      }
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
  created() {
    console.log(this.infoData)
  },
  mounted() {},
  methods: {
    handleClosed() {
      this.$refs.formRef.resetFields()
    },
    onSubmit() {
      this.validateFunc(() => {
        console.log(this.infoData)
        const { price, coin } = this.infoData
        const currCoin = coin ? this.coinList[coin].label : ''
        const params = { coin: currCoin, price }
        operaWithdraw(params).then(res => {
          console.log(res)
          this.$message({
            message: '操作成功',
            type: 'success'
          })
          this.$emit('withdrawSuccess')
          this.dialogVisiable = false
        })
      })
    },
    validateFunc(callback) {
      this.$refs.formRef.validate(valid => {
        if (valid) {
          callback()
          return
        }
        return false
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
</style>
