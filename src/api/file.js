import api from './api'

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
