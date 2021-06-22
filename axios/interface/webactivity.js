/*
 * IMT-project
 */

import axios from './../api'

const runactivity = data => {
    return axios({
        url: '/runactivity',
        method: 'post',
        data
    })
}

const getallactivityinfo = data => {
    return axios({
        url: '/getallactivityinfo',
        method: 'post',
        data
    })
}

const geteachinfo = data => {
    return axios({
        url: '/geteachinfo',
        method: 'post',
        data
    })
}

const deleachinfo = data => {
    return axios({
        url: '/deleachinfo',
        method: 'post',
        data
    })
}

export default {
    runactivity, // 开始执行测试
    getallactivityinfo, // 获取全部数据
    geteachinfo, // 检索每条数据详情
    deleachinfo, // 删除单条数据
};