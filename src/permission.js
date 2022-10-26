// 权限跳转在路由跳转的时候执行 路由守卫

import router from '@/router'
import store from '@/store' // 引入store实例，等于组件内的this.$router
import NProgress from 'nprogress' // 引入一份进度条插件
import 'nprogress/nprogress.css' // 引入进度条样式
// 不需要导出 只需要让代码执行即可
// next 是前置守卫必须执行的钩子 必须执行 否则死页面
// next() 放过
// next(false) 跳转终止
// next(地址) 跳转到某个地址

const whiteList = ['/login', '/404'] // 定义白名单

// 前置守卫
router.beforeEach(async(to, from, next) => {
  NProgress.start() // 开启进度条
  if (store.getters.token) {
    // 如果有token
    if (to.path === '/login') {
      // 如果要访问的是登录页
      next('/') // 直接跳转到主页
    } else {
      // 只有放过的时候采取获取用户资料
      // 不是每次都获取 根据当前vuex有无用户资料的id去获取
      if (!store.getters.userId) {
        // 没有id才获取
        await store.dispatch('user/getUserInfo') // 必须是同步
      }
      next()
    }
  } else {
    // 没有token
    if (whiteList.indexOf(to.path) > -1) {
      // 去的地址是白名单的话就放行
      next()
    } else {
      next('/login')
    }
  }
  NProgress.done() // 关闭进度条
})
// 后置守卫
router.afterEach(() => {
  NProgress.done() // 关闭进度条
})
