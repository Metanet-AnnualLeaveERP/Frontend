import api from './api'

// vcTotal
export const getVcRemainInfo = () => {
  return api({
    url: '/vacations/remain-info',
    method: 'get',
  })
}
