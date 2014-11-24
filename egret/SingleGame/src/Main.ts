
class Main extends egret.DisplayObjectContainer{

    public sex:number;
    
    private loadingView:LoadingUI;//加载进度界面
    private selectView:SelectSex;//选择性别
    private gameView:MainGame;//主游戏界面
    private ruleView:Rule;//游戏规则页面
    private resultView:Result;//结果页面


    public constructor() {
        super();
        //this.sex = 1;
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    private onAddToStage(event:egret.Event){
        //设置加载进度界面
        this.loadingView  = new LoadingUI();
        this.stage.addChild(this.loadingView);

        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComplete,this);
        RES.loadConfig("resource/resource.json","resource/");
    }
    /**
     * 配置文件加载完成,开始预加载preload资源组。
     */
    private onConfigComplete(event:RES.ResourceEvent):void{
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComplete,this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onResourceProgress,this);
        RES.loadGroup("preload");
    }
    /**
     * preload资源组加载完成
     */
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        if(event.groupName=="preload"){
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onResourceProgress,this);

            //监听选择性别事件
            this.selectView  = new SelectSex();
            this.selectView.addEventListener( SelTypeEvent.SELECT , this.onSelectedSex , this );
            this.stage.addChild(this.selectView);
            this.selectView.init();

            /*if( !this.gameView ){
                this.gameView = new MainGame( 1 );
                this.stage.addChild(this.gameView);
            }
            this.gameView.addEventListener( SelTypeEvent.COMPLETE , this.onCompleteGame , this );
            this.gameView.init();*/

            WeixinApi.ready(function(api:WeixinApi){
                var info:WeixinShareInfo = new WeixinShareInfo();
                info.title = "光棍节不孤独";
                info.desc = "光棍节再也不孤独了！你能比我厉害？";
                info.link = "http://www.iunios.com/mobile/singlegame/index.html?adId=1";
                info.imgUrl = "http://www.iunios.com/mobile/singlegame/resource/assets/man_ico.png";

                api.shareToFriend(info);
                api.shareToTimeline(info);
            });
        }
    }

    //选择了性别后的回调
    private onSelectedSex(event:SelTypeEvent):void{
        this.selectView.removeEventListener( SelTypeEvent.SELECT , this.onSelectedSex , this );
        this.stage.removeChild(this.selectView);

        /*this.ruleView = new Rule( event._sex );
        this.ruleView.addEventListener( SelTypeEvent.COMFIRM , this.startGame , this );
        this.stage.addChild(this.ruleView);
        this.ruleView.init();*/

        //开始游戏
        if( !this.gameView ){        
            this.gameView = new MainGame( event._sex );
            this.stage.addChild(this.gameView);
        }
        this.gameView.addEventListener( SelTypeEvent.COMPLETE , this.onCompleteGame , this );
        this.gameView.init();
    }

    //知道规则开始游戏的回调
    private startGame(event:SelTypeEvent):void{
        this.selectView.removeEventListener( SelTypeEvent.COMFIRM , this.startGame , this );
        this.stage.removeChild(this.ruleView);

        if( !this.gameView ){        
            this.gameView = new MainGame( event._sex );
            this.stage.addChild(this.gameView);
        }
        this.gameView.addEventListener( SelTypeEvent.COMPLETE , this.onCompleteGame , this );
        this.gameView.init();
    }

    //游戏结束回调
    private onCompleteGame(event:SelTypeEvent):void{
        this.gameView.removeEventListener( SelTypeEvent.COMPLETE , this.onCompleteGame , this );        
        this.resultView = new Result( event._data , event._sex );
        this.stage.addChild(this.resultView);
        this.resultView.addEventListener( SelTypeEvent.PLAYAGAIN , this.playAgain , this );
        this.resultView.init();
    }

    //再玩一次
    private playAgain(event:SelTypeEvent):void{
        this.resultView.removeEventListener( SelTypeEvent.PLAYAGAIN , this.playAgain , this );
        this.stage.removeChild(this.resultView);

        this.gameView.addEventListener( SelTypeEvent.COMPLETE , this.onCompleteGame , this );
        this.gameView.playAgain();
    }

    /**
     * preload资源组加载进度
     */
    private onResourceProgress(event:RES.ResourceEvent):void {
        if(event.groupName=="preload"){
            this.loadingView.setProgress(event.itemsLoaded,event.itemsTotal);
        }
    }
}


