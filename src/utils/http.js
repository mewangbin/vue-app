import axios from 'axios'
import qs from 'qs'
import dayjs from 'dayjs'
import store from '../store'
import { TOKEN_KEY } from '../constants'
import { ElMessage } from 'element-plus'
import md5 from 'js-md5'
import { callWithErrorHandling, onErrorCaptured } from '@vue/runtime-core'

const hashKey = (config) => {
  return md5([config.method, config.url, qs.stringify(config.params), qs.stringify(config.data)].join('&'))
}

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
    const key = hashKey(config)
    let existed = store.getters['http/getByKey'](key)
    if (existed) {
      existed.cancel('操作太频繁，请稍后再试...')
      store.commit('http/remove', key)
    }
    config.cancelToken = new axios.CancelToken((cancelToken) => {
      store.commit('http/add', { key: key, cancel: cancelToken })
    })
    config.paramsSerializer = function (params) {
      return qs.stringify(params, {
        arrayFormat: 'repeat',
        serializeDate: (date) => dayjs(date).format('YYYY-MM-DD HH:mm:ss')
      })
    }
    config.transformRequest = [
      (data, headers) => {
        // post fix
        if (headers['Content-Type'].startsWith('application/x-www-form-urlencoded')) {
          return qs.stringify(data)
        }
        if (headers['Content-Type'].startsWith('multipart/form-data')) {
          return data
        }
        return JSON.stringify(data)
      }
    ]

    let token = sessionStorage.getItem(TOKEN_KEY)
    token && (config.headers[TOKEN_KEY] = token)
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  (response) => {
    setTimeout(() => {
      store.commit('http/remove', hashKey(response.config))
    }, 1000)
    const token = response.headers[TOKEN_KEY]
    token && sessionStorage.setItem(TOKEN_KEY, token)
    return Promise.resolve(response.data)
  },
  (error) => {
    if (axios.isCancel(error)) {
      return new Promise(() => {})
    }
    if (error.response) {
      switch (error.response.status) {
        case 200:
          error.message = '错误响应也会有状态码为200的情况'
          break
        case 400:
          error.message = '请求错误'
          break
        case 401:
          error.message = '未授权，请重新登录'
          break
        case 403:
          error.message = '拒绝访问'
          break
        case 404:
          error.message = '请求出错'
          break
        case 408:
          error.message = '请求超时'
          break
        case 500:
          error.message = '服务器错误'
          break
        case 501:
          error.message = '服务未实现'
          break
        case 502:
          error.message = '网络错误'
          break
        case 503:
          error.message = '服务不可用'
          break
        case 504:
          error.message = '网络超时'
          break
        case 505:
          error.message = 'HTTP版本不受支持'
          break
        default:
          error.message = '连接出错'
      }
      return Promise.reject(error)
    }
    if (error.request) {
      error.message = '请求失败'
      return Promise.reject(error)
    }
    error.message = '未知的错误'
    return Promise.reject(error)
  }
)

export function get({ url = '', params = {}, options = {} } = {}) {
  return axios.get(url, Object.assign({ params: params }, options))
}

export function post({ url = '', data = {}, options = {} } = {}) {
  return axios.post(url, data, options)
}
