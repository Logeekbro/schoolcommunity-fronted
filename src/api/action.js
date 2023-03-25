import request from '@/utils/request'

const start = "score"

export function doLike(id) {
    return request({
      url: `/${start}/like/article/id/${id}`,
      method: 'post'
    })
}

export function doUnLike(id) {
    return request({
      url: `/${start}/like/article/id/${id}`,
      method: 'delete'
    })
}

export function isLiked(id) {
    return request({
        url: `/${start}/like/check/article/id/${id}`,
        method: 'get'
    })
}

export function doGuestLike(id) {
    return request({
        url: `/${start}/open/like/${id}/guest`,
        method: 'post'
      })
}

