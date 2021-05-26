import axios from 'axios'
import qs from 'qs'
import dayjs from 'dayjs'
import store from '../store'

axios.defaults.baseURL = import.meta.env.VITE_BASE_API_URL
axios.defaults.timeout = 30000
axios.defaults.withCredentials = true
axios.defaults.headers = {
  'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
  'X-Requested-With': 'XMLHttpRequest',
  'Cache-Control': 'no-cache',
  'pragma': 'no-cache'
}

axios.interceptors.request.use(
  (config) => {
    config.cancelToken = new axios.CancelToken((cancel) => {
      let tmpRequest = { url: config.url, cancel: cancel }
      let existed = store.getters['http/existed'](tmpRequest.url)
      if (existed) {
        tmpRequest.cancel('存在重复请求，请求被中断...')
        return
      }
      if (tmpRequest) {
        store.commit('http/push', tmpRequest)
      }
    })
    if (config.method === 'get') {
      config.paramsSerializer = function (params) {
        return qs.stringify(params, {
          arrayFormat: 'repeat',
          serializeDate: (date) => dayjs(date).format('YYYY-MM-DD HH:mm:ss')
        })
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  (response) => {
    setTimeout(() => {
      store.commit('http/remove', response.config.url)
    }, 1000)
    return response.data
  },
  (error) => {
    if (axios.isCancel(error)) {
      return new Promise(() => {})
    }
    if (error.response && error.response.status) {
      setTimeout(() => {
        store.commit('http/remove', error.response.config.url)
      }, 1000)
      return Promise.reject(error.response)
    }
    return Promise.reject(error.message)
  }
)

export function get({ url = '', params = {}, options = {} } = {}) {
  return axios.get(url, Object.assign({ params: params }, options))
}

export function post({ url = '', data = {}, options = {} } = {}) {
  return axios.post(url, data, options)
}
