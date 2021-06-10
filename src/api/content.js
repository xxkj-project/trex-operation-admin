/**
 * 内容管理 - api
 */
import request from '@/utils/request'
// import Qs from 'qs'
let root = '/provider'
/**
 * 获取承兑商收款信息列表 - api
 */
export function getAccountList(data) {
  return request({
    url: root + '/providers/accountList',
    method: 'get',
    data
  })
}

/**
 * 添加承兑商 - api
 */
export function addAccount(data) {
  return request({
    url: root + '/providers/addAccount',
    method: 'post',
    data
  })
}

/**
 * 修改承兑商收款信息 - api
 */
export function updateAccount(data) {
  return request({
    url: root + '/providers/updateAccount',
    method: 'post',
    data
  })
}

/**
 * 修改承兑商信息 - api
 */
export function updateAccountInfo(data) {
  return request({
    url: root + `/providers/updateInfo`,
    method: 'post',
    data
  })
}

/**
 * 获取币种信息 - api
 */
export function getCoinList(data) {
  return request({
    url: root + '/providers/coinList',
    method: 'get',
    data
  })
}

/**
 * 获取当天记过次数 - api
 */
export function getMistakeNum(data) {
  return request({
    url: root + '/providers/mistakes',
    method: 'get',
    data
  })
}
