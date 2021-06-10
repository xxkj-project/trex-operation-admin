<!--订单列表-->
<template>
  <div class="taily">
    <searchForm :formOptions="formOptions" @onSearch="handleSearch"> </searchForm>

    <div class="listWrap">
      <div class="tableBox">
        <el-table :data="tableList" tooltip-effect="dark" style="width: 100%">
          <el-table-column prop="id" label="ID" min-width="100"></el-table-column>

          <el-table-column prop="providerId" label="承兑商ID" min-width="100"></el-table-column>

          <el-table-column prop="providerName" label="承兑商名称" min-width="110"></el-table-column>

          <el-table-column prop="orderUid" label="下单用户ID" min-width="100"></el-table-column>

          <el-table-column prop="orderUserName" label="下单用户名称" min-width="110"></el-table-column>

          <el-table-column prop="coin" label="货币" min-width="80"></el-table-column>

          <el-table-column
            prop="exchangeType"
            label="交易类型"
            min-width="100"
            :formatter="typeFormatter"
          ></el-table-column>

          <el-table-column prop="address" label="线下交易地址" min-width="110"></el-table-column>

          <el-table-column prop="fee" label="手续费" min-width="80"></el-table-column>

          <el-table-column prop="price" label="金额" min-width="100"></el-table-column>

          <el-table-column prop="orderType" label="订单类型" min-width="100"></el-table-column>

          <el-table-column prop="status" label="订单状态" min-width="100"></el-table-column>

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
  </div>
</template>

<script>
import searchForm from '@/components/searchForm' // 搜索
import pagination from '@/components/pagination' // 页数
import miXinsData from '@/mixins/getCoinList' // 币种
import tools from '@/utils/tools' // 工具函数
import { getIncomeList } from '@/api/finance' // API接口
import { imgHeadUrl } from '@/utils/globalConst' // 图片的访问域名
export default {
  name: '',
  data() {
    return {
      searchData: {
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
      previewList: [] // 图片预览
    }
  },
  mixins: [miXinsData],
  components: { searchForm, pagination },
  computed: {
    formOptions() {
      let options = [
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
    typeFormatter(row) {
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
    // 获取数据
    getData() {
      const params = { pageNum: this.pagination.currentPage, pageSize: this.pagination.pageSize, ...this.searchData }
      getIncomeList(params).then(res => {
        // console.log('res', res)
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
</style>
