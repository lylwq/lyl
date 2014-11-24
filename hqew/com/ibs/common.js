String.prototype.len = function() {
    return this.replace(/[^\x00-\xff]/g, "**").length
};
String.prototype.cut = function(l) {
    if (this.len() <= l) {
        return this
    } else {
        for (var i = Math.floor(l / 2); i < this.len(); i++) {
            if (this.substr(0, i).len() >= l) {
                return this.substr(0, i)
            }
        }
    }
};

//主菜单备份，更多菜单备份,ibs产品字典
var _bakMenu, _bakMenuMore,_ibs_ProDic = {};
$(function() {//页签iframe
    var _tabs = $("#g-tab"),
        _cont = $("#g-body"),
        _url = function(url, ignore) {
            if (ignore) {
                var reg = new RegExp("(^|&)" + ignore + "=([^&]*)(&|$)");
                url = url.replace(reg, "");
            }
            return ((url.toLowerCase().indexOf('http') > -1) ? '' : ("http://" + location.host)) + $.trim(url);
        },
        _timer,
        getIframeTitle = function(iframe) {
            var _ifa = iframe[0],
				_fun = function(ifa){
					var title = ifa.contentWindow.document.title;
					_tabs.find("a").eq(iframe.index()).text(title).attr("title",title);
				};
            if (!+[1,]) {
                _ifa.onreadystatechange = function() {
                    if (_ifa.readyState == "complete") {
                        _fun(_ifa);
                    }
                }
            } else {
                _ifa.onload = function() {
                    _fun(_ifa);
                }
            }

        },
        createTabs = function(_href, text) {

            var _title = isNaN(text)?text:_ibs_ProDic[text],
                _title = _title || "正在加载...",_proid = isNaN(text)?"":text,
                _rep = true;
            _cont.children().each(function() {//激活已有页签
                var _this = $(this),
                    index = _this.index();
                if ((!isNaN(_proid) && (_proid == _this.attr("productid"))) || (_url(this.src, "r") == _url(_href, "r"))) {
                    _tabs.children().removeClass('cur').eq(index).addClass('cur');
                    _this.show().siblings().hide();
                    this.src = _href;
                    _rep = false;
                    return false;
                }
            });
            if (_rep) {//新开页签
                _tabs.children().removeClass('cur').eq(0).clone(true).appendTo(_tabs).addClass('cur').children('a').text(_title).attr('title', _title);
                _cont.children().hide().eq(0).clone(true).attr('src', _href).attr("productid",_proid).appendTo(_cont).show();

                if (!_ibs_ProDic[text]) { getIframeTitle(_cont.children(":last")); } //若title为空,则取iframe页面的title
                _tabs.scrollLeft(_tabs.scrollLeft() + _tabs.children().last().width() + 12);
                if (_tabs.scrollLeft() > 0) {
                    $('#forward, #rearward').show();
                }
            }
        };
    window.newTabs = function(_href, _text) {
        $("#g-tip-load").show();//页面正在加载提示层
        createTabs(_href, _text);
    };

    bindMenuEvent(); //绑定菜单事件
    //初始化打开页面taburl=/Electronic/ManageElectronic.aspx
    var _param = getUrlParam("taburl");
    if (_param) {
		newTabs(_param,document.getElementById("hdnproductid").value);
        /*$("#g-menu a").each(function() {
            if (this.getAttribute("href").replace("http://" + location.host, "") == _param) {
                $(this).click();
                return;
            }
        });*/
    }

    $('#forward').mousedown(function() {
        _timer = setInterval(function() {
            _tabs.scrollLeft(_tabs.scrollLeft() - 5)
        }, 30)
    }).mouseup(function() {
            clearInterval(_timer)
        });
    $('#rearward').mousedown(function() {
        _timer = setInterval(function() {
            _tabs.scrollLeft(_tabs.scrollLeft() + 5)
        }, 30)
    }).mouseup(function() {
            clearInterval(_timer)
        });

    function iHeight() {
        var w = $(window), width;
        width = document.documentElement.clientWidth > 1020 ? document.documentElement.clientWidth : 1020;
        _cont.children().width(width - 6);
        $("#g-main").width(width);
        _cont.children().height(w.height() - 166);
        _tabs.width(width - 175 - 24);
    }
    iHeight();
    $(window).resize(function() {
        iHeight();
    });
    $('#conRefresh').click(function() {//刷新
        $('iframe:visible')[0].contentWindow.location.reload();
    });
    $("#servicehqmOnline").click(function() {//客服
        HqmService('12949', 'FB62F4B8-63E5-4735-8FB4-3DA152933D81', '1', '12949', '81');
    });
    $("#g-setfun,#g-menu-mi-fix").click(function() {//设置常用功能
        if ($('iframe:visible')[0].contentWindow.document.title != "设置常用功能") {
            newTabs('/AllProduct.aspx?isset=1', '设置常用功能');

            var btn = $(".gm-a:visible"),btnMore = $(".g-menu-mi");
            _bakMenu = btn.clone(true);
            _bakMenuMore = btnMore.clone(true);
            if (btn.add(btnMore).find("b.gm-remove").length > 0) { return }
            btn.add(btnMore).prepend('<b class="gm-remove"></b>'); //转入编辑状态
            $("#g-menu-agd").mouseover().unbind("mouseover").unbind("mouseout"); //取消更多按钮事件并激活
            $("#g-menu-more").unbind("mouseout"); //取消更多菜单事件并显示
            $("#g-menu-mi-fix").hide();

            _tabs.children().unbind("click").click(function() {//注销页签切换事件
                alert("请先保存或取消当前常用功能!");
                return false;
            }).find('b').unbind("click");
            $("#g-menu-all,#g-menu-main,#conRefresh").unbind("click").click(function() {//注销首页及所有功能
                alert("请先保存或取消当前常用功能!");
                return false;
            });

            btn.add(btnMore).unbind("click").click(function() {
                addMenuBtnCilck(this);
                return false;
            });
            return false;

        }
        else {
            if (document.getElementById("div_quick_setting").style.display == "block") {
                showQuickSetting(false);
            } else {
                showQuickSetting(true);
            }
        }
    });

});

