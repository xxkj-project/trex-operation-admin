<!--申诉-->
<template>
  <div class="receiving">
    <searchForm :formOptions="formOptions" @onSearch="onSearch"> </searchForm>

    <div class="listWrap">
      <div class="tableBox">
        <el-table :data="tableList" tooltip-effect="dark" style="width: 100%">
          <el-table-column prop="adminId" label="管理员ID" min-width="80"></el-table-column>

          <el-table-column prop="userId" label="用户ID" min-width="140"></el-table-column>

          <el-table-column prop="userName" label="用户昵称" min-width="140"></el-table-column>

          <el-table-column prop="orderId" label="订单ID" min-width="140"></el-table-column>

          <el-table-column prop="reason" label="操作员备注" min-width="80"></el-table-column>

          <el-table-column prop="status" label="申诉状态" min-width="100"></el-table-column>

          <el-table-column prop="updatedAt" label="时间" min-width="160"></el-table-column>

          <el-table-column label="操作" min-width="160" fixed="right">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="onBuyerOrSeller(scope.row, 'BuyerWin')"
                icon="el-icon-setting"
                :disabled="scope.row.status === 'BuyerWin' || scope.row.status === 'SellerWin'"
                >买家赢</el-button
              >
              <el-button
                size="mini"
                type="primary"
                @click="onBuyerOrSeller(scope.row, 'SellerWin')"
                icon="el-icon-setting"
                :disabled="scope.row.status === 'BuyerWin' || scope.row.status === 'SellerWin'"
                >卖家赢</el-button
              >
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
import searchForm from '@/components/searchForm'
import pagination from '@/components/pagination'
import { getAppealList, operationAppeal, getAppealStatus } from '@/api/finance'
export default {
  name: '',
  data() {
    return {
      searchData: {
        user: '',
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
      appealStatusList: []
    }
  },
  components: { searchForm, pagination },
  computed: {
    formOptions() {
      let options = [
        {
          element: 'el-input',
          label: '用户ID/用户名',
          prop: 'user',
          initValue: '',
          placeholder: '请输入用户ID/用户名'
        },
        {
          element: 'el-select',
          label: '状态',
          prop: 'status',
          initValue: '',
          placeholder: '请选择',
          options: this.appealStatusList
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
    this.getAppealStatusData()
  },
  mounted() {},
  methods: {
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
    onSearch(data) {
      console.log('-search-', data)
      const { times, status, ...otherObj } = data
      this.searchData = { ...otherObj }
      this.searchData.status = status ? this.appealStatusList[status].label : ''
      this.searchData.startDate = times ? times[0] : ''
      this.searchData.endDate = times ? times[1] : ''
      this.getInitData()
    },
    // 处理申诉
    onBuyerOrSeller(row, type) {
      const { id, reason } = row
      const mess = type === 'BuyerWin' ? '买家赢' : '卖家赢'
      let txt = `是否确认${mess}？`
      this.msgConfirmFunc({ txt }, () => {
        const params = { id, reason, status: type }
        operationAppeal(params).then(res => {
          this.$message({ message: '操作成功', type: 'success' })
          this.getData()
        })
      })
    },
    getData() {
      const params = { pageNum: this.pagination.currentPage, pageSize: this.pagination.pageSize, ...this.searchData }
      getAppealList(params).then(res => {
        console.log(res)
        const { count, list } = res.data
        this.pagination.total = count
        this.tableList = list
      })
    },
    getAppealStatusData() {
      getAppealStatus().then(res => {
        console.log(res)
        const { data } = res
        this.appealStatusList = this.setStatusData(data)
      })
    },
    setStatusData(list) {
      let result = list.map((val, index) => {
        return { value: index + 1, label: val }
      })
      result.unshift({ value: '', label: '全部' })
      return result
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
