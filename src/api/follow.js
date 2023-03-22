import request from '@/utils/request'
import store from '@/store'

// 关注
export function follow(id) {
  return request(({
    url: `/relation/follow/${id}`,
    method: 'post'
  }))
}

// 取消关注
export function unFollow(id) {
  return request(({
    url: `/relation/follow/${id}`,
    method: 'delete'
  }))
}

// 验证是否关注
export function hasFollow(topicUserId) {
  return request(({
    url: `/relation/follow/check/${topicUserId}`,
    method: 'get'
  }))
}

// 获取粉丝数
export function getFollowerCount(userId) {
  return request(({
    url: `/relation/fans/count`,
    method: 'get',
    params: {
      "userId": userId
    }
  }))
}

// 用户关注列表
export function getFollows(userId, current, size) {
  return request(({
    url: `/relation/follow/list/userId/${userId}`,
    method: 'get',
    params: {
      "current": current,
      "size": size
    }
  }))
}
