(function(global){

    global.cookie = function (name, value, expires) {
        if (value) {
            var duration = new Date();
            duration.setDate(duration.getDate() + expires);
            document.cookie = name + '=' + encodeURIComponent(value) + ';path=/' + (expires ? ';expires=' + duration.toGMTString() : '')
        } else {
            var arr = document.cookie.match(new RegExp('(^| )' + name + '=([^;]*)(;|$)'));
            return arr != null ? decodeURIComponent(arr[2]) : ''
        }
    }
    global.showQtip = function (elem , text , options) {
        options = options || {};

        var _text = text || "",
            _style = options.style ,
            _pos = options.pos,
            _corPos = options.corPos;

        $(elem)
            .qtip({
                overwrite:true,
                content: {
                    text: _text
                },
                position: {
                    my: _corPos,
                    at: _pos
                },
                show: {
                    event: true,
                    ready: true
                },
                hide: {
                    event: false,
                    fixed : true
                },
                style: {
                    classes: 'qtip-shadow ' + _style
                }
            });
    };
    
    global.isLogined = function(){
    	var result;
		$.ajax({
			url:global.base + "/shop/member!ajaxMemberVerify.action",
			type: "POST",
			dataType: "json",
			cache: false,
			async:false,
			success: function(data) {
				result = data.status;
			}
		});
		return result;
    }

})(PORTAL);

