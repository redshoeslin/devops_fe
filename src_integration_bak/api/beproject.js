import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/beprojects/',
    method: 'post',
    data
  })
}

export function retrieve(id) {
  return request({
    url: 'api/beprojects/' + id + '/',
    method: 'get'
  })
}

export function del(id) {
  return request({
    url: 'api/beprojects/' + id + '/',
    method: 'delete'
  })
}

export function edit(id, data) {
  return request({
    url: 'api/beprojects/' + id + '/',
    method: 'put',
    data
  })
}

export function copy(data) {
  return request({
    url: 'api/beproject/copy/',
    method: 'post',
    data
  })
}
