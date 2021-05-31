import { createStore } from 'vuex'
import http from './modules/http'
import user from './modules/user'

const store = createStore({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    http: http,
    user: user
  }
})

export default store
