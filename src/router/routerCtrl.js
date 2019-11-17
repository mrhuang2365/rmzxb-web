import router from './index'
import {getToken, getUserInfo} from '../util/auth'

router.beforeEach((to, from, next) => {
  const user = getUserInfo()
  if (!user || !user.userName) {
    if (to.path !== '/login') {
      next('/login')
    } else {
      next()
    }
  } else {
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  }
})
