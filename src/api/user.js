import api from './api'

//login
export const login = (data) => {
  return api({
    url: '/user/login',
    method: 'post',
    data: data,
    withCredentials: true,
  })
}