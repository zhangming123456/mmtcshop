import wepy from 'wepy'
import config from '../configs/config'
import ApiService from './azm/ApiService'
import util from './azm/util'
let noop = () => {
};
let globalData = {
    events: {},
    services: {}
}
class baseMixin extends wepy.mixin {
    constructor (...args) {
        super(...args);
        this.ApiService = ApiService;
        this.$azmUtil = util;
    }

    getSessionIdValue () {
        let sid = c.getSessionId();
        if (sid) {
            return sid.substr(10);
        }
        return sid;
    }

    addEventListener (name, context, listener) {
        if (!globalData.events[name]) {
            globalData.events[name] = []
        }
        globalData.events[name].push({
            context,
            listener
        })
    }

    emitEvent (name, ...params) {
        if (globalData.events[name]) {
            globalData.events[name].forEach(el => {
                if (el.context && el.listener) {
                    el.listener.call(el.context, ...params)
                }
            });
        }
    }

    registerService (name, context, service) {
        globalData.services[name] = {
            context,
            service
        }
    }

    fetchService (name, ...params) {
        if (globalData.services[name]) {
            return globalData.services[name].service.call(globalData.services[name].context, ...params)
        }
        return null;
    }

    $back (delta) {
        wx.navigateBack({
            delta: delta || 1
        })
    }

    $noticePage (method, params, delta) {
        let pages = getCurrentPages()
        if (pages) {
            delta = delta || 2
            let page = pages[pages.length - delta]
            return page[method] && page[method](params || {})
        }
        return ''
    }

    rmSessionId () {
        try {
            wx.removeStorageSync('sid');
        } catch (e) {

        }
    }

    setStorage (key, data) {
        wx.setStorageSync(key, data);
    }

    setUserInfo (data) {
        wx.setStorage({
            key: '_userInfo_',
            data: data
        })
    }

    setUserInfoLogin (info) {
        wx.setStorageSync('_userInfo_', info.data);
        wx.setStorageSync('hasbindedphone', info.hasbindedphone);
        wx.setStorageSync('emptyPwd', info.emptyPwd);
    }

    getUserInfo () {
        let that = this,
            rt = wx.getStorageSync('_userInfo_') || null,
            flag = false,
            app = that.$parent,
            hasbindedphone = wx.getStorageSync('hasbindedphone'),
            emptyPwd = wx.getStorageSync('emptyPwd'),
            isLogin = app.globalData.isLogin;
        if (!util.common.isEmptyObject(rt) && (hasbindedphone === undefined || !isLogin)) {
            flag = true;
            this.ApiService.verifyLogin().then(
                res => {
                    if (res.status === 1) {
                        app.globalData.isLogin = true;
                        that.setUserInfoLogin(res.info)
                        if (!res.info.hasbindedphone || !res.info.data) {
                            this.$redirectTo('/pages/login')
                        }
                    } else {
                        app.globalData.isLogin = false;
                        that.removeStorageSync('_userInfo_');
                    }
                }
            )
        } else {
            if (!rt) {
                this.$redirectTo('/pages/login')
                return
            }
            return rt
        }
    }

    rmUserInfo () {
        wx.removeStorageSync('_userInfo_');
    }

    getPageSize () {
        return 10;
    }

    logoff () {
        this.rmUserInfo();
        this.rmSessionId();
        this.$get('/shopapi/login/logoff');
    }

    getStorage (key) {
        return wx.getStorageSync(key);
    }

    saveSessionId (sid) {
        try {
            wx.setStorageSync('sid', sid);
        } catch (e) {

        }
    }

    getSessionId () {
        try {
            return wx.getStorageSync('sid');
        } catch (e) {
            return null;
        }
    }

    noop () {
        return null;
    }

    confirm (content, onConfirm, onCancel) {
        wx.showModal({
            title: '提示',
            content: content,
            success: function (res) {
                if (res.confirm) {
                    onConfirm && onConfirm();
                } else if (res.cancel) {
                    onCancel && onCancel();
                }
            }
        });
    }

    toast (obj, callback) {
        this.showToast(obj)
        setTimeout(callback, 1000)
    }

    showToast (obj) {
        if (typeof obj === 'string') {
            obj = {
                title: obj
            }
        }
        wx.showToast(obj)
    }

    hideToast () {
        wx.hideToast()
    }

