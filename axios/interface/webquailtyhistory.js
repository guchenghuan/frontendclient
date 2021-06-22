/*
 * IMT-project
 */

import axios from './../api'

const gethistorydata = data => {
    return axios({
        url: '/gethistorydata',
        method: 'post',
        data
    })
}

export default {
    gethistorydata, // 搜索
};