// 负责所有全局自定义事件的注册
import PageTools from './PageTools'
import UploadExcel from './UploadExcel'

export default {
  // 组件注册
  install(Vue) {
    Vue.component('PageTools', PageTools)
    Vue.component('UploadExcel', UploadExcel)
  }
}
