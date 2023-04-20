/* 휴가사용계획서 api */
import api from './api'

// 사용계획서 조회
export const getListUsePlan = () => {
  return api ({
    url:'useplan',
    method: 'get',
  })
}

// export const get