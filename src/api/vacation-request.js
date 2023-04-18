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
export const getVcReqListPaging = (p, n) => {
  return api({
    url: '/vacations',
    method: 'get',
    params: {
      page: p,
      pageNum: n,
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
