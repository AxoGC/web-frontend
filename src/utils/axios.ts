import usePersistedStore from '@/stores/persisted';
import axios from 'axios';
import {ElMessage} from 'element-plus';

export const api = axios.create({
  timeout: 10000,
})

api.interceptors.request.use(config => {
  const persisted = usePersistedStore()
  config.baseURL = persisted.apiAddr
  if (persisted.token) {
    config.headers.set("Authorization", `Bearer ${persisted.token}`)
  }
  return config
}, err => {
  return Promise.reject(err)
})

api.interceptors.response.use(res => {
  if (res.data.message) {
    ElMessage({type: 'success', message: res.data.message})
  }
  return res.data.data
}, err => {
  const res = err.response
  let message: string
  switch (res.status) {
    case 400:
      message = `Request Error: ${res.data.message}`
    case 401:
      message = 'Unauthorized'
    case 403:
      message = 'Forbidden'
    case 404:
      message = 'Not Found'
    case 500:
      message = 'Internal Server Error'
    default:
      message = 'Unknown Error'
  }
  ElMessage({type: 'error', message: message})
  return Promise.reject(err)
})
