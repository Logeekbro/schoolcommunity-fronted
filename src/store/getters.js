const getters = {
  token: state => state.user.token,   // token
  user: state => state.user.user,     // 用户对象
  avatarTS: state => state.user.avatarTS,
  avatarMap: state => state.user.avatarMap,
  verifyVisible: state => state.user.verifyVisible,
  roles: state => state.user.roleIdList
}

export default getters

