import request from '@/utils/request'

export function run(data) {
  return request({
    url: 'api/jenkins/',
    method: 'post',
    data
  })
}
export function reject(data) {
  return request({
    url: 'api/jenkins/',
    method: 'put',
    data
  })
}
