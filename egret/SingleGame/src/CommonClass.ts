//游戏结果页面
class CommonClass {

    public constructor(){}

    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     */
    public static createBitmapByName(name:string):egret.Bitmap {
        var result:egret.Bitmap = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    //按钮按下效果
    public static onBtnTouchStart(event:egret.TouchEvent):void{
        var target = event.target;

        target.alpha = .6;
        target.alpha = .6;
    }
    //按钮释放效果
    public static onBtnTouchEnd(event:egret.TouchEvent):void{
        var target = event.target;

        target.alpha = 1;
        target.alpha = 1;
    }

}