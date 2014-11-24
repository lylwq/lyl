//游戏结果页面
class Result extends egret.Sprite{

    public constructor( data , sex ){
        super();
        this.playCount = data.playCount;
        this.score = data.score;
        this.sex = sex;
    }

    public init():void{
        var self = this;
        self.createView();
        self.bindEvent();

        WeixinApi.ready(function(api:WeixinApi){
            var info:WeixinShareInfo = new WeixinShareInfo();
            info.title = "光棍节不孤独";
            info.desc = "光棍节再也不孤独了！成功让"+self.score+"个"+(self.sex?"男":"女")+"人变光棍，你能比我厉害？";
            info.link = "http://www.iunios.com/mobile/singlegame/index.html?adId=1";
            info.imgUrl = self.sex?"http://www.iunios.com/mobile/singlegame/resource/assets/man_ico.png":"http://www.iunios.com/mobile/singlegame/resource/assets/women_ico.png";

            var callback:WeixinShareCallbackInfo = new WeixinShareCallbackInfo();
            callback.confirm = function(resp){
                //分享成功
                self.playCount = self.description.playLimit + 1;
            }
            api.shareToFriend(info);
            api.shareToTimeline(info , callback);
        });
    }

    private score:number;
    private playCount:number;
    private sex:number;
    private btnAgain:egret.Bitmap;
    private btnShare:egret.Bitmap;
    private shareMask:egret.Shape = new egret.Shape();
    private txtShare:egret.TextField = new egret.TextField();
    private txtShareDesc:egret.TextField = new egret.TextField();
    private arrowShare:egret.Bitmap;
    private btnLottery:egret.Bitmap;
    private bgShare:egret.Bitmap;
    private description:any = RES.getRes("description");

    private createView():void {
        var topMask:egret.Shape = new egret.Shape(),
            bgPerson:egret.Bitmap,
            imgPerson:egret.Bitmap,
            txtRank:egret.TextField,
            txtAD:egret.TextField,
            stageW:number = this.stage.stageWidth,
            stageH:number = this.stage.stageHeight,
            tipsResult:egret.Bitmap,
            _dp = this.description,
            _score = this.score , strSex , rank , rankDesc = this.description.rankDesc;

        rankDesc = rankDesc.replace("{score}" , _score);
        if( this.sex ){
            strSex = "M";
            rankDesc = rankDesc.replace("{sex}" , "男");
        }else{
            strSex = "W";
            rankDesc = rankDesc.replace("{sex}" , "女");
        }
        strSex = this.sex ? "M" : "W";

        if( _score < _dp.rankScore2 ){
            rank = "1";
            rankDesc = rankDesc.replace("{rankText}" , this.sex ? "南僧一灯":"铁尸梅超风");
        }else if( _score < _dp.rankScore3 ){
            rank = "2";
            rankDesc = rankDesc.replace("{rankText}" , this.sex ? "西毒欧阳锋":"再世李莫愁");
        }else if( _score < _dp.rankScore4 ){
            rank = "3";
            rankDesc = rankDesc.replace("{rankText}" , this.sex ? "卓不凡":"天山童姥");
        }else {
            rank = "4";
            rankDesc = rankDesc.replace("{rankText}" , this.sex ? "光毛狮王":"灭绝师太");
        }

        //遮罩层
        topMask.graphics.beginFill(0x000000, 0.5);
        topMask.graphics.drawRect(0, 0, stageW, stageH);
        topMask.graphics.endFill();
        topMask.width = stageW;
        topMask.height = stageH;
        this.addChild(topMask);

        //人物背景
        bgPerson = CommonClass.createBitmapByName(this.sex?"bgResultMan":"bgResultWomen");
        bgPerson.x = 48;
        bgPerson.y = 48;
        this.addChild(bgPerson);

        //人物
        imgPerson = CommonClass.createBitmapByName("bgP" + strSex + rank);
        imgPerson.x = 18 + bgPerson.x;
        imgPerson.y = 48;
        this.addChild(imgPerson);

        //等级文字
        txtRank = new egret.TextField();
        txtRank.width = 300;
        txtRank.height = 60;
        txtRank.x = 92;
        txtRank.y = 465;
        txtRank.size = 22;
        txtRank.lineSpacing = 5;
        txtRank.text = rankDesc;
        this.addChild(txtRank);

        //再来
        this.btnAgain = CommonClass.createBitmapByName("btnAgain");
        this.btnAgain.x = 48;
        this.btnAgain.y = 565;
        this.btnAgain.touchEnabled = true;
        this.addChild(this.btnAgain);

        //分享
        this.btnShare = CommonClass.createBitmapByName("btnShare");
        this.btnShare.x = 246;
        this.btnShare.y = 565;
        this.btnShare.touchEnabled = true;
        this.addChild(this.btnShare);

        //抽奖
        if( rank === "4" ){
            this.btnLottery = CommonClass.createBitmapByName("btnLottery");
            this.btnLottery.x = stageW - this.btnLottery.width;
            this.btnLottery.y = 565 - this.btnLottery.height * 2;
            this.btnLottery.touchEnabled = true;
            this.addChild(this.btnLottery);
        }else{
            tipsResult = CommonClass.createBitmapByName("tipsResult");
            tipsResult.x = 75;
            tipsResult.y = 98;
            this.addChild(tipsResult);
        }

        //广告文字
        txtAD = new egret.TextField();
        txtAD.width = stageW - 100;
        txtAD.x = 50;
        txtAD.y = stageH - 80;
        txtAD.size = 22;
        txtAD.text = this.description.resultAD;
        txtAD.lineSpacing = 10;
        this.addChild(txtAD);

        //分享遮罩层
        this.shareMask.graphics.beginFill(0x000000, 0.6);
        this.shareMask.graphics.drawRect(0, 0, stageW, stageH);
        this.shareMask.graphics.endFill();
        this.shareMask.width = stageW;
        this.shareMask.height = stageH;

        //分享描述
        this.txtShare.width = stageW-60;
        this.txtShare.size = 20;
        this.txtShare.lineSpacing = 5;
        this.txtShare.textAlign = "left";

        this.txtShareDesc.width = stageW-60;
        this.txtShareDesc.size = 28;
        this.txtShareDesc.lineSpacing = 5;
        this.txtShareDesc.textAlign = "left";

        //分享内箭头
        this.arrowShare = CommonClass.createBitmapByName("arrow");
        this.arrowShare.x = stageW - this.arrowShare.width;
        
        this.bgShare = CommonClass.createBitmapByName("bgShare");

    }

    
    private bindEvent():void{

        this.btnAgain.addEventListener( egret.TouchEvent.TOUCH_TAP , this.playAgain , this );
        this.btnShare.addEventListener( egret.TouchEvent.TOUCH_TAP , this.shareScore , this );
        this.btnLottery && this.btnLottery.addEventListener( egret.TouchEvent.TOUCH_TAP , this.lottery , this );
    }