    showLoading (title) {
        wx.showLoading({
            title: title || '加载中...'
        });
    }

    hideLoading () {
        wx.hideLoading()
    }

    $get (url, data, success, complete, error) {
        if (typeof data === 'function') {
            error = complete
            complete = success
            success = data
            data = {}
        }
        this.$ajax({
            url,
            data
        }, {
            success,
            error,
            complete
        })
    }

    $post (url, data, success, complete, error) {
        this.$ajax({
            url,
            data,
            method: "POST"
        }, {
            success,
            complete,
            error
        })
    }

    $ajax ({
               url = '',
               headers = {},
               method = "GET",
               data = {}
           }, {
               success = noop,
               error = null,
               fail = this.$alert,
               complete = noop
           }) {
        error = error || this.$alert
        var sid = this.getSessionId();
        if (sid) {
            headers['cookie'] = sid;
        }
        var url = this.absUrl(url)
        console.log(url)
        var request = {
            url,
            method: method || 'GET',
            header: this.extend({
                'X-Requested-With': 'XMLHttpRequest'
            }, headers),
            data: this.extend({
                _f: 1
            }, data),
            complete,
            fail: (e) => {
                this.$alert(e.errMsg)
            },
            success: ({
                          data,
                          statusCode,
                          header
                      }) => {
                if (header) {
                    var setCookie = header['Set-Cookie'];
                    if (setCookie && setCookie.toString().indexOf('PHPSESSID=') !== -1) {
                        var lpos = setCookie.indexOf(';');
                        if (lpos != -1) {
                            setCookie = setCookie.substr(0, lpos);
                        }
                        this.saveSessionId(setCookie);
                    }
                }
                console.log('[SUCCESS]', statusCode, typeof data === 'object' ? data : data.toString().substring(0, 100))
                if (data.status == 1) { // for success
                    this.isFunction(success) && success.call(this, data.info);
                    this.$apply && this.$apply()
                } else if (data.status == 0) {
                    this.isFunction(error) && error(data.info);
                }
            }
        }
        wepy.request(request);
    };

    $goto (url) {
        wx.navigateTo({
            url: url,
        })
    }

    $redirectTo (url) {
        wx.redirectTo({
            url: url,
        })
    }

    hasOwn (obj, type) {
        return Object.prototype.hasOwnProperty.call(obj, type);
    }

    isUndefined (item) {
        return typeof item === 'undefined';
    }

    extend (...params) {
        return Object.assign(...params)
    }

    isDefined (item) {
        return !this.isUndefined(item);
    }

    isString (item) {
        return typeof item === 'string';
    }

    isNumber (item) {
        return typeof item === 'number';
    }

    absUrl (url) {
        if (url && url.indexOf('://') === -1) {
            return config.host + url
        }
        return url
    }

    isArray (item) {
        return Object.prototype.toString.apply(item) === '[object Array]';
    }

    isObject (item) {
        return typeof item === 'object' && !this.isArray(item);
    }

    isFunction (item) {
        return typeof item === 'function';
    }

    isPhone (str) {
        return /^1\d{10}$/.test(str)
    }

    isEmpty (value) {
        if (value) {
            if (typeof value == 'string') {
                value = value.trim()
                return value === ''
            }
        }
        return true
    }

    $chooseAndUploadImg (callback) {
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: (res) => {
                // 返回选定照片的本地文件路径列表
                let files = res.tempFilePaths
                this.$uploadImg(files[0], callback)
            }
        });
    }

    $uploadImg (filePath, callback) {
        this.showLoading('正在上传...');
        wx.uploadFile({
            url: this.absUrl('/services/uploader/uploadImg'), //仅为示例，非真实的接口地址
            filePath,
            name: "_file_",
            complete: () => {
                this.hideLoading();
            },
            success: res => {
                var data = res.data;
                //do something
                if (typeof data == 'string') {
                    try {
                        data = JSON.parse(data)
                    } catch (e) {

                    }
                }
                if (data.status == 1) {
                    callback && callback(data.info)
                } else {
                    this.$alert(data.info)
                }
            }
        });
    }

    $alert (content, title, success) {
        if (typeof title == 'function') {
            success = title
            title = ''
        }
        wx.showModal({
            title: title || '提示',
            content: content,
            showCancel: false,
            success
        });
    }
}

export default baseMixin;