import request from '@/utils/request'

/* 获取组织架构数据 */
export function getDepartments() {
  return request({
    url: '/company/department'
  })
}

/** *
 * 根据id删除部门 restful规则 删除delete 新增post 修改put 获取get
 * ***/
export function delDepartments(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'delete'
  })
}
