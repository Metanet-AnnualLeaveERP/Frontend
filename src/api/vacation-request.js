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
  return api({
    url: `/vacations/${id}`,
    method: 'get',
  })
}

// 팀원 휴가 승인내역 조회 (캘린더용)
export const getMyTeamSchedule = () => {
  return api({
    url: '/vacations/my-team',
    method: 'get',
  })
}

/*부서별 잔여 TO (모든 팀원의 휴가들을 날짜별로 to에서 차감)*/
export const getEntireRemainVcTo = () => {
  return api({
    url: '/vacations/remain-to',
    method: 'get',
  })
}
