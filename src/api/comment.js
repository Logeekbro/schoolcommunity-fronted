import request from '@/utils/request'
import store from '@/store'

const start = "article/comment"

// 获取文章的评论列表
export function fetchCommentsByTopicId(articleId, current, size) {
  const params = {
    articleId: articleId,
    current: current,
    size: size
  }
  return request({
    url: `/${start}/list`,
    method: 'get',
    params: params
  })
}

// 添加评论
export function pushComment(data) {
  return request({
    url: `/${start}/`,
    method: 'post',
    data: data
  })
}

// 用户删除自己的评论
export function deleteComment(id) {
  return request({
    url: `/${start}/self`,
    method: 'delete',
    params: {
      "commentId": id
    }
  })
}

