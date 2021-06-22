/*
 * IMT-project
 */

import apiLogin from './interface/login'
import apiVideo from './interface/videointer'
import apiwebquailty from './interface/webquailty'
import apidrivers from './interface/driverscase'
import apidomdiff from './interface/domdiff'
import apionlinepro from './interface/onlinepro'
import apivideopageinfo from './interface/videopageinfo'
import apiwebquailtyhistory from './interface/webquailtyhistory'
import apidomdiffinfo from './interface/domdiffinfo'
import apiwebactivity from './interface/webactivity'
import apiwebcoverage from './interface/webcoverage'

const install = Vue => {
    if (install.installed)
        return;
    install.installed = true;

    Object.defineProperties(Vue.prototype, { // 注意哦，此处挂载在 Vue 原型的 $api 对象上
        $http: {
            get() {
                // PS: 这里没有区分命名空间
                return Object.assign(
                    {},
                    apiLogin,
                    apiVideo,
                    apiwebquailty,
                    apidrivers,
                    apidomdiff,
                    apionlinepro,
                    apivideopageinfo,
                    apiwebquailtyhistory,
                    apidomdiffinfo,
                    apiwebactivity,
                    apiwebcoverage
                )
                // 如果需要区分命令空间的话可以参考以下写法
                // {
                //     apiLogin,
                //     apiRegister,
                //     apiPublish
                // }
            }
        }
    })
}

export default install