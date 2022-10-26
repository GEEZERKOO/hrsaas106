import request from '@/utils/request'

// 登录接口
export function login(data) {
  // 返回一个promise对象
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}

// 获取用户资料接口
export function getUserInfo(token) {
  return request({
    url: '/sys/profile',
    method: 'POST'
  })
}

export function logout() {

}

// export const login = data => {
//     return request({
//         method: 'POST',
//         url: '/v1_0/authorizations',
//         data
//     })
// }
