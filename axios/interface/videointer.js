/*
 * IMT-project
 */

import axios from './../api'

const searchvideocase = data => {
    return axios({
        url: '/searchvideocase',
        method: 'post',
        data
    })
}
const videocasenewinsert = data => {
    return axios({
        url: '/videocasenewinsert',
        method: 'post',
        data
    })
}

const getcaseinfo = data => {
    return axios({
        url: '/getcaseinfo',
        method: 'post',
        data
    })
}

const editconform = data => {
    return axios({
        url: '/editconform',
        method: 'post',
        data
    })
}

const performcase = data => {
    return axios({
        url: '/performcase',
        method: 'post',
        data
    })
}

const getLoginfo = data => {
    return axios({
        url: '/getLoginfo',
        method: 'post',
        data
    })
}

const deleteconform = data => {
    return axios({
        url: '/deleteconform',
        method: 'post',
        data
    })
}

export default {
    searchvideocase, // 搜索
    videocasenewinsert, // 新增
    getcaseinfo, // 一键拉取
    editconform, // 编辑备注确定
    performcase, // 执行case
    getLoginfo, //获取日志
    deleteconform, //删除确认
};