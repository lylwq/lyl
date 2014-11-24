//游戏结果页面
var CommonClass = (function () {
    function CommonClass() {
    }
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     */
    CommonClass.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    //按钮按下效果
    CommonClass.onBtnTouchStart = function (event) {
        var target = event.target;
        target.alpha = .6;
        target.alpha = .6;
    };
    //按钮释放效果
    CommonClass.onBtnTouchEnd = function (event) {
        var target = event.target;
        target.alpha = 1;
        target.alpha = 1;
    };
    return CommonClass;
})();
