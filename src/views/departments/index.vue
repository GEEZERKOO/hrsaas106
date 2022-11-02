<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 组织架构内容 头部 -->
      <el-card class="tree-card">
        <!-- 放置结构内容 -->
        <tree-tools :tree-node="company" :is-root="true" />
        <!-- 放置一个el-tree -->
        <el-tree
          :data="departs"
          :props="defalutProps"
          :default-expand-all="true"
        >
          <!-- 传入插槽内容 会循环多次 有多少节点就循环多少次 -->
          <tree-tools slot-scope="{ data }" :tree-node="data" />
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
import TreeTools from './components/tree-tools'
export default {
  components: {
    TreeTools
  },
  data() {
    return {
      company: { name: '江苏传智播客教育科技股份有限公司', manager: '负责人' }, // 头部数据结构
      departs: [{ name: '总裁办', manager: '曹操', children: [{ name: '董事会', manager: '曹丕' }] },
        { name: '行政部', manager: '刘备' },
        { name: '人事部', manager: '孙权' }],
      defalutProps: {
        label: 'name' // 表示从这个属性显示内容
      }
    }
  }
}
</script>

<style scoped>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>
