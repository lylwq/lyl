var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var SelTypeEvent = (function (_super) {
    __extends(SelTypeEvent, _super);
    function SelTypeEvent(type, bubbles, cancelable) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        _super.call(this, type, bubbles, cancelable);
        this._sex = 0;
    }
    SelTypeEvent.SELECT = "selectedSex";
    SelTypeEvent.COMFIRM = "goplay";
    SelTypeEvent.COMPLETE = "completeGame";
    SelTypeEvent.PLAYAGAIN = "playAgain";
    return SelTypeEvent;
})(egret.Event);
