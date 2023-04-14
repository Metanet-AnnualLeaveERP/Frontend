import client from './api'

//login
export const login = (data) => {
  return client({
    url: '/api/user/login',
    method : 'post',
    data : data,
    withCredentials : true
  });
}
