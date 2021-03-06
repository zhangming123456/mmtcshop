import config from '../../configs/config';
import {
    HttpRequest
} from "./httpRequest";

const $http = new HttpRequest();
class ShopApi {
    constructor () {
        this.shopApi = '/shopapi/'
    }

    /**
     * 提交保存产品
     * @api {post} /shopapi/iteminfo/sav_new
     * @param data
     * @param {Number} [id] 产品ID 编辑模式需要
     * @param {String} title 标题
     * @param {String} profile 副标题
     * @param {Number} market_price 市场价格（门市价）
     * @param {Number} price 价格（折扣）
     * @param {Array} category_id 产品分类ID
     * @param {Array} cover 产品封面
     * @param {String} service 服务内容
     * @param {String} service_char 服务特色
     * @param {Array} service_flow 服务流程
     * @param {String} intro 产品详情介绍 (图文详情)
     * @param {Array} label 产品标签 ["a","b"]
     * @param {int} isTheTerm 是否设置使用限制日期 1：使用
     * @param {String} start_date 限制起始日期
     * @param {String} end_date 限制结束日期
     * @param {String} note 期限说明
     * @param {String} start_time 开始时间
     * @param {String} end_time 结束时间
     * @param {Array} item_brand [{title 名称, brand 品牌，cover 图片}] 使用物料（商品）
     * @param {String} taboo_crowd 禁忌人群
     * @param {String} other_instructions 其它说明
     * @param {Number} [group_num] 成团要求数量
     * @param {Number} [group_price] 成团价格
     * @param {Number} is_valid 是否有效
     * @param resole
     * @param reject
     * @returns {*}
     */
    saveItemInfo (data = {}, resole, reject) {
        let that = this;
        const api = `${that.shopApi}iteminfo/sav_new`;
        const http = $http.post2(that.url + api, data, resole, reject);
        return http;
    }

    /**
     * 查看产品详情
     * @param data
     * @param resole
     * @param reject
     * @returns {*}
     */
    siteItemInfo ({
                      nodes = 1,
                      id = 0
                  } = {}, resole, reject) {
        let that = this,
            data = {
                nodes,
                id
            };
        const api = `${that.shopApi}iteminfo/site`;
        const http = $http.get(that.url + api, data, resole, reject);
        return http;
    }

    /**
     * 商家获取订单详情
     * @param data
     * @param resole
     * @param reject
     * @returns {*}
     */
    getShopManagerOrderDetail ({
                                   id = 0
                               } = {}, resole, reject) {
        let that = this,
            data = {
                id
            };
        const api = `${that.shopApi}shop_manager/orderDetail`;
        const http = $http.get(that.url + api, data, resole, reject);
        return http;
    }

    /**
     * 商家获取退款项目详情
     * @param data
     * @param resole
     * @param reject
     * @returns {*}
     */
    getShopManagerRefundDetail (data = {
        id: 0
    }, resole, reject) {
        let that = this;
        const api = `${that.shopApi}shop_manager/refundDetail`;
        const http = $http.get(that.url + api, data, resole, reject);
        return http;
    }

    /**
     * 商家获取产品类别信息
     * @param data
     * @param resole
     * @param reject
     * @returns {*}
     */
    getItemInfoCategory (data = {}, resole, reject) {
        let that = this;
        const api = `${that.shopApi}iteminfo/dataList`;
        const http = $http.get(that.url + api, data, resole, reject);
        return http;
    }

    /**
     * 商家获取产品管理列表tab数量
     * https://app.mmtcapp.com/shopapi/itemlist/figure?_f=1
     * @param data
     * @param resole
     * @param reject
     * @returns {*}
     */
    getItemlistFigure (data = {}, resole, reject) {
        let that = this;
        const api = `${that.shopApi}itemlist/figure`;
        const http = $http.get(that.url + api, data, resole, reject);
        return http;
    }

    /**
     * 商家获取产品管理列表
     * @param data
     * @param resole
     * @param reject
     * @returns {*}
     */
    getItemlistSite ({
                         p = 1,
                         t = 0
                     } = {}, resole, reject) {
        let that = this,
            data = {
                p,
                t
            };
        const api = `${that.shopApi}itemlist/site`;
        const http = $http.get(that.url + api, data, resole, reject);
        return http;
    }

    /**
     * 商家产品管理下架产品
     * @param data
     * @param resole
     * @param reject
     * @returns {*}
     */
    setIteminfoDownOn (data = {
        id = 0
    } = {}, resole, reject) {
        let that = this;
        const api = `${that.shopApi}iteminfo/downOn`;
        const http = $http.get(that.url + api, data, resole, reject);
        return http;
    }

