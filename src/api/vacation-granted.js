/* 휴가부여관리 api */
import api from './api'

// 휴가부여내역 조회
export const getListGrantedVc =(p, a) => {
  return api({
    url:'/admin/vacations/granted',
    method: 'get',
    params: {
      pageNum: p,
      amount: a,
    },
  })
}
// empId 로 해당 직원 연차내역 조회
export const getAnnualLeaveByEmpId = (id) => {
  return api ({
    url:`/admin/vacations/granted-annual/${id}`,
    method:`get`,
  })
}

// 휴가신청 상세조회
export const getGrantedVcDetail = (id) => {
  return api({
    url:`/admin/vacations/granted/${id}`,
    method:'get',
  })
}

// 휴가부여 추가
export const insertGrantedVc = (data) => {
  return api({
    url: '/admin/vacations/granted',
    method:'post',
    data:data
  })
}

// 휴가부여 삭제
export const deleteGrantedVc = (id) => {
  return api({
    url:`/admin/vacations/granted/${id}`,
    method:'delete',
  })
}