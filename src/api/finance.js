/**
 * 财务相关 - api
 */
import request from '@/utils/request'
import Qs from 'qs'
let root = '/provider'

/**
 * 获取申诉列表 - api
 */
export function getAppealList(data) {
  return request({
    url: root + '/finance/appealsList',
    method: 'get',
    data
  })
}

/**
 * 获取申诉状态列表 - api
 */
export function getAppealStatus(data) {
  return request({
    url: root + '/finance/appealsStatusList',
    method: 'get',
    data
  })
}

/**
 * 用户资产列表 - api
 */
export function getInfoAssetList(data) {
  return request({
    url: root + '/finance/assetList',
    method: 'get',
    data
  })
}

/**
 * 收款列表 - api
 */
export function getIncomeList(data) {
  return request({
    url: root + '/finance/incomeRecord',
    method: 'get',
    data
  })
}

/**
 * 获取承兑记录列表 - api
 */
export function getAcceptRecordList(data) {
  return request({
    url: root + '/finance/recordList',
    method: 'get',
    data
  })
}

/**
 * 获取承兑记录列表 - api
 */
export function getRecordTotal(data) {
  return request({
    url: root + '/finance/recordTotal',
    method: 'get',
    data
  })
}

/**
 * 所有订单列表 - api
 */
export function getOrderList(data) {
  return request({
    url: root + '/finance/orderList',
    method: 'get',
    data
  })
}

/**
 * 订单状态列表 - api
 */
export function getOrderStatus(data) {
  return request({
    url: root + '/finance/orderStatusList',
    method: 'get',
    data
  })
}

/**
 * 处理申诉 - api
 */
export function operationAppeal(data) {
  return request({
    url: root + `/finance/appealsSubmit?${Qs.stringify(data)}`,
    method: 'put',
    data
  })
}

/**
 * 处理订单 - api
 */
export function disposeOrder(data) {
  return request({
    url: root + `/finance/dealOrder?${Qs.stringify(data)}`,
    method: 'put',
    data
  })
}

/**
 * 确认转账 - api
 */
export function confirmTransfer(data) {
  return request({
    url: root + `/finance/transferOrder?${Qs.stringify(data)}`,
    method: 'put',
    data
  })
}

/**
 * 修改地址 - api
 */
export function editAddress(data) {
  return request({
    url: root + `/finance/updateAddress?${Qs.stringify(data)}`,
    method: 'put',
    data
  })
}
/**
 * 上传流水单 - api
 */
export function uploadRecord(data) {
  return request({
    url: root + `/finance/uploadRecord?${Qs.stringify(data)}`,
    method: 'put',
    data
  })
}
/**
 * 放款 - api
 */
export function operaMakeLoans(data) {
  return request({
    url: root + `/finance/releaseOrder?${Qs.stringify(data)}`,
    method: 'put',
    data
  })
}
/**
 * 提现 - api
 */
export function operaWithdraw(data) {
  return request({
    url: root + `/finance/withdrawApply?${Qs.stringify(data)}`,
    method: 'put',
    data
  })
}
/**
 * 确认地址 - api
 */
export function coinfirmAddress(data) {
  return request({
    url: root + `/finance/confirmAddress?${Qs.stringify(data)}`,
    method: 'put',
    data
  })
}
