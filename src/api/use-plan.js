/* 휴가사용계획서 api */
import api from './api'

// 사용계획서 조회
export const getListUsePlan = (id) => {
  return api ({
    url:`useplan/datelist/${id}`,
    method: 'get',
  })
}


// 사용계획서 입력
export const insertUsePlan = (data) =>{
  return api ({
    url: 'useplan/list',
    method: 'post',
    data: data
  })
}