    /**
     * 商家产品管理上架产品
     * @param data
     * @param resole
     * @param reject
     * @returns {*}
     */
    setIteminfoUpOn (data = {
        id = 0
    } = {}, resole, reject) {
        let that = this;
        const api = `${that.shopApi}iteminfo/upOn`;
        const http = $http.get(that.url + api, data, resole, reject);
        return http;
    }

    /**
     * 商家产品管理撤销审核产品
     * @param data
     * @param resole
     * @param reject
     * @returns {*}
     */
    setIteminfoRevokeAuth (data = {
        id = 0
    } = {}, resole, reject) {
        let that = this;
        const api = `${that.shopApi}iteminfo/revokeAuth`;
        const http = $http.get(that.url + api, data, resole, reject);
        return http;
    }

    /**
     * 商家产品管理——删除产品
     * @param data
     * @param resole
     * @param reject
     * @returns {*}
     */
    deleteItem ({
                    id = 0
                } = {}, resole, reject) {
        let that = this,
            data = {
                id
            };
        const api = `${that.shopApi}iteminfo/del`;
        const http = $http.get(that.url + api, data, resole, reject);
        return http;
    }

    /**
     * 商家产品管理——提交审核
     * @param id
     * @param resole
     * @param reject
     * @returns {*}
     */
    examineItem ({
                     id = 0
                 } = {}, resole, reject) {
        let that = this,
            data = {
                id
            };
        const api = `${that.shopApi}iteminfo/to_examine`;
        const http = $http.get(that.url + api, data, resole, reject);
        return http;
    }

    /**
     * 商家验证是否登入
     * @param data
     * @param resole
     * @param reject
     * @returns {*}
     */
    verifyLogin (data = {}, resole, reject) {
        let that = this;
        const api = `${that.shopApi}login/test`;
        const http = $http.get(that.url + api, data, resole, reject);
        return http;
    }

    /**
     * 商家登入
     * @param username 用户名
     * @param password 密码
     * @param resole
     * @param reject
     * @returns {*}
     */
    shopLoing ({username = '', password = ''}, resole, reject) {
        let that = this,
            data = {
                username,
                password
            };
        const api = `${that.shopApi}login/login`;
        const http = $http.post(that.url + api, data, resole, reject);
        return http;
    }
}
class ApiService extends ShopApi {
    constructor (...args) {
        super(...args); // 调用父类的constructor(x, y)
        this.api = '/api/';
        this.url = config.host;
        this.token = null
    }

    getToken () {
        const app = getApp();
        if (this.token && this.token.length > 0) {
            return this.token;
        } else {
            return app.getToken();
        }
    }

    /**
     * 获取首页banner
     * @param data
     * @param resole
     * @param reject
     * @returns {*}
     */
    getBanners (data = {}, resole, reject) {
        let that = this;
        const api = `${that.api}wx_shop/banners`;
        const http = $http.post(that.url + api, data, resole, reject);
        return http;
    }

    /**
     * 获取手机号码验证
     * @param data
     * @param resole
     * @param reject
     * @returns {*}
     */
    getCheckCode (data = {
        telephone: 0,
        docheck: 1
    }, resole, reject) {
        let that = this;
        const api = `${that.api}index/getCheckCode`;
        const http = $http.post(that.url + api, data, resole, reject);
        return http;
    }


    /**
     * 修改密码获取手机号码验证
     * @param data
     * @param resole
     * @param reject
     * @returns {*}
     */
    getShopapiCheckCode (data = {
        telephone: 0,
        docheck: 1
    }, resole, reject) {
        let that = this;
        const api = `${that.shopApi}pwd/getCheckCode_f`;
        const http = $http.post(that.url + api, data, resole, reject);
        return http;
    }

    /**
     * 验证验证码接口
     * @param data
     * @param resole
     * @param reject
     * @returns {*}
     */
    getcheckCode (data = {}, resole, reject) {
        let that = this;
        const api = `${that.shopApi}pwd/checkCode`;
        const http = $http.post(that.url + api, data, resole, reject);
        return http;
    }

    /**
     * 修改密码接口
     * @param data
     * @param resole
     * @param reject
     * @returns {*}
     */
    getEdit ({
                 pwd = "",
                 code = "",
                 phone = ""
             } = {}, resole, reject) {
        let that = this,
            data = {
                pwd,
                code,
                phone
            };
        const api = `${that.shopApi}pwd/edit`;
        const http = $http.post(that.url + api, data, resole, reject);
        return http;
    }


}
module.exports = new ApiService();