import Cookies from 'js-cookie'

const uToken = 'userToken'
const darkMode = 'dark_mode'
const vToken = "verifyToken"

// 获取Token
export function getToken() {
    return Cookies.get(uToken);
}

// 设置Token，浏览器关闭时失效
export function setTokenTemp(token) {
    return Cookies.set(uToken, token)
}

// 设置Token，30天有效
export function setToken(token, expires=30) {
    return Cookies.set(uToken, token, {expires: expires})
}

// 删除Token
export function removeToken() {
    return Cookies.remove(uToken)
}

// 设置安全验证的token
export function setVerifyToken(token, expires=30) {
    return Cookies.set(vToken, token, {expires: expires})
}

// 获取安全验证的Token
export function getVerifyToken() {
    return Cookies.get(vToken);
}

// 删除安全验证的Token
export function removeVerifyToken() {
    return Cookies.remove(vToken)
}

export function removeAll() {
    return Cookies.Cookies.removeAll()
}

export function setDarkMode(mode) {
    return Cookies.set(darkMode, mode, {expires: 365})
}

export function getDarkMode() {
    return !(undefined === Cookies.get(darkMode) || 'false' === Cookies.get(darkMode));
}
