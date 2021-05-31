import { post } from '../utils/http'

export default {
  login: (data) => {
    return post({
      url: 'common/login/doLogin',
      data: data
    })
  }
}
