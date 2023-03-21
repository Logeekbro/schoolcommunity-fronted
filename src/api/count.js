import request from '@/utils/request'

const start = "count"

export function getLikeCount(id) {
    return request(({
        url: `/score/like/${start}/article/id/${id}`,
        method: 'get'
    }))
}

export function getCommentCount(id) {
    return request(({
        url: `/article/comment/${start}`,
        method: 'get',
        params: {
            articleId: id
        }
    }))
}

export function getViewCount(id) {
    return request(({
        url: `/visit/${start}/article`,
        method: 'get',
        params: {
            articleId: id
        }
    }))
}