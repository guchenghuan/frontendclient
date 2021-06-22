/*
 * IMT-project
 */

export default {
    method: 'post',
    // 基础url前缀
    baseURL: 'http://172.16.39.188:6688',
    // 请求头信息
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    // 参数
    data: {},
    // 设置超时时间
    timeout: 1920000,
    // 携带凭证
    withCredentials: false,
    // 返回数据类型
    responseType: 'json'
}