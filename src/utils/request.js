import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { Message } from 'element-ui'
import { getTimeStamp } from '@/utils/auth'
const TimeOut = 4800 // 定义超时时间

const service = axios.create({
  // 当执行dev的时候 => 。env.development => /api => 跨域代理
  baseURL: process.env.VUE_APP_BASE_API, // /dev-api  /prod-api
  timeout: 5000 // 超时时间
})
// 请求拦截器
service.interceptors.request.use(config => {
  // config是请求的配置信息
  // 注入token
  if (store.getters.token) {
    if (IsCheckTimeOut()) {
      // 如果是true就表示token过期了
      store.dispatch('user/logout') // 登出操作
      router.push('/login')
      return Promise.reject(new Error('token超时了'))
    }
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
  // error信息里面有response对象
  if (error.response && error.response.data && error.response.data.code === 10002) {
    // 当等于10002的时候 表示后端提示token超时
    store.dispatch('user/logout') // 登出action
    router.push('./login') // 跳转到登录页
  } else {
    Message.error(error.message) // 提示错误信息
  }
  return Promise.reject(error) // 返回执行错误 让当前执行链跳出成功 直接进入catch
})

// 定义检查是否超时方法
// 当前时间 - 缓存中的时间 结果是否大于时间差
function IsCheckTimeOut() {
  var currentTime = Date.now() // 当前时间戳
  var timeStamp = getTimeStamp() // 缓存的时间戳
  return (currentTime - timeStamp) / 1000 > TimeOut
}
export default service
