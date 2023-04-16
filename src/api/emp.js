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
