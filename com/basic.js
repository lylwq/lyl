$(function(){
     setBottom();
	//布局的DIV同上一个位置自动计算TOP值
	$(".dup").each(function(){
		$(this).css("top",parseInt($(this).prev().outerHeight())+parseInt($(this).prev().css("top"))+5);
		//alert(parseInt($(this).prev().outerHeight())+parseInt($(this).prev().css("top")))
	}); 
	//菜单切换
	$('.leftmenu dt').click(function(){
		var dd=$(this).siblings('dd');
		dd.is(':visible')?dd.hide().siblings('dt').addClass('close opdt'):dd.show().siblings('dt').removeClass('close opdt');	
		setBottom();
	});
	//关闭底部工具栏
	$('#bclose').click(function(){$(this).closest('div.bottom').hide();return false;});
	//文本框的默认值处理
	
	$("#LogoutSystem").click(function(){
		if (confirm("您确定要退出系统？"))
		{
			$.get("logout.asp?N="+Math.random(),function(){location.href = "login.asp";});
		}
		return false;
	});
	
	$("#OrderNum").click(function(){
		$.get("ajax/getordernum.asp?Act=ReLoad&N="+Math.random(),function(data){
			$("#OrderNum").text(data);
		});
	});
	if ($("#OrderNum").text().length<1){
		$.get("ajax/getordernum.asp?N="+Math.random(),function(data){
			$("#OrderNum").text(data);
		});
	}
//==============================================================
//分页
	$(".pages a").live("click",function(){
		pageCount_ = setPageCount();    //自定义每页显示数
		var H=$(this).attr("rev");
		if (H=="###"){
			return false;
		}else if(H=="##"){
			var Pg=$("#gopgnum").val();
			var MaxPg=$("#gopgnum").attr("rev");
			if (Pg>=1 && Pg<=MaxPg) GoSearch(Pg,pageCount_);
		}else{
			var R=$(this).attr("rel");
			var PG=parseInt($(".pages").find(".active").attr("rel"));
			$(this).addClass("active").siblings().removeClass("active");
			if (R=="prev"){  
			    if(isNaN(PG)){PG=2;}
				GoSearch(PG-1,pageCount_);
			}else if(R=="next"){
				if(isNaN(PG)){PG=0;}
				GoSearch(PG+1,pageCount_);
			}else{
				if(isNaN(PG)){PG=1;}
				GoSearch(R,pageCount_);
			}
		}
		return false;
	});
	$("#npage").click(function(){
		$(".next").click();
		return false;
	});
	$("#upage").click(function(){
		$(".prev").click();
		return false;
	});
	//==============================================================

});

//页码处理
var setPage=function(){
	var PG=$(".pages").find(".active").attr("rel");
	var PGS=$(".pages a.next").prev().attr("rel");
	var RSC=$("#gopg").prev("span").children("input").attr("rel");
	if(!PG || typeof(PG)=="undefined" ){PG=1;}
	if(!PGS || typeof(PGS)=="undefined" || PGS=="prev"){PGS=1;}
	if(!RSC || typeof(RSC)=="undefined" ){RSC=0;}
	$("#RSCount").text(RSC);$("#RSPG").text(PG);$("#RSPGS").text(PGS);
}

//设置页面显示数目
var setPageCount=function(){
	 var pageCount,pageCount2_,pageCount_;
	 pageCount2_=$("#pageCount_").val();
	 if(pageCount2_=="" || typeof(pageCount2_)=="undefined"){
	 pageCount = 15;  //设置每页默认显示数目 
	 }else{
	  pageCount = pageCount2_  //自定义每页显示数
	 }	
   return pageCount;
}
	
/*showTips(ctnstr,[,title][,obj])
传参说明：
[ctnstr] 为Tips的内容，不可为空；
[,title] 为标题，非首次执行可为空，主要区别在AJAX中会执行多次请求；
[,obj]   触发的对象，用于计算Top,Left,Width，非首次可为空，区别同上*/
var showTips = function(ctnstr){
	var title = showTips.arguments[1];
	var tipobj = showTips.arguments[2];
	if ($("#showbox").length<=0){
	  $("body").append("<div id='showbox' class='showbox'><dl><dt></dt><dd></dd></dl><span class='showg'></span><span class='showclose' title='关闭'></span></div>");
	  $(".showclose").click(function(){showTipsClose();});
	  //$("#showbox").append("<iframe class='lap' width='100%' frameborder='0' scrolling='no'></iframe>")
	}
	var showbox=$("#showbox");
	if (title!=""){showbox.find("dt").html(title)}
	if (tipobj instanceof jQuery){
		var tipobjtop=tipobj.offset().top+tipobj.outerHeight()+9;
		var tipobjleft=tipobj.offset().left+(tipobj.outerWidth()*0.5)-(showbox.outerWidth()*0.5)-9;
		showbox.css({'top':tipobjtop,'left':tipobjleft});
	}
	showbox.find("dd").html(ctnstr).end().show();
}
//关闭showTips
var showTipsClose=function(){if($("#showbox").length>0){$("#showbox").hide();setBottom();}}

