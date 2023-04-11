import axios from 'axios'
// import swal from 'sweetalert2'
import store from '@/store/index'

const client = axios.create()
client.defaults.baseURL = '/'

const token = store.state.token
client.defaults.headers.common['Authorization'] = `Bearer ${token}`
// console.log(token)

client.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response.status == 401 || error.response.status == 403) {
      // swal.fire({
      //   title: '로그인 실패',
      //   text: '입력 정보가 잘못되었습니다.',
      //   icon: 'info',
      // })
      alert('ㄴㄴ');
    }
    return Promise.reject(error);
  }
)

export default client
