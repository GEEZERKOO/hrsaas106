import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
const service = axios.create({
  // 当执行dev的时候 => 。env.development => /api => 跨域代理
  baseURL: process.env.VUE_APP_BASE_API, // /dev-api  /prod-api
  timeout: 5000 // 超时时间
})
// 请求拦截器
service.interceptors.request.use(config => {
  // config是请求的配置信息
  if (store.getters.token) {
    // 注入token
    config.headers['Authorization'] = `Bearer ${store.getters.token}`
  }
  return config // 是必须要返回的
}, error => {
  return Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(response => {
  // 结构数据 axios默认封装了一层data
  const { success, message, data } = response.data
  // 需根据success的成功与否来决定下面的执行
  if (success) {
    return data
  } else {
    // 业务已经出错 不能进入then
    Message.error(message) // 提示错误信息
    return Promise.reject(new Error(message)) // 返回执行错误 让当前执行链跳出成功 直接进入catch
  }
}, error => {
  Message.error(error.message) // 提示错误信息
  return Promise.reject(error) // 返回执行错误 让当前执行链跳出成功 直接进入catch
})
export default service
