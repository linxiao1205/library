//将 axios 封装到一个函数中
import instance from './request.js'
export function request(config) {
  return instance(config)
}
