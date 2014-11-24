//游戏主界面
class MainGame extends egret.Sprite{

    public constructor( sex ){
        super();
        this.sex = sex;
    }

    private pgBorder:egret.Bitmap;
    private pgRemain:egret.Bitmap;
    private pgpast:egret.Bitmap;
    private description:any = RES.getRes("description");
    private showNum:number = this.description.showNum;
    private score:number = 0;
    private playCount:number = 1;//用户玩的次数
    private timerCellDelay:number = this.description.cellDelay;
    private timerCellDelay2:number = this.timerCellDelay - 200;
    private timerCellDelay3:number = this.timerCellDelay2 - 200;
    private timerCellDelay4:number = this.timerCellDelay3 - 200;
    private sex:number;
    private isShow:boolean;
    private isOver:boolean;
    private cells:Array<Cell> = new Array();
    private errorCells:Array<Cell> = new Array();
    private actErrorCells:Array<Cell> = new Array();
    private timerGame:egret.Timer = new egret.Timer(1000,this.description.gameTime);
    private timerCell:egret.Timer = new egret.Timer(this.timerCellDelay,0);
    private progressBar:egret.DisplayObjectContainer;
    private sdRight:egret.Sound = RES.getRes("sdRight");
    private sdError:egret.Sound = RES.getRes("sdError");

    public init():void{
        this.createView();
        this.bindEvent();
    }
    public playAgain(){
        this.score = 0;
        this.pgpast.x = this.stage.stageWidth;
        this.playCount++;
        this.gameReset();
        this.timerGame.start();
        this.timerCell.start();
    }

    private createView():void {
        var self = this , zIndex,
            _oriX , _startX = 25 , _startY = 220,
            //格子横间距 , 格子纵间距 , 格子移动距离
            _spaceX = 160 , _spaceY = 250 , _intervalY = 180,
            bg:egret.Bitmap , bg1:egret.Bitmap,
            bg2:egret.Bitmap , bg3:egret.Bitmap;

        _oriX = _startX;
        //背景
        bg = CommonClass.createBitmapByName("bgGame");
        this.addChild(bg);

        bg3 = CommonClass.createBitmapByName("bgGame3");
        this.addChild(bg3);
        zIndex = this.getChildIndex( bg3 );

        bg2 = CommonClass.createBitmapByName("bgGame2");
        this.addChild(bg2);
        
        bg1 = CommonClass.createBitmapByName("bgGame1");
        this.addChild(bg1);

        //进度条
        this.pgRemain = CommonClass.createBitmapByName("progressRemain");
        this.pgRemain.x = 17;
        this.pgRemain.y = 6;
        this.addChild(this.pgRemain);

        this.pgpast = CommonClass.createBitmapByName("progressPast");
        this.pgpast.y = 4;
        this.pgpast.x = this.stage.stageWidth;
        this.addChild(this.pgpast);

        this.pgBorder = CommonClass.createBitmapByName("progressBorder");
        this.addChild(this.pgBorder);

        //生成格子
        for( var i = 1 ; i < 10 ; i++ ){
            var cell = new Cell( i-1 , _startX , _startY , _startX , _startY - _intervalY );
            var erCell = new Cell( i-1 , _startX , _startY+30 , _startX , _startY - _intervalY+30 , 2 );
            erCell.visible = false;
            //this.addChild( cell );
            this.addChildAt( cell  , zIndex);
            this.addChildAt( erCell  , zIndex+1);
            if( i % 3 === 0 ){
                _startY += _spaceY;
                _startX = _oriX;
                if( i === 3 ){
                    zIndex = this.getChildIndex( bg2 );
                }else if( i === 6 ){
                    zIndex = this.getChildIndex( bg1 );
                }
            }else{
                _startX += _spaceX;
            }
            this.cells.push( cell );
            this.errorCells.push( erCell );
        }
    }
    
    private bindEvent():void{
        var _cells = this.cells , self = this;
        //给所有格子绑定事件
        for( var i = 0 ; i < _cells.length ; i++){
            _cells[i].addEventListener( egret.TouchEvent.TOUCH_BEGIN , this.touchCell , this );
        }

        this.timerGame.addEventListener(egret.TimerEvent.TIMER,this.timerGameFun,this);
        this.timerGame.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.timerGameComFun,this);

        this.timerCell.addEventListener(egret.TimerEvent.TIMER , this.timerCellFun , this);