var showInfo = function(str,obj){
	if ($("#showInfo").length<=0){
		$("body").append("<div class='showInfo' id='showInfo'></div>");
	}
	var objDiv = $("#showInfo");
	if(!objDiv.is(":animated")){ 
		var time = showInfo.arguments[2];
		var left = showInfo.arguments[3];
		var top = showInfo.arguments[4];
		if(cint(time)==0) time=4000;
		if(cint(left)==0) left=20;
		if(cint(top)==0) top=8;
		var tip_x = obj.offset().left+left;
		var tip_y = obj.offset().top+top+"px";
		var tip_w = obj.width();
		objDiv.text(str)
		.css({"top":tip_y,"left":tip_x+tip_w+"px"})
		.fadeIn(50).fadeOut(time);
	}
}
var cint=function(intstr){
	var intstr_ = parseInt(intstr);
	if(isNaN(intstr_)) intstr_ = 0;
	return intstr_;
}
//文本框的默认值处理
var iptDefault = function(){
	$("input[default],textarea[default]").each(function(){
		if($(this).val()=="") $(this).val($(this).attr("default")).addClass('gray');
	}).blur(function(){
		if($(this).val()=="") $(this).val($(this).attr("default")).addClass('gray');
	}).focus(function(){
		if($(this).val()==$(this).attr("default")) $(this).val("").removeClass('gray');
	});
}

//调整页脚位置
var setBottom=function(){
	$("#btspace").hide();
	$("#bottom").hide();
	$("body").height("").height($(document).height());
	//$("body").append("<div class='dp h35 w10' id='btspace'></div>");
	$("#btspace").css("top",$(document).height()).show();
	$("#bottom").show();
}
var setBline=function(){//对bline的列表做鼠标经过样式
	$(".bline tr,.bline li:not(:first)").hover(function(){$(this).addClass("libg");},function(){$(this).removeClass("libg");});
}
;(function(){//email,mobile,tel,idcard,num,pwd,empty
	$.L_validator=function(ele_form,options){
		if(ele_form[0].nodeName.toLowerCase()=="form"){
			$('[ctype]').each(function(){
				$(this).blur(function(){
					$.L_validator.classRules(this);
					if(!$.L_validator.vali_result){return false};
				});
			});
			ele_form.bind("falseSubmit",function(){
				$('[ctype]').each(function(){
					$(this).blur();
					if(!$.L_validator.vali_result) return false;
				});
			});
			ele_form.submit(function(){
				ele_form.trigger("falseSubmit");
				if(!$.L_validator.vali_result)return false;
				else{return true;}
			});
		}
	};
	$.extend($.L_validator,{
		methods:{//验证方法
			must:function(ele){
				return $.trim($(ele).val()).length > 0;
			},
			username:function(ele){return /^[A-Za-z]\w{2,14}$/.test($(ele).val())},
			email:function(ele){return  /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test($(ele).val())},
			int:function(ele){return /^[0-9]*[1-9]*[0-9]*$/.test($(ele).val())},
			money:function(ele){return /^(0|[1-9][0-9]*)(.[0-9]{1,2})?$/.test($(ele).val())},
			_money:function(ele){return /^(\-{0,1})(0|[1-9][0-9]*)(.[0-9]{1,2})?$/.test($(ele).val())},
			mobile:function(ele){return /^((\(\d{2,3}\))|(\d{3}\-))?1[3,5,8]\d{9}$/.test($(ele).val())},
			tel:function(ele){return /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9] \d{6,7}(\-\d{1,4})?$/.test($(ele).val())},
			idcard:function(ele){return chkIdCard($(ele).val())==0;},
			pwd:function(ele){return /^\w{6,20}$/.test($(ele).val())},
			repeat:function(ele){return	$('input[id='+$(ele).attr("pwd_target")+']').val()==$(ele).val()},
			maxlen:function(ele){return	parseInt($(ele).val().length)<=parseInt($(ele).attr("maxlength"));}/*最大长度*/
		},
		classRules:function(element){//验证方法_结果表现
			if(!$(element).attr('ctype'))return false;
			var ctypes=$(element).attr('ctype').split(' ');
			if($(element).attr('message'))var messages=$(element).attr('message').split(' ');
			else var messages=[];
			$.L_validator.ele=element;
			$.each(ctypes,function(ind){
				if (this in $.L_validator.methods){
					if (!new Function("return $.L_validator.methods."+this+"($.L_validator.ele)")()){
						$.L_validator.vali_result = false;
						//$.L_validator.ele.focus();
						$.L_showinfo(element,{message:messages[ind],time:2000});
						return false;
					}else{
						$.L_validator.vali_result = true;
					}
				}
			});
		},
		vali_result:true//验证结果,通过此变量判断表单提交与否
	});
	$.extend({
		L_showinfo:function(element,options){//错误信息提示
			if(!element)return;
			options=$.extend({
				left:5,
				top:0,
				time:1000
			},options);
			options.message=options.message||"请输入正确的内容";
			var $showinfo=$('#showinfo');
			if($showinfo.length==0){
				$showinfo=$('<span id="showInfo" class="showInfo"></span>');
				$('body').append($showinfo);
			}
			if(!$showinfo.is(":animated")){
				var x = $(element).offset().left+options.left;
				var y = $(element).offset().top+options.top;
				var h = $(element).outerHeight();
				$showinfo.text(options.message)
				.css({"top":y+h,"left":x})
				.fadeIn(50).fadeOut(options.time);
			}
		}
	});
	$.fn.extend({
		L_validate:function(options){//验证方法_事件处理
			$.getScript("js/chkIdCard.js");
			$.L_validator(this,options);
		}
	});
	
})(jQuery);

