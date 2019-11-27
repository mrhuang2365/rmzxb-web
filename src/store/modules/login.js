import {setToken, setCookie, getCookie, removeToken} from '@/util/auth'
import { AccountLogin } from '@/api/login'

// const crypto = require('crypto-js');

export default {
  namespaced: true,
  actions: {
    /**
     * @description 登录
     * @param {Object} param context
     * @param {Object} param vm {Object} vue 实例
     * @param {Object} param data { name, password, code } 用户账号、密码、验证码
     * @param {Object} param route {Object} 登录成功后定向的路由对象
     */
    accountLogin ({ dispatch }, {
      vm,
      data,
      route = {
        name: 'home'
      }
    }) {
      // 账号请求登录接口
      return AccountLogin(
        data
      )
        .then(async res => {
          // 设置 vuex 用户信息
          await dispatch('user/set', { userName: data.userName }, { root: true })
          vm.$router.replace({path: '/top'})
          return Promise.resolve(res)
        })
        .catch(err => {
          return Promise.reject(err)
        })
    },
    /**
     * @description 注销用户并返回登录页面
     * @param {Object} param context
     * @param {Object} param vm {Object} vue 实例
     * @param {Object} param confirm {Boolean} 是否需要确认
     */
    logout ({ commit, dispatch }, { vm, confirm = false }) {
      /**
       * @description 注销
       */
      async function logout () {
        const loading = vm.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        try {
          await vm.$http.post('/api/user/logout.json', {})
          loading.close()
          dispatch('user/set', null, { root: true })
          // 删除cookie
          removeToken('token')
          removeToken('uuid')
          // 跳转路由
          vm.$router.push({
            name: 'login'
          })
        } catch (error) {
          loading.close()
        }
      }
      // 判断是否需要确认
      if (confirm) {
        vm.$confirm('注销当前账户吗? ', '确认操作', {
          confirmButtonText: '确定注销',
          cancelButtonText: '放弃',
          type: 'warning'
        })
          .then(() => {
            logout()
          })
          .catch(() => {
            vm.$message('放弃注销用户')
          })
      } else {
        logout()
      }
    }
  }
}
