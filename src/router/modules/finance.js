/*
 * @Author: wangshengxian
 * @Date: 2020-08-17 16:11:33
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-10-22 14:23:12
 * @Desc: 财务管理路由模块
 */
import Layout from '@/views/layout'

// 申诉
const AppealList = () => import(/* webpackChunkName: 'appeal' */ '@/views/finance/appeal')
// 承兑记录
const AcceptRecordList = () => import(/* webpackChunkName: 'acceptRecord' */ '@/views/finance/acceptRecord')
// 订单列表
const OrderList = () => import(/* webpackChunkName: 'orderList' */ '@/views/finance/orderList')
// 收款列表
const IncomeList = () => import(/* webpackChunkName: 'incomeList' */ '@/views/finance/incomeList')
// 用户资产列表
const UserAssetList = () => import(/* webpackChunkName: 'userAssetList' */ '@/views/finance/userAssetList')

const financeRouter = {
  path: '/finance',
  name: 'Finance',
  component: Layout,
  redirect: '/finance/appeal',
  alwaysShow: true,
  meta: {
    title: '财务管理',
    icon: 'finance'
  },
  children: [
    {
      path: 'appeal',
      name: 'Appeal',
      component: AppealList,
      meta: {
        title: '申诉列表',
        icon: 'menu'
      }
    },
    {
      path: 'acceptRecord',
      name: 'AcceptRecord',
      component: AcceptRecordList,
      meta: {
        title: '承兑记录列表',
        icon: 'menu'
      }
    },
    {
      path: 'orderList',
      name: 'OrderList',
      component: OrderList,
      meta: {
        title: '订单列表',
        icon: 'menu'
      }
    },
    {
      path: 'incomeList',
      name: 'IncomeList',
      component: IncomeList,
      meta: {
        title: '收款列表',
        icon: 'menu'
      }
    },
    {
      path: 'userAssetList',
      name: 'userAssetList',
      component: UserAssetList,
      hidden: true,
      meta: {
        title: '用户资产列表',
        icon: 'menu'
      }
    }
  ]
}
export default financeRouter
