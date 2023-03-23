import request from '@/utils/request'

const start = "/user/role"

// 获取用户的拥有的角色id列表
export function getUserRoleIdList(userId) {
    return request(({
        url:`${start}/list/id`,
        method: "get",
        params: {userId}
    }))
}