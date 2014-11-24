/**************************************************
 * 弹出层
 * 2009.8.13
 * creat by zhengchong
 **************************************************/
var __swinTotal = 0;
var swin = {
    width: 350,
    height: 250,
    title: '',
    el: '',
    html: '',
    onClose: '',
    type: 0, //1加载层,2提示成功,3警告,9未知异常
    msg: '',
    _keep: null,
    _html: '',
    //创建遮罩层
    _creatMask: function(mType) {
        var sWidth, sHeight;
        sWidth = this._windowWidth();
        sHeight = this._windowHeight();
        if (window.ActiveXObject) {
            sHeight = sHeight;
        }
        if (this.type == 1) { this.width = 200; }
        if (this.type > 1) { this.width = 490; }
        //创建遮罩背景
        var maskObj = document.createElement("div");
        maskObj.setAttribute('id', 'maskDiv' + mType);
        maskObj.style.position = "absolute";
        maskObj.style.top = "0";
        maskObj.style.left = "0";
        maskObj.style.background = "#777";
        maskObj.style.filter = "Alpha(opacity=80);";
        maskObj.style.opacity = "0.3";
        maskObj.style.width = "100%";
        maskObj.style.height = sHeight + "px";
        maskObj.style.zIndex = "10000";
        maskObj.innerHTML = '<iframe id="ifrwin" border="0" frameborder="none" style="opacity:0; border:0px;filter:Alpha(opacity=0);  width:100%; height: 100%; "></iframe>';
        document.body.appendChild(maskObj);
        //		var maskifr = document.createElement("iframe");
        //		maskifr.setAttribute("id",'ifr'+mType);
        //		maskifr.style.position = "absolute";
        //		maskifr.style.top = "0";
        //		maskifr.style.left = "0";	
        //		maskifr.style.filter = "Alpha(opacity=0);";
        //		maskifr.style.opacity = "0";
        //		maskifr.style.width = sWidth-15 + "px";
        //		maskifr.style.height = "100%"
        //		maskifr.style.zIndex = "9999";	
        //		document.body.appendChild(maskifr);		
    },
    //创建弹出div
    show: function() {
        document.documentElement.style.overflow = "hidden";
        document.documentElement.style.paddingRight = 16 + 'px';
        this._creatMask('win');
        var _this = this;
        var iHtml = _this.el != '' ? document.getElementById(_this.el).innerHTML : _this.html;
        var c_height = this.type == 0 ? _this.height + 'px' : '250px';
        var c_width = _this.width;
        var vheight = (parseInt(c_height));
        var vwidth = (parseInt(c_height) - 30);
        if (vheight)
            var q_heihgt = parseInt(c_height) + 12 + 'px';
        var w_height = parseInt(c_height) + 76 + 'px';
        var e_height = parseInt(c_height) + 78 + 'px';
        var r_height = parseInt(c_height) + 80 + 'px';
        var q_width = parseInt(c_width) + 12 + 'px';
        var w_width = parseInt(c_width) + 24 + 'px';
        var e_width = parseInt(c_width) + 26 + 'px';
        var r_width = parseInt(c_width) + 28 + 'px';

        var iWidth = this._pageWidth();
        var iHeight = this._pageHeight();
        var ileft = this._leftPosition();
        var itop = this._topPosition();
        var wWidth = parseInt(c_width) + 28;
        var wHeight = parseInt(c_height) + 80;

        var toppos = (itop + (iHeight - vheight) / 2) + 'px';
        var leftpos = ileft + (iWidth / 2) - (wWidth / 2) + 'px';

        var windiv = document.createElement("div");
        windiv.id = "windiv";
        windiv.style.display = "";
        windiv.style.height = r_height;
        windiv.style.top = toppos;
        windiv.style.width = '100%';
        windiv.style.zIndex = 10002;
        windiv.style.position = 'absolute';
        var il = "";

        if (this.type == 0) {
            if (_this.title != '') {
                il = il + "<div style='border:1px solid #C6C6C6;width:" + _this.width + "px;overflow:hidden;background:#ffffff;'><ul style='overflow:hidden;background:url(/images/SuperBuyer/swintitle.gif) repeat-x; height:30px; line-height:30px;padding:0px 10px;border-bottom:1px solid #C6C6C6;'><li style='float:left;font-weight:bold;'>" + _this.title + "</li><li style='float:right;cursor:pointer;padding-top:8px;'><img src='/images/SuperBuyer/swinclose.gif' alt='' style='vertical-align:middle;float:left;' title='关闭' onclick=\"swin.close();" + _this.onClose + ";\"></li></ul>";
                il = il + iHtml;
                il = il + " </div>";
            }
            else {
                il = il + iHtml;
            }
        }
        else if (this.type == 1) {
            var message = this.msg != '' ? this.msg : '数据处理中...';
            il = il + "<div style='border:1px solid #C6C6C6;width:" + _this.width + "px;overflow:hidden;background:#ffffff;padding:20px;'>";
            il = il + '<ul><li>' + message + '</li></ul>';
            il = il + " </div>";
        }
        else if (this.type > 0) {
            var icon = '';
            switch (this.type) {
                case 2:
                    icon = 'succeed';
                    break;
                case 3:
                    icon = 'warn';
                    break;
                case 9:
                    icon = 'error';
                    break;
            }
            il = il + "<div style='border:1px solid #C6C6C6;width:" + _this.width + "px;overflow:hidden;background:#ffffff;padding-bottom:20px;'><img src='/images/SuperBuyer/swinclose.gif' alt='' style='vertical-align:middle;float:right;cursor:pointer;margin:8px 8px 0px 0px;' title='关闭' onclick='swin.close();'>";
            il = il + '<ul style="overflow:hidden;margin:20px 20px 00px 30px;"><li style="float:left;"><img alt="" src="../images/icon/' + icon + '.gif"/></li><li style="float:left; line-height:43px;margin-left:15px;color:#4D4E50;width:370px;overflow:hidden; " title="' + this.msg + '">' + this.msg + '</li></ul>';
            il = il + " </div>";
        }

        _html = iHtml;
        windiv.innerHTML = il;
        document.body.appendChild(windiv);
        if (this.el != '') { document.getElementById(this.el).innerHTML = ''; }
    },
    // flag 1-保存原对象
    close: function(flag) {

        if (this._keep != null) {
            var o = this._keep;
            this._clear();
            this._keep = null;
            this.width = o.width;
            this.height = o.height;
            this.title = o.title;
            this.el = o.el;
            this.html = o.html;
            this.type = 0;
            this.show();
            return;
        }
        if (flag == 1) {
            var o = {
                width: this.width,
                height: this.height,
                title: this.title,
                el: this.el,
                html: this.html
            };
            this._keep = o;
        }

        document.documentElement.style.overflow = "auto";
        document.documentElement.style.paddingRight = 0 + 'px';
        if (this.el != '') { document.getElementById(this.el).innerHTML = _html; }

        this._clear();
        this.title = '';
        this.el = '';
        this.html = '';
        this.msg = '';
        this.type = 0;

    },
    _clear: function() {
        var maskObj = document.getElementById("maskDivwin");
        var winObj = document.getElementById("windiv");
        var ifrObj = document.getElementById("ifrwin");
        if (maskObj) {
            document.body.removeChild(maskObj);
        }
        if (winObj) {
            document.body.removeChild(winObj);
        }
        //        if(ifrObj){
        //            document.body.removeChild(ifrObj);
        //        } 

    },
    _windowWidth: function() {
        var rootEl = document.compatMode == 'CSS1Compat' ? document.documentElement : document.body;
        var sWidth = Math.max(rootEl.scrollWidth, rootEl.clientWidth);
        return sWidth;
    },
    _windowHeight: function() {
        var rootEl = document.compatMode == 'CSS1Compat' ? document.documentElement : document.body;
        var sHeight = Math.max(rootEl.scrollHeight, rootEl.clientHeight);
        return sHeight;
    },
    //计算当前窗口的宽度
    _pageWidth: function() {
        return window.innerWidth != null ? window.innerWidth : document.documentElement && document.documentElement.clientWidth ? document.documentElement.clientWidth : document.body != null ? document.body.clientWidth : null;
    },
    //计算当前窗口的高度
    _pageHeight: function() {
        return window.innerHeight != null ? window.innerHeight : document.documentElement && document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body != null ? document.body.clientHeight : null;
    },
    //计算当前窗口的上边滚动条
    _topPosition: function() {
        return typeof window.pageYOffset != 'undefined' ? window.pageYOffset : document.documentElement && document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop ? document.body.scrollTop : 0;
    },
    //计算当前窗口的左边滚动条
    _leftPosition: function() {
        return typeof window.pageXOffset != 'undefined' ? window.pageXOffset : document.documentElement && document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft ? document.body.scrollLeft : 0;
    }
}
