import request from '@/utils/request'
import store from '@/store'


// 添加回复
export function addReply(commentId, content, target){
    return request(({
        url:`/article/reply/`,
        method: "post",
        data: {
            commentId: commentId,
            target: target,
            content: content
        }
    }))
}

// 获取回复列表
export function getReplyList(commentId, current, size){
    const params = {
        commentId: commentId,
        current: current,
        size: size
    }
    return request(({
        url: `/article/reply/list/`,
        method: "get",
        params: params
    }))
}

// 删除回复
export function deleteReplyById(replyId){
    return request(({
        url: `/reply/self/`,
        method: "delete",
        params: {
            replyId: replyId
        }
    }))
}

// 获取回复数量
export function getReplyCount(commentId){
    return request(({
        url: `/article/reply/count/`,
        method: "get",
        params: {
            commentId: commentId
        }
    }))
}