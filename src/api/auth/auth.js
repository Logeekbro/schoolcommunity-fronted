import request from '@/utils/request'
import store from '@/store'

// 注册
export function userRegister(userDTO) {
  return request({
    url: '/user/register',
    method: 'post',
    data: userDTO
  })
}

// 前台用户登录
export function login(data) {
  return request({
    url: '/oauth/token',
    method: 'post',
    data: {
      username: data.account,
      password: data.password
    }
  })
}
// 登录后获取前台用户信息
export function getUserInfo() {
  return request({
    url: '/user/info/basic',
    method: 'get',
  })
}
// 前台用户注销
export function logout() {
  return request({
    url: '/user/logout',
    method: 'delete',
  })
}