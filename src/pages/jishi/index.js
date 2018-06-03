const $ = require('../../mixins/base.js').default.prototype;
Page({
    data: {
        isShowPage: false,
        items: [],
        startX: 0, //开始坐标
        startY: 0
    },
    onReady () {
        this.setData({
            isShowPage: true
        })
    },
    onLoad: function onLoad () {
        this.loadData()
        $.addEventListener('addNewTechnician', this, this.onAddNewTech)
    },
    onShow () {
        if (this.data.isShowPage) {
            this.loadData()
        }
    },
    // 跳转页面 
    changeToTest: function changeToTest (e) {
        console.log(e)
        var id = e.currentTarget.dataset.id;
        var shop_id = e.currentTarget.dataset.shopid;
        if (id) {
            wx.navigateTo({
                url: 'detail/details?id=' + id + '&shop_id=' + shop_id
            });
        } else {
            wx.navigateTo({
                url: 'detail/details'
            });
        }
    },
    loadData () {
        $.$get('/shopapi/technician/technician/major', res => {
            this.setData({
                items: res
            });
        })
    },
    onAddNewTech (data) {
        if (!data.isNew) {
            this.data.items.forEach(element => {
                if (element.id == data.id) {
                    element = Object.assign(element, data)
                }
            });
        } else {
            // this.data.items.unshift(data)
            this.loadData()
        }
        this.setData({
            items: this.data.items
        })
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
                    v.isTouchMove = false; else //左滑
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
    //删除事件
    del: function del (e) {
        // debugger;
        var that = this;
        var id = e.currentTarget.dataset.id;
        var shop_id = e.currentTarget.dataset.shopid;
        var url = 'https://app.mmtcapp.com/shopapi/technician/tec_del?id=' + id + '&shop_id=' + shop_id;
        wx.request({
            url: url,
            data: {},
            method: 'GET',
            success: function success (res) {
                that.data.items.splice(e.currentTarget.dataset.index, 1);
                that.setData({
                    items: that.data.items
                });
            }
        });
    }
});