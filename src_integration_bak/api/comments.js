import request from '@/utils/request'

export function getComments() {
  return request({
    url: 'api/comments/',
    method: 'get'
  })
}

export function add(data) {
  return request({
    url: 'api/comments/',
    method: 'post',
    data
  })
}
