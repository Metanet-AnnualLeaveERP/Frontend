/* dept api */
import api from './api'

// 부서 정보 조회
export const getListDept = () => {
  return api({
    url:'/admin/dept',
    method: 'get'
  })
}