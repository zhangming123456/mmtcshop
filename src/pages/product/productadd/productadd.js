Page({

  data: {},

  onLoad: function onLoad(options) {

  },

  // 跳转到发布产品
  changeToTest: function changeToTest(e) {
    wx.navigateTo({
      url: '/pages/product/serve/serve'
    });
  },

  gotodetail:function gotodetail(e){
    wx.navigateTo({
      url: "/pages/product/productdetail/productdetail"
    });
  },
  gotoClassify:function gotoClassify(e){
    wx.navigateTo({
      url: "/pages/product/shopclassify/shopclassify"
    });
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