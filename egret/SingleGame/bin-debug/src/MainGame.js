var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
//游戏主界面
var MainGame = (function (_super) {
    __extends(MainGame, _super);
    function MainGame(sex) {
        _super.call(this);
        this.description = RES.getRes("description");
        this.showNum = this.description.showNum;
        this.score = 0;
        this.playCount = 1; //用户玩的次数
        this.timerCellDelay = this.description.cellDelay;
        this.timerCellDelay2 = this.timerCellDelay - 200;
        this.timerCellDelay3 = this.timerCellDelay2 - 200;
        this.timerCellDelay4 = this.timerCellDelay3 - 200;
        this.cells = new Array();
        this.errorCells = new Array();
        this.actErrorCells = new Array();
        this.timerGame = new egret.Timer(1000, this.description.gameTime);
        this.timerCell = new egret.Timer(this.timerCellDelay, 0);
        this.sdRight = RES.getRes("sdRight");
        this.sdError = RES.getRes("sdError");
        this.sex = sex;
    }
    MainGame.prototype.init = function () {
        this.createView();
        this.bindEvent();
    };
    MainGame.prototype.playAgain = function () {
        this.score = 0;
        this.pgpast.x = this.stage.stageWidth;
        this.playCount++;
        this.gameReset();
        this.timerGame.start();
        this.timerCell.start();
    };
    MainGame.prototype.createView = function () {
        var self = this, zIndex, _oriX, _startX = 25, _startY = 220, 
        //格子横间距 , 格子纵间距 , 格子移动距离
        _spaceX = 160, _spaceY = 250, _intervalY = 180, bg, bg1, bg2, bg3;
        _oriX = _startX;
        //背景
        bg = CommonClass.createBitmapByName("bgGame");
        this.addChild(bg);
        bg3 = CommonClass.createBitmapByName("bgGame3");
        this.addChild(bg3);
        zIndex = this.getChildIndex(bg3);
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
        for (var i = 1; i < 10; i++) {
            var cell = new Cell(i - 1, _startX, _startY, _startX, _startY - _intervalY);
            var erCell = new Cell(i - 1, _startX, _startY + 30, _startX, _startY - _intervalY + 30, 2);
            erCell.visible = false;
            //this.addChild( cell );
            this.addChildAt(cell, zIndex);
            this.addChildAt(erCell, zIndex + 1);
            if (i % 3 === 0) {
                _startY += _spaceY;
                _startX = _oriX;
                if (i === 3) {
                    zIndex = this.getChildIndex(bg2);
                }
                else if (i === 6) {
                    zIndex = this.getChildIndex(bg1);
                }
            }
            else {
                _startX += _spaceX;
            }
            this.cells.push(cell);
            this.errorCells.push(erCell);
        }
    };
    MainGame.prototype.bindEvent = function () {
        var _cells = this.cells, self = this;
        for (var i = 0; i < _cells.length; i++) {
            _cells[i].addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchCell, this);
        }
        this.timerGame.addEventListener(egret.TimerEvent.TIMER, this.timerGameFun, this);
        this.timerGame.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerGameComFun, this);
        this.timerCell.addEventListener(egret.TimerEvent.TIMER, this.timerCellFun, this);
        this.timerGame.start();
        this.timerCell.start();
    };
    //触摸人物时的相应动作
    MainGame.prototype.touchCell = function (event) {
        var target = event.target, tSex = target.getSex(), er, _dp = this.description;
        //如果格子内无人物出现则返回
        if (target.y === target.getStartY()) {
            return;
        }
        //点中正确的人物
        if (tSex == this.sex) {
            !target.getIsAct() && this.score++;
            if (this.score > _dp.rankScore1 && this.score < _dp.rankScore2) {
                this.timerCell.delay = this.timerCellDelay2;
            }
            else if (this.score > _dp.rankScore2 && this.score < _dp.rankScore3) {
                this.timerCell.delay = this.timerCellDelay3;
            }
            else if (this.score > _dp.rankScore3) {
                this.timerCell.delay = this.timerCellDelay4;
            }
            target.setTexture(tSex, 1);
            this.sdRight.pause();
            this.sdRight.play();
        }
        else {
            er = this.errorCells[target.getIndex()];
            er.move(Cell.DIRSHOW, true);
            er.visible = true;
            this.actErrorCells.push(er);
            this.sdError.pause();
            this.sdError.play();
        }
    };
    MainGame.prototype.moveCells = function (cells, dir, isNow) {
        if (isNow === void 0) { isNow = false; }
        var cell;
        for (var i = 0; i < cells.length; i++) {
            cell = cells[i];
            cell.move(dir, isNow);
            if (cell.getSex === 2 && dir === Cell.DIRHIDE) {
                setTimeout(function () {
                    cell.visible = false;
                }, Cell.tweenDur);
            }
        }
    };
    //随机获取需要显示的格子
    MainGame.prototype.randomSelCell = function () {
        var _cells = this.cells, cell, _tempArry = [], result = [], _showNum = this.showNum, rd, item, _sex;
        for (var i = 0; i < _cells.length; i++) {
            _tempArry.push(i);
        }
        for (var j = 0; j < _showNum; j++) {
            //不重复的随机数
            rd = Math.floor(Math.random() * _tempArry.length);
            item = _cells[_tempArry[rd]];
            _tempArry.splice(rd, 1);
            //随机得到性别
            item.setTexture(Math.floor(Math.random() * 2));
            result.push(item);
        }
        return result;
    };
    MainGame.prototype.timerGameFun = function (event) {
        //进度条
        var sw = this.stage.stageWidth, cc = event.target.currentCount(), rc = event.target.repeatCount;
        this.pgpast.x = sw - cc / rc * sw;
    };
    MainGame.prototype.timerGameComFun = function (event) {
        this.isOver = true;
        this.gameReset();
        var selEvent = new SelTypeEvent(SelTypeEvent.COMPLETE);
        selEvent._data = { score: this.score, playCount: this.playCount };
        selEvent._sex = this.sex;
        this.dispatchEvent(selEvent);
        //alert( this.score );
    };
    MainGame.prototype.timerCellFun = function (event) {
        var self = this, _cells;
        if (self.isShow) {
            //隐藏
            self.moveCells(self.cells, Cell.DIRHIDE);
            self.moveCells(self.actErrorCells, Cell.DIRHIDE);
            self.actErrorCells = [];
            !self.isOver && setTimeout(function () {
                self.moveCells(self.randomSelCell(), Cell.DIRSHOW);
                self.isShow = true;
            }, Cell.tweenDur);
        }
        else {
            self.moveCells(self.randomSelCell(), Cell.DIRSHOW);
        }
        self.isShow = !self.isShow;
    };
    //重置游戏
    MainGame.prototype.gameReset = function () {
        this.timerCell.stop();
        this.timerCell.reset();
        this.timerGame.stop();
        this.timerGame.reset();
        this.moveCells(this.errorCells.concat(this.cells), Cell.DIRHIDE, true);
        this.isShow = false;
        this.isOver = false;
        this.timerCell.delay = this.timerCellDelay;
    };
    return MainGame;
})(egret.Sprite);
/*
格子类,每个格子的位置固定,游戏中随机改变格子显示图片
    
*/
var Cell = (function (_super) {
    __extends(Cell, _super);
    function Cell(index, startX, startY, endX, endY, sex) {
        if (startX === void 0) { startX = 0; }
        if (startY === void 0) { startY = 0; }
        if (endX === void 0) { endX = 0; }
        if (endY === void 0) { endY = 0; }
        if (sex === void 0) { sex = 0; }
        _super.call(this);
        //性别 0:女 1:男 other:错误
        this.sex = 0;
        if (!Cell.manPic1) {
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
        this.setTexture(this.sex);
    }
    //@state:状态 0:正常 1:激活
    Cell.prototype.setTexture = function (sex, state) {
        if (sex === void 0) { sex = 0; }
        if (state === void 0) { state = 0; }
        this.sex = sex;
        this.texture = Cell[(sex === 0 || sex === 1 ? (sex ? "manPic" : "womenPic") + (state ? "2" : "1") : "errorPic")];
        this.isAct = state;
    };
    Cell.prototype.move = function (dir, isNow) {
        var end = dir === Cell.DIRSHOW ? this.endY : this.startY;
        if (isNow) {
            this.y = end;
        }
        else {
            egret.Tween.get(this).to({ y: end }, Cell.tweenDur);
        }
    };
    Cell.prototype.getIndex = function () {
        return this.index;
    };
    Cell.prototype.getSex = function () {
        return this.sex;
    };
    Cell.prototype.getStartX = function () {
        return this.startX;
    };
    Cell.prototype.getStartY = function () {
        return this.startY;
    };
    Cell.prototype.getEndX = function () {
        return this.endX;
    };
    Cell.prototype.getEndY = function () {
        return this.endY;
    };
    Cell.prototype.getIsAct = function () {
        return this.isAct;
    };
    Cell.DIRSHOW = "show";
    Cell.DIRHIDE = "hide";
    return Cell;
})(egret.Bitmap);
