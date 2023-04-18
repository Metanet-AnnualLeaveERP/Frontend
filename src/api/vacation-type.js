/* 휴가 유형 관리 api*/
import api from './api'

// 휴가 유형 조회
export const getVcTypeList = () => {
  return api({
    url: '/admin/vacations/type',
    method: 'get',
  })
}

// 휴가 유형 생성
export const insertVcTypeList = (data) => {
  return api({
    url: '/admin/vacations/type',
    method: 'post',
    data: data,
  })
}

// 휴가 유형 삭제
export const deleteVcType = (typeId) => {
  return api({
    url: `/admin/vacation/type/${typeId}`,
    method: 'delete'
  })
}

//휴가 유형 수정
export const updateVcType = (typeId, data) => {
  return api({
    url: `/admin/vacation/type/${typeId}`,
    method: 'put',
    data:data
  })
}
