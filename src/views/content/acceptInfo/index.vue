<!--承兑商基本信息-->
<template>
  <div class="userList">
    <div class="btn">
      <el-button slot="button" size="mini" type="primary" class="btn-search" @click="onEditPwd" icon="el-icon-edit"
        >修改密码</el-button
      >
      <el-button size="mini" type="primary" @click="onEditInfo" icon="el-icon-edit">编辑基本信息</el-button>
    </div>
    <div class="listWrap">
      <div class="tableBox">
        <div class="introduce">
          <div class="id"><span>ID: </span>{{ userInfo.id }}</div>
          <div class="providerName"><span>承兑商名称: </span>{{ userInfo.providerName }}</div>
          <div class="pic"><span>头像:</span> <img :src="userInfo.pic" alt="" class="headImg" /></div>
          <div class="country"><span>国家: </span>{{ userInfo.country }}</div>
          <div class="city"><span>城市: </span>{{ userInfo.city }}</div>
          <div class="address"><span>地址: </span>{{ userInfo.address }}</div>
          <div class="dayMistake"><span>当天记过次数: </span>{{ mistake }}</div>
          <div class="city"><span>简介: </span>{{ userInfo.introduce }}</div>
          <div class="status"><span>上下线状态: </span>{{ userInfo.status | statusTxt('status') }}</div>
          <div class="banRecharge"><span>承兑状态: </span>{{ userInfo.banRecharge | statusTxt('banRecharge') }}</div>
          <div class="banWithdraw"><span>提现状态: </span>{{ userInfo.banWithdraw | statusTxt('banWithdraw') }}</div>
        </div>
      </div>
    </div>
    <editPwd :infoData="infoData" :visible.sync="isShowEditPwd" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import editPwd from '@/views/content/components/acceptInfo/editPwd'
import { getMistakeNum } from '@/api/content'
const statusType = {
  status: ['上线', '下线'],
  banRecharge: ['禁止', '允许'],
  banWithdraw: ['禁止', '允许']
}
export default {
  name: '',
  data() {
    return {
      mistake: 0, // 当天记过次数
      isShowEditPwd: false,
      infoData: {}
    }
  },
  components: { editPwd },
  computed: {
    ...mapState('user', ['userInfo'])
  },
  filters: {
    statusTxt(val, type) {
      // console.log('-val-', val, '-type-', type)
      return val ? statusType[type][0] : statusType[type][1]
    }
  },
  created() {
    this.getData()
  },
  mounted() {},
  methods: {
    // 修改密码
    onEditPwd() {
      this.infoData = { oldPwd: '', newPwd: '' }
      this.isShowEditPwd = true
    },
    // 修改基本信息
    onEditInfo() {
      this.$router.push({ name: 'EditInfoMes' })
    },
    getData() {
      // 当天记过次数
      getMistakeNum().then(res => {
        this.mistake = res.data
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
.introduce {
  padding-top: 25px;
  div {
    display: flex;
    align-items: center;
    font-size: 16px;
    margin-bottom: 18px;
    span {
      display: inline-block;
      width: 120px;
      text-align: right;
      color: #99a9bf;
      margin-right: 20px;
    }
  }
}
.tableBox {
  display: flex;
}
</style>
