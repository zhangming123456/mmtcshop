/**
 * 小程序配置文件
 */
var host = 'https://app.mmtcapp.com';//发布环境
// var host = 'http://192.168.3.81';//开发环境
var service = {
    // 下面的地址配合云端 Server 工作
    host,

    version: '',

    // 图片服务器地址
    imageUrl: host,

    // 登录地址，用于建立会话
    loginUrl: `https://${host}/login`,

    // 测试的请求地址，用于测试会话
    requestUrl: `https://${host}/testRequest`,

    // 用code换取openId
    openIdUrl: `https://${host}/openid`,

    // 测试的信道服务接口
    tunnelUrl: `https://${host}/tunnel`,

    // 生成支付订单的接口
    paymentUrl: `https://${host}/payment`,

    // 发送模板消息接口
    templateMessageUrl: `https://${host}/templateMessage`,

    // 上传文件接口
    uploadFileUrl: `https://${host}/upload`,

    // 下载示例图片接口
    downloadExampleUrl: `https://${host}/static/weapp.jpg`
};
wx.getSystemInfo({
    success: function (res) {
        console.log(res, '获取系统信息');
    }
});
export default service;


