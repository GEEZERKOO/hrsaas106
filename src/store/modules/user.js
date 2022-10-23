import { getToken, setToken, removeToken } from '@/utils/auth'
import { login } from '@/api/user'
// 状态
const state = {
  token: getToken // 从缓存中获取数据 设置token初始状态
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
  }
}
// 执行异步
const actions = {
  async login(context, data) {
    // 调用api接口
    const result = await login(data) // 拿到token
    context.commit('setToken', result) // 设置token
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
