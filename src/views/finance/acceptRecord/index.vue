<!--承兑记录-->
<template>
  <div class="acceptList">
    <searchForm :formOptions="formOptions" @onSearch="handleSearch">
      <el-button slot="button" icon="el-icon-collection" size="mini" type="primary" @click="onCollect">汇总</el-button>
      <el-button slot="button" icon="el-icon-search" size="mini" type="primary" @click="onCheckAsset"
        >资产查询</el-button
      >
    </searchForm>

    <div class="listWrap">
      <div class="tableBox">
        <el-table :data="tableList" tooltip-effect="dark" style="width: 100%">
          <el-table-column prop="providerId" label="承兑商ID" min-width="100"></el-table-column>

          <el-table-column prop="providerName" label="承兑商名称" min-width="110"></el-table-column>

          <el-table-column prop="orderUid" label="下单用户ID" min-width="100"></el-table-column>

          <el-table-column prop="orderUserName" label="下单用户名称" min-width="110"></el-table-column>

          <el-table-column prop="coin" label="货币" min-width="80"></el-table-column>

          <el-table-column
            prop="exchangeType"
            label="交易类型"
            min-width="100"
            :formatter="typrFormatter"
          ></el-table-column>

          <el-table-column prop="address" label="线下交易地址" min-width="110"></el-table-column>

          <el-table-column prop="fee" label="手续费" min-width="80"></el-table-column>

          <el-table-column prop="orderType" label="订单类型" min-width="100"></el-table-column>

          <el-table-column prop="uploadRecord" label="打款记录" min-width="100">
            <template slot-scope="scope">
              <div v-if="!scope.row.uploadRecord">无上传</div>
              <el-image
                v-else
                style="width: 80px; height: 80px"
                :src="scope.row.uploadRecord"
                :preview-src-list="previewList"
                @click="onPreview(scope.row.uploadRecord)"
              >
              </el-image>
            </template>
          </el-table-column>

          <el-table-column prop="price" label="金额" min-width="100"></el-table-column>

          <el-table-column prop="status" label="订单状态" min-width="100"></el-table-column>

          <el-table-column prop="createTime" label="创建时间" min-width="160"></el-table-column>

          <el-table-column prop="updateTime" label="修改时间" min-width="160"></el-table-column>
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
    <checkCollect :visible.sync="isCheck" :coinList="coinList" />
  </div>
</template>

<script>
import searchForm from '@/components/searchForm'
import pagination from '@/components/pagination'
import coinMixins from '@/mixins/getCoinList'
import { getAcceptRecordList } from '@/api/finance'
import checkCollect from '@/views/finance/components/acceptRecord/handleCheckCollect'
import { imgHeadUrl } from '@/utils/globalConst'
import tools from '@/utils/tools'
export default {
  name: '',
  data() {
    return {
      isCheck: false,
      searchData: {
        user: '',
        coin: '',
        startDate: '',
        endDate: ''
      },
      pagination: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      tableList: [],
      previewList: []
    }
  },
  mixins: [coinMixins],
  components: { searchForm, pagination, checkCollect },
  computed: {
    formOptions() {
      let options = [
        {
          element: 'el-input',
          label: '下单用户名/下单用户ID',
          prop: 'user',
          initValue: '',
          placeholder: '请输入下单用户名/下单用户ID'
        },
        {
          element: 'el-select',
          label: '币种',
          prop: 'coin',
          initValue: '',
          placeholder: '请选择',
          options: this.coinList
        },
        {
          element: 'el-date-picker',
          label: '时间',
          prop: 'times',
          initValue: '',
          type: 'daterange'
        }
      ]
      return options
    }
  },
  created() {
    this.getData()
  },
  mounted() {},
  methods: {
    // 图片预览
    onPreview(url) {
      this.previewList = [url]
    },
    typrFormatter(row) {
      return row.exchangeType === 'lineup' ? '线上' : '线下'
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
    // 搜索
    handleSearch(data) {
      // console.log('-search-', data)
      const { times, coin, ...otherObj } = data
      this.searchData = { ...otherObj }
      this.searchData.coin = coin ? this.coinList[coin].label : ''
      this.searchData.startDate = times ? times[0].split(' ')[0] : ''
      this.searchData.endDate = times ? times[1].split(' ')[0] : ''
      this.getInitData()
    },
    // 汇总
    onCollect(row) {
      this.isCheck = true
    },
    // 用户资产查询
    onCheckAsset() {
      this.$router.push({ name: 'userAssetList' })
    },
    getData() {
      const params = { pageNum: this.pagination.currentPage, pageSize: this.pagination.pageSize, ...this.searchData }
      // 获取数据
      getAcceptRecordList(params).then(res => {
        console.log('res', res)
        const { count, list } = res.data
        this.pagination.total = count
        this.tableList = list.map(item => {
          if (item.uploadRecord) {
            const imgUrl = tools.domainFilter(item.uploadRecord)
            item.uploadRecord = `${imgHeadUrl}/${imgUrl}`
          }
          return item
        })
      })
    }
  }
}
</script>
<style lang="less" scoped>
//@importurl();引入公共css类
.img {
  width: 80px;
  height: 80px;
}
</style>
