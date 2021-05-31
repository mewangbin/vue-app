// 请求相关
const http = {
  namespaced: true,
  state: () => ({
    requests: []
  }),
  mutations: {
    add(state, request) {
      state.requests.push(request)
    },
    remove(state, key) {
      let index = state.requests.findIndex((item) => item.key === key)
      if (index !== -1) {
        state.requests.splice(index, 1)
      }
    },
    clear(state) {
      state.requests.forEach((item) => {
        console.log('取消')
        item.cancel('cancel')
      })
      state.requests.length = 0
    }
  },
  getters: {
    getByKey: (state) => (key) => {
      return state.requests.find((item) => item.key === key)
    }
  }
}
export default http
