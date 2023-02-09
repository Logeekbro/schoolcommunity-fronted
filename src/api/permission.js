import request from '@/utils/request'

const start = "user/permission"

// 获取用户角色id列表
export function getUserRoleIdList() {
    return request({
        url: `/${start}/roleIdList`,
        method: 'get'
    })
}

// 获取所有权限列表
export function getAllPermission() {
    return request({
        url: `/${start}/all`,
        method: 'get'
    })
}

// 新增权限
export function addPermission(permission) {
    return request({
        url: `/${start}/`,
        method: 'post',
        data: permission
    })
}