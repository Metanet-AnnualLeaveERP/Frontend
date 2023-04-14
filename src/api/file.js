import api from './api'

/* 파일 업로드 */
export const upload = (data) => {
  return api({
    url: '/files/upload',
    method: 'post',
    data: data,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

/* 파일 다운로드 */
export const download = (data) => {
  console.log(data)
  return api({
    url: '/files/download',
    // 파일 경로를 url에 보이지 않기 위해 post 전송
    method: 'post',
    data: data,
    responseType: 'blob',
  })
}
