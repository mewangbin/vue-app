export default [
  {
    url: '/api/common/login/doLogin',
    method: 'post',
    response: ({ body }) => {
      console.log('body>>>>>>>>', body)
      return { code: '120006', msg: '无效的账户数据!' }
    }
  }
]
