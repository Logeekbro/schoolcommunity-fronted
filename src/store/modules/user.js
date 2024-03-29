import { getUserInfo, login, logout } from "@/api/auth/auth";
import { getToken, setToken, setTokenTemp, removeToken } from "@/utils/auth";
import { getUserRoleIdList } from "@/api/role";
import { getBasicInfo } from "@/api/user";
import { removeViewCache } from '@/utils/view-cache'

const state = {
  token: getToken(), // token
  user: "", // 用户对象
  avatarTS: Date.now(), // 头像更新的时间戳，用于解决缓存问题
  avatarMap: new Map(), // 已获取的用户头像, 避免重复发送请求
  verifyVisible: false,  // 控制验证码界面是否可见
};

const mutations = {
  SET_TOKEN_STATE: (state, token) => {
    state.token = token;
  },
  SET_USER_STATE: (state, user) => {
    state.user = user;
  },
  SET_AVATAR_STATE: (state, ts) => {
    state.avatarTS = ts
  },
  SET_AVATAR_MAP_VALUE_STATE: (state, obj) => {
    const { userId, avatar } = obj
    state.avatarMap.set(userId, avatar)
  },
  SET_VERIFY_VISIBLE: (state, visible) => {
    state.verifyVisible = visible
  }
};

const actions = {
  // 用户登录
  login({ commit }, userInfo) {
    const { account, password, rememberMe } = userInfo;
    return new Promise((resolve, reject) => {
      login({ account: account.trim(), password: password })
        .then((response) => {
          const { data } = response;
          commit("SET_TOKEN_STATE", data.access_token);
          if (rememberMe) {
            setToken(data.access_token);
          }
          else {
            setTokenTemp(data.access_token)
          }
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  // 获取用户信息
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getBasicInfo()
        .then(async (response) => {
          const { data } = response;
          if (!data) {
            commit("SET_TOKEN_STATE", "");
            commit("SET_USER_STATE", "");
            removeToken();
            resolve();
            reject("Verification failed, please Login again.");
          }
          const rep = await getUserRoleIdList(data.userId)
          data.roleIdList = rep.data
          data.avatar += "?" + state.avatarTS
          commit("SET_USER_STATE", data);
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  // 注销
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout()
        .then((response) => {
          commit("SET_TOKEN_STATE", "");
          commit("SET_USER_STATE", "");
          removeToken();
          removeViewCache();
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  updateAvatar({ commit }, ts) {
    commit("SET_AVATAR_STATE", ts)
  },
  setAvatar({ commit }, obj) {
    commit("SET_AVATAR_MAP_VALUE_STATE", obj)
  },
  changeVerifyVisible({ commit }, v) {
    commit("SET_VERIFY_VISIBLE", v)
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
