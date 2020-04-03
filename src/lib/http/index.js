/**
 * 前端统一Http请求接口
 * 自动带token请求
 */
import axios from 'axios'
import { Message } from 'element-ui'
import router from '../../router'
import { getToken, removeUserInfo } from '../../util/auth'
import {Base64} from '../../util/util'

console.log('process.env:', process.env)
let baseURL = Base64.decode(process.env.BASE_API)
if (location.hostname === Base64.decode('aHR0cDovLzE3Mi4yMC4yNTQuMjI1')) {
  baseURL = Base64.decode(process.env.LOCAL_API)
}

// 创建一个 axios 实例
const service = axios.create({
  baseURL: baseURL,
  timeout: 10000 // 请求超时时间
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 在请求发送之前做一些处理
    if (!(/^https:\/\/|http:\/\//.test(config.url))) {
      const token = getToken()
      if (token && token !== 'undefined') {
        // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
        config.headers['X-Token'] = token
      }
    }
    return config
  },
  error => {
    Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    // dataAxios 是 axios 返回数据中的 data
    const dataAxios = response.data
    // 这个状态码是和后端约定的
    const { code, msg } = dataAxios
    // 根据 errCode 进行判断
    if (code === undefined) {
      // 如果没有 errCode 代表这不是项目后端开发的接口 比如可能是 D2Admin 请求最新版本
      return dataAxios
    } else {
      // 有 errCode 代表这是一个后端接口 可以进行进一步的判断
      switch (code) {
        case 0:
          // [ 示例 ] code === 0 代表没有错误
          return dataAxios
        case 406:
          removeUserInfo()
          router.replace('/login')
          break
        default :
          // [ 示例 ] 其它和后台约定的 code
          Message.error(msg)
          throw new Error(msg)
      }
    }
  },
  error => {
    if (error && error.response) {
      const data = error.response.data
      const msg = data && (data.msg || data.message)
      if (msg) Message.error(msg)
      // switch (error.response.status) {
      //   case 400: error.message = '请求错误'; break
      //   case 401: 
      //     // error.message = '未授权，请登录'
      //     // removeToken()
      //     // router.replace('/login')
      //     break
      //   case 403: error.message = '拒绝访问'; break
      // case 404: error.message = `请求地址出错: ${error.response.config.url}`; break
      //   case 408: error.message = '请求超时'; break
      //   case 500: error.message = '服务器内部错误'; break
      //   case 501: error.message = '服务未实现'; break
      //   case 502: error.message = '网关错误'; break
      //   case 503: error.message = '服务不可用'; break
      //   case 504: error.message = '网关超时'; break
      //   case 505: error.message = 'HTTP版本不受支持'; break
      //   default: break
      // }
    }
    return Promise.reject(error)
  }
)

export default service
