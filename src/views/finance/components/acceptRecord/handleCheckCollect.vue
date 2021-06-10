<!--
  查看承兑汇总
-->
<template>
  <div class="addAcceInfo">
    <el-dialog
      title="承兑汇总信息"
      width="600px"
      center
      top="0"
      :close-on-click-modal="true"
      :close-on-press-escape="false"
      :visible.sync="dialogVisiable"
      @closed="handleClosed"
    >
      <div class="content">
        <div class="tableColumn">
          <label for="" class="label">币种：</label>
          <el-select v-model="coin" clearable placeholder="请选择币种">
            <el-option v-for="(v, i) in coinList" :key="i" :label="v.label" :value="v.value"></el-option>
          </el-select>
          <el-button size="mini" type="primary" @click="onCheck">查询</el-button>
        </div>

        <div class="tableItem" v-for="(item, index) in collectList" :key="index">
          <label for="" class="label">{{ item.name }}：</label>
          <el-input v-model="infoData[item.type]" disabled></el-input>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getRecordTotal } from '@/api/finance'
export default {
  name: '',
  data() {
    return {
      coin: '',
      infoData: {},
      collectList: [
        { name: '承兑商ID', type: 'providerId' },
        { name: '承兑商名称', type: 'providerName' },
        { name: '币种', type: 'coin' },
        { name: '手续费', type: 'fee' },
        { name: '交易价格', type: 'price' }
      ]
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
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
  created() {},
  mounted() {},
  methods: {
    initInfoData() {
      this.infoData = {}
      this.coin = ''
    },
    handleClosed() {
      this.initInfoData()
    },
    onCheck() {
      if (this.coin === '') {
        this.msgTipsFunc({ message: '请选择一种货币', type: 'warning' })
        return
      }
      const coinVal = this.coin ? this.coinList[this.coin].label : ''
      const params = { coin: coinVal }
      getRecordTotal(params).then(res => {
        console.log('res', res)
        const { data } = res
        if (!data) {
          this.msgTipsFunc({ message: '该币种没有数据', type: 'warning' })
          this.infoData = {}
          return
        }
        this.infoData = data
      })
    },
    // 公共的提示信息 type = success/info/warning/danger;默认为success
    msgTipsFunc({ message, type = 'success', duration = 1500 }, callback) {
      callback = callback || (() => {})
      this.$message({
        message,
        type,
        duration,
        onClose: callback
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
/deep/ .el-select .el-select--medium {
  width: 160px;
}
.tableColumn,
.tableItem {
  margin-bottom: 20px;
}
.label {
  display: inline-block;
  width: 120px;
  text-align: right;
}
</style>
