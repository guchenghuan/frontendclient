/*
 * IMT-project
 */

import axios from './../api'

const login = data => {
  return axios({
    url: '/login',
    method: 'post',
    data
  })
}
const getneedfile = data => {
  return axios({
    url: '/getneedfile',
    method: 'post',
    data
  })
}

const resoleautorun = data => {
  return axios({
    url: '/resoleautorun',
    method: 'post',
    data
  })
}

const checkdata = data => {
  return axios({
    url: '/checkdata',
    method: 'post',
    data
  })
}

const upload = data => {
  return axios({
    url: '/upload',
    method: 'post',
    data
  })
}


export default {
  login,
  getneedfile,
  resoleautorun,
  checkdata,
  upload
};