import { createStore } from 'vuex'
import httpStore from './modules/httpStore'
import userStore from './modules/userStore'

const store = createStore({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    httpStore: httpStore,
    userStore: userStore
  }
})

export default store
