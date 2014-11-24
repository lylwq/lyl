var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var SelectSex = (function (_super) {
    __extends(SelectSex, _super);
    function SelectSex() {
        _super.call(this);
        this.description = RES.getRes("description");
    }
    SelectSex.prototype.init = function () {
        this.createView();
        this.bindEvent();
    };
    SelectSex.prototype.createView = function () {
        var stageW = this.stage.stageWidth, stageH = this.stage.stageHeight, bg, bgTitle, bgManTxt, bgWomenTxt, bgTips, tmDesc = new egret.TextField();
        //背景
        bg = CommonClass.createBitmapByName("bgImage");
        bg.width = stageW;
        bg.height = stageH;
        bg.x = 0;
        bg.y = 0;
        this.addChild(bg);
        //标题
        bgTitle = CommonClass.createBitmapByName("title");
        bgTitle.y = 76;
        bgTitle.x = stageW / 2 - bgTitle.width / 2;
        this.addChild(bgTitle);
        //男按钮
        this.bgMan = CommonClass.createBitmapByName("man");
        this.bgMan.y = 246;
        this.bgMan.x = 48;
        this.bgMan.touchEnabled = true;
        this.addChild(this.bgMan);
        //男文字
        bgManTxt = CommonClass.createBitmapByName("man_txt");
        bgManTxt.y = 500;
        bgManTxt.x = 89;
        bgManTxt.touchEnabled = true;
        this.addChild(bgManTxt);
        //女按钮
        this.bgWomen = CommonClass.createBitmapByName("women");
        this.bgWomen.y = 246;
        this.bgWomen.x = 258;
        this.bgWomen.touchEnabled = true;
        this.addChild(this.bgWomen);
        //女文字
        bgWomenTxt = CommonClass.createBitmapByName("women_txt");
        bgWomenTxt.y = 500;
        bgWomenTxt.x = 297;
        bgWomenTxt.touchEnabled = true;
        this.addChild(bgWomenTxt);
        //提示语
        bgTips = CommonClass.createBitmapByName("tips");
        bgTips.y = 580;
        bgTips.x = stageW / 2 - bgTips.width / 2;
        this.addChild(bgTips);
        //获取规则内容
        var _w = stageW - 50;
        tmDesc.y = 680;
        tmDesc.x = (stageW - _w) / 2;
        tmDesc.size = 20;
        tmDesc.width = _w;
        tmDesc.multiline = true;
        tmDesc.lineSpacing = 5;
        tmDesc.text = this.description.desc.replace("{score}", this.description.rankScore4);
        this.addChild(tmDesc);
    };
    SelectSex.prototype.bindEvent = function () {
        this.bgMan.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSelectSex, this);
        this.bgMan.addEventListener(egret.TouchEvent.TOUCH_BEGIN, CommonClass.onBtnTouchStart, this);
        this.bgMan.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, CommonClass.onBtnTouchEnd, this);
        this.bgWomen.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSelectSex, this);
        this.bgWomen.addEventListener(egret.TouchEvent.TOUCH_BEGIN, CommonClass.onBtnTouchStart, this);
        this.bgWomen.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, CommonClass.onBtnTouchEnd, this);
    };
    SelectSex.prototype.onSelectSex = function (event) {
        var selEvent = new SelTypeEvent(SelTypeEvent.SELECT), target = event.target;
        selEvent._sex = target === this.bgMan ? 1 : 0;
        this.dispatchEvent(selEvent);
    };
    return SelectSex;
})(egret.Sprite);
