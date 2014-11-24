$(function(){
    CheckWindow();
    $(window).resize(function(){
		 CheckWindow();
    });
    InitMenu();	
    InitDrop();   
    //初始化页签
    var _cura = $('.g-tit .current a');
    $("#"+_cura.attr("ibstabid")).show().siblings("[id*="+_cura.attr("prefix")+"]").hide();
	$(".g-filter").append("<p class='g-cf'></p>");
});
function InitMenu()
{
	var menu=$("#g-menu li");		    
    var curmenu=menu.filter(".current");	
	if ($.browser.msie&&$.browser.version==6.0) {//ie6 特殊处理
	  SelectMenuForIE6(curmenu);
	  menu.hover(function(){
	    SelectMenuForIE6($(this));
	  },function(){
	  if($(this).attr("class")!="current") 
	    $(this).find("b").remove();
	  });
    }
	else
	{ 
	 SelectMenu(curmenu);
	 menu.hover(function(){
	    SelectMenu($(this));
	 },function(){
	  if($(this).attr("class")!="current") 
	    $(this).find(".mbg").remove();
	 });
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
function SelectMenu(menuobj){
	var menulink=menuobj.find("a");	
	if(menulink.size()==1)
	{
	   var menubg=menulink.clone(); 
	   menubg.attr("class","mbg");
	   menuobj.append(menubg);  
	}	
}
function SelectMenuForIE6(menuobj){
	var menulink=menuobj.find("a");	
	if(menulink.size()==1)
	{
	   menuobj.append("<b class='"+menulink.attr("class")+"' onclick=\"window.open('"+menulink.attr("href")+"','"+(menulink.attr("target")==""?"_self":menulink.attr("target"))+"')\"></b>");  
	}	
}
//限制最小宽高
function CheckWindow(){
	var mh=300;
	var th=document.documentElement.clientHeight -$("#g-head").height()-$("#g-tab").height()-$("#g-ft").height()-2;
	if(th>mh) mh=th;
	$("#g-bd").css({"height":mh+"px"});
if ($.browser.msie&&$.browser.version==6.0) {
var w=document.documentElement.clientWidth;
if(w<1020) w=1020;
$("#g-ft").css({"width":w+"px"});	
$("#g-head").css({"width":w+"px"});
$("#g-tab").css({"width":(w-22)+"px"});	
$("#g-wp").css({"width":(w-6)+"px"});
$("#g-bd").css({"width":(w-6)+"px"});
$("#g-con").css({"width":$("#g-bd").width()-20});
setTimeout("DelayForIe6()",3500);
    }
}
function DelayForIe6()
{
	if(!document.getElementById("g-bd")){return;}
	if(document.getElementById("g-bd").scrollHeight>parseInt(document.getElementById("g-bd").style.height))
	{
		$("#g-con").css({"width":$("#g-bd").width()-37});
		var container=$("#g-tit").next();
		if(container.hasClass("g-fixedAre")) return;
		container.css({"width":$("#g-bd").width()-37});
	}
	else
	{
		$("#g-con").css({"width":$("#g-bd").width()-20});
		var container=$("#g-tit").next();
		if(container.hasClass("g-fixedAre")) return;
		container.css({"width":$("#g-bd").width()-20});
	}
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

    var wp = $('<div id=\"g-popwin\"></div>').appendTo('body'),
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
	var _tit = $('.g-tit'), _tabs = _tit.find("a").parent(), _pre = ele.getAttribute("prefix")||"";
		_con = $("#"+id);
	_tabs.removeClass("current").filter(ele.parentNode).addClass("current");
	_con.show().siblings("[id*="+_pre+"]").hide();
}