/*
Desc 导航页脚本
Author Evans
QQ:516373557
Date 2011-05-13
*/

window.onload=function(){
	/*
	tab:导航栏,tds:导航项集合,tds_len:导航项集合长度,
	page:内容去容器,uls:内容列表集合,w_one:一次行程距离,
	class_nal:到航向初始样式,class_act:导航项激活样式,Timeout对象,当前激活导航项索引
	*/
	var tab = $_("tab"),tds = tab.getElementsByTagName("td"),tds_len = tds.length,
		page = $_("page"),uls = page.getElementsByTagName("ul"),w_one = uls[0].offsetWidth,
		class_nal="tab_nal",class_act="tab_act",timer,cur_i=0;
	
	//窗口大小改变,重设属性
	window.onresize=function(){
		w_one = uls[0].offsetWidth;
		page.scrollLeft = w_one * cur_i;
	}
	//遍历导航项集合,增加到航向点击事件
	for(var i=0;i<tds_len;i+=1){
		tds[i].onclick=function(i){
			return function(e){
				timer && clearTimeout(timer),timer=null;
				resetAttr(tds,"className",class_nal);
				this.className=class_act;
				cur_i=i;
				tabSwitch(i,page,w_one);
			};
		}(i);
	}
	/*
	内容区域切换方法
	@param index 当前点击的导航项索引
	@param con 内容去容器
	@param remove 滑动行程
	*/
	var tabSwitch=function(index,con,remove){
		var removing = index * remove;
		var slide = function(par){
			if((par>0 && con.scrollLeft < removing) || (par<0 && con.scrollLeft > removing)){				
				if((par>0 && con.scrollLeft < removing)&&con.scrollLeft+par>removing||
					(par<0 && con.scrollLeft > removing)&&con.scrollLeft+par<removing)
				{
					con.scrollLeft=removing;
					return;
				}
				con.scrollLeft += par;
				timer=setTimeout(function(){slide(par)},5);
			}
		}
		return function(){
			con.scrollLeft < removing ? slide(50) : slide(-50);
		}();
	}	
}
$_ = function(id){return document.getElementById(id);}

//修改集合属性值
var resetAttr=function(list,attrName,attrValue){
	if(list.length===0)return;
	var list_len=list.length;
	for(var j=0;j < list_len;j+=1){
		list[j][attrName]=attrValue;
	}
}