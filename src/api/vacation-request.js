/* 휴가 신청 api */
import api from './api'

// 휴가 신청 생성
export const createRequest = (data) => {
  return api({
    url: '/emp/vacations',
    method: 'post',
    data: data,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

// 휴가 신청 내역 조회
export const getVcReqList = (p, pno, a) => {
  return api({
    url: '/vacations',
    method: 'get',
    params: {
      paging: p,
      pageNum: pno,
      amount: a,
    },
  })
}

// 휴가 신청 하나 상세 조회
export const getVcReqDetail = (id) => {
  console.log(id)
  return api({
    url: `/vacations/${id}`,
    method: 'get',
  })
}

export const getTeamApprovalList=(cri)=>{

  return api({
    url:`/manager/vacations/approval?pageNum=${cri.pageNum}&amount=10&keyword=${cri.keyword}`,
    method:'GET'
  })
}
// 팀원 휴가 승인내역 조회 (캘린더용)
export const getMyTeamSchedule = () => {
  return api({
    url: '/vacations/my-team',
    method: 'get',
  })
}


export const approvalProcess=(reqId,status,comment=null)=>{
  console.log(reqId,status,comment)
  return api({
    url:`/manager/vacations/confirm/${reqId}`,
    params:{
      status: status,
      comment: comment
    },
    method:"PUT"
  })
}