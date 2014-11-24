$(function(){
    InitDrop();  
	if(window.parent!=window){//在ibs web版,加载文档完成那个,隐藏
		$("#g-tip-load",window.parent.document).hide();
	}
	 
    //初始化页签
    var _cura = $('.g-tit .current a');
	if(_cura.length>0){
		$("#"+_cura.attr("ibstabid")).show().siblings("[id*="+_cura.attr("prefix")+"]").hide();
	}  
	
	$(".g-grid :checkbox[id=g_tmsSelAll]").unbind("click").live("click",function(){
		var ele = $(this),
			chs = ele.closest("table").find("tbody :checkbox");			
		chs.attr("checked",ele.attr("checked")?true:false);
	});
	$(".g-grid tbody").find(":checkbox").unbind("click").live("click",function(){
		var chs = $(this).closest("tbody").find(":checkbox");
		$(this).closest("table").find("#g_tmsSelAll").attr("checked",chs.length==chs.filter(":checked").length?true:false);		
	});
	
	//$.ibsTipInfo({text:"很抱歉，保存失败！",type:"e",callback:function(){alert(1);}});
});

$.extend({
	ibsTipInfo : function(options){//param  text:提示信息文本，type:提示类型-a,e,w,i callback:提示结束回调函数
		if(!options.text)return
		options.type = options.type || "a";
		options.delay = options.delay || 2000;
		
		var _tip = $("#g_tip_wrap"),
			_dom = document.documentElement,_w,_t;
		if(_tip.length === 0){
			_tip = $('<div class="g_tip_wrap" id="g_tip_wrap"><span class="g_tip_con"><span class="g_tip_l"></span><span class="" id="g_tip_con"></span><span class="g_tip_r"></span></span></div>');
		}
		_tip.find("#g_tip_con").attr("class","gtc-"+options.type).text(options.text);
		$("body").append(_tip);
		//_tip.css({"top":_dom.scrollTop+(_dom.clientHeight/2)-_tip.outerHeight(),"marginLeft":-(_tip.outerWidth()/2)});
		_tip.show(0,function(){			
			setTimeout(function(ele){
				return function(){
					$(ele).hide(0,options.callback);
				}				
			}(this),options.delay);
		});
	}
});

function newTabs(url,text){	
	if(window.parent == window){//如果是在客户端IBS面板打开,则调用IBS面板的新建页签方法
		try{
			window.external.ExecModule(url, text||'');
		}catch(e){
			
		}
	}
}

function InitDrop()
{
    $(".g-dropwp>ul").css("width",$(".g-drop").width()-4)
	$(".g-dropwp").hover(function(){
		$(this).find("ul").removeClass("g-d-n");	
	},function(){
		$(this).find("ul").addClass("g-d-n");	
	});    
}
function ClearTip(el,txt)
{
	if($.trim(el.value)==txt)
	{
		el.value="";
	    el.focus();
	}
	else if($.trim(el.value)=="")
	{
		el.value=txt;
	}
}

//将日期转换成"yyyy-mm-dd"格式 第二个参数为返回类型传入'ym':yyyy-mm,'md':mm-dd,默认为'yyyy-mm-dd'
function ConvertDateFormat(strDate,sye){
if (strDate ==null || strDate=="" || strDate=="0"){
return ("");
}
else{
try{
var ExDate = new Date(strDate.replace(/-/g, "/"));
var yyyy = ExDate.getFullYear();
var mm = ExDate.getMonth() +1;mm = mm<10?"0"+mm:mm;
var dd = ExDate.getDate();dd = dd<10?"0"+dd:dd;
switch(sye){
case "ym":
return yyyy + "-" + mm;
break;
case "md":
return mm + "-" + dd;
break;
default:
return yyyy + "-" + mm + "-" + dd ;
break;
}
}
catch(e){
return("")
}
}
}
//获取URL中的request参数
function getUrlParam(name){
var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
var r = window.location.search.substr(1).match(reg);
if (r!=null)
{return decodeURIComponent(r[2]);}
else
{return ""; }
} 


function popShow(obt) {

    var wp = $('<div id=\"g-popwin\"></div>'),
        ms = $('<div class=\"g-popwin-mask\"><iframe frameborder=\"0\" scrolling=\"no\"></iframe></div>').appendTo(wp),
		
        tb = $('<table class=\"g-popwin-box\"></table>').appendTo(wp),
        tr = $('<tr></tr>').appendTo(tb),
        td = $('<td></td>').appendTo(tr),

        bx = $('<div class=\"g_popwin\" style=\"margin:0 auto; width:700px;\"></div>').appendTo(td),

        ba = $('<div class=\"tit\"></div>').appendTo(bx),
        rb = $('<b class="g-f-r"></b>').appendTo(ba),
        hd = $('<a class="close g-f-r" title="点击关闭"></a>').appendTo(ba),
        st = $('<strong></strong>').appendTo(ba),

        cn = $('<div class=\"con\"></div>').appendTo(bx),
        ss;
    if (obt.ele) {
        ss = $(obt.ele).show().appendTo(cn)
    } else if (obt.html) {
        cn.append(obt.html)
    }
    wp.appendTo('body');
    if (obt.width) {
        bx.width(obt.width)
    }
    if (obt.height) {
        bx.height(obt.height)
    }
    if (obt.title) {
        st.text(obt.title)
    }
    else{ba.hide()}
    hd.add(obt.hide||'#swin_hide').click(function () {
        popHide();
    });
	
    window.popHide = function () {
        if (obt.ele) {
            ss.hide().appendTo('body')
        }
        wp.remove()
    };
}

