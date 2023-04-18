// create axois api
import axios from 'axios'
// import store from '@/store/store'
import { errorAlert } from '@/sweetAlert'

const api = axios.create()
api.defaults.baseURL = '/api'

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    const status = error.response.status
    switch (status) {
      case 400:
        console.log(error)
        errorAlert('잘못된 문법입니다.')
        break
      case 401:
        errorAlert('등록되지 않은 정보입니다.')
        break
      case 403:
        errorAlert('접근 권한이 없습니다.')
        break
      case 404:
        errorAlert('해당 요청을 찾을 수 없습니다.')
        break
      case 500:
        errorAlert('서버 에러가 발생하였습니다.')
        break
      case 502:
        errorAlert('Bad Gateway')
        break
      case 502:
        errorAlert('서버가 이용 불가능한 상태입니다.')
        break
    }

    return Promise.reject(error)
  }
)

export default api
