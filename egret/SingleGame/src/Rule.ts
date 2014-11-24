
class Rule extends egret.Sprite{

    public constructor( sex ){
        super();
        this.sex = sex;
    }

    private sex:number;
    private tmBtn:egret.TextField;

    public init():void {

        var self = this,
            topMask:egret.Shape = new egret.Shape(),
        	stageW:number = this.stage.stageWidth,
        	stageH:number = this.stage.stageHeight,
        	tmTitle:egret.Bitmap,
        	tmDesc:egret.TextField = new egret.TextField();

        topMask.graphics.beginFill(0x000000, 0.5);
        topMask.graphics.drawRect(0, 0, stageW, stageH);
        topMask.graphics.endFill();
        topMask.width = stageW;
        topMask.height = stageH;
        this.addChild(topMask);

        //标题
        tmTitle = CommonClass.createBitmapByName("bgImage");
        tmTitle.y = 85;
        tmTitle.x = stageW/2 - tmTitle.width/2;
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
    }

    
    private bindEvent():void{
    	//点击知道规则
    	this.tmBtn.addEventListener( egret.TouchEvent.TOUCH_TAP , function(){

	        var selEvent:SelTypeEvent = new SelTypeEvent( SelTypeEvent.COMFIRM );
            selEvent._sex = this.sex;

	        this.dispatchEvent( selEvent );
    	} , this );
    }



}