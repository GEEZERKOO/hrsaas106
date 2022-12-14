import { getToken, setToken, removeToken, setTimeStamp } from '@/utils/auth'
import { login, getUserInfo, getUserDetailById } from '@/api/user'
// 状态
const state = {
  token: getToken(), // 从缓存中获取数据 设置token初始状态
  userInfo: {} // 会在getters中引用userinfo的变量，如果设置为null，则会引起异常和报错
}
// 修改状态
const mutations = {
  setToken(state, token) {
    state.token = token
    setToken() // 同步到缓存
  },
  // 删除token
  removeToken(state) {
    state.token = null // 删除vuex的token
    removeToken() // 同步到缓存
  },
  setUserInfo(state, result) {
    // 更新对象
    state.userInfo = result
  },

  // 删除用户信息
  removeUserInfo() {
    state.userInfo = {}
  }
}
// 执行异步
const actions = {
  async login(context, data) {
    // 调用api接口
    const result = await login(data) // 拿到token
    context.commit('setToken', result) // 设置token
    // 登陆成功，设置时间戳
    setTimeStamp()
  },
  async getUserInfo(context) {
    const result = await getUserInfo()
    // 获取用户详情
    const baseInfo = await getUserDetailById(result.userId)
    // 把他们合并到一起
    const baseResult = { ...result, ...baseInfo }
    context.commit('setUserInfo', baseResult) // 提交给mutations
    return baseResult
  },
  // 退出登录
  logout(context) {
    // 删除token
    context.commit('removeToken')
    // 删除用户资料
    context.commit('removeUserInfo')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