;(function(){	   
	$.L_openDiv=function(options){
		options=$.extend({
			openType:"iframe",//打开的类型div/iframe
			openIframeSrc:"errorPage.html",//iframe src
			openIframeParam:"",//iframe 页面请求参数
			openDivID:"none",//如果打开的为div需要填入div的id
			conWidth:40,//容器宽度
			conHeight:20,//容器高度
			conTop:150//容器y坐标
			
		},options);
		options.bgHeight=document.documentElement.scrollHeight>document.documentElement.offsetHeight?
						 document.documentElement.scrollHeight:document.documentElement.offsetHeight;
		if ($('#L_DBack').length==0)$.L_openDiv.makeJumpDiv(options);
		$.L_openDiv.openJumpDiv(options);
	}
	$.extend($.L_openDiv,{
		makeJumpDiv:function(options){			
			var opendiv=$('<div class="L_DBack" id="L_DBack"></div><div class="L_DContainer" id="L_DContainer">'+
						  '<iframe src="" style="position:absolute;z-index:2;display:none;" id="L_openIframe" width="100%" height="100%" '+
						  'frameborder="0" scrolling="no"></iframe><a href="#" class="L_close" id="L_close"></a></div>');			
			$("body").append(opendiv);
			$('#L_DBack').css({"position":"absolute","width":"100%","height":options.bgHeight,
						"background-color":"#ccc","z-index":"998","display":"none",
						"top":0,"left":0});//背景样式
			//关闭按钮样式
			$('#L_close').css({"position":"absolute","right":"0","background":"url(images/jumpDiv_close.gif) no-repeat -5px -5px",
					"margin":"3px 3px 0 0","width":"13px","height":"13px","z-index":"3"})
					.click(function(){$.L_openDiv.closeJumpDiv()})//关闭按钮事件
					.hover(function(){$(this).css({"background-position":"-5px -23px"})},//关闭按钮hover样式
					function(){$(this).css({"background-position":"-5px -5px"})});
			//容器样式
			$('#L_DContainer').css({"position":"relative","margin":"0 auto","background":"#fff","z-index":"999","display":"none"});			
		},
		openJumpDiv:function(options){//打开
			$.L_openDiv.setJumpDiv(options);
			$('#L_DBack').animate({opacity:"0.4"},0).show();
			$('select').css("visibility","hidden");
		},
		closeJumpDiv:function(){//关闭
			$('#L_DBack').hide().next('#L_DContainer').hide();
			$('select').css("visibility","visible");
		},
		setJumpDiv:function(options){//设置弹出层
			$("#L_DContainer").css('top',options.conTop).children(":not(#L_close,#L_openIframe)").hide();
			if(options.openType=="iframe"){
			    $("#L_openIframe").show().attr('src',options.openIframeSrc+'?ran='+Math.random(1)+'&'+options.openIframeParam);
				$("#L_openIframe").bind('load',function(){
					var ifbody=$("#L_openIframe").contents().find("body").children('div');
					$("#L_DContainer").show().animate({"height":ifbody.height(),"width":ifbody.width()},100);
				});
			}else{
				var tempID=$('#'+options.openDivID);
				if (tempID.length==0)return false;
				$('#L_DContainer').append(tempID.show())
								  .animate({'width':tempID.css('width'),'height':tempID.css('height')},100).find('#L_openIframe').hide();
			}
		}
	});
})(jQuery);

var openNew=function(U,T){
	var obj=$("#TempF");
	if (obj.length<=0){
		$("body").append("<form action=\""+U+"\" method=\"Post\" target=\""+T+"\" style=\"display:none\"><input type=\"submit\" id=\"TempF\" /></form>");	}else{
		obj.parent().attr("action",U).attr("target",T);
	}
	$("#TempF").click();
}

//HTML转码
function makeHTML(str){	
	return (str=='' || !str)?'':str.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/'/g,"&#39;").replace(/"/g,"&quot;").replace(/\n/g,"<br>");
}
function formattime(date){/*10-1-1返回0010-01-01*/var A=date.split("-");return ("0000"+A[0]).slice(A[0].length)+"-"+("00"+A[1]).slice(A[1].length)+"-"+("00"+A[2]).slice(A[2].length);}