        this.timerGame.start();
        this.timerCell.start();
    }

    //触摸人物时的相应动作
    private touchCell(event:egret.TouchEvent):void{
        var target = event.target , tSex = target.getSex() , er , _dp = this.description;

        //如果格子内无人物出现则返回
        if( target.y === target.getStartY() ){return}
        //点中正确的人物
        if( tSex == this.sex ){
            !target.getIsAct()&&this.score++;

            if( this.score > _dp.rankScore1 && this.score < _dp.rankScore2 ){
                this.timerCell.delay = this.timerCellDelay2;
            }else if( this.score > _dp.rankScore2 && this.score < _dp.rankScore3 ){
                this.timerCell.delay = this.timerCellDelay3;
            }else if( this.score > _dp.rankScore3 ){
                this.timerCell.delay = this.timerCellDelay4;
            }

            target.setTexture( tSex , 1 );
            this.sdRight.pause();
            this.sdRight.play();
        }else{
            er = this.errorCells[target.getIndex()];
            er.move( Cell.DIRSHOW , true );
            er.visible = true;
            this.actErrorCells.push(er);
            this.sdError.pause();
            this.sdError.play();
        }
    }

    private moveCells( cells:Array<Cell> , dir , isNow=false ){
        var cell;
        for( var i = 0 ; i < cells.length ; i++ ){
            cell = cells[i];
            cell.move( dir , isNow );
            if( cell.getSex === 2 && dir === Cell.DIRHIDE ){
                setTimeout( function(){
                    cell.visible = false;
                } , Cell.tweenDur );
            }
        }
    }

    //随机获取需要显示的格子
    private randomSelCell():Array<Cell>{
        var _cells = this.cells , cell , _tempArry = [] , result = [],
            _showNum = this.showNum , rd , item , _sex;

        for( var i = 0 ; i < _cells.length ; i ++ ){
            _tempArry.push(i);
        }

        for( var j = 0 ; j < _showNum ; j++ ){
            //不重复的随机数
            rd = Math.floor(Math.random()*_tempArry.length);
            item = _cells[_tempArry[rd]];
            _tempArry.splice( rd , 1 );

            //随机得到性别
            item.setTexture( Math.floor(Math.random()*2) );
            result.push( item );
        }
        return result;
    }

    private timerGameFun(event:egret.TimerEvent){
        //进度条
        var sw = this.stage.stageWidth , 
            cc = event.target.currentCount() , rc = event.target.repeatCount;
        this.pgpast.x = sw - cc / rc * sw;
    }
    private timerGameComFun(event:egret.TimerEvent){
        this.isOver = true;
        this.gameReset();
        var selEvent:SelTypeEvent = new SelTypeEvent( SelTypeEvent.COMPLETE );
        selEvent._data = {score:this.score,playCount:this.playCount};
        selEvent._sex = this.sex;
        this.dispatchEvent( selEvent );
        //alert( this.score );
    }

    private timerCellFun(event:egret.TimerEvent){

        var self = this , _cells;
        if( self.isShow ){
            //隐藏
            self.moveCells( self.cells , Cell.DIRHIDE );
            self.moveCells( self.actErrorCells , Cell.DIRHIDE );
            self.actErrorCells = [];

            !self.isOver&&setTimeout( function(){
                self.moveCells( self.randomSelCell() , Cell.DIRSHOW );
                self.isShow = true;
            } , Cell.tweenDur );
        }else{
            self.moveCells( self.randomSelCell() , Cell.DIRSHOW );
        }            
        self.isShow = !self.isShow;
    }

    //重置游戏
    private gameReset(){
        this.timerCell.stop();
        this.timerCell.reset();
        this.timerGame.stop();
        this.timerGame.reset();
        this.moveCells( this.errorCells.concat(this.cells) , Cell.DIRHIDE , true );
        this.isShow = false;
        this.isOver = false;
        this.timerCell.delay = this.timerCellDelay;
    }

}

/*
格子类,每个格子的位置固定,游戏中随机改变格子显示图片
    
*/

class Cell extends egret.Bitmap {

    public constructor( index , startX = 0 , startY = 0 , endX = 0 , endY = 0 , sex = 0){
        super();

        if( !Cell.manPic1 ){//获取需要加载的资源
            Cell.manPic1 = RES.getRes("sptMan1");
            Cell.manPic2 = RES.getRes("sptMan2");
            Cell.womenPic1 = RES.getRes("sptWomen1");
            Cell.womenPic2 = RES.getRes("sptWomen2");
            Cell.errorPic = RES.getRes("errorPic");
            Cell.tweenDur = RES.getRes("description").tweenDur;
        }

        this.index = index;
        this.x = this.startX = startX;
        this.y = this.startY = startY;
        this.touchEnabled = true;
        this.endX = endX;
        this.endY = endY;
        this.sex = sex;
        this.setTexture( this.sex );
    }

    public static manPic1:egret.Texture;
    public static manPic2:egret.Texture;
    public static womenPic1:egret.Texture;
    public static womenPic2:egret.Texture;
    public static errorPic:egret.Texture;
    public static tweenDur:number;
    public static DIRSHOW = "show";
    public static DIRHIDE = "hide";

    private index:number;
    private isAct:number;
    private startX:number;
    private startY:number;
    private endX:number;
    private endY:number;
    //性别 0:女 1:男 other:错误
    private sex:number = 0;

    //@state:状态 0:正常 1:激活
    public setTexture( sex = 0 , state = 0 ){
        this.sex = sex;
        this.texture = Cell[ (sex===0||sex===1?(sex?"manPic":"womenPic" ) + (state?"2":"1"):"errorPic" )];
        this.isAct = state;
    }

    public move( dir  , isNow ){
        var end = dir === Cell.DIRSHOW ? this.endY : this.startY;
        if( isNow ){
            this.y = end;
        }else{
            egret.Tween.get( this ).to({ y : end } , Cell.tweenDur );
        }        
    }

    public getIndex(){return this.index;}
    public getSex(){return this.sex;}
    public getStartX(){return this.startX;}
    public getStartY(){return this.startY;}
    public getEndX(){return this.endX;}
    public getEndY(){return this.endY;}
    public getIsAct(){return this.isAct;}
}