/* 휴가부여관리 api */
import api from './api'

// 휴가부여내역 조회
export const getListGrantedVc =(p, n) => {
  return api({
    url:'/admin/vacations/granted',
    method: 'get',
    params: {
      page: p,
      pagenum: n,
    },
  })
}