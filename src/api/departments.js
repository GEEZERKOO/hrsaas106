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

/**
*   新增部门接口
** */
export function addDepartments(data) {
  return request({
    url: '/company/department',
    method: 'post',
    data
  })
}

/**
*   获取某个部门的详情
** */
export function getDepartDetali(id) {
  return request({
    url: `/company/department/${id}`
  })
}

/**
*   编辑部门
** */
export function updateDepartments(data) {
  return request({
    url: `/company/department/${data.id}`,
    method: 'put',
    data
  })
}
