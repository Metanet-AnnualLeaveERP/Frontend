/* Certificate */
import api from './api'

// 증명서 리스트 조회
export const getCertificateList = (pno, a) => {
  return api({
    url: '/certificates',
    method: 'get',
    params: {
      pageNum: pno,
      amount: a,
    },
  })
}

// 증명서 상세 조회
// 휴가 신청 하나 상세 조회
export const getCertificateDetail = (id) => {
  return api({
    url: `/certificates/${id}`,
    method: 'get',
  })
}

// 증명서 발급
export const createCertificate = (data) => {
  return api({
    url: '/certificates',
    method: 'post',
    data: data,
  })
}
