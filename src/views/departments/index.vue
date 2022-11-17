<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 组织架构内容 头部 -->
      <el-card class="tree-card">
        <!-- 放置结构内容 -->
        <tree-tools
          :tree-node="company"
          :is-root="true"
          @addDepts="addDepts"
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
            @addDepts="addDepts"
          />
        </el-tree>
      </el-card>
    </div>
    <!-- 放置新增弹层 -->
    <AddDept :show-dialog="showDialog" />
  </div>
</template>

<script>
import TreeTools from './components/tree-tools'
import AddDept from './components/add-dept'
import { getDepartments } from '@/api/departments'
import { tranListToTreeData } from '@/utils'
export default {
  components: {
    TreeTools,
    AddDept
  },
  data() {
    return {
      company: {}, // 头部数据结构
      departs: [],
      defalutProps: {
        label: 'name' // 表示从这个属性显示内容
      },
      showDialog: false, // 弹窗默认不显示
      node: null // 记录当前点击的node节点
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
    },

    // 监听tree-tools中触发的添加部门的事件
    addDepts(node) {
      this.showDialog = true // 显示弹层
      this.node = node // 因为node是当前点击的部门 所以要记录下来
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
