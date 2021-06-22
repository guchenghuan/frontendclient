/*
 * IMT-project
 */

import axios from './../api'

const insertcoverage = data => {
    return axios({
        url: '/insertcoverage',
        method: 'post',
        data
    })
}

const editcoverage = data => {
    return axios({
        url: '/editcoverage',
        method: 'post',
        data
    })
}

const getAllcoverage = data => {
    return axios({
        url: '/getAllcoverage',
        method: 'post',
        data
    })
}

const searchcoverage = data => {
    return axios({
        url: '/searchcoverage',
        method: 'post',
        data
    })
}

const tooglecoverage = data => {
    return axios({
        url: '/tooglecoverage',
        method: 'post',
        data
    })
}

const getnewfile = data => {
    return axios({
        url: '/getnewfile',
        method: 'post',
        data
    })
}

export default {
    insertcoverage, // 新增覆盖率数据
    editcoverage, // 编辑覆盖率数据
    getAllcoverage, // 查询全部覆盖率数据
    searchcoverage, // 搜索覆盖率数据
    tooglecoverage, // 覆盖率开关
    getnewfile  // 覆盖率开关
};