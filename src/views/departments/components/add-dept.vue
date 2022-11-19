<template>
  <!-- 新增部门的弹层 -->
  <el-dialog
    title="新增部门"
    :visible="showDialog"
  >
    <!-- 表单弹层 label-width设置标题的宽度 -->
    <el-form
      :model="formData"
      :rules="rules"
      label-width="120px"
    >
      <el-form-item
        label="部门名称"
        prop="name"
      >
        <el-input
          v-model="formData.name"
          style="width:80%"
          placeholder="1-50个字符"
        />
      </el-form-item>
      <el-form-item
        label="部门编码"
        prop="code"
      >
        <el-input
          v-model="formData.code"
          style="width:80%"
          placeholder="1-50个字符"
        />
      </el-form-item>
      <el-form-item
        label="部门负责人"
        prop="manager"
      >
        <el-select
          v-model="formData.manager"
          style="width:80%"
          placeholder="请选择"
        />
      </el-form-item>
      <el-form-item
        label="部门介绍"
        prop="introduce"
      >
        <el-input
          v-model="formData.introduce"
          style="width:80%"
          placeholder="1-300个字符"
          type="textarea"
          :rows="3"
        />
      </el-form-item>
    </el-form>
    <!-- 底部内容 确定和取消 -->
    <el-row
      slot="footer"
      type="flex"
      justify="center"
    >
      <el-col :span="6">
        <el-button size="small">取消</el-button>
        <el-button
          type="primary"
          size="small"
        >确定</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getDepartments } from '@/api/departments'
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    treeNode: {
      type: Object,
      default: null
    }
  },
  data() {
    // 定义函数找同级目录下是否有重复的部门名称
    const checkNameRepeat = async(rules, value, callback) => {
      // 获取最新的数据
      const { depts } = await getDepartments()
      const isRepeat = depts.filter(item => item.pid === this.treeNode.id).some(item => item.name === value)
      isRepeat ? callback(new Error(`同级目录下已经存在${value}这个部门`)) : callback()
    }

    // 定义函数检查编码重复
    const checkCodeRepeat = async(rules, value, callback) => {
      const { depts } = await getDepartments()
      // 要求编码和所有的部门编码都不能重复
      // 由于历史数据可能没有code 所有要加一个强制性条件 value不能为空
      const isRepeat = depts.some(item => item.code === value && value) // 这里加一个value不为空，因为部门有可能没有code
      isRepeat ? callback(new Error(`组织架构中已经有部门使用${value}编码`)) : callback()
    }
    return {
      formData: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门负责人
        introduce: '' // 部门介绍
      },
      rules: {
        name: [{ required: true, message: '部门名称不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门名称长度为1-50个字符', trigger: 'blur' }, {
            trigger: 'blur', validator: checkNameRepeat // 自定义函数校验
          }],
        code: [{ required: true, message: '部门编码不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门编码长度为1-50个字符', trigger: 'blur' }, {
            trigger: 'blur', validator: checkCodeRepeat
          }],
        manager: [{ required: true, message: '部门负责人不能为空', trigger: 'blur' }],
        introduce: [{ required: true, message: '部门介绍不能为空', trigger: 'blur' },
          { min: 1, max: 300, message: '部门名称介绍为1-300个字符', trigger: 'blur' }]
      } // 校验规则 {key：数组}
    }
  }
}
</script>

<style>
</style>
