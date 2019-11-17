import jsCookie from 'js-cookie'

const TokenKey = 'H_TOKEN'
const USER_INFO = 'H_USER_INFO'

window.__cookie = jsCookie

const twoHours = new Date(new Date().getTime() + 2 * 60 * 60 * 1000)

export function setCookie (key, value, option) {
  jsCookie.set(key, value, option)
}
export function getCookie (key) {
  return jsCookie.get(key)
}
export function removeCookie (key) {
  jsCookie.remove(key)
}

export function getToken () {
  return getCookie(TokenKey)
}

export function setToken (token) {
  // 过期时间2小时
  setCookie(TokenKey, token, { expires: twoHours })
}

export function removeToken () {
  removeCookie(TokenKey)
}

export function setUserInfo (value) {
  localStorage.setItem(USER_INFO, JSON.stringify(value))
}
export function getUserInfo () {
  return JSON.parse(localStorage.getItem(USER_INFO))
}
export function removeUserInfo () {
  return localStorage.removeItem(USER_INFO)
}
