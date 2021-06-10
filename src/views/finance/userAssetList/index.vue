<!--
  查看承兑汇总
-->
<template>
  <div class="addAcceInfo">
    <div class="content">
      <div class="tableColumn">
        <label for="" class="label">币种：</label>
        <el-select v-model="coin" clearable placeholder="请选择币种">
          <el-option v-for="(v, i) in coinList" :key="i" :label="v.label" :value="v.value"></el-option>
        </el-select>
        <el-button size="mini" type="primary" icon="el-icon-search" @click="onCheck">查询</el-button>
      </div>

      <!-- <div class="listBox">
        <div class="tableBox">
          <el-table :data="tableList" tooltip-effect="dark" style="width: 100%">
            <el-table-column prop="id" label="ID" min-width="100"></el-table-column>
            <el-table-column prop="userId" label="用户ID" min-width="140"></el-table-column>
            <el-table-column prop="userName" label="用户名" min-width="100"></el-table-column>
            <el-table-column prop="coin" label="币种" min-width="80"></el-table-column>
            <el-table-column prop="balanceAvailable" label="可用余额" min-width="100"></el-table-column>
            <el-table-column prop="balanceLocked" label="冻结资产" min-width="100" sortable></el-table-column>
            <el-table-column prop="rechargeFee" label="承兑手续费" min-width="120" sortable></el-table-column>
            <el-table-column prop="withdrawFee" label="提现手续费" min-width="120" sortable></el-table-column>
            <el-table-column
              prop="isVisible"
              label="是否可见"
              min-width="100"
              :formatter="visibleFormatter"
            ></el-table-column>
            <el-table-column prop="type" label="类型" min-width="80"></el-table-column>
            <el-table-column prop="createdAt" label="创建时间" min-width="160"></el-table-column>
            <el-table-column prop="updatedAt" label="修改时间" min-width="160"></el-table-column>
          </el-table>
        </div>
      </div> -->
      <div class="tableItem" v-for="(item, index) in collectList" :key="index">
        <label for="" class="label">{{ item.name }}：</label>
        <el-input v-model="infoData[item.type]" disabled></el-input>
      </div>
    </div>
  </div>
</template>

<script>
import { getInfoAssetList } from '@/api/finance'
import coinMixins from '@/mixins/getCoinList'
export default {
  name: '',
  data() {
    return {
      coin: '',
      // tableList: []
      infoData: {},
      collectList: [
        { name: 'ID', type: 'id' },
        { name: '用户ID', type: 'userId' },
        { name: '用户名', type: 'userName' },
        { name: '币种', type: 'coin' },
        { name: '可用余额', type: 'balanceAvailable' },
        { name: '冻结资产', type: 'balanceLocked' },
        { name: '承兑手续费', type: 'rechargeFee' },
        { name: '提现手续费', type: 'withdrawFee' },
        { name: '是否可见', type: 'isVisible' },
        { name: '类型', type: 'type' },
        { name: '创建时间', type: 'createdAt' },
        { name: '修改时间', type: 'updatedAt' }
      ]
    }
  },
  mixins: [coinMixins],
  computed: {},
  components: {},
  created() {},
  mounted() {},
  methods: {
    // visibleFormatter(row) {
    //   return row.isVisible === 1 ? '可见' : '不可见'
    // },
    onCheck() {
      if (this.coin === '') {
        this.$message({
          message: '请选择一种币种',
          type: 'warning'
        })
        return
      }
      const coinVal = this.coinList[this.coin].label
      const params = { coin: coinVal }
      getInfoAssetList(params).then(res => {
        console.log('res', res)
        const { data } = res
        if (!data) {
          this.infoData = {}
          return
        }
        this.infoData = data.map(item => {
          if (item.isVisible === 1) {
            item.isVisible = '可见'
          } else {
            item.isVisible = '不可见'
          }
          return item
        })[0]
        console.log('infoData', this.infoData)
      })
    }
  }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
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
