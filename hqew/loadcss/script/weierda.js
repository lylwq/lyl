$(function(){
	//主菜单项，子菜单项
	var ms_ul = $("ul.ms_ul"),m_item = $("li.m_item");
	m_item.mouseover(function(){menuEvent(this)});
	m_item.click(function(){menuEvent(this)});
	var menuEvent = function(e_t){
		if(!$(e_t).hasClass("m_atv")){
			m_item.removeClass("m_atv");
			$(e_t).addClass("m_atv");			
			ms_ul.addClass("disn").filterByAttr("sub_m",e_t.getAttribute("menu")).removeClass("disn");
		}
		e_t.firstChild.blur();
	}
	
	var ms_a = $(".menu_sub a"),
	urls = window.location.toString().split("/"),
	url = urls[urls.length-1].replace("#","");	
	//初始化菜单状态
	for(var i=0,ml=ms_a.data.length;i<ml;i+=1){
		var t_urls = ms_a.data[i].href.toString().split("/"),
		t_url = t_urls[t_urls.length-1].replace("#","");
		if(t_url === url){
			var t_ul = $(ms_a.data[i].parentNode.parentNode);
			ms_ul.addClass("disn");
			t_ul.removeClass("disn");
			m_item.removeClass("m_atv").filterByAttr("menu",t_ul.data[0].getAttribute("sub_m")).addClass("m_atv");			
		}
		
	}
	
	//全选
	$("#chk_all,#rdo_all").click(function(){
		$("#chk_box .ct_chk").selectAll(this.checked);
		$("#chk_all,#rdo_all").selectAll(this.checked);
	});
	$("#chk_box .ct_chk").change(function(){
		$("#chk_all").data[0].checked=$("#rdo_all").data[0].checked=isSelectAll($("#chk_box .ct_chk").data);
	});
	//反选
	$("#rdo_rev").click(function(){
		var chks = $("#chk_box .ct_chk").data;
		for(var i=0,ln=chks.length;i<ln;i+=1){
			chks[i].checked = !chks[i].checked;
		}
		$("#chk_all").data[0].checked=isSelectAll($("#chk_box .ct_chk").data);
	});
	
	//qq随窗口滚动
	var com_qq=$("#com_qq").data[0];
	if(com_qq){
		var cur_rect=com_qq.getBoundingClientRect(),
		cur_top=cur_rect.top;
		$(window).scroll(function(){
			var t_top = cur_top + document.documentElement.scrollTop;
			com_qq.style.cssText="top:"+t_top+"px";
		});	
		$("#cq_close").click(function(){
			com_qq.style["display"]="none";
		});
	}
	
	//幻灯片播放
	var b_img=$(".banner img").data[0],
	b_btn=$(".banner a");
	if(b_btn.data.length){
		var b_ln=b_btn.data.length,
		t_index=0,sp_timer,sp_time=5000;//默认5秒	
		var slidePlay = function (argument) {
			t_index>b_ln-1?t_index=0:t_index=t_index;
			b_btn.removeClass("bb_act");
			$(b_btn.data[t_index]).addClass("bb_act");
			b_img.setAttribute("src",b_btn.data[t_index].getAttribute("b_src"));
			t_index+=1;
		}
		sp_timer = setInterval(slidePlay,sp_time);
		b_btn.mouseover(function(){
			clearInterval(sp_timer);
			b_btn.removeClass("bb_act");
			$(this).addClass("bb_act");
			b_img.setAttribute("src",this.getAttribute("b_src"));
		});
		b_btn.mouseout(function(){
			sp_timer = setInterval(slidePlay,sp_time);
		});
	}
});


/*
保单提交非空验证 参数：
pram:需验证的元素id字符串，以逗号分隔
fname:表单名称
mes：提示信息
*/
var validate=function(pram,fname,mes){
	var elms=pram.toString().split(","),
	dom=document;
	if(elms && elms instanceof Array){
		for(var i=0,ln=elms.length;i<ln;i+=1){
			var t_elm = dom.getElementById(elms[i]);
			if($.trim(t_elm.value)===""){
				alert(mes);
				t_elm.focus();				
				return false;
			}
		}
		dom.forms[fname].submit();
		return true;
	}
	return false;
}

var isSelectAll = function(chks){
	for(var i=0,ln=chks.length;i<ln;i+=1){
		if(!chks[i].checked)return false;
	}
	return true;
}


















