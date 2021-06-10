// 登录 - api
import request from '@/utils/request'
let root = '/provider'
/**
 * 登录
 */
export function login(data) {
  return request({
    url: root + '/providers/login',
    method: 'put',
    data
  })
}
