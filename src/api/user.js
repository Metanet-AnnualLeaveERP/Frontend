import api from './api'
import {data} from "autoprefixer";

//login
export const login = (data) => {
  return api({
    url: '/user/login',
    method: 'post',
    data: data,
    withCredentials: true,
  })

}

export const logout = () => {
  return api({
    url: '/user/logout',
    method: 'post'
  })
}

export const disableAccountByAdmin = (data) => {
  return api({
    url: `/admin/user/disable`,
    method:'put',
    data : data
  })
}


export const checkEmailAndPwd=(info)=>{
  return api({
    url:'/user/check',
    method:"GET",
    params: {email: info.email,
      empNum:info.empNum
    }
  })
}
