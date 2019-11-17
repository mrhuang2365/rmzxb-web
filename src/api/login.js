import http from '../lib/http'

export function AccountLogin (data) {
  return http.post('/api/user/login.json', data)
}
