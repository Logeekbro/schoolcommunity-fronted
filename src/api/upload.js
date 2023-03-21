import request from '@/utils/request'

const headers = {
    'Content-Type': 'multipart/form-data'
}

export function uploadMainPic(file) {
  let data = new FormData()
  data.append("file", file)
  return request({
    url: '/file/upload/mainPic',
    method: 'post',
    headers: headers,
    data: data
  })
}


export function uploadAvatar(file, haveAvatar) {
    let data = new FormData()
    data.append("file", file)
    data.append("haveAvatar", haveAvatar)
    return request({
      url: '/upload/avatar',
      method: 'post',
      headers: headers,
      data: data
    })
}