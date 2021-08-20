import request from '@/utils/request'

export function publish(data) {
  return request({
    url: 'api/publish/',
    method: 'post',
    data
  })
}