    //再玩一次
    private playAgain(event:egret.TouchEvent):void{
        var self = this;

        if( self.playCount === self.description.playLimit ){
            //到达限制次数

            self.txtShare.text = self.description.limitDesc;
            self.txtShare.x = 20;
            self.txtShare.y = 100;
            self.txtShare.size = 32;

            self.addChild(self.shareMask);
            self.addChild(self.txtShare);
            self.addChild(self.arrowShare);
            setTimeout(function(){
                self.removeChild(self.shareMask);
                self.removeChild(self.txtShare);
                self.removeChild(self.arrowShare);
            },3000);
        }else{            
            var selEvent:SelTypeEvent = new SelTypeEvent( SelTypeEvent.PLAYAGAIN );
            selEvent._sex = self.sex;
            self.dispatchEvent( selEvent );
        }
    }

    //分享
    private shareScore():void{
        var self = this;
        self.txtShare.text = self.description.shareText;
        self.txtShare.x = 150;
        self.txtShare.y = 100;
        self.txtShare.size = 32;

        self.addChild(self.shareMask);
        self.addChild(self.txtShare);
        self.addChild(self.arrowShare);
        setTimeout(function(){
            self.removeChild(self.shareMask);
            self.removeChild(self.txtShare);
            self.removeChild(self.arrowShare);
        },3000);
    }

    //抽奖
    private lottery(){
        var self = this;

        self.txtShare.text = self.description.lotteryDesc1;
        self.txtShare.x = 20;
        self.txtShare.y = self.bgShare.height + 10;
        self.txtShare.size = 20;

        self.txtShareDesc.text = self.description.lotteryDesc2;
        self.txtShareDesc.x = 20;
        self.txtShareDesc.y = self.txtShare.y + self.txtShare.height + 10;

        self.addChild(self.shareMask);
        self.addChild(self.txtShare);
        self.addChild(self.txtShareDesc);
        self.addChild(self.bgShare);
        setTimeout(function(){
            self.removeChild(self.shareMask);
            self.removeChild(self.txtShare);
            self.removeChild(self.txtShareDesc);
            self.removeChild(self.bgShare);
        },3000);
    }
}