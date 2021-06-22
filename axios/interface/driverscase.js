/*
 * IMT-project
 */

import axios from './../api'

const drivercaserun = data => {
    return axios({
        url: '/drivercaserun',
        method: 'post',
        data
    })
}
const getallcases = data => {
    return axios({
        url: '/getallcases',
        method: 'post',
        data
    })
}

const getlogdatainfo = data => {
    return axios({
        url: '/getlogdatainfo',
        method: 'post',
        data
    })
}

const getcodeinfo = data => {
    return axios({
        url: '/getcodeinfo',
        method: 'post',
        data
    })
}

const resetmainvideo = data => {
    return axios({
        url: '/resetmainvideo',
        method: 'post',
        data
    })
}

export default {
    drivercaserun, // 一键执行
    getallcases, // 拉取
    getlogdatainfo, // 查看日志
    getcodeinfo, // 查看代码
    resetmainvideo, // 重置状态
};