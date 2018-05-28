const $ = require('../../../mixins/base.js').default.prototype;
Page({

    data: {
        dataList: [],
        name:''
    },
    //表单提交按钮
    formSubmit: function formSubmit(e) {
        // console.log('form发生了submit事件，携带数据为：', e.detail.value.type_id);
        $.emitEvent('setTypeName',e.detail.value.type_id)
        wx.navigateBack();        
    },
    onLoad: function onLoad(options) {
        // 生命周期函数--监听页面加载
        $.showLoading();
        $.$get('/shopapi/technician/category',res=>{
            var name = $.fetchService('getTypeName') || ''
            this.setData(
                {
                    name,
                    dataList: res
                }
            )
        },()=>{
            $.hideLoading()
        })
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
    },
    currentPro(e) {
      this.setData({
        name: e.currentTarget.dataset.title
      })
    //   console.log(e.currentTarget.dataset.title)
    }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9jY3VwYXRpb25zLmpzIl0sIm5hbWVzIjpbImFwcCIsImdldEFwcCIsImh0dHBVcmwiLCJQYWdlIiwiZGF0YSIsImRhdGFMaXN0IiwiZm9ybVN1Ym1pdCIsImUiLCJjb25zb2xlIiwibG9nIiwiZGV0YWlsIiwidmFsdWUiLCJ0eXBlX2lkIiwiYWxsVmFsdWUiLCJvY2N1cGF0aW9ucyIsInd4IiwibmF2aWdhdGVUbyIsInVybCIsIm9uTG9hZCIsIm9wdGlvbnMiLCJpbmZvIiwicmVxdWVzdCIsIm1ldGhvZCIsInN1Y2Nlc3MiLCJyZXMiLCJzZXREYXRhIiwiZmFpbCIsImNvbW1wbGV0ZSIsIm9uUmVhZHkiLCJvblNob3ciLCJvbkhpZGUiLCJvblVubG9hZCIsIm9uUHVsbERvd25SZWZyZXNoIiwib25SZWFjaEJvdHRvbSIsIm9uU2hhcmVBcHBNZXNzYWdlIiwidGl0bGUiLCJkZXNjIiwicGF0aCJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJLE1BQUosQUFBVTtBQUNWLElBQUksVUFBSixBQUFjOztBQUVkOzs7a0JBQUssQUFFSSxBQUNRLEFBRWI7QUFISyxBQUNEO0FBR0o7Z0JBQVksb0JBQUEsQUFBVSxHQUFHLEFBQ3ZCO2dCQUFBLEFBQVEsSUFBUixBQUFZLDBCQUEwQixFQUFBLEFBQUUsT0FBRixBQUFTLE1BQS9DLEFBQXFELEFBQ25EO1lBQUEsQUFBSSxLQUFKLEFBQVMsU0FBVCxBQUFrQixjQUFsQixBQUFnQyxBQUNoQztZQUFBLEFBQUksS0FBSixBQUFTLFNBQVQsQUFBa0IsY0FBYyxFQUFBLEFBQUUsT0FBRixBQUFTLE1BQXpDLEFBQStDLEFBQy9DO1dBQUEsQUFBRztpQkFBSCxBQUFjLEFBQ1AsQUFFUDtBQUhjLEFBQ1o7QUFHRjtBQUNBO0FBQ0g7QUFoQkEsQUFpQkQ7WUFBTyxnQkFBQSxBQUFTLFNBQVEsQUFDcEI7QUFFQTs7WUFBSSxPQUFKLEFBQVcsQUFFWDs7V0FBQSxBQUFHO2lCQUFRLEFBQ0YsQUFDTDtrQkFGTyxBQUVGLEFBQ0w7b0JBSE8sQUFHQSxBQUNQO3FCQUFRLGlCQUFBLEFBQVMsS0FBSSxBQUNqQjtBQUNBO3FCQUFBLEFBQUs7OEJBQ1EsSUFBQSxBQUFJLEtBRGpCLEFBQWEsQUFDUyxBQUV6QjtBQUhnQixBQUNUO0FBUEQsQUFVUDtrQkFBSyxnQkFBVSxBQUVkLENBWk0sQUFhUDt1QkFBVSxxQkFBVSxBQUVuQixDQWZMLEFBQVcsQUFpQmQ7QUFqQmMsQUFDUDtBQXZCUCxBQXlDRDs7YUFBUSxtQkFBVSxBQUNkO0FBQ0g7QUEzQ0EsQUE2Q0Q7O1lBQU8sa0JBQVUsQUFDYjtBQUNIO0FBL0NBLEFBaUREOztZQUFPLGtCQUFVLEFBQ2I7QUFDSDtBQW5EQSxBQXFERDs7Y0FBUyxvQkFBVSxBQUNmO0FBQ0g7QUF2REEsQUF5REQ7O3VCQUFrQiw2QkFBVSxBQUN4QjtBQUNIO0FBM0RBLEFBNkREOzttQkFBYyx5QkFBVSxBQUNwQjtBQUNIO0FBL0RBLEFBaUVEOzt1QkFBa0IsNkJBQVUsQUFDeEI7QUFDQTs7bUJBQU8sQUFDRyxTQUFTLEFBQ2Y7a0JBRkcsQUFFRSxRQUFPLEFBQ1o7a0JBSEcsQUFHRSxPQUhULEFBQU8sQUFHUyxBQUVuQjtBQUxVLEFBQ0g7QUFwRVosQUFBSztBQUFBLEFBRUQiLCJmaWxlIjoib2NjdXBhdGlvbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgYXBwID0gZ2V0QXBwKCk7XHJcbnZhciBodHRwVXJsID0gJ2h0dHA6Ly9hZG1pbi5tbWFwcC9zaG9wYXBpL3RlY2huaWNpYW4vY2F0ZWdvcnknXHJcblxyXG5QYWdlKHtcclxuXHJcbiAgICBkYXRhOntcclxuICAgICAgICBkYXRhTGlzdDpbXVxyXG4gICAgfSxcclxuICAgIC8v6KGo5Y2V5o+Q5Lqk5oyJ6ZKuXHJcbiAgICBmb3JtU3VibWl0OiBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBjb25zb2xlLmxvZygnZm9ybeWPkeeUn+S6hnN1Ym1pdOS6i+S7tu+8jOaQuuW4puaVsOaNruS4uu+8micsIGUuZGV0YWlsLnZhbHVlLnR5cGVfaWQpXHJcbiAgICAgICAgYXBwLmRhdGEuYWxsVmFsdWUub2NjdXBhdGlvbnMgPSAnJztcclxuICAgICAgICBhcHAuZGF0YS5hbGxWYWx1ZS5vY2N1cGF0aW9ucyA9IGUuZGV0YWlsLnZhbHVlLnR5cGVfaWRcclxuICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgIHVybDogJy4uL2RldGFpbHMvZGV0YWlscycsXHJcbiAgICAgICAgfSlcclxuICAgICAgICAvLyB3eC5uYXZpZ2F0ZUJhY2soe1xyXG4gICAgICAgIC8vICAgdXJsOiAnLi4vZGV0YWlscy9kZXRhaWxzJ1xyXG4gICAgICAgIC8vIH0pXHJcbiAgICB9LFxyXG4gICAgb25Mb2FkOmZ1bmN0aW9uKG9wdGlvbnMpe1xyXG4gICAgICAgIC8vIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5Yqg6L29XHJcblxyXG4gICAgICAgIHZhciBpbmZvID0gdGhpc1xyXG5cclxuICAgICAgICB3eC5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgdXJsOiBodHRwVXJsLFxyXG4gICAgICAgICAgICBkYXRhOnt9LFxyXG4gICAgICAgICAgICBtZXRob2Q6J0dFVCcsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6ZnVuY3Rpb24ocmVzKXtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJlcylcclxuICAgICAgICAgICAgICAgIGluZm8uc2V0RGF0YSh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YUxpc3Q6cmVzLmRhdGEuaW5mb1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZmFpbDpmdW5jdGlvbigpe1xyXG5cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgY29tbXBsZXRlOmZ1bmN0aW9uKCl7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgb25SZWFkeTpmdW5jdGlvbigpe1xyXG4gICAgICAgIC8v55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLpmaTmraTmuLLmn5PlrozmiJBcclxuICAgIH0sXHJcblxyXG4gICAgb25TaG93OmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgLy/nlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouaYvuekulxyXG4gICAgfSxcclxuXHJcbiAgICBvbkhpZGU6ZnVuY3Rpb24oKXtcclxuICAgICAgICAvL+eUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i6ZqQ6JePXHJcbiAgICB9LFxyXG5cclxuICAgIG9uVW5sb2FkOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgLy/nlJ/lkb3otbDotbflh73mlbAtLeebkeWQrOmhtemdouWKoOi9vVxyXG4gICAgfSxcclxuXHJcbiAgICBvblB1bGxEb3duUmVmcmVzaDpmdW5jdGlvbigpe1xyXG4gICAgICAgIC8v6aG16Z2i55u45YWz5LqL5Lu25aSE55CG5Ye95pWwLS3nm5HlkKznlKjmiLfkuIvmi4nliqjkvZxcclxuICAgIH0sXHJcblxyXG4gICAgb25SZWFjaEJvdHRvbTpmdW5jdGlvbigpe1xyXG4gICAgICAgIC8v6aG16Z2i5LiK5ouJ6Kem5bqV5pe26Ze05aSE55CG5Ye95pWwXHJcbiAgICB9LFxyXG5cclxuICAgIG9uU2hhcmVBcHBNZXNzYWdlOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgLy8g55So5oi354K55Ye75Y+z5LiK6KeS5YiG5LqrXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdGl0bGU6J3RpdGxlJywgLy/liIbkuqvmoIfpophcclxuICAgICAgICAgICAgZGVzYzonZGVzYycsLy/liIbkuqvmj4/ov7BcclxuICAgICAgICAgICAgcGF0aDoncGF0aCcsLy/liIbkuqvot6/lvoRcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pIl19