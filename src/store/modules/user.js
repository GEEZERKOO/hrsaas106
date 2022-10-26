import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, getUserInfo } from '@/api/user'
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
  },
  async getUserInfo(context) {
    const result = await getUserInfo()
    context.commit('setUserInfo', result) // 提交给mutations
    return result
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
