import request from '@/utils/request'
import store from '@/store'



// 用户公开信息
export function getOpenInfo(userId){
  return request({
    url: `/user/info/basic/${userId}`,
    method: 'get',
  })
}

// 用户基础信息
export function getBasicInfo(){
  return request({
    url: `/user/info/basic`,
    method: 'get',
  })
}

// 用户关注列表
export function getFollows(userId){
  return request({
    url: `/user/followList/${userId}`,
    method: "get"
  })
}

// 用户设置中心信息
export function getInfo() {
  return request({
    url: `/user/info/detail`,
    method: 'get',
  })
}
// 更新
export function update(user) {
  return request({
    url: '/user/info/',
    method: 'put',
    data: user
  })
}

// 修改密码
export function updatePassword(passwordForm){
  return request({
    url: `/user/info/password`,
    method: 'put',
    data: {
      oldPwd: passwordForm.oldPassword,
      newPwd: passwordForm.newPassword
    }
  })
}

// 获取用户头像
export function getAvatar(userId) {
  return request({
    url: `/user/info/avatar`,
    method: 'get',
    params: {
      "userId": userId
    }
  })
}

// 获取用户昵称
export function getNickNameByUserId(userId) {
  return request({
    url: `/user/info/nickName`,
    method: 'get',
    params: {
      "userId": userId
    }
  })
}

// 通过文章id获取用户的id和昵称
export function getAuthorIdAndNickNameByArticleId(articleId) {
  return request({
    url: `/user/open/articleIdToAuthorInfo/${articleId}`,
    method: 'get'
  })
}




