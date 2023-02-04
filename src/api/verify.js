import request from '@/utils/request'

const start = "security/verify"

// 获取验证码相关信息
export function startVerify() {
    return request({
        url: `/${start}/start`,
        method: "get"
    })
}

// 进行验证
export function doVerify(verifyId, value) {
    return request({
        url: `/${start}/verify/${verifyId}`,
        method: "get",
        params: {
            value: value
        }
    })
}