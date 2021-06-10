<!--订单列表-->
<template>
  <div class="taily">
    <searchForm :formOptions="formOptions" @onSearch="handleSearch"> </searchForm>
    <el-button size="mini" type="primary" @click="onWithdraw">提现</el-button>

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

          <el-table-column label="操作" fixed="right" min-width="360">
            <template slot-scope="scope">
              <div class="btnBox">
                <div style="margin-bottom: 20px;">
                  <el-button
                    size="mini"
                    type="text"
                    icon="el-icon-edit"
                    @click="onEditAddress(scope.row)"
                    :disabled="scope.row.status !== 'WaitConfirmAdr' && scope.row.userConfirmState"
                    >添加修改地址</el-button
                  >
                  <el-button
                    size="mini"
                    type="text"
                    :icon="item.icon"
                    @click="onTakeNoBtn(scope.row, item)"
                    :disabled="scope.row.status !== 'item.disabledType'"
                    v-for="(item, index) in takeNoBtnList"
                    :key="index"
                    >{{ item.name }}</el-button
                  >
                  <el-button
                    size="mini"
                    type="text"
                    icon="el-icon-s-home"
                    @click="onConfirmRess(scope.row)"
                    v-if="scope.row.exchangeType === 'linedown'"
                    :disabled="scope.row.status !== 'WaitConfirmAdr'"
                    >确认地址</el-button
                  >
                </div>
                <div>
                  <el-button
                    size="mini"
                    type="text"
                    :icon="item.icon"
                    @click="onOtherBtn(scope.row, item)"
                    :disabled="scope.row.status !== 'item.disabledType'"
                    v-for="(item, index) in otherBtnList"
                    :key="index"
                    >{{ item.name }}</el-button
                  >
                  <!-- <el-button
                    size="mini"
                    type="text"
                    icon="el-icon-upload"
                    @click="onUpload(scope.row)"
                    :disabled="scope.row.status !== 'WaitUpload'"
                    >上传流水</el-button
                  >
                  <el-button
                    size="mini"
                    type="text"
                    icon="el-icon-coin"
                    @click="onMakeLoan(scope.row)"
                    :disabled="scope.row.status !== 'WaitRelease'"
                    >放款</el-button
                  > -->
                </div>
              </div>
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
    <editAddress :visible.sync="isAddress" :formData="infoData" @success="handleSuccessEditAddress" />
    <uploadRecord :visible.sync="isUploadRecord" :formData="infoData" @successUpload="uploadSuccessRecord" />
    <withDraw :visible.sync="isWithdraw" :infoData="infoData" :coinList="coinArr" @withdrawSuccess="withdrawSuccess" />
  </div>
</template>

