/**
 * Created by Aaronzm on 2018/5/10.
 */
"use strict";
const authorize = require('./azm/authorize');
import config from '../configs/config';

const events = {
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad (options) {
        let that = this;
        try {
            if (options) {
                Object.assign(that.data.options, options);
                console.warn(`初始化${that.data.text}`, options);
            } else {
                throw {message: '初始化options为空'};
            }
        } catch (e) {
            console.warn(e, options);
        }
        this.__prevPage__ = this.$parent.__prevPage__;
        that.__page.onLoad && that.__page.onLoad.call(this, options);
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow (options) {
        let that = this;
        console.warn(`进入${this.data.text}`, options, 'onShow');
        this.__page.onShow && that.__page.onShow.call(this, options);
        if (that.data.isShow && that.data.isRefresh) {

        }
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide (options) {
        console.warn(`离开${this.data.text}`, options, 'onHide');
        let that = this;
        that.isShow = true;
        this.__page.onHide && that.__page.onHide.call(this, options);
        if (that.data.isShow) {

        }
        that.$parent.__prevPage__ = that;
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload (options) {
        console.log(`离开${this.data.text}`, options, 'onUnload');
        let that = this;
        that.isShow = true;
        this.__page.onUnload && that.__page.onUnload.call(this, options);
        that.$parent.__prevPage__ = that;
    },

    /**
     * 页面渲染完成
     */
    onReady (options) {
        console.warn(`渲染完成${this.data.text}`, options, 'onReady');
        let that = this;
        that.isShow = true;
        this.__page.onReady && that.__page.onReady.call(this, options);
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh (options) {
        console.warn(`下拉触发事件${this.data.text}`, options, 'onPullDownRefresh');
        let that = this;
        this.__page.onPullDownRefresh && this.__page.onPullDownRefresh.call(this, options);
        that.isPullDownRefresh = true;
    },

    stopPullDownRefresh (options) {
        console.warn(`下拉触发事件${this.data.text}结束`, options, 'onPullDownRefresh');
        let that = this;
        that.isPullDownRefresh = false;
        wx.stopPullDownRefresh();
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom (options) {
        console.warn(`上拉触底事件${this.data.text}`, options, 'onReachBottom');
        let that = this;
        this.__page.onReachBottom && this.__page.onReachBottom.call(this, options);
    },

    /**
     * 屏幕滚动事件
     * @param options
     */
    onPageScroll (options) {
        // console.warn(`屏幕滚动事件${this.data.text}`, options, 'onPageScroll');
        let that = this;
        this.__page.onPageScroll && this.__page.onPageScroll.call(this, options);
    },

    onTabItemTap (options) {
        console.warn(`用户点击tap事件触发${this.data.text}`, options, 'onTabItemTap');
        this.__page.onTabItemTap && this.__page.onTabItemTap.call(this, options);
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage (options) {
        console.warn(`用户点击右上角分享${this.data.text}`, options, 'onShareAppMessage');
        let that = this;
        this.__page.onShareAppMessage && this.__page.onShareAppMessage.call(this, options);
    },

    __login (bol) {
        return new Promise((resolve, reject) => {
            function login () {
                wx.login({
                    success (res) {
                        resolve(res)
                    },
                    fail () {
                        reject()
                    }
                })
            }

            if (bol) {
                login();
            } else {
                wx.checkSession({
                    success: function () {
                        //session_key 未过期，并且在本生命周期一直有效
                        resolve();
                    },
                    fail: function () {
                        // session_key 已经失效，需要重新执行登录流程
                        login()
                    }
                });
            }
        })
    },

    __getUserInfo ({lang = 'en', withCredentials = false, timeout = null} = {}) {
        let that = this;
        return new Promise((resolve, reject) => {
            let options = {
                lang,
                withCredentials,
                success (res) {
                    resolve(res)
                },
                fail (res) {
                    reject(res)
                }
            };
            if (timeout) {
                options.timeout = timeout
            }
            authorize.userInfo(true)
                .then(
                    () => {
                        if (withCredentials) {
                            that.__login().then(
                                res => {
                                    wx.getUserInfo(options);
                                }
                            );
                        } else {
                            wx.getUserInfo(options);
                        }
                    },
                    () => {
                        reject();
                    }
                );
        });
    },

    /* 函数描述：作为上传文件时递归上传的函数体体；
     * 参数描述：
     * filePaths是文件路径数组
     * successUp是成功上传的个数
     * failUp是上传失败的个数
     * i是文件路径数组的指标
     * length是文件路径数组的长度
     */
    uploadDIY (filePaths, successUp, failUp, i, length, callback, count) {
        let that = this;
        wx.uploadFile({
            url: `${config.host}/services/uploader/uploadImg`,
            filePath: filePaths[i],
            name: "_file_",
            success: (res) => {
                successUp++;
                let data = res.data;
                if (typeof data === "string") {
                    try {
                        data = JSON.parse(data);
                        if (count > 1) {
                            if (!that[that.__imageUploadKey]) {
                                that[that.__imageUploadKey] = [];
                            }
                            that[that.__imageUploadKey].push(data.info);
                        } else {
                            that[that.__imageUploadKey] = data.info;
                        }
                    } catch (e) {
                    }
                }
                if (data.status === 1) {
                    that.$apply();
                } else {
                    that.$alert(data.info);
                }
            },
            fail: (res) => {
                failUp++;
            },
            complete: () => {
                i++;
                if (i === length) {
                    that.hideLoading();
                    callback && callback();
                    that.isShow = true;
                    that.__imageUploadKey = null;
                    that.showToast('总共' + successUp + '张上传成功,' + failUp + '张上传失败！');
                    that.$apply();
                } else {//递归调用uploadDIY函数
                    that.uploadDIY(filePaths, successUp, failUp, i, length, callback);
                }
            },
        });
    },

    // 图片上传
    ImageUpload (count = 1, key = 'cover') {
        let that = this;
        that.__imageUploadKey = key;
        that.isRefresh = false;
        that.$apply();
        let p = new Promise((resolve, reject) => {
            wx.chooseImage({
                count: count, // 默认9
                sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
                success: res => {
                    // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                    let tempFilePaths = res.tempFilePaths;
                    that.showLoading("正在上传...");
                    let successUp = 0,//成功个数
                        failUp = 0, //失败个数
                        length = tempFilePaths.length, //总共个数
                        i = 0; //第几个
                    that.uploadDIY(tempFilePaths, successUp, failUp, i, length, res => {
                        resolve()
                    }, count);
                },
                fail (res) {
                    reject();
                },
                complete () {
                    that.isRefresh = true;
                    that.$apply();
                }
            });
        });
        p.catch(res => {

        });
        return p;
    },

    __getPrevPage () {
        let path = this.$azmUtil.getCurrentPage(2).__route__,
            pervPage = this.$parent.$pages[`/${path}`];
        console.log(this, pervPage);
        return pervPage;
    },
    __route (path, data) {
        this.$azmUtil.go(path, {data})
    }
};

class Page {
    constructor (appPage = {}, methods = {}) {
        /**
         * 页面的初始数据
         */
        this.data = Object.assign({
            text: `Page`,
            isShow: false,
            isRefresh: true,
            isPullDownRefresh: false,
            options: {},
            imageUrl: config.imageUrl
        }, appPage.data);
        this.__page = appPage;
        this.__prevPage__ = null;
        for (let k in events) {
            this[k] = events[k]
        }
        for (let k in methods) {
            this[k] = methods[k]
        }
    }
}

module.exports = Page;