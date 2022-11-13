<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 组织架构内容 头部 -->
      <el-card class="tree-card">
        <!-- 放置结构内容 -->
        <tree-tools
          :tree-node="company"
          :is-root="true"
        />
        <!-- 放置一个el-tree -->
        <el-tree
          :data="departs"
          :props="defalutProps"
          :default-expand-all="true"
        >
          <!-- 传入插槽内容 会循环多次 有多少节点就循环多少次 -->
          <tree-tools
            slot-scope="{ data }"
            :tree-node="data"
            @delDepts="getDepartments"
          />
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
import TreeTools from './components/tree-tools'
import { getDepartments } from '@/api/departments'
import { tranListToTreeData } from '@/utils'
export default {
  components: {
    TreeTools
  },
  data() {
    return {
      company: {}, // 头部数据结构
      departs: [],
      defalutProps: {
        label: 'name' // 表示从这个属性显示内容
      }
    }
  },
  created() {
    this.getDepartments() // 调用自身的方法
  },
  methods: {
    async getDepartments() {
      const result = await getDepartments()
      this.company = { name: result.companyName, manager: '负责人' }
      this.departs = tranListToTreeData(result.depts, '')
      console.log(result)
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
