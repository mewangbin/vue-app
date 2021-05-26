import { createStore } from 'vuex'

const store = createStore({
  namespaced: true,
  modules: {
    http: {
      namespaced: true,
      state: () => ({
        requests: []
      }),
      getters: {
        existed: (state) => (url) => {
          return state.requests.findIndex((item) => item.url === url) !== -1
        }
      },
      mutations: {
        push(state, request) {
          state.requests.push(request)
        },
        remove(state, url) {
          let index = state.requests.findIndex((item) => item.url === url)
          if (index !== -1) {
            state.requests.splice(index, 1)
          }
        },
        clear(state) {
          state.requests.forEach((item) => {
            item.cancel('cancel same request')
          })
          state.requests = []
        }
      }
    }
  }
})

export default store
