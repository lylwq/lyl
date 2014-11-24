
class SelectSex extends egret.Sprite{

    public constructor(){
        super();
    }

    public init():void{
        this.createView();
        this.bindEvent();
    }

    private bgMan:egret.Bitmap;
    private bgWomen:egret.Bitmap;
    private description:any = RES.getRes("description");

    private createView():void {
        var stageW:number = this.stage.stageWidth,
            stageH:number = this.stage.stageHeight,
            bg:egret.Bitmap,
            bgTitle:egret.Bitmap,
            bgManTxt:egret.Bitmap,
            bgWomenTxt:egret.Bitmap,
            bgTips:egret.Bitmap,
            tmDesc:egret.TextField = new egret.TextField();

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
        bgTitle.x = stageW/2 - bgTitle.width/2;
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
        bgTips.x = stageW/2 - bgTips.width/2;
        this.addChild(bgTips);

        //获取规则内容
        var _w = stageW - 50;
        tmDesc.y = 680;
        tmDesc.x = (stageW - _w) / 2;
        tmDesc.size = 20;
        tmDesc.width = _w;
        tmDesc.multiline = true;
        tmDesc.lineSpacing = 5;
        tmDesc.text = this.description.desc.replace("{score}",this.description.rankScore4);
        this.addChild(tmDesc);
    }

    
    private bindEvent():void{

        this.bgMan.addEventListener( egret.TouchEvent.TOUCH_TAP , this.onSelectSex , this );
        this.bgMan.addEventListener( egret.TouchEvent.TOUCH_BEGIN , CommonClass.onBtnTouchStart , this );        
        this.bgMan.addEventListener( egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, CommonClass.onBtnTouchEnd , this );

        this.bgWomen.addEventListener( egret.TouchEvent.TOUCH_TAP , this.onSelectSex , this );
        this.bgWomen.addEventListener( egret.TouchEvent.TOUCH_BEGIN , CommonClass.onBtnTouchStart , this );
        this.bgWomen.addEventListener( egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, CommonClass.onBtnTouchEnd , this );

    }

    private onSelectSex(event:egret.TouchEvent):void{
        
        var selEvent:SelTypeEvent = new SelTypeEvent( SelTypeEvent.SELECT ),
            target = event.target;

        selEvent._sex = target === this.bgMan ? 1:0;
        this.dispatchEvent( selEvent );
    }
}