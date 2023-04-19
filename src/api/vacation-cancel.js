/* 휴가 취소 */
import api from './api'

// 휴가 취소 생성(요청)
export const createCancel = (data) => {
  return api({
    url: '/emp/vacations/cancel',
    method: 'post',
    data: data,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

// 휴가 취소 내역 조회
export const getCancelList = (pno, a) => {
  return api({
    url: '/vacations/cancel',
    method: 'get',
    params: {
      pageNum: pno,
      amount: a,
    },
  })
}

// 휴가 취소 하나 상세 조회
export const getCancelDetail = (id) => {
  return api({
    url: `/vacations/cancel/${id}`,
    method: 'get',
  })
}
