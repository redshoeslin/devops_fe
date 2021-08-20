import request from '@/utils/request'

export function mention_mail(data) {
  return request({
    url: 'api/mention/',
    method: 'post',
    data
  })
}
