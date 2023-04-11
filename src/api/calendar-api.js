import axios from 'axios'

const api = axios.create()
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

export const getHolidays = () => {
  const apiKey = 'AIzaSyD7ZIm8LV39UVqb0RiOV0dXdUPE39xMi-M'
  const calendarId = 'ko.south_korea%23holiday%40group.v.calendar.google.com'
  const timeMin = '2023-01-01T00:00:00Z'
  const timeMax = '2024-01-01T00:00:00Z'
  const url = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${apiKey}&orderBy=startTime&singleEvents=true&timeMin=${timeMin}&timeMax=${timeMax}`

  return api({
    url: url,
    method: 'get',
  })
}
