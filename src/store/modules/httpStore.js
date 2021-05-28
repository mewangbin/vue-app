// payload:{key:xxx,cancel:xxx}

const httpStore = {
  namespaced: true,
  state: () => ({
    requests: []
  }),
  mutations: {
    push(state, payload) {
      state.requests.push(payload)
    },
    remove(state, key) {
      let index = state.requests.findIndex((item) => item.key === key)
      if (index !== -1) {
        state.requests.splice(index, 1)
      }
    },
    clear(state) {
      state.requests.forEach((item) => {
        console.log('item:', item)
        console.log('取消')
        item.cancel('cancel')
      })
      state.requests = []
    }
  },
  actions: {},
  getters: {
    get: (state) => (key) => {
      return state.requests.find((item) => item.key === key)
    }
  }
}
export default httpStore
