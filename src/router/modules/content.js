/*
 * @Author: wangshengxian
 * @Date: 2020-08-17 16:11:33
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-10-22 14:23:12
 * @Desc: 内容管理路由模块
 */
import Layout from '@/views/layout'

// 承兑商基本信息
const AcceptInfoList = () => import(/* webpackChunkName: 'acceptInfo' */ '@/views/content/acceptInfo')
// 修改承兑商基本信息
const EditInfoMes = () => import(/* webpackChunkName: 'editInfoMes' */ '@/views/content/acceptInfo/editInfoMes')
// 承兑商收款信息
const CollectionList = () => import(/* webpackChunkName: 'collection' */ '@/views/content/collection')
// 添加承兑商收款信息
const AddEditCollection = () =>
  import(/* webpackChunkName: 'addEditCollection' */ '@/views/content/collection/addEditCollection')
// 币种信息
const currencyList = () => import(/* webpackChunkName: 'currency' */ '@/views/content/currency')

const contentRouter = {
  path: '/content',
  name: 'Content',
  component: Layout,
  redirect: '/content/acceptance',
  alwaysShow: true,
  meta: {
    title: '内容管理',
    icon: 'content'
  },
  children: [
    {
      path: 'acceptInfo',
      name: 'AcceptInfo',
      component: AcceptInfoList,
      meta: {
        title: '承兑商基本信息',
        icon: 'menu'
      }
    },
    {
      path: 'editInfoMes',
      name: 'EditInfoMes',
      component: EditInfoMes,
      hidden: true,
      meta: {
        title: '修改承兑商基本信息',
        icon: 'menu'
      }
    },
    {
      path: 'collection',
      name: 'Collection',
      component: CollectionList,
      meta: {
        title: '承兑商收款信息',
        icon: 'menu'
      }
    },
    {
      path: 'addEditCollection',
      name: 'AddEditCollection',
      component: AddEditCollection,
      hidden: true,
      meta: {
        title: '添加承兑商收款信息',
        icon: 'menu'
      }
    },
    {
      path: 'currency',
      name: 'Currency',
      component: currencyList,
      meta: {
        title: '币种信息',
        icon: 'menu'
      }
    }
  ]
}

export default contentRouter
