/*
 * IMT-project
 */

import axios from './../api'

const insertproblemdata = data => {
    return axios({
        url: '/insertproblemdata',
        method: 'post',
        data
    })
}

const getproblemdata = data => {
    return axios({
        url: '/getproblemdata',
        method: 'post',
        data
    })
}

const delproblemdata = data => {
    return axios({
        url: '/delproblemdata',
        method: 'post',
        data
    })
}

export default {
    getproblemdata, // 搜索
    insertproblemdata,
    delproblemdata
};