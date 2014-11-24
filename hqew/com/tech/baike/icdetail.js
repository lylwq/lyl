$(document).ready(function() {
    //TranPic();
    var url = location.href; 
    $("#address").attr("value",url);
})

var Cookie ={};Cookie.write = function(key, value, duration){
	 var d = new Date();
    d.setTime(d.getTime()+1000*60*60*24*30);
    document.cookie = key + "=" + encodeURI(value)
//    + "; domain=.www.hqew.com"
//    + "; path=" + "/"
    + "; expires=" + d.toGMTString();
};

Cookie.read = function(key){
	var arr = document.cookie.match(new RegExp("(^| )"+key+"=([^;]*)(;|$)"));
    if(arr != null) 
        return decodeURIComponent(arr[2]);
    return "";
};

var g_Ibs_url = "http://ibs.hqew.com";
var g_Main_url = "http://www.hqew.com";
function g_ibs(tourl,blank)
{
    Check_CurrentDomain();
    if(blank==undefined ){
        window.open(g_Ibs_url+tourl);
    }else if(blank==true){
        if(tourl.toString().toLowerCase().indexOf("/ibs/")>-1 || tourl.toString().toLowerCase().indexOf("/web/")>-1){
            window.open(g_Ibs_url+tourl);            
        }else{
            window.open(g_Main_url+tourl);
        }
    }else{
        window.location.href = g_Ibs_url+tourl;
    }
}

function Check_CurrentDomain(){
  if(typeof(currentDomain)!='undefined' && currentDomain!=null){
     g_Ibs_url = currentDomain.HqewIBSSite;
     g_Main_url = currentDomain.HqewMainSite;
  }
  else if(Cookie.read("HqewIBSSite")!="" && Cookie.read("HqewMainSite")!=""){
    //尝试从cookie中取
    g_Ibs_url = Cookie.read("HqewIBSSite");
    g_Main_url = Cookie.read("HqewMainSite");
  }
}



function setHeadSearchCookies(keyword, type) {
    var objkey = Cookie.read("ic_search_keyword");
    objkey += "___-___" + keyword + "---_---" + type;

    Cookie.write("ic_search_keyword", objkey, { duration: 365 });
}


//目录显隐
function catalog_show(type)
{
    var cata_h = $("#catalog_hide");
    var cata_s = $("#catalog_show");
    if(type == "1")
    {
       cata_h.removeClass("g-d-n");
       cata_s.addClass("g-d-n");
    }
    if(type == "0")
    {
       cata_h.addClass("g-d-n");
       cata_s.removeClass("g-d-n");
    }
}
//显示更多
function moreFun(id ,cname ,src)
{
    //替代型号
	var ele = $("#"+id),
		src = $(src);
	if(ele.hasClass(cname)){
		ele.removeClass(cname);
		src.attr("class","g-ico-hide").text("精简");
	}else{
		ele.addClass(cname);
		src.attr("class","g-ico-show").text("更多");
	}
	
    /*if(type == "0")
    {
       $("#repModelList").attr("class","g_dn");
       $("#moreRepModelList").attr("class","");
    }
    if(type == "1")
    {
       $("#repModelList").attr("class","");
       $("#moreRepModelList").attr("class","g_dn");
    }
    
    //应用领域 
    if(type == "3")
    {
       $("#AppModelList").attr("class","g_dn");
       $("#moreAppModelList").attr("class","");
    }
    if(type == "4")
    {
       $("#AppModelList").attr("class","");
       $("#moreAppModelList").attr("class","g_dn");
    }
    
    //生产厂商
    if(type == "5")
    {
       $("#Productor").attr("class","g_dn");
       $("#ProductorModel").attr("class","con7_c");
    }
    if(type == "6")
    {
       $("#Productor").attr("class","con7_c");
       $("#ProductorModel").attr("class","g_dn");
    }
    
    //应用领域
    if(type == "7")
    {
       $("#Packinfo").attr("class","g_dn");
       $("#PackinfoModel").attr("class","con8_c");
    }
    if(type == "8")
    {
       $("#Packinfo").attr("class","con8_c");
       $("#PackinfoModel").attr("class","g_dn");
    }*/
}
//本页地址 复制
function copy(){
 var t=$("#address");
    t.select();
     try{
             window.clipboardData.setData('text',t.attr("value"));
             alert('已成功复制到剪切板！'); 
        }
        catch(e){ 
             alert('您的浏览器不支持此复制方式，请直接用Ctrl+C或按鼠标右键复制');         
    }
}