function addTabClick(ele, _cont) {//添加页签切换事件
    var _this = $(ele),
        index = _this.index();
    _this.addClass('cur').siblings().removeClass('cur');
    _cont.children().hide().eq(index).show();
}

function addTabCloseClick(ele, tabs, cont) {
    if (tabs.children().length > 1) {
        var _this = $(ele).parent(),
            index = _this.index();
        _this.remove();
        cont.children().eq(index).remove();
        tabs.children().removeClass('cur').last().addClass('cur');
        cont.children().hide().last().show();
        if (tabs.scrollLeft() == 0) {
            $('#forward, #rearward').hide();
        }
    }
}

function addMenuBtnCilck(ele) {//添加菜单增减事件
    var win = $('iframe:visible')[0].contentWindow,
        _item = $(ele), btnMore = $(".g-menu-mi"),
        _temp;
    if (win.DelProduct && win.DelProduct(_item.attr("productid")) === true) {//页面删除成功
        _item.css("display", "none");

        if (_item.attr("class") === "gm-a" &&
            btnMore.filter(":visible").length > 0) {//菜单不在更多内且有项
            _temp = btnMore.filter(":visible:first");
            _temp.hide().clone(true).attr("class", "gm-a").text("")
                .append('<b class="gm-remove"></b><span class="g-menu-' +
                _temp.attr("productid") + '"></span>').show()
                .insertBefore("#g-menu-agd");
        }
        if (btnMore.filter(":visible").length === 0)//更多菜单中无项时
        {
            $("#g-menu-agd,#g-menu-more").hide();
        }
    }
}

function addMenuItem(ele) {//添加菜单
    if (!ele || ele.length == 0) { return }

    var _has = $(".gm-a,.g-menu-mi").filter("[productid=" + ele.attr("productid") + "]"),
        btn = $(".gm-a:visible"),
        _model = (btn.length < 9) ? '<a href="{0}" title="{1}" productid="{2}" class="gm-a"><b class="gm-remove"></b><span class="g-menu-{2}"></span></a>' :
            '<a href="{0}" title="{1}" productid="{2}" class="g-menu-mi"><b class="gm-remove"></b>{1}</a>';

    if (_has.length > 0) {
        ele = _has;
    }
    _model = $(_model.replace(/\{0\}/g, ele.attr("path") || ele.attr("href")).
        replace(/\{1\}/g, ele.attr("title")).replace(/\{2\}/g, ele.attr("productid")));
    _model.click(function() {
        addMenuBtnCilck(this);
        return false;
    });
    if (btn.length < 9) {

        $("#g-menu-agd").before(_model);
    } else {
        $("#g-menu-agd").show().addClass("g-menu-agd-cur").unbind("mouseover").unbind("mouseout");
        $("#g-menu-more").show().unbind("mouseout").css("left", $("#g-menu-agd")[0].offsetLeft).children(":last").before(_model);
    }
}

