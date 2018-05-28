import wepy from 'wepy'

export default class baseMixin extends wepy.mixin {
    onPullDownRefresh() {
        this.$broadcast("onPullDownRefresh");
    }
    onReachBottom() {
        this.$broadcast("onReachBottom");
    }
}