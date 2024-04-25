import instance from '@/utils/request'

export const getNewsLists = () => {
  return instance.get('/getNewsList')
}

export const loginSys = (data) => {
  return instance.post('/login', data)
}

export const getInfoSys = (token) => {
  return instance.get(`/getInfo?data=${token}`)
}
