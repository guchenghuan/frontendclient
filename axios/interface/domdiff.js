/*
 * IMT-project
 */

import axios from './../api'

const neewinsert = data => {
    return axios({
        url: '/neewinsert',
        method: 'post',
        data
    })
}
const Fsearch = data => {
    return axios({
        url: '/Fsearch',
        method: 'post',
        data
    })
}

const Ssearch = data => {
    return axios({
        url: '/Ssearch',
        method: 'post',
        data
    })
}

const Tsearch = data => {
    return axios({
        url: '/Tsearch',
        method: 'post',
        data
    })
}

const handsrun = data => {
    return axios({
        url: '/handsrun',
        method: 'post',
        data
    })
}

const setautorun = data => {
    return axios({
        url: '/setautorun',
        method: 'post',
        data
    })
}

const delurlconform = data => {
    return axios({
        url: '/delurlconform',
        method: 'post',
        data
    })
}

export default {
    neewinsert, // 新增
    Fsearch, // 一级搜索
    Ssearch, // 二级搜索
    Tsearch, // 三级搜索
    handsrun, // 手动执行
    setautorun, // 定时执行
    delurlconform, //删除确认
};