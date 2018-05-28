// const base = require('../../../mixins/base');
import base from '../../../mixins/base'
Page({
    data: {
        items: [],
        startX: 0, //开始坐标
        startY: 0
    },

    onLoad: function onLoad (options) {

    },

    // 跳转到发布产品
    changeToTest: function changeToTest (e) {
        wx.navigateTo({
            url: '/pages/product/productadd/productadd'
        });
    },


    onReady: function onReady () {
        //生命周期函数--监听页面除此渲染完成
    },

    onShow: function onShow () {
        //生命周期函数--监听页面显示
    },

    onHide: function onHide () {
        //生命周期函数--监听页面隐藏
    },

    onUnload: function onUnload () {
        //生命走起函数--监听页面加载
    },

    onPullDownRefresh: function onPullDownRefresh () {
        //页面相关事件处理函数--监听用户下拉动作
    },

    onReachBottom: function onReachBottom () {
        //页面上拉触底时间处理函数
    },

    onShareAppMessage: function onShareAppMessage () {
        // 用户点击右上角分享
        return {
            title: 'title', //分享标题
            desc: 'desc', //分享描述
            path: 'path' //分享路径
        };
    },
    //手指触摸动作开始 记录起点X坐标
    touchstart: function touchstart (e) {
        var that = this;
        //开始触摸时 重置所有删除
        that.data.items.forEach(function (v, i) {
            if (v.isTouchMove) //只操作为true的
                v.isTouchMove = false;
        });
        that.setData({
            startX: e.changedTouches[0].clientX,
            startY: e.changedTouches[0].clientY,
            items: that.data.items
        });
    },
    //滑动事件处理
    touchmove: function touchmove (e) {
        var that = this,
            index = e.currentTarget.dataset.index,

            //当前索引
            startX = that.data.startX,

            //开始X坐标
            startY = that.data.startY,

            //开始Y坐标
            touchMoveX = e.changedTouches[0].clientX,

            //滑动变化坐标
            touchMoveY = e.changedTouches[0].clientY,

            //滑动变化坐标
            //获取滑动角度
            angle = that.angle({
                X: startX,
                Y: startY
            }, {
                X: touchMoveX,
                Y: touchMoveY
            });
        that.data.items.forEach(function (v, i) {
            v.isTouchMove = false;
            //滑动超过30度角 return
            if (Math.abs(angle) > 30) return;
            if (i == index) {
                if (touchMoveX > startX) //右滑
                    v.isTouchMove = false;
                else //左滑
                    v.isTouchMove = true;
            }
        });
        //更新数据
        that.setData({
            items: that.data.items
        });
    },
    /**
     * 计算滑动角度
     * @param {Object} start 起点坐标
     * @param {Object} end 终点坐标
     */
    angle: function angle (start, end) {
        var _X = end.X - start.X,
            _Y = end.Y - start.Y;
        //返回角度 /Math.atan()返回数字的反正切值
        return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
    },
});