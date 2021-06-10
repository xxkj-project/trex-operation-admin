<template>
  <div class="userList">
    <div class="listWrap">
      <div class="tableBox">
        <el-table :data="tableList" style="width: 100%" ref="tableList">
          <el-table-column prop="coin" label="币种" min-width="80"></el-table-column>

          <el-table-column label="币种图片" min-width="140">
            <template slot-scope="scope">
              <img :src="scope.row.img" alt="" class="img" />
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { getCoinList } from '@/api/content'
import { imgHeadUrl } from '@/utils/globalConst'
export default {
  name: '',
  data() {
    return {
      pagination: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      tableList: []
    }
  },
  components: {},
  computed: {},
  created() {
    this.getData()
  },
  mounted() {},
  methods: {
    getData() {
      getCoinList().then(res => {
        console.log('res', res)
        const { data } = res
        this.tableList = data.map(item => {
          item.img = `${imgHeadUrl}/${item.img}`
          return item
        })
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
/deep/.demo-table-expand {
  font-size: 0;
}
/deep/.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
/deep/.demo-table-expand .el-form-item {
  margin-bottom: 0;
  width: 50%;
}
</style>
