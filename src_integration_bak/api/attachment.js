import request from '@/utils/request'

export function del(id) {
  return request({
    url: 'api/attachment_info/' + id + '/',
    method: 'delete'
  })
}