var corpCardObj, corpTimer, corpCardShow = function (UserID, Target) {
	function GetUserLevelIcons(lev) {
		var level = lev;
		var ico5 = parseInt(level / 256);
		var ico4 = parseInt(level % 256 / 64);
		var ico3 = parseInt(level % 256 % 64 / 16);
		var ico2 = parseInt(level % 256 % 64 % 16 / 4);
		var ico1 = parseInt(level % 256 % 64 % 16 % 4);
		var arr = [];
		var index = 0;
		for (var i = 0; i < ico5; i++) {
			arr[index++] = "5";
		}
		for (var i = 0; i < ico4; i++) {
			arr[index++] = "4";
		}
		for (var i = 0; i < ico3; i++) {
			arr[index++] = "3";
		}
		for (var i = 0; i < ico2; i++) {
			arr[index++] = "2";
		}
		for (var i = 0; i < ico1; i++) {
			arr[index++] = "1";
		}
		return arr;
	}
        
	$.ajaxRequest({
		ClassName: 'Hqew.BLL.HQM.HqmBLL',
		ParamModelName: 'Hqew.Model.HQM.GetFriendInfoParamEx',
		MethodName: 'GetFriendInfoByUserID',
		onComplete: function (result) {
			if(!corpCardObj){
				corpCardObj = $('<div id=\"corp_card\" class=\"g-d-n\"><div class=\"wrap\"><div class=\"top g-cf\"><img id=\"corp_card_img\" src=\"#\" /><ul><li><b id=\"corp_card_username\">name</b><a id=\"corp_card_auth\" class=\"g-ico-auth\" href=\"http://im.hqew.com/help/detail209782.html\" target=\"_blank\" title=\"实名认证\"></a><a id=\"corp_card_qq\" class=\"g-ico-qq\"></a></li><li id=\"corp_card_sign\">PersonalSign</li><li><a id=\"corp_card_level\" href=\"http://im.hqew.com/intro/levelandcurrency.html\" target=\"_blank\" title=\"等级\"><i class=\"g-ico-qq-level5\"></i><i class=\"g-ico-qq-level4\"></i><i class=\"g-ico-qq-level3\"></i><i class=\"g-ico-qq-level2\"></i><i class=\"g-ico-qq-level1\"></i></a></li></ul></div><ul class=\"mid\"><li>电话：<span id=\"corp_card_phone\">Phone</span></li><li>手机：<span id=\"corp_card_mobile\">Mobile</span></li><li>邮箱：<span id=\"corp_card_email\">Email</span></li></ul><div class=\"bot\"><p class="g-mb-5">公司：<a target=\"_blank\" href=\"#\" id=\"corp_card_corpname\">CorpName</a></p><p><a id=\"corp_card_cx\" class=\"g-ico-cx\" title=\"已开通诚易通\" target=\"_blank\" href=\"http://www.hqew.com/bussiness/honestyeasy.html\"></a><a id=\"corp_card_iscp\" class=\"g-ico-iscp\" title=\"ICSP现货认证\" target=\"_blank\" href=\"http://www.hqew.com/about/service_03.html\"></a><a id=\"corp_card_mic\" class=\"g-ico-mic\" title=\"中国制造会员套餐\" target=\"_blank\" href=\"http://www.hqew.com/chinachips/service_index.html\"></a><a id=\"corp_card_led\" class=\"g-ico-led\" title=\"华强LED网会员套餐\" target=\"_blank\" href=\"http://www.hqew.com/about/service/servicedtl_2.html\"></a><a id=\"corp_card_bcp\" class=\"g-ico-bcp\" title=\"BCP品牌认证\" target=\"_blank\" href=\"http://www.hqew.com/about/service_18.html\"></a><a id=\"corp_card_600\" class=\"g-ico-600\" title=\"600条\" target=\"_blank\" href=\"http://www.hqew.com/about/600/index.html\"></a><a id=\"corp_card_wp\" class=\"g-ico-wp\" title=\"旺铺\" target=\"_blank\" href=\"http://www.hqew.com/about/service_12.html\"></a><a id=\"corp_card_kgj\" class=\"g-ico-kgj\" title=\"酷管家\" target=\"_blank\" href=\"http://www.hqew.com/topic/Stock2010/StockZT.html\"></a><a id=\"corp_card_buy\" class=\"g-ico-buy\" title=\"超级买家\" target=\"_blank\" href=\"http://www.hqew.com/about/service_15.html\"></a><a id=\"corp_card_coms\" class=\"g-ico-coms\" title=\"公司总成长值：-分\" target=\"_blank\" href=\"http://im.hqew.com/intro/levelandcurrency.html\">-</a></p></div></div></div>').appendTo('body');
			}
			
				if (result.CustomHead != undefined && result.CustomHead != '') {
					result.ImgUrl = 'http://hqmimg.hqew.com/customhead/' + result.CustomHead;
				} else {
					if (result.PersonHeadImg != undefined && result.PersonHeadImg != '') {
						result.ImgUrl = '/images/Login/' + result.PersonHeadImg.substr(result.PersonHeadImg.lastIndexOf('/'));
					} else {
						if (result.Gender = '男') {
							result.ImgUrl = '/images/Login/f_01.gif';
						}
						if (result.Gender = '女') {
							result.ImgUrl = '/images/Login/f_05.gif';
						}
					}
				}
				$('#corp_card_img').attr('src', result.ImgUrl);
				
				$('#corp_card_username').text(result.NickName == undefined ? '' : result.NickName);
	
				$('#corp_card_qq').removeClass().addClass(result.HqmIsOnline == 0 ? 'g-ico-qq-off' : 'g-ico-qq').click(function(){HqmChat('result.UserID','result.UserGUID');});
				
				$('#corp_card_sign').text(result.PersonalSign == undefined ? '' : result.PersonalSign)
	
				var qqLevel = '';
				$.each(GetUserLevelIcons(result.HqmLevel), function () {
					qqLevel += '<i class=\"g-ico-qq-level' + this + '\"></i>';
				});
				$('#corp_card_level').html(qqLevel).attr('title', '等级 ' + result.HqmLevel + ' 级');
	
				$('#corp_card_phone').text(result.Phone == undefined ? '' : result.Phone.split(',')[0] );
				$('#corp_card_mobile').text(result.Mobile == undefined ? '' : result.Mobile );
				$('#corp_card_email').text(result.Email == undefined ? '' : result.Email );
				
				$('#corp_card_corpname').text(result.CorpName == undefined ? '' : result.CorpName ).attr('href', result.ShopUrl == 'freeshop' ? 'http://www.hqew.com/freeshop_' + result.UserID + '.html' : result.ShopUrl);
				
				$('#corp_card_auth').css('display', result.IsEntity == 0 ? 'none' : 'inline-block');
				$('#corp_card_cx').css('display', result.IsHonest == 0 ? 'none' : 'inline-block');
				$('#corp_card_iscp').css('display', result.IsISCP == 0 ? 'none' : 'inline-block');
				$('#corp_card_mic').css('display', 1 ? 'none' : 'inline-block');
				$('#corp_card_led').css('display', 1 ? 'none' : 'inline-block');
				$('#corp_card_bcp').css('display', result.IsBCP == 0 ? 'none' : 'inline-block');
				$('#corp_card_600').css('display', 1 ? 'none' : 'inline-block');
				$('#corp_card_wp').css('display', result.IsVIPShop == 0 ? 'none' : 'inline-block');
				$('#corp_card_kgj').css('display', 1 ? 'none' : 'inline-block');
				$('#corp_card_buy').css('display', 1 ? 'none' : 'inline-block');
				
				$('#corp_card_coms').text(result.CompanyIntegralCountOfTotal == undefined ? '' : result.CompanyIntegralCountOfTotal ).attr('title', '公司总成长值：' + (result.CompanyIntegralCountOfTotal == undefined ? '' : result.CompanyIntegralCountOfTotal)  + '分');

				var targetOffset = $(Target).offset();
				corpCardObj.css({'top' : targetOffset.top, 'left' : targetOffset.left}).show().mouseover(function(){corpCardObj.show();return false;}).mouseout(function(){corpCardObj.hide();return false;});
		},
		onRequest: function (param) {
			param.FriendUserID = UserID;
			return param
		}
	});
},
corpCardHide = function () {
		if (corpCardObj) {
			corpCardObj.hide();
		}
	};

function InitMoreDropMenu()
{
	$(".g-dropmenu").hover(function(){
		$(this).addClass("g-p-r");
		$(this).find("ul").removeClass("g-d-n");	
		$(this).find("a").addClass("g-dropmenu-t-hover");	
	},function(){
		$(this).removeClass("g-p-r");
		$(this).find("ul").addClass("g-d-n");	
		$(this).find("a").removeClass("g-dropmenu-t-hover");	

	});    
}

//页签切换@当前点击的页签,对应的容器id
function ibs_tabSwitch(ele, id) {
var _tit = $('.g-tit'), _pre = ele.getAttribute("prefix")||"",_tabs = _tit.find("a").parent("[id*="+_pre+"]") ;
_con = $("#"+id);
_tabs.removeClass("current").filter(ele.parentNode).addClass("current");
_con.show().siblings("[id*="+_pre+"]").hide();
}