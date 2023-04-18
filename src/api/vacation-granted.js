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