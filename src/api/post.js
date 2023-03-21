import request from '@/utils/request'
import store from '@/store'


const start = "article"

const headers = {
  'Content-Type': 'multipart/form-data'
}

// 用户主页文章列表
export function getInfoByName(username, page, size) {
  return request({
    url: `/${start}/list/userId/${username}`,
    method: 'get',
    params: {
      current: page,
      size: size
    }
  })
}

// 获取首页文章
export function getList(pageNo, size, type, sectionId=null) {
  return request(({
    url: `/${start}/${type}`,
    method: 'get',
    params: { current: pageNo, size: size, sectionId: sectionId }
  }))
}

// 发布
export function post(topic) {
  // let data = new FormData()
  // data.append("title", topic.title)
  // data.append("mainPic", topic.mainPic)
  // data.append("content", topic.content)
  // data.append("sectionId", topic.sectionId)
  // data.append("summary", topic.summary)
  // data.append("tags", JSON.stringify(topic.tags))
  // data.append("needReview", topic.needReview)
  return request({
    url: `/${start}/`,
    method: 'post',
    data: topic
  })
}

// 获取文章详情
export function getTopicDetail(id, isReEdit=false) {
  return request({
    url: `/${start}/detail/${id}`,
    method: 'get',
    params: {isReEdit: isReEdit}
  })
}

// 获取详情页推荐
export function getRecommendTopics(id) {
  return request({
    url: `/${start}/recommend`,
    method: 'get',
    params: {
      topicId: id
    }
  })
}

// 更新
export function update(topic) {
  let data = new FormData()
  data.append("articleId", topic.articleId)
  data.append("authorId", topic.authorId)
  data.append("title", topic.title)
  data.append("sectionId", topic.sectionId)
  data.append("file", topic.file)
  data.append("content", topic.content)
  data.append("summary", topic.summary)
  data.append("needReview", topic.needReview)
  return request({
    url: `/${start}/`,
    method: 'put',
    data: data,
    headers: headers
  })
}

// 删除
export function deleteTopic(id) {
  return request({
    url: `/${start}/my/id/${id}`,
    method: 'delete',
  })
}

// 用户发表的文章数量
export function getArticleCount(id) {
  return request({
    url: `/${start}/count/userId/${id}`,
    method: 'get',
  })
}

// 用户浏览记录
export function getUserHistory(current, size){
  const params = {
    current: current,
    size: size
  }
  return request({
    url: `/view/history/${store.getters.token}`,
    method: 'get',
    params: params
  })
}

// 获取首页置顶文章
export function getIndexTop(sectionId) {
  const params = {
    "sectionId": sectionId
  }
  return request({
    url: `/${start}/top`,
    method: 'get',
    params: params
  })
}

// 通过文章id获取文章标题
export function getTitleByArticleId(articleId) {
  return request({
    url: `/${start}/title/${articleId}`,
    method: 'get'
  })
}

// 获取活跃作者信息
export function getActiveAuthors(n) {
  return request({
    url: `/${start}/activeAuthors/${n}`,
    method: 'get'
  })
}

// 获取待审核的文章列表
export function getNeedReviewArticleList() {
  return request({
    url: `/${start}/review/list`,
    method: 'get'
  })
}

// 更新文章审核状态
export function updateReviewArticleStatus(articleId, desc = '', isPass) {
  return request({
    url: `/${start}/review/result/articleId/${articleId}`,
    method: 'put',
    params: {
      isPass: isPass,
      description: desc
    }
  })
}

// 用户获取自己的待审核的文章列表
export function getNeedReviewArticleListByUserId() {
  return request({
    url: `/${start}/review/list/my`,
    method: 'get'
  })
}

// 获取审核未通过的文章列表
export function getUnPassReviewListByUserId() {
  return request({
    url: `/${start}/review/unPass`,
    method: 'get'
  })
}

// 直接根据id删除文章，需要管理员权限
export function deleteArticleById(articleId) {
  return request({
    url: `/${start}/id${articleId}`,
    method: 'delete'
  })
}

// 将文章设为置顶或取消置顶，需要管理员权限
export function changeArticleTopStatus(articleId) {
  return request({
    url: `/${start}/topStatus`,
    method: 'put',
    params: {articleId: articleId}
  })
}


