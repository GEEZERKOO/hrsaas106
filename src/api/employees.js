import request from '@/utils/request'

/* ***
*   获取员工简单列表
* ***/
export function getEmployeesSimple() {
  return request({
    url: '/sys/user/simple'
  })
}

/* ***
*   获取员工综合列表
* ***/
export function getEmployeeList(params) {
  return request({
    url: '/sys/user',
    params
  })
}

/* ***
*   获取员工综合列表
* ***/
export function delEmployee(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'delete'
  })
}

/* ***
*   新增员工
* ***/
export function addEmployee(data) {
  return request({
    url: '/sys/user',
    method: 'post',
    data
  })
}

/* ***
*   导入员工
* ***/
export function importEmployee(data) {
  return request({
    url: '/sys/user/batch',
    method: 'post',
    data
  })
}
