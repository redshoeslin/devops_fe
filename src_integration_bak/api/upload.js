import request from '@/utils/request'

export function upload(data) {
  return request({
    url: 'api/upload/',
    method: 'post',
    data
  })
}

export function download(name, apply_id) {
  return request({
    url: 'api/upload/?name=' + name + '&apply_id=' + apply_id,
    method: 'get'
  })
}
