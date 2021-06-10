<!--承兑商收款信息-->
<template>
  <div class="userList">
    <el-button slot="button" size="mini" type="primary" class="btn-search" @click="onAddAcce" icon="el-icon-plus"
      >添加承兑</el-button
    >

    <div class="listWrap">
      <div class="tableBox">
        <el-table :data="tableList" tooltip-effect="dark" style="width: 100%">
          <el-table-column prop="providerId" label="承兑ID" min-width="100"></el-table-column>
          <el-table-column prop="id" label="ID" min-width="100"></el-table-column>
          <el-table-column prop="bankName" label="银行名称" min-width="120"></el-table-column>
          <el-table-column prop="bankNo" label="银行卡号" min-width="180"></el-table-column>
          <el-table-column prop="cardUsername" label="持卡人姓名" min-width="120"></el-table-column>
          <el-table-column prop="coin" label="币种" min-width="100"></el-table-column>
          <el-table-column
            prop="rechargeFee"
            label="承兑手续费"
            min-width="120"
            :formatter="reChaFormatter"
          ></el-table-column>
          <el-table-column prop="rechargeMax" label="承兑上限" min-width="120"></el-table-column>
          <el-table-column prop="rechargeMin" label="承兑下限" min-width="120"></el-table-column>
          <el-table-column
            prop="withdrawFee"
            label="提现手续费"
            min-width="120"
            :formatter="withFormatter"
          ></el-table-column>
          <el-table-column prop="withdrawMax" label="提现上限" min-width="120"></el-table-column>
          <el-table-column prop="withdrawMin" label="提现下限" min-width="120"></el-table-column>
          <el-table-column
            prop="status"
            label="上下线状态"
            min-width="100"
            :formatter="statusFormatter"
          ></el-table-column>
          <el-table-column prop="createTime" label="时间" min-width="160"></el-table-column>
          <el-table-column label="操作" fixed="right" min-width="100">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" icon="el-icon-edit" @click="onEditInfo(scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <pagination
        :currentPage.sync="pagination.currentPage"
        :pageSize.sync="pagination.pageSize"
        :total="pagination.total"
        @currentChange="currentChange"
        @sizeChange="sizeChange"
      />
    </div>
  </div>
</template>

<script>
import pagination from '@/components/pagination'
import { getAccountList } from '@/api/content'
import storage from '@/utils/storage'
import coinMixins from '@/mixins/getCoinList'
export default {
  name: '',
  data() {
    return {
      pagination: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      tableList: [],
      infoData: {}
    }
  },
  mixins: [coinMixins],
  components: { pagination },
  computed: {},
  created() {
    this.getData()
  },
  mounted() {},
  methods: {
    statusFormatter(row) {
      return row.status ? '上线' : '下线'
    },
    reChaFormatter(row) {
      return row.rechargeFee === null || '' ? '/' : row.rechargeFee
    },
    withFormatter(row) {
      return row.withdrawFee === null || '' ? '/' : row.withdrawFee
    },
    getInitData(pageNum = 1, pageSize = 10) {
      this.pagination.currentPage = pageNum
      this.pagination.pageSize = pageSize
      this.getData()
    },
    currentChange(pageNo) {
      this.getInitData(pageNo, this.pagination.pageSize)
    },
    sizeChange(pageSize) {
      this.getInitData(1, pageSize)
    },
    // 添加
    onAddAcce() {
      this.infoData = {
        bankName: '', // 银行名称
        bankNo: '', // 银行卡号
        cardUsername: '', // 持卡人姓名
        coin: '', // 币种
        rechargeMax: '', // 承兑上限
        rechargeMin: '', // 承兑下限
        withdrawMax: '', // 提现上限
        withdrawMin: '', // 提现下限
        status: false // 上下线状态
      }

      if (this.tableList.length === 6) {
        this.$message({
          message: '已没有可添加数据',
          type: 'warning'
        })
        return
      }

      const arr = []
      this.tableList.map(val => {
        arr.push(val.coin)
      })
      const coinArr = this.coinList.slice(1)
      const filterArr = coinArr.filter(item => !arr.includes(item.label))

      this.$router.push({ name: 'AddEditCollection', query: { type: 'add' } })
      storage.setItem('add_accept_coin_list', JSON.stringify(filterArr))
      storage.setItem('accept_collection_info', this.infoData)
    },
    // 编辑
    onEditInfo(row) {
      // console.log('-edit-', row)
      const { coin, providerId, createTime, rechargeFee, withdrawFee, ...orther } = row
      this.infoData = { ...orther }
      this.$router.push({ name: 'AddEditCollection', query: { type: 'edit' } })
      storage.setItem('accept_collection_info', this.infoData)
    },
    getData() {
      getAccountList().then(res => {
        console.log(res.data)
        const { data } = res.data
        this.tableList = data
        this.pagination.total = data.length
      })
    }
  }
}
</script>

<style lang="less" scoped>
//@import url(); 引入公共css类
.headImg {
  display: block;
  width: 80px;
  height: 80px;
}
</style>
