const $ = require('../../../mixins/base.js').default.prototype;
Page({
    data: {
        dataList: [],
        shop_id: '',
        clickId: "",
        showView: false
    },
    onLoad: function onLoad(options) {
        $.showLoading()
        $.$get('/shopapi/technician/major',res=>{            
            this.setData({
                dataList: res,
                clickId:$.fetchService('getTechnicianCategory')||0
            });
        },()=>{
            $.hideLoading()
        })
    },
    // 点击改变字体颜色
    changeColor: function changeColor(e) {
        var that = this;
        var id = e.currentTarget.dataset.id;
        that.setData({
            clickId: id
        });
    },
    
    formSubmit: function formSubmit(e) {        
        let idx = parseInt(e.detail.value.professionName)                        
        $.emitEvent('selectTechnicianCategory',this.data.dataList[idx].id,this.data.dataList[idx].title);
        wx.navigateBack();
    },

    onReady: function onReady() {
        //生命周期函数--监听页面除此渲染完成
    },

    onShow: function onShow() {
        //生命周期函数--监听页面显示
    },

    onHide: function onHide() {
        //生命周期函数--监听页面隐藏
    },

    onUnload: function onUnload() {
        //生命走起函数--监听页面加载
    },

    onPullDownRefresh: function onPullDownRefresh() {
        //页面相关事件处理函数--监听用户下拉动作
    },

    onReachBottom: function onReachBottom() {
        //页面上拉触底时间处理函数
    },

    onShareAppMessage: function onShareAppMessage() {
        // 用户点击右上角分享
        return {
            title: 'title', //分享标题
            desc: 'desc', //分享描述
            path: 'path' //分享路径
        };
    }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Zlc3Npb24uanMiXSwibmFtZXMiOlsiYXBwIiwiZ2V0QXBwIiwiUGFnZSIsImRhdGEiLCJkYXRhTGlzdCIsInNob3BfaWQiLCJjbGlja0lkIiwib25Mb2FkIiwib3B0aW9ucyIsInRoYXQiLCJodHRwVXJsIiwid3giLCJyZXF1ZXN0IiwidXJsIiwibWV0aG9kIiwic3VjY2VzcyIsInJlcyIsImNvbnNvbGUiLCJsb2ciLCJzZXREYXRhIiwiaW5mbyIsImNoYW5nZUNvbG9yIiwiZSIsImlkIiwiY3VycmVudFRhcmdldCIsImRhdGFzZXQiLCJmb3JtU3VibWl0IiwiZGV0YWlsIiwidmFsdWUiLCJyYWRpb0dyb3VwIiwiYWxsVmFsdWUiLCJwcm9mZXNzaW9uIiwibmF2aWdhdGVUbyIsIm9uUmVhZHkiLCJvblNob3ciLCJvbkhpZGUiLCJvblVubG9hZCIsIm9uUHVsbERvd25SZWZyZXNoIiwib25SZWFjaEJvdHRvbSIsIm9uU2hhcmVBcHBNZXNzYWdlIiwidGl0bGUiLCJkZXNjIiwicGF0aCJdLCJtYXBwaW5ncyI6Ijs7QUFDQSxVQUNBLEFBQUksQUFBTTs7Ozs7a0JBS0Y7aUJBREUsQUFDUSxBQUNWO2lCQUpILEFBRUQsQUFBTSxBQUVPLEFBQ1QsQUFBUztrQkFHYixBQUFRLEFBQVUsQUFBUztBQU5yQjs7cUNBUUY7O2tCQUNBLG9DQUFJO0FBQUosQUFBVyxBQUNYO1lBQUEsQUFBSyxBQUFLLE9BQVYsQUFBb0IsQUFBUSxBQUM1QjtBQUFJO1lBQ0osQUFBVyxBQUNQLGtGQUFLO1dBREUsQUFFUDtpQkFGTyxBQUdQLEFBQVE7a0JBSEQsQUFJUCxBQUFTO29CQUFBLEFBQVUsQUFBSyxBQUNwQixBQUFRLEFBQUksQUFDWjs7NEJBQ0EsQUFBSyxBQUFRO0FBQWIsQUFBYSxBQUNULEFBQVUsQUFBSSxBQUFLOzt1Q0F0QmxDLEFBYUcsQUFBYyxBQUE4RCxBQUFLLEFBQUssQUFDdEYsQUFBRyxBQVlOO0FBWmMsQUFPSCxBQUdIO0FBSVQ7QUFaYztBQWFkLEFBQWEsQUFBVSxBQUFHLEFBQ3hCOztBQUNFO0FBQUksaUJBQUosQUFBVyx3QkFDWCxBQUFJO0FBQUssQUFBRSxBQUNYLEFBQUs7bUJBREwsQUFBUyxBQUFnQixBQUFRLEFBQ2pDLEFBQWEsQUFDVCxBQUFTO3lDQURiLEFBR0g7O3FCQUNELEFBQVksQUFBVSxBQUFHLEFBQ3ZCLEFBQVEsQUFBSSxBQUEwQixBQUFFLEFBQU8sQUFBTSxBQUNuRDtBQXZDSDs7aUNBd0NHLEFBQUksQUFBSyxBQUFTLEFBQVcsQUFDN0IsQUFBSSxBQUFLLEFBQVMsQUFBYSxBQUFFLEFBQU8sQUFBTSxBQUM5Qzs7OztBQUNBLEFBQUcsQUFBVyxBQUNaLEFBQUs7QUE1Q1YsQUEyQ0csQUFHSDs7O0FBRUQsQUFBUyxBQUFZLEFBQ2pCOzs7NkRBR0osQUFBUSxBQUFZLEFBQ2hCOztzQ0FyREgsQUFrREEsQ0FsREEsQUFzREE7Ozs4QkFFRCxhQXhEQyxBQXdETyxBQUFZLEFBQ2hCLEFBQ0g7O3dCQUVELEFBQVUsQUFBWSxBQUNsQjtBQTdESCxBQThEQTs7O0FBRUQsQUFBbUIsQUFBWSxBQUMzQjtBQWpFSCxBQWtFQTs7O0FBRUQsQUFBZSxBQUFZLEFBQ3ZCO0FBckVILEFBc0VBOzs7QUFFRCxBQUFtQixBQUFZLEFBQzNCO0FBQ087O3VCQUNIO0FBREcsQUFDSSxBQUFTLEFBQ2hCO0FBNUVaLEFBQUssQUEwRUcsQUFBTyxBQUVHLEFBQU8sQUFDYixBQUFNLEFBQU8sQUFFcEI7O29EQS9FTCxBQUFLIiwiZmlsZSI6InByb2Zlc3Npb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuLy8gdmFyIGh0dHBVcmwgPSAnaHR0cDovL2FkbWluLm1tYXBwL3Nob3BhcGkvdGVjaG5pY2lhbi9tYWpvcj9zaG9wX2lkPTQ0OTgnXHJcbnZhciBhcHAgPSBnZXRBcHAoKTtcclxuXHJcblBhZ2Uoe1xyXG5cclxuICAgIGRhdGE6IHtcclxuICAgICAgICBkYXRhTGlzdDogW10sXHJcbiAgICAgICAgc2hvcF9pZDogJycsXHJcbiAgICAgICAgY2xpY2tJZDogXCJcIlxyXG4gICAgfSxcclxuXHJcbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIChvcHRpb25zKSB7XHJcblxyXG4gICAgICAgIC8vIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5Yqg6L29XHJcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzXHJcbiAgICAgICAgdGhhdC5kYXRhLnNob3BfaWQgPSBvcHRpb25zLnNob3BfaWRcclxuICAgICAgICB2YXIgaHR0cFVybCA9ICdodHRwczovL2FwcC5tbXRjYXBwLmNvbS9zaG9wYXBpL3RlY2huaWNpYW4vbWFqb3I/c2hvcF9pZD0nICsgdGhhdC5kYXRhLnNob3BfaWRcclxuICAgICAgICB3eC5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgdXJsOiBodHRwVXJsLFxyXG4gICAgICAgICAgICBkYXRhOiB7fSxcclxuICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZGF0YUxpc3QpXHJcbiAgICAgICAgICAgICAgICB0aGF0LnNldERhdGEoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGFMaXN0OiByZXMuZGF0YS5pbmZvXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgLy8g54K55Ye75pS55Y+Y5a2X5L2T6aKc6ImyXHJcbiAgICBjaGFuZ2VDb2xvcjogZnVuY3Rpb24gKGUpIHtcclxuICAgICAgLy8gY29uc29sZS5sb2coZSlcclxuICAgICAgICB2YXIgdGhhdCA9IHRoaXNcclxuICAgICAgICB2YXIgaWQgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pZFxyXG4gICAgICAgIHRoYXQuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgIGNsaWNrSWQ6IGlkXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBmb3JtU3VibWl0OiBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBjb25zb2xlLmxvZygnZm9ybeWPkeeUn+S6hnN1Ym1pdOS6i+S7tu+8jOaQuuW4puaVsOaNruS4uu+8micsIGUuZGV0YWlsLnZhbHVlLnJhZGlvR3JvdXApXHJcbiAgICAgICAgLy8gdGhpcy5zZXREYXRhKHtcclxuICAgICAgICBhcHAuZGF0YS5hbGxWYWx1ZS5wcm9mZXNzaW9uPScnO1xyXG4gICAgICAgIGFwcC5kYXRhLmFsbFZhbHVlLnByb2Zlc3Npb24gPSBlLmRldGFpbC52YWx1ZS5yYWRpb0dyb3VwXHJcbiAgICAgICAgLy8gfSlcclxuICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgIHVybDogJy4uL2RldGFpbHMvZGV0YWlscycsXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgb25SZWFkeTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8v55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLpmaTmraTmuLLmn5PlrozmiJBcclxuICAgIH0sXHJcblxyXG4gICAgb25TaG93OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy/nlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouaYvuekulxyXG4gICAgfSxcclxuXHJcbiAgICBvbkhpZGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvL+eUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i6ZqQ6JePXHJcbiAgICB9LFxyXG5cclxuICAgIG9uVW5sb2FkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy/nlJ/lkb3otbDotbflh73mlbAtLeebkeWQrOmhtemdouWKoOi9vVxyXG4gICAgfSxcclxuXHJcbiAgICBvblB1bGxEb3duUmVmcmVzaDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8v6aG16Z2i55u45YWz5LqL5Lu25aSE55CG5Ye95pWwLS3nm5HlkKznlKjmiLfkuIvmi4nliqjkvZxcclxuICAgIH0sXHJcblxyXG4gICAgb25SZWFjaEJvdHRvbTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8v6aG16Z2i5LiK5ouJ6Kem5bqV5pe26Ze05aSE55CG5Ye95pWwXHJcbiAgICB9LFxyXG5cclxuICAgIG9uU2hhcmVBcHBNZXNzYWdlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8g55So5oi354K55Ye75Y+z5LiK6KeS5YiG5LqrXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdGl0bGU6ICd0aXRsZScsIC8v5YiG5Lqr5qCH6aKYXHJcbiAgICAgICAgICAgIGRlc2M6ICdkZXNjJywvL+WIhuS6q+aPj+i/sFxyXG4gICAgICAgICAgICBwYXRoOiAncGF0aCcsLy/liIbkuqvot6/lvoRcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pIl19