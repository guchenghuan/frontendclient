/*
 * IMT-project
 */

import axios from './../api'

const allinfo = data => {
    return axios({
        url: '/allinfo',
        method: 'post',
        data
    })
}

const getuatpageinfo = data => {
    return axios({
        url: '/getuatpageinfo',
        method: 'post',
        data
    })
}

const eachpageinfo = data => {
    return axios({
        url: '/eachpageinfo',
        method: 'post',
        data
    })
}

const drawpiesdats = data => {
    return axios({
        url: '/drawpiesdats',
        method: 'post',
        data
    })
}

export default {
    allinfo,
    getuatpageinfo,
    eachpageinfo,
    drawpiesdats,
};