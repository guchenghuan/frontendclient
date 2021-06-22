/*
 * IMT-project
 */

import axios from './../api'

const getquailtydata = data => {
    return axios({
        url: '/getquailtydata',
        method: 'post',
        data
    })
}

export default {
    getquailtydata, // 搜索
};