<script>
import searchForm from '@/components/searchForm' // 搜索
import pagination from '@/components/pagination' // 页数
import miXinsData from '@/mixins/getCoinList' // 币种
import tools from '@/utils/tools' // 工具函数
import {
  getOrderList, // 所有订单列表
  disposeOrder, // 处理订单 接受or拒绝
  confirmTransfer, // 确认转账
  operaMakeLoans, // 放款
  getOrderStatus, // 订单状态列表
  coinfirmAddress // 确认地址
} from '@/api/finance' // API接口
import editAddress from '@/views/finance/components/orderList/handleEditAddress' // 修改地址
import uploadRecord from '@/views/finance/components/orderList/uploadRecord' // 上传流水
import withDraw from '@/views/finance/components/orderList/handleWithdraw' // 提现dialog
import { imgHeadUrl } from '@/utils/globalConst' // 图片的访问域名
export default {
  name: '',
  data() {
    return {
      isWithdraw: false, // 提现dialog
      isAddress: false, // 修改地址dialog
      isUploadRecord: false, // 上传流水dialog
      searchData: {
        coin: '',
        status: '',
        startDate: '',
        endDate: ''
      },
      pagination: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      tableList: [],
      infoData: {},
      statusList: [], // 状态数据
      previewList: [], // 图片预览
      coinArr: [],
      takeNoBtnList: [
        // 接受拒绝按钮数组
        {
          icon: 'el-icon-check',
          name: '接受',
          disabledType: 'WaitAccept',
          type: 1
        },
        {
          icon: 'el-icon-close',
          name: '拒绝',
          disabledType: 'WaitAccept',
          type: 0
        }
      ],
      otherBtnList: [
        {
          icon: 'el-icon-sort',
          disabledType: 'WaitPayment',
          name: '确认转账',
          type: '1'
        },
        {
          icon: 'el-icon-upload',
          disabledType: 'WaitUpload',
          name: '上传流水',
          type: '2'
        },
        {
          icon: 'el-icon-coin',
          disabledType: 'WaitRelease',
          name: '放款',
          type: '3'
        }
      ]
    }
  },
  mixins: [miXinsData],
  components: { searchForm, pagination, editAddress, uploadRecord, withDraw },
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
          element: 'el-select',
          label: '状态',
          prop: 'status',
          initValue: '',
          placeholder: '请选择',
          options: this.statusList
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
    this.getOrderStatusData()
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
      const { times, coin, status, ...otherObj } = data
      this.searchData = { ...otherObj }
      this.searchData.coin = coin ? this.coinList[coin].label : ''
      this.searchData.status = status ? this.statusList[status].label : ''
      this.searchData.startDate = times ? times[0].split(' ')[0] : ''
      this.searchData.endDate = times ? times[1].split(' ')[0] : ''
      this.getInitData()
    },
    onTakeNoBtn(row, item) {
      const { type } = item
      switch (type) {
        case 1:
        case 0:
          // console.log('接受或者拒绝')
          this.onAcceptOrRefuse(row, type)
          break
        default:
          console.log('其他')
          break
      }
    },
    onOtherBtn(row, item) {
      const { type } = item
      switch (type) {
        case '1':
          this.onConfirmTransfer(row)
          break
        case '2':
          this.onUpload(row)
          break
        case '3':
          this.onMakeLoan(row)
          break

        default:
          console.log('其他操作')
          break
      }
    },
    // 提现
    onWithdraw() {
      this.coinArr = this.coinList.slice(1)
      this.infoData = { coin: '', price: '' }
      this.isWithdraw = true
    },
    // 提现成功回调
    withdrawSuccess() {
      this.getData()
    },

    // 添加修改地址
    onEditAddress(row) {
      console.log('修改地址', row)
      const { id, address } = row
      const currRess = !address ? '空' : address
      const opera = !address ? '添加新地址' : '修改'
      this.msgConfirmFunc({ txt: `该地址为${currRess}，确认要${opera}` }, () => {
        this.infoData = { id, address }
        this.isAddress = true
      })
    },
    // 修改地址成功回调
    handleSuccessEditAddress() {
      this.getData()
    },
    // 接受or拒绝、
    onAcceptOrRefuse(row, type) {
      const txt = type === 1 ? '接受' : '拒绝'
      this.msgConfirmFunc({ txt: `确认${txt}该订单` }, () => {
        const { id } = row
        const params = { orderId: id, result: type }
        disposeOrder(params).then(res => {
          this.msgTipsFunc({ message: '操作成功' })
          this.getData()
        })
      })
    },
    // 确认地址
    onConfirmRess(row) {
      // console.log(row)
      const { id, address } = row
      if (!address) {
        this.msgTipsFunc({ message: '请先去添加一个地址', type: 'warning' })
        return
      }
      const txt = `再次确认地址为:${address}`
      this.msgConfirmFunc({ txt }, () => {
        const params = { orderId: id }
        coinfirmAddress(params).then(res => {
          console.log(res)
          this.msgTipsFunc({ message: '操作成功' })
          this.getData()
        })
      })
    },
    // 确认转账
    onConfirmTransfer(row) {
      const { id, address, exchangeType } = row
      if (exchangeType === 'linedown' && address === '') {
        this.msgTipsFunc({ message: '请先去添加一个地址', type: 'warning' })
        return
      }
      this.msgConfirmFunc({ txt: `是否确认转账` }, () => {
        const params = { orderId: +id }
        confirmTransfer(params).then(res => {
          console.log(res)
          this.msgTipsFunc({ message: '操作成功' })
          this.getData()
        })
      })
    },
    // 上传流水
    onUpload(row) {
      console.log('上传流水', row)
      const { id } = row
      this.infoData = { id, record: [] }
      this.isUploadRecord = true
    },
    // 上传流水成功回调
    uploadSuccessRecord() {
      this.getData()
    },
    // 放款
    onMakeLoan(row) {
      this.msgConfirmFunc({ txt: '再次确认是否放款' }, () => {
        const { id } = row
        const params = { orderId: id }
        operaMakeLoans(params).then(res => {
          console.log(res)
          this.msgTipsFunc({ message: '操作成功' })
          this.getData()
        })
      })
    },
    // 获取数据
    getData() {
      const params = { pageNum: this.pagination.currentPage, pageSize: this.pagination.pageSize, ...this.searchData }
      getOrderList(params).then(res => {
        console.log('res', res)
        const { count, list } = res.data
        this.pagination.total = count
        // this.tableList = list
        this.tableList = list.map(item => {
          if (item.uploadRecord) {
            const imgUrl = tools.domainFilter(item.uploadRecord)
            // console.log(imgUrl)
            item.uploadRecord = `${imgHeadUrl}/${imgUrl}`
          }
          return item
        })
        // console.log('tableList', this.tableList)
      })
    },
    // 获取提现状态
    getOrderStatusData() {
      getOrderStatus().then(res => {
        console.log('res', res)
        const { data } = res
        this.statusList = this.setStatusData(data)
      })
    },
    // 字段转中文
    setStatusData(list) {
      let result = list.map((item, index) => {
        return { value: index + 1, label: item }
      })
      result.unshift({ value: '', label: '全部' })
      return result
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
    },
    // 公共的confirm弹框func
    msgConfirmFunc({ txt, title = '提示', iconType = 'warning', isCenter = true }, callback) {
      this.$confirm(txt, title, {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: iconType,
        center: isCenter
      })
        .then(() => {
          callback()
        })
        .catch(() => {})
    }
  }
}
</script>
<style lang="less" scoped>
//@importurl();引入公共css类
</style>
