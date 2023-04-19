/* EMP api */
import api from './api'

// userId로 emp 정보 리턴
export const getMyInfo = () => {
  return api({
    url: '/emp/my-info',
    method: 'get',
  })
}

// 상사 정보 조회
export const getManagerInfo = (id) => {
  return api({
    url: `/emp/manager-info/${id}`,
    method: 'get',
  })
}


// deptId 로 empList 리턴
export const getListEmpByDeptId = (id) => {
  return api({
    url: `/admin/dept-emp-info/${id}`,
    method: 'get',
  })
}

// 사용자 리스트
export const getEmpList = (page, amount, keyword) => {
  return api({
    url:`/admin/emp?pageNum=${page}&amount=${amount}&keyword=${keyword}`,
    // url:'/admin/emp',
    method: 'get'
  });
}

// 사용자 상세 정보
export const getEmpInfo = (empId) => {
  return api({
    url:`/admin/emp/${empId}`,
    method:'get'
  })

}

// 사용자 정보 수정(관리자)
export const modifyEmpInfoByAdmin = (data) => {
  return api({
    url : `/admin/emp/modify`,
    method :'put',
    data : data

  })

}

// 직원등록
export const registerEmp = (data) => {
  return api({
    url : `/admin/emp/create`,
    method :'post',
    data : data
  })

}