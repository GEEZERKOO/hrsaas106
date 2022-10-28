// 导出员工的路由规则
import Layout from '@/layout'
export default {
  path: '/attendances', // 路由地址
  name: 'attendances', // 给模块的一级路由加name属性，后期做权限管理用
  component: Layout, // 组件
  children: [{
    path: '', // 这里为空表示/attendances不但有layout 还有二级路由员工主页↓
    component: () => import('@/views/attendances'),
    meta: { // 路由元信息，存储内容的地方，可存储任何数据
      title: '考勤', // 左侧导航读取了title属性
      icon: 'skill'
    }
  }]
}
