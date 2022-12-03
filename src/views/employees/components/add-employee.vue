<template>
  <el-dialog
    title="新增员工"
    :visible="showDialog"
    @close="btnCancel"
  >
    <el-form
      ref="addEmployee"
      :model="formData"
      :rules="rules"
      label-width="120px"
    >
      <el-form-item
        prop="username"
        label="姓名"
      >
        <el-input
          v-model="formData.username"
          style="width: 50%"
          placeholder="请输入姓名"
        />
      </el-form-item>
      <el-form-item
        prop="mobile"
        label="手机"
      >
        <el-input
          v-model="formData.mobile"
          style="width: 50%"
          placeholder="请输入手机号"
        />
      </el-form-item>
      <el-form-item
        prop="timeOfEntry"
        label="入职时间"
      >
        <el-date-picker
          v-model="formData.timeOfEntry"
          style="width: 50%"
          placeholder="请选择入职时间"
        />
      </el-form-item>
      <el-form-item
        prop="formOfEmployment"
        label="聘用形式"
      >
        <el-select
          v-model="formData.formOfEmployment"
          style="width: 50%"
          placeholder="请选择"
        >
          <el-option
            v-for="item in EmployeeEnum.hireType"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        prop="workNumber"
        label="工号"
      >
        <el-input
          v-model="formData.workNumber"
          style="width: 50%"
          placeholder="请输入工号"
        />
      </el-form-item>
      <el-form-item
        prop="departmentName"
        label="部门"
      >
        <el-input
          v-model="formData.departmentName"
          style="width: 50%"
          placeholder="请选择部门"
          @focus="getDepartments"
        />
        <!-- 树形组件 -->
        <el-tree
          v-if="showTree"
          v-loading="loading"
          :data="treeData"
          :props="{ label:'name' }"
          :default-expand-all="true"
          @node-click="selectNode"
        />
      </el-form-item>
      <el-form-item
        prop="correctionTime"
        label="转正时间"
      >
        <el-date-picker
          v-model="formData.correctionTime"
          style="width: 50%"
          placeholder="请选择转正时间"
        />
      </el-form-item>
    </el-form>

    <!-- footer 插槽 -->
    <template v-slot:footer>
      <el-row
        type="flex"
        justify="center"
      >
        <el-col :span="6">
          <el-button
            size="small"
            @click="btnCancel"
          >取消</el-button>
          <el-button
            size="small"
            type="primary"
            @click="btnOk"
          >确定</el-button>
        </el-col>
      </el-row>
    </template>
  </el-dialog>
</template>

<script>
import { getDepartments } from '@/api/departments'
import { tranListToTreeData } from '@/utils'
import EmployeeEnum from '@/api/constant/employees'
import { addEmployee } from '@/api/employees'
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }

  },
  data() {
    return {
      EmployeeEnum,
      formData: {
        username: '', // 姓名
        mobile: '', // 手机
        formOfEmployment: '', // 聘用形式
        workNumber: '', // 工号
        departmentName: '', // 部门
        timeOfEntry: '', // 入职时间
        correctionTime: '' // 转正时间
      },
      rules: {
        username: [{ required: true, message: '用户姓名不能为空', trigger: 'blur' }, {
          min: 1, max: 4, message: '用户姓名为1-4位'
        }],
        mobile: [{ required: true, message: '手机号不能为空', trigger: 'blur' }, {
          pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur'
        }],
        formOfEmployment: [{ required: true, message: '聘用形式不能为空', trigger: 'blur' }],
        workNumber: [{ required: true, message: '工号不能为空', trigger: 'blur' }],
        departmentName: [{ required: true, message: '部门不能为空', trigger: 'change' }],
        timeOfEntry: [{ required: true, message: '入职时间', trigger: 'blur' }]
      },

      treeData: [], // 定义数组接收树形数据
      loading: false, // 控制树形的显示或者隐藏
      showTree: false // 控制树的显示或者隐藏进度条
    }
  },
  methods: {
    async getDepartments() {
      this.showTree = true
      this.loading = true
      const { depts } = await getDepartments()
      this.treeData = tranListToTreeData(depts, '') // 转成树形
      this.loading = false
    },

    selectNode(node) {
      this.formData.departmentName = node.name
      this.showTree = false
    },

    async btnOk() {
      try {
        // 表单校验
        await this.$refs.addEmployee.validate()
        // 校验通过 调用接口 新增员工
        await addEmployee(this.formData)
        // 通知父组件重新拉数据
        this.$parent.getEmployeeList && this.$parent.getEmployeeList()
        // 关闭弹层
        this.$parent.showDialog = false
      } catch (error) {
        console.log(error)
      }
    },

    btnCancel() {
      // 重置数据
      this.formData = {
        username: '', // 姓名
        mobile: '', // 手机
        formOfEmployment: '', // 聘用形式
        workNumber: '', // 工号
        departmentName: '', // 部门
        timeOfEntry: '', // 入职时间
        correctionTime: '' // 转正时间
      }
      // 重置校验结果
      this.$refs.addEmployee.resetFields()
      this.$emit('update:showDialog', false)
    }
  }
}
</script>

<style>
</style>
