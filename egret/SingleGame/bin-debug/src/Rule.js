var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule(sex) {
        _super.call(this);
        this.sex = sex;
    }
    Rule.prototype.init = function () {
        var self = this, topMask = new egret.Shape(), stageW = this.stage.stageWidth, stageH = this.stage.stageHeight, tmTitle, tmDesc = new egret.TextField();
        topMask.graphics.beginFill(0x000000, 0.5);
        topMask.graphics.drawRect(0, 0, stageW, stageH);
        topMask.graphics.endFill();
        topMask.width = stageW;
        topMask.height = stageH;
        this.addChild(topMask);
        //标题
        tmTitle = CommonClass.createBitmapByName("bgImage");
        tmTitle.y = 85;
        tmTitle.x = stageW / 2 - tmTitle.width / 2;
        this.addChild(tmTitle);
        //获取规则内容
        var _w = stageW - 100;
        tmDesc.y = 200;
        tmDesc.x = (stageW - _w) / 2;
        tmDesc.size = 14;
        tmDesc.width = _w;
        tmDesc.text = RES.getRes("description").desc;
        this.addChild(tmDesc);
        //知道按钮
        this.tmBtn = new egret.TextField();
        this.tmBtn.y = stageH - 100;
        this.tmBtn.size = 30;
        this.tmBtn.width = stageW;
        this.tmBtn.textAlign = "center";
        this.tmBtn.text = "知道了";
        this.tmBtn.touchEnabled = true;
        this.addChild(this.tmBtn);
        this.bindEvent();
    };
    Rule.prototype.bindEvent = function () {
        //点击知道规则
        this.tmBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            var selEvent = new SelTypeEvent(SelTypeEvent.COMFIRM);
            selEvent._sex = this.sex;
            this.dispatchEvent(selEvent);
        }, this);
    };
    return Rule;
})(egret.Sprite);
