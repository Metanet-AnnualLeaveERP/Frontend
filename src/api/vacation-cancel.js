/* 휴가 취소 */

import api from './api'

export const getCancelApprovalList = (cri) => {
  return api({
    url: `/manager/vacations/cancel?pageNum=${cri.pageNum}
        &amount=10&keyword=${cri.keyword}`,
    method: 'GET',
  })
}

export const getCancelApproval = (cancelId) => {
  return api({
    url: `/vacations/cancel/${cancelId}`,
    method: 'GET',
  })
}

export const approvalCancelSuccess = (params) => {

  return api({
    url: `/manager/vacations/cancel/${params.cancelId}`,
    method: 'PUT',
    params: {
      comment: params.comments ? params.comments : null,
      status: params.vcStatus,
    },
  })
}

// 휴가 취소 생성(요청)
export const createCancel = (id, data) => {
  return api({
    url: `/emp/vacations/cancel/${id}`,
    method: 'post',
    data: data,
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