//jquery原型扩展
(function($){

    /*页签切换
     @contanerId:内容容器id,
     @className:当前tab样式
     $(ele).switchTab({contanerId:"conid",className:"act"});
     */
    $.fn.switchTab = function (options) {
        var _conid = options.contanerId,
            _cn = options.className,
            _tabCall = options.tabCall,
            _cb = options.callback
            _tabs = this;

        if (!_conid && !_tabCall && !_cn) {
            return
        }
        _tabs.click(function () {
            var _t = $(this),
                _item = _t.attr("tabTarget") ? ("#" + _t.attr("tabTarget")) : (":eq(" + _tabs.index(_t) + ")");
            if (_tabCall) {
                _tabCall(_t);
            } else {
                _t.addClass(_cn).siblings().removeClass(_cn);
            }
            if(_conid){
                $("#" + _conid).children().filter(_item).show().siblings().hide();
            }else{
                $(_item).show().siblings().hide();
            }
            _cb && _cb(_t);
            return false;
        });
    }
    /*表单验证插件,jQuery(form).L_validate()*/
    $.fn.L_validate = function (options) {
        options = options || {};
        var form = this,
            alertFun = options.alertFun || $.L_message,//提示信息的方法
            alertArgObj = options.alertArgObj ||{},//传递给提示方法的参数对象
            itemSucCallBack = options.itemSucCallBack,//每个元素验证成功后的回调
            customValidete = options.customValidete,//元素自定义方法
            errorCallBack = options.errorCallBack,//验证不通过后的回调
            sucCallBack = options.sucCallBack,//所有元素验证成功后的回调
            isSuc = true,
            rules = {
                username:function (elem){
                    var val = elem.val();
                    return val ? ( /^[a-zA-Z0-9]{4,14}$/.test(val)) : true;
                },
                email:function (elem) {
                    var val = elem.val();
                    return val ? ( /^[\.\w_\\-]{1,30}@[\w]{1,28}\.[a-zA-Z]{2,4}$/.test(val)) : true;
                },
                mobile:function(elem){
                    var val = elem.val();
                    if(!val){return;}
                    /*
        中国移动[16种]:134、135、136、137、138、139、147、150、151、152、157、158、159、182、187、188
        中国联通[7种]:130、131、132、155、156、185、186
        中国电信[4种]:133、153、180、189
                    */
                    return val ? (/^1\d{10}$/.test(val)) : true;                    
                },
                account:function( elem ){
                    var val = elem.val();
                    //return val ? (/^$/)
                },
                length:function( elem , args){
                    var val = elem.val(),
                        reg = new RegExp("^(.|\\w){"+args+"}$");
                    return reg.test(val);
                },
                must:function (elem) {
                    return $.trim(elem.val()) !== "";
                },
                pwlen:function (elem) {
                    var pwdLength = elem.val();
                    if (pwdLength.length < 4 || pwdLength.length > 20) {
                        return false;
                    }
                    else {
                        return true;
                    }
                },
                pwdre:function (elem) {
                    if (!elem.attr("vto")) {
                        return;
                    }
                    var to = $("#" + elem.attr("vto") + ":visible").val(),
                        rval = elem.val();
                    return to !== "" && rval !== "" && to === rval;
                },
                pwd:function(elem){
                     var val = elem.val();
                     return val ? (/^[\w\-~!@#$%^&*()+{}[ \]:"';.=|><V]{6,12}$/.test(val)) : true;
                     //return val ? (/^[^\s\n\f\r\t\v]{6,12}$/.test(val)) : true;
                }
            },
            mesg = {
                username:"用户名由数字和英文组成，长度4~14位",
                email:"请输入有效的邮箱地址",
                mobile:"请输入正确的手机号码",
                must:"请输入必填项",
                pwdre:"密码输入不一致",
                length:"请输入正确的内容长度",
                pwlen:"密码最少4位，最多20位",
                checkExist:"邮箱已经存在，请重新输入！",
                noExist:"邮箱不存在，请重新输入！",
                pwd:"密码由英文、数字及特殊字符组成，长度为6~12位"
            };

        if(customValidete){//对多个元素对一个自定义验证方法进行处理
            for(var key in customValidete){
                var keyList = key.split(" "),
                    cusvItem = customValidete[key];
                //拆分成单独对象
                for (var i = keyList.length - 1; i >= 0; i--) {
                    customValidete[keyList[i]] = {
                        func : cusvItem.func,
                        msg : cusvItem.msg.split(" ")[i]
                    }
                };
            }
        }
        var velem = form.find("[vtype]");

        velem.blur(function (e) {
            var item = $(this), vtype , vtiem , vtName , vtArg , 
                cusObj,valRes = true,msgRes,
                imsg = item.attr("vmsg") ? item.attr("vmsg").split(" ") : [],
                i, j, len_i, len_j = velem.length;

            vtype = item.attr("vtype").split(" ");
            len_i = vtype.length;

            for (i = 0; i < len_i; i += 1) {
                vtiem = vtype[i].split(":");
                vtName = vtiem[0];
                vtArg = vtiem[1];
                if (rules[vtName]) {
                    valRes = rules[vtName](item , vtArg);
                    if( !valRes ){                     
                        msgRes = imsg[i] || mesg[vtName];
                        break;                      
                    }
                }
            }

            //有自定义验证方法
            if(valRes && customValidete && customValidete[this.id]){
                cusObj = customValidete[this.id];
                valRes = cusObj.func(item);

                if(valRes!=undefined && !valRes){
                    msgRes = cusObj.msg;
                }
            }
            
            if(valRes === false){
                alertFun( item , msgRes , alertArgObj );
                errorCallBack && errorCallBack(item);
                isSuc = false;
                e.stopImmediatePropagation();
                //item.focus();
                return;
            }
            
            valRes && itemSucCallBack && itemSucCallBack(item);
        });
        form.submit(function (e) {

            isSuc = true;
            velem.filter(":visible").blur();
            isSuc && sucCallBack && sucCallBack($(this));

            e.stopPropagation();
            return isSuc;
        });
    }
    $.fn.L_slider = function (options) {
        var slide = this,
            imgs = slide.children(),
            imgsLen = imgs.length,
            playSpeed = options.playSpeed || 3000,
            duration = options.duration || 500,
            tabs = options.tabsId?($("#"+options.tabsId)) : null,
            tabTemp = options.tabTemp,
            tabTempHtml = "",
            tabActClass = options.tabActClass,
            playTimer;
            playIndex = 1,
            playFun = function(){
                var oldImg = imgs.filter("[isShow=1]");
                
                oldImg.attr("isShow",0).css("zIndex",1);
                imgs.eq(playIndex).attr("isShow",1).show().css("zIndex",3).animate({opacity:1},duration,function(){
                    oldImg.animate({opacity:0},0);
                });
                tabs.children().eq(playIndex).addClass(tabActClass).siblings().removeClass(tabActClass);
                playIndex++;
                if(playIndex >= imgsLen){
                    playIndex = 0;
                }
            };
        if(tabs){
            for( var i = 0 ; i < imgsLen ; i++ ){
                tabTempHtml += tabTemp;
            }
            tabs.html(tabTempHtml).children(":first").addClass(tabActClass);
        }

        tabs.children().click(function(){
            playIndex = $(this).index();
            playFun();
            clearInterval(playTimer);
        }).mouseout(function(){
            clearInterval(playTimer);
            playTimer = setInterval( playFun , playSpeed);
        });

        imgs.eq(0).show().siblings().animate({opacity:0},0);
        playTimer = setInterval( playFun , playSpeed);

        imgs.hover(function(){
            clearInterval(playTimer);
        },function(){
            playTimer = setInterval( playFun , playSpeed);
        });

    }
})(jQuery);

//jquery对象扩展
(function($){
    $.L_message = function (mes, elem) {
        if (!mes && !elem) {
            $(".g_mesg").remove();
            return;
        }
        if (!mes && elem) {
            elem.parent().find(".g_mesg").remove();
            return;
        }
        var span = $('<span class="g_mesg"></span>').clone(),
            _x = elem.position().left, _y = elem.position().top + elem.height() + 5;

        span.appendTo(elem.parent()).css({"top":_y, "left":_x}).text(mes);
    }

    $.L_domClickBlur = function (sel, isOne) {
        $(document)[(isOne ? "one" : "bind")]("mouseup.L_domClickBlur", function (ee) {
            if ($(ee.target).parents(sel).length === 0) {
                $(sel).hide();
            }
        });
    }

})(jQuery);

//扩展mousewheel事件
(function($) {

    var types = ['DOMMouseScroll', 'mousewheel'];

    if ($.event.fixHooks) {
        for ( var i=types.length; i; ) {
            $.event.fixHooks[ types[--i] ] = $.event.mouseHooks;
        }
    }

    $.event.special.mousewheel = {
        setup: function() {
            if ( this.addEventListener ) {
                for ( var i=types.length; i; ) {
                    this.addEventListener( types[--i], handler, false );
                }
            } else {
                this.onmousewheel = handler;
            }
        },

        teardown: function() {
            if ( this.removeEventListener ) {
                for ( var i=types.length; i; ) {
                    this.removeEventListener( types[--i], handler, false );
                }
            } else {
                this.onmousewheel = null;
            }
        }
    };

    $.fn.extend({
        mousewheel: function(fn) {
            return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel");
        },

        unmousewheel: function(fn) {
            return this.unbind("mousewheel", fn);
        }
    });

    function handler(event) {
        var orgEvent = event || window.event, args = [].slice.call( arguments, 1 ), delta = 0, returnValue = true, deltaX = 0, deltaY = 0;
        event = $.event.fix(orgEvent);
        event.type = "mousewheel";

        // Old school scrollwheel delta
        if ( orgEvent.wheelDelta ) { delta = orgEvent.wheelDelta/120; }
        if ( orgEvent.detail     ) { delta = -orgEvent.detail/3; }

        // New school multidimensional scroll (touchpads) deltas
        deltaY = delta;

        // Gecko
        if ( orgEvent.axis !== undefined && orgEvent.axis === orgEvent.HORIZONTAL_AXIS ) {
            deltaY = 0;
            deltaX = -1*delta;
        }

        // Webkit
        if ( orgEvent.wheelDeltaY !== undefined ) { deltaY = orgEvent.wheelDeltaY/120; }
        if ( orgEvent.wheelDeltaX !== undefined ) { deltaX = -1*orgEvent.wheelDeltaX/120; }

        // Add event and delta to the front of the arguments
        args.unshift(event, delta, deltaX, deltaY);

        return ($.event.dispatch || $.event.handle).apply(this, args);
    }

})(jQuery);
