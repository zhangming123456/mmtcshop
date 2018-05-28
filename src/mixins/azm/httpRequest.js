"use strict";
Promise.prototype.finally = function (callback) {
    let P = this.constructor;
    return this.then(
        value => P.resolve(callback()).then(() => value),
        reason => P.resolve(callback()).then(() => {
            throw reason
        })
    );
};

const app = getApp(),
    util = require('./util'),
    utilCommon = require('./utilCommon'),
    Fly = require('./fly.min');
function getFly (params = {}) {
    let fly = new Fly();
    let sid = util.getSessionId(),
        config = {};
    config.timeout = 15000;
    config.headers = {
        'Content-Type': params.contentType || 'application/json' // 默认值
    };
    config.dataType = 'json';
    config.parseJson = params.contentType ? false : true;

    if (sid) {
        config.headers['cookie'] = sid;
    }
    if (params.baseURL) {
        config.baseURL = params.baseURL;
    }
    Object.assign(fly.config, config);
    //添加拦截器
    fly.interceptors.request.use((config, promise) => {
        //给所有请求添加自定义header
        app.interceptors && app.interceptors.request && app.interceptors.request(config, promise);
        return config;
    });

    //添加响应拦截器，响应拦截器会在then/catch处理之前执行
    fly.interceptors.response.use(
        (res) => {
            app.interceptors && app.interceptors.response && app.interceptors.response('success', res);
            //只将请求结果的data字段返回
            res.data.status = parseInt(res.data.status);
            let setCookie = res.headers['Set-Cookie'];
            if (setCookie && setCookie.indexOf('PHPSESSID=') !== -1) {
                let lpos = setCookie.indexOf(';');
                if (lpos != -1) {
                    setCookie = setCookie.substr(0, lpos);
                }
                wx.setStorageSync('sid', setCookie);
            }
            wx.hideNavigationBarLoading();//停止标题loading
            // wx.hideLoading();

            let page = util.getCurrentPage(),
                path = page.route;
            if (res.data.status === 202 && path !== 'pages/login') {
                util.go('/pages/login', {type: 'blank'})
            }
            return res.data
        },
        (err) => {
            app.interceptors && app.interceptors.response && app.interceptors.response('err', err);
            //发生网络错误后会走到这里
            //return Promise.resolve("ssss")
        }
    );
    return fly;
}
let showToast = (message, cb) => {
    let page = getCurrentPages();
    if (page.showToast) {
        page.showToast(message);
    } else {
        util.showToast(message);
    }
};
let failToast = (message, cb) => {
    let page = getCurrentPages();
    if (page.showToast) {
        page.showToast(message);
    } else {
        util.failToast(message);
    }
};

class HttpRequest {
    constructor () {
        this.requestTask = []
    }

    request (params, resolve) {
        let retryNum = 0,
            url = params.url,
            promise = null,
            reject = null,
            isLoading = false,
            isReturnStatus = false;//是否显示加载信息
        for (let i = 2; i < arguments.length; i++) {
            if (utilCommon.isBoolean(arguments[i])) {
                isReturnStatus = arguments[i];
            }
            if (utilCommon.isFunction(arguments[i])) {
                reject = arguments[i];
            }
        }
        let _url = url.split('/')
        console.log(`_____请求数据${_url[_url.length - 1]}______`, params.data);
        if (params.data.config && params.data.config.isLoading) {
            isLoading = params.data.config.isLoading;
            delete params.data.config;
        }
        delete params.url;
        if (params.method && params.method.toLocaleLowerCase() === 'post') {
            params.header = {
                "Content-Type": "application/x-www-form-urlencoded"
            }
            params.contentType = "application/x-www-form-urlencoded"
        }
        if (params.flag) {
            url += '?' + util.requestParametersMerge(params.data);
            params.data = null;
        }
        for (let k in params.data) {
            params.data[k] = utilCommon.isFalse(params.data[k]);
            if (!params.data[k] && !utilCommon.isNumberOfNaN(params.data[k])) {
                params.data[k] = '';
            }
        }

        function failCallback (res) {
            retryNum++;
            let text = '网络连接失败，或服务器错误' + '{' + res.errMsg + '}';
            if (res.statusCode === 404) {
                text = '网络连接失败'
            } else if (res.statusCode === 500) {
                text = '服务器错误'
            }
            let confirmText = '知道了';
            // debugger
            // if (retryNum >= 3) {
            //     text += '（已重试' + retryNum + '次,超过重试次数，请检查网络状态并重新打开小程序）';
            // } else {
            //     text += '（已重试' + retryNum + '次）';
            // }
            wx.showModal({
                title: '提示',
                content: text,
                showCancel: false,
                confirmText: confirmText,
                success: function (rsp) {
                    if (rsp.confirm) {
                        if (retryNum < 3) {
                            // setRequest();
                        } else {
                            // failCallback(res);
                        }
                    } else if (rsp.cancel) {

                    }
                }
            });
        }

        if (isLoading) {
            util.showLoading('加载中');
            return setPromise();
        } else {
            return setPromise();
        }

        function setPromise () {
            let p = new Promise((_resolve, _reject) => {
                let flag = false;
                promise = null;
                wx.showNavigationBarLoading();
                if (!params.data) {
                    params.data = {};
                }
                params.data['_f'] = 1;
                let _data = util.queryString.stringify(params.data);
                let fly = getFly(params);
                if (params.method === 'GET') {
                    promise = fly.get(url, _data)
                } else if (params.method === 'POST') {
                    promise = fly.post(url, _data)
                }
                promise.then(res => {
                    console.log(`_____响应数据${_url[_url.length - 1]}______`, res);
                    _resolve && _resolve(res)
                }).catch(_reject)
            });
            p.catch(err => {
            });
            return p
        }
    };

    post (url, options, resolve, reject) {
        let data = options || {};
        let params = {
            url,
            data,
            method: 'POST'
        };
        return this.request(params, resolve, reject);
    };

    get (url, options, resolve, reject) {
        let data = options || {};
        let params = {
            url,
            data,
            method: 'GET'
        };
        return this.request(params, resolve, reject);
    };

    postParm (url, options, resolve, reject) {
        let data = options || {};
        let params = {
            url,
            data,
            flag: true,
            method: 'POST'
        };
        return this.request(params, resolve, reject);
    };
}

module.exports = {
    HttpRequest
};