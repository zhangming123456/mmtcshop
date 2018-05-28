import wepy from 'wepy';
import config from '../configs/config'
let noop = () => {};
export default class httpMixin extends wepy.mixin {
    $get() {

    }
    $post() {

    }
    $ajax({
        url = '',
        headers = {},
        methods = "GET",
        data = {}
    }, {
        success = noop,
        error = noop,
        fail = noop,
        complete = noop
    }) {
        const request = {
            url: this.absUrl(url),
            methods: methods || 'GET',
            header: this.extend({
                'X-Requested-With': 'XMLHttpRequest'
            }, headers),
            data: this.extend({
                _f: 1
            }, data)
        };
        console.log(request);
        wepy.request(
            this.extend(
                request, {
                    success: ({
                        statusCode,
                        data
                    }) => {
                        console.log('[SUCCESS]', statusCode, typeof data === 'object' ? data : data.toString().substring(0, 100))
                        if (data.status == 1) { // for success
                            return setTimeout(() => {
                                this.isFunction(success) && success(data.info);
                                this.$apply()
                            });
                        } else {

                        }
                    }
                }));
    }
}