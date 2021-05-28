import axios from 'axios'
import qs from 'qs'
import dayjs from 'dayjs'
import md5 from 'js-md5'
import store from '../store'
import { TOKEN_KEY } from '../constants'
import { ElMessage } from 'element-plus'

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
    let existed = store.getters['httpStore/get'](key)
    if (existed) {
      existed.cancel('操作太频繁，请稍后再试...')
      store.commit('httpStore/remove', key)
    }
    config.cancelToken = new axios.CancelToken((cancelToken) => {
      store.commit('httpStore/push', { key: key, cancel: cancelToken })
    })
    config.paramsSerializer = function (params) {
      return qs.stringify(params, {
        arrayFormat: 'repeat',
        serializeDate: (date) => dayjs(date).format('YYYY-MM-DD HH:mm:ss')
      })
    }
    let token = store.getters['userStore/getToken']
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
      store.commit('httpStore/remove', hashKey(response.config))
    }, 1000)

    if (!response.data.code) {
      return response.data
    }
    const {
      data: { code, message, data }
    } = response

    if (code === '0') {
      const token = response.headers[TOKEN_KEY]
      if (token) {
        store.commit('userStore/setToken', token)
      }
      return data
    }
    if (code === '10001') {
      if (router.currentRoute.path === '/login') {
        return
      }
      store.dispatch('userStore/reset')
      router.replace({
        path: '/login'
      })
      ElMessage.error('token认证失败或token过期,请重新登录')
    }
    return Promise.reject(response.data)
  },
  (error) => {
    if (axios.isCancel(error)) {
      return new Promise(() => {})
    }
    if (error.response && error.response.status) {
      setTimeout(() => {
        store.commit('httpStore/remove', hashKey(error.response.config))
      }, 1000)
      return Promise.reject(error.response)
    }
    return Promise.reject(error.message)
  }
)

export function promiseWrap(promise) {
  return promise.then((data) => [data, null]).catch((err) => [null, err])
}

export function get({ url = '', params = {}, options = {} } = {}) {
  return axios.get(url, Object.assign({ params: params }, options))
}

export function post({ url = '', data = {}, options = {} } = {}) {
  return axios.post(url, data, options)
}
