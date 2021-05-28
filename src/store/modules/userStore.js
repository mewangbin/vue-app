// payload:{key:xxx,cancel:xxx}
import { TOKEN_KEY } from '../../constants'
const userStore = {
  namespaced: true,
  state: () => ({
    token: sessionStorage.getItem(TOKEN_KEY)
  }),
  mutations: {
    setToken: (state, playLoad) => {
      state.token = playLoad
      sessionStorage.setItem(TOKEN_KEY, playLoad)
    },
    removeToken: (state) => {
      state.token = null
      sessionStorage.removeItem(TOKEN_KEY)
    }
  },
  actions: {
    reset: ({ commit }) => {
      commit('removeToken')
    }
  },
  getters: {
    getToken: (state) => state.token
  }
}
export default userStore