/*//图片切换
var currentID=0;
var oldID=1;
var timeEvent;
var picNum="pic";
var imgList=new Array(3);
var imgBig="img_big";
function TranPic()
{
    var img=getObj(imgBig);
    var div1=getObj(picNum+"1");
    var div2=getObj(picNum+"2");
    var div3=getObj(picNum+"3");
    var num=0;
    for(var i=1;i<=3;i++)
    {
        if(getObj("hidimg"+i).value !="")
        {
            num++;
            imgList[num]=getObj("hidimg"+i).value;
        }
    }
    if(num==1 || num==0)
    {
        div1.className='g_fr tb20 g_cp g_dn';
        div2.className='g_fr tb20 g_cp g_dn';
        div3.className='g_fr tb20 g_cp g_dn';
    }
    else if(num==2)
    {
        div1.className='g_fr tb20 g_cp';
        div2.className='g_fr tb20 g_cp';
        div3.className='g_fr tb20 g_cp g_dn';
    }
    if(num==3)
    {
        div1.className='g_fr tb20 g_cp';
        div2.className='g_fr tb20 g_cp';
        div3.className='g_fr tb20 g_cp';
    }
    currentID++;
    if(currentID>num)
    {
        currentID=1;
    }
    if(num==1)
    {
        img.src=imgList[num];
        timeEvent=setTimeout("TranPic()",2500);
    }
    else if(num!=0)
    {
        img.src=imgList[currentID];
        oldID=currentID-1;
        if(oldID<1)
            oldID=num;
        getObj(picNum+oldID).className='g_fr tb20 g_cp';
        getObj(picNum+currentID).className = "g_fr tb21";
        timeEvent=setTimeout("TranPic()",2500);
    }
    
}
//图片切换鼠标事件
function picMouse(aa,bb)
{
    if(aa==0)
    {
        currentID=bb;
        timeEvent=setTimeout("TranPic()",2500);
    }
    else 
    {
        clearTimeout(timeEvent);
        if(aa==1)
        {
            var img = getObj(imgBig);
            img.src=imgList[bb];
            getObj(picNum+currentID).className='g_fr tb20 g_cp';
            getObj(picNum +bb).className = "g_fr tb21 g_cp";
        }
        else
        {
            var img = getObj("img_big_show");
            if(getObj("UpIcImg" + bb).value !=""){
                img.src = getObj("UpIcImg" + bb).value;
            }
            else{
                img.src = "/images/teach/nopic.gif";
            }
            
            for(i=1; i<4; i++)
            {
                if(i == bb )
                {
                    getObj("pic_show" +bb).className = "g_fr tb21 g_cp";
                }
                else
                {
                    getObj("pic_show"+i).className='g_fr tb20 g_cp';
                }
            }
        }
    }
}*/

function ToBigImg()
{
    if(getObj("img_big").src.indexOf("/images/teach/nopic.gif")>-1)
        return false;
    else
        window.open(getObj("img_big").src);
}
//---------------------------------------------------------------------------
//得到对象
function getObj(id){
    return document.getElementById(id);
}

function xunjia(sguid){
    window.open("/buyer/inquires.html?str="+encodeURIComponent(sguid));
}

//选择所有 全选
function selectAllNull(chk)
{
    var outDiv=getObj("dealerDiv");
    if(outDiv!=null)
    {
        var chkList=outDiv.getElementsByTagName("input");
        if(chkList!=null)
        {
            for(var kk=0;kk<chkList.length;kk++)
            {
                chkList[kk].checked = chk.checked;
            }
        }
    }
}

//批量查询赋值
function SetStockGuid()
{
    var outDiv = $("#dealerDiv input:checkbox[checked='true']"); //  getObj("dealerDiv");
    if(outDiv!=null)
    {
        var sguid = "";
        for(var kk=0;kk<outDiv.length;kk++)
        {
            if(outDiv[kk].checked && outDiv[kk].value != "" && outDiv[kk].value != "on")
            {
                sguid += outDiv[kk].value + ",";
            }
        }
        if(sguid=="")
        {
            alert("请先选择记录");
            return false;
        }
        else
        {
            getObj("hdnStockGuid").value=sguid;
			getObj("StockGuidForm").submit();
            return true;
        }
    }
    return false;
}

function HqmChat(userid,uguid,pguid)
{
    if (HQMCheck())
    {
        window.location.href="hqew://?uid=" + userid + "&uname=" + uguid;//+"&pguid="+pguid;
    }else
    {
        window.open("/Web/Hqen/Imrfq/Imrfqidic.aspx?uguid=" + uguid+"&pguid="+pguid,target='_blank');    
    }
}

function fun_newOpen(url,w,h)
{
    window.open(""+url,"","height="+h+",width="+w+",top=270,left=320,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,status=no");
}