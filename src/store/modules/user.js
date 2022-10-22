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
    const result = await login(data)
    if (result.data.success) {
      // actions修改status 必须通过mutations
      context.commit('setToken', result.data.data)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
