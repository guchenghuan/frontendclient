/*
 * IMT-project
 */

import axios from './../api'

const getvideoinfodata = data => {
    return axios({
        url: '/getvideoinfodata',
        method: 'post',
        data
    })
}

export default {
    getvideoinfodata, // 搜索
};