function bindMenuEvent() {//添加菜单页签显示事件

    var _tabs = $("#g-tab"),
        _cont = $("#g-body");
    _tabs.children().unbind("click").click(function() {//页签切换
        addTabClick(this, _cont);
    }).dblclick(function() {
		$(this).find("b").click();
	}).find('b').click(function() {//关闭页签
		addTabCloseClick(this, _tabs, _cont);
	}).hover(function(){
		$(this).addClass("act");
	},function(){
		$(this).removeClass("act");
	});

    $(".gm-a").add(".gm-a-fix").unbind("click").click(function() {//菜单以页签方式显示
        var _this = $(this);
        newTabs(_this.attr('href').replace(/(^\s*)|(\s*$)/g, ''), _this.attr("productid"));
        _this.blur().addClass("gm-a-cur").siblings().removeClass("gm-a-cur");
        return false;
    });
    $(".g-menu-mi").unbind("click").click(function() {//更多菜单以页签方式显示
        var _this = $(this);
        newTabs(_this.attr('href').replace(/(^\s*)|(\s*$)/g, ''), _this.attr("productid"));
        return false;
    });

    //查看更多
    $("#g-menu-agd").unbind("mouseover").unbind("mouseout").mouseover("menuIn", function() {
        $(this).addClass("g-menu-agd-cur");
        if ($("#g-menu-more").children().length > 1) $("#g-menu-more").css({ "display": "block", "left": this.offsetLeft });
    }).mouseout("menuOut", function() {
            $(this).removeClass("g-menu-agd-cur");
            $("#g-menu-more").css("display", "none");
        });
    $("#g-menu-more").unbind("mouseover").unbind("mouseout").mouseover("menuMoreIn", function() {
        $("#g-menu-agd").addClass("g-menu-agd-cur");
        $(this).show();
    }).mouseout("menuMoreOut", function() {
            $("#g-menu-agd").removeClass("g-menu-agd-cur");
            $(this).hide();
        });
}

function saveMenuSet() {	//保存菜单设置
    $(".gm-a:hidden,.g-menu-mi:hidden").remove();
    comMenuSet();
}

function cancleMenuSet() {//取消菜单设置
    $(".gm-a,.g-menu-mi").remove();
    if (_bakMenu && _bakMenu.length > 0) {
        $("#g-menu-agd").before(_bakMenu.clone(true));
    }
    if (_bakMenuMore && _bakMenuMore.length > 0) {
        $("#g-menu-mi-fix").before(_bakMenuMore.clone(true));
    }
    $("#g-menu-agd,#g-menu-more").removeClass("g-menu-agd-cur").css("display", ($("#g-menu-more").children().length > 1) ? "block" : "none");
    comMenuSet();
}

function comMenuSet() {//重置菜单
    _bakMenu = null;
    _bakMenuMore = null;
    bindMenuEvent(); //重新绑定菜单事件
    $("#g-tab").children(".cur").find("b").click(); //关闭设置窗口
    $("#g-menu-all").click(); //打开所有功能页面
    $("#g-menu-mi-fix").show();
    $(".gm-remove").remove();
    $("#g-menu-agd").css("display", ($("#g-menu-more").children().length > 1) ? "block" : "none");
    $("#g-menu-more").hide();
    $('#conRefresh').unbind("click").click(function() {//刷新
        $('iframe:visible')[0].contentWindow.location.reload();
    });
}

function ClearTip(el, txt) {
    if ($.trim(el.value) == txt) {
        el.value = "";
        el.focus();
    }
    else if ($.trim(el.value) == "") {
        el.value = txt;
    }
}

//将日期转换成"yyyy-mm-dd"格式 第二个参数为返回类型传入'ym':yyyy-mm,'md':mm-dd,默认为'yyyy-mm-dd'
function ConvertDateFormat(strDate, sye) {
    if (strDate == null || strDate == "" || strDate == "0") {
        return ("");
    }
    else {
        try {
            var ExDate = new Date(strDate.replace(/-/g, "/"));
            var yyyy = ExDate.getFullYear();
            var mm = ExDate.getMonth() + 1; mm = mm < 10 ? "0" + mm : mm;
            var dd = ExDate.getDate(); dd = dd < 10 ? "0" + dd : dd;
            switch (sye) {
                case "ym":
                    return yyyy + "-" + mm;
                    break;
                case "md":
                    return mm + "-" + dd;
                    break;
                default:
                    return yyyy + "-" + mm + "-" + dd;
                    break;
            }
        }
        catch (e) {
            return ("")
        }
    }
}
//获取URL中的request参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
    { return decodeURIComponent(r[2]); }
    else
    { return ""; }
}

//页签切换@当前点击的页签,对应的容器id
function ibs_tabSwitch(ele, id) {
    var _tit = $('.g-tit'), _tabs = _tit.find("a").parent(), _pre = ele.getAttribute("prefix") || "";
    _con = $("#" + id);
    _tabs.removeClass("current").filter(ele.parentNode).addClass("current");
    _con.show().siblings("[id*=" + _pre + "]").hide();
}