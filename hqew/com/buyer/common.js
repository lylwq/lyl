function $(el){
	if (!el) return null;
	if (el.htmlElement) return Garbage.collect(el);
	if (typeof(document.getElementById(el))=="object") return document.getElementById(el);
	var type = $type(el);
	if (type == 'string'){
		el = document.getElementById(el);
		type = (el) ? 'element' : false;
	}
	if (type != 'element') return null;
	if (el.htmlElement) return Garbage.collect(el);
	if (['object', 'embed'].contains(el.tagName.toLowerCase())) return el;
	$extend(el, Element.prototype);
	el.htmlElement = function(){};
	return Garbage.collect(el);
};

var $extend = function(){
	var args = arguments;
	if (!args[1]) args = [this, args[0]];
	for (var property in args[1]) args[0][property] = args[1][property];
	return args[0];
};

function $defined(obj){
	return (obj != undefined);
};

function $type(obj){
	if (obj == undefined) return false;
	if (obj.$family) return (obj.$family.name == 'number' && !isFinite(obj)) ? false : obj.$family.name;
	if (obj.nodeName){
		switch (obj.nodeType){
			case 1: return 'element';
			case 3: return (/\S/).test(obj.nodeValue) ? 'textnode' : 'whitespace';
		}
	} else if (typeof obj.length == 'number'){
		if (obj.callee) return 'arguments';
		else if (obj.item) return 'collection';
	}
	return typeof obj;
};
var JSON = {
    decode: function(string, secure){
		if ($type(string) != 'string' || !string.length) return null;
		if (secure && !('/^[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]*$/').test(string.replace(/\\./g, '@').replace(/'[^"\\\n\r]*'/g, ''))) return null;
		return string;
	}
};

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

//页面跳转到另一个页面
function JumpUrl(url){
    window.location.href=url;
}

//弹出窗口
function winOpen(tourl)
{
    window.open(encodeURIComponent(tourl));
}

//取路径参数
function getUrlParam(name){   
    var reg = new RegExp("(^|&)"+   name   +"=([^&]*)(&|$)"); 
    var r = window.location.search.substr(1).match(reg); 
    if (r!=null) 
    {return decodeURIComponent(r[2]);}
    else
    {return ""; }
}

function Trim(ss)
{
  // 用正则表达式将前后空格
  // 用空字符串替代。
  return ss.replace(/(^\s*)|(\s*$)/g, "");
}


Array.prototype.inArray = function (value) { 
    var i; 
    for (i=0; i < this.length; i++) { 
        if (this[i] === value) { 
            return true; 
        } 
    } 
    return false; 
}; 

function addEvent( obj, type, fn ) { 
    if (obj.addEventListener) { 
        obj.addEventListener( type, fn, false ); 
        EventCache.add(obj, type, fn); 
    } 
    else if (obj.attachEvent) { 
        obj["e"+type+fn] = fn; 
        obj[type+fn] = function() { obj["e"+type+fn]( window.event ); } 
        obj.attachEvent( "on"+type, obj[type+fn] ); 
        EventCache.add(obj, type, fn); 
    } 
    else { 
        obj["on"+type] = obj["e"+type+fn]; 
    } 
} 
var EventCache = function(){ 
    var listEvents = []; 
    return { 
        listEvents : listEvents, 
        add : function(node, sEventName, fHandler){ 
            listEvents.push(arguments); 
        }, 
        flush : function(){ 
            var i, item; 
            for(i = listEvents.length - 1; i >= 0; i = i - 1){ 
                item = listEvents[i]; 
                if(item[0].removeEventListener){ 
                    item[0].removeEventListener(item[1], item[2], item[3]); 
                }; 
                if(item[1].substring(0, 2) != "on"){ 
                    item[1] = "on" + item[1]; 
                }; 
                if(item[0].detachEvent){ 
                    item[0].detachEvent(item[1], item[2]); 
                }; 
                item[0][item[1]] = null; 
            }; 
        } 
    }; 
}(); 
addEvent(window,'unload',EventCache.flush);

function getTop(e){
    var offset=e.offsetTop;
    if(e.offsetParent!=null) offset+=getTop(e.offsetParent);
    return offset;
}

function getLeft(e){
    var offset=e.offsetLeft;
    if(e.offsetParent!=null) offset+=getLeft(e.offsetParent);
    return offset;
}
function getParent(el){
            return el.parentNode ? el.parentNode : el.parentElement;
        }

//登录情况下从公共平台跳转到会员管理平台，参数tourl 例如：要修改会员信息就传hqenmanger(CompanyInfo/MemberModify.aspx)
//CompanyInfo代表栏目，MemberModify.aspx代表文件
function hqenmanger(tourl)
{
    window.open("/Web/Hqen/"+encodeURIComponent(tourl));
}


//登录情况下从公共平台跳转到会员管理平台，参数tourl 例如：要修改会员信息就传g_ibs('CompanyInfo/MemberModify.aspx'),block

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

//input去掉默认内容还原编辑样式
function g_on_setvalue(obj,value,cname)
{
    if(obj.value!=value){
        return false;
    }
    obj.value="";
    obj.className = cname;
}

function g_logout()
{
    g_ibs("/Web/Hqen/Logout.aspx", false);
}

function  HTMLEnCode(str)  
{  
         var s = "";  
         if(str.length == 0)
         {
            return "";  
         }
         s = str.replace(/&/g,"&gt;");  
         s = s.replace(/</g,"&lt;");  
         s = s.replace(/>/g,"&gt;");  
         s = s.replace(/ /g,"&nbsp;");  
         s = s.replace(/\'/g,"'");  
         s = s.replace(/\"/g,"&quot;");  
         s = s.replace(/\n/g,"<br>");  
         return s;  
}
function HTMLDeCode(str)  
{  
         var s    =  "";  
         if(str.length == 0)
         {
            return "";
         }  
         s = str.replace(/&gt;/g,"&");  
         s = s.replace(/&lt;/g,"<");  
         s = s.replace(/&gt;/g,">");  
         s = s.replace(/&nbsp;/g," ");  
         s = s.replace(/'/g,"\'");  
         s = s.replace(/&quot;/g,"\"");  
         s = s.replace(/<br>/g,"\n");  
         return s;  
}
//取字符串
function CountCharacters(str,size){ 
     var totalCount = 0; 
     var newStr = ""; 
     for (var i=0; i<str.length; i++) { 
         var c = str.charCodeAt(i); 
         if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)) { 
             totalCount++; 
         }else {     
             totalCount+=2; 
         } 
         if(totalCount<=size){ 
             newStr = str.substring(0,i+1); 
         }else{ 
             return newStr; 
         } 
     } 
     return newStr; 
}
//用于网页地址参数
//参数中包含出了英文中文数字之外的其他符号时进行编码并在前面加"=="进行标识，否则直接返回
//解码时根据是否含有"=="标识来决定是否要解码
var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var base64Encode = new Array(
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
    52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
    -1,  0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
    -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);

function Base64Encode(str) {
    var reg=/^[a-zA-Z0-9]*$/;
    if(str==null || reg.test(str))
    {
        return str;
    }
    str=Utf16To8(str);
    var out, i, len;
    var c1, c2, c3;
    
    len = str.length;
    i = 0;
    out = "";
    while(i < len) {
    c1 = str.charCodeAt(i++) & 0xff;
    if(i == len)
    {
        out += base64EncodeChars.charAt(c1 >> 2);
        out += base64EncodeChars.charAt((c1 & 0x3) << 4);
        out += "==";
        break;
    }
    c2 = str.charCodeAt(i++);
    if(i == len)
    {
        out += base64EncodeChars.charAt(c1 >> 2);
        out += base64EncodeChars.charAt(((c1 & 0x3)<< 4) | ((c2 & 0xf0) >> 4));
        out += base64EncodeChars.charAt((c2 & 0xf) << 2);
        out += "=";
        break;
    }
    c3 = str.charCodeAt(i++);
    out += base64EncodeChars.charAt(c1 >> 2);
    out += base64EncodeChars.charAt(((c1 & 0x3)<< 4) | ((c2 & 0xf0) >> 4));
    out += base64EncodeChars.charAt(((c2 & 0xf) << 2) | ((c3 & 0xc0) >>6));
    out += base64EncodeChars.charAt(c3 & 0x3f);
    }

    out=out.replace(/\//g,"@@")
    return "==" + out;
}

function Base64Decode(str) {
    if(str==null || (str.length>2 && str.substring(0,2)!="=="))
    {
        return str;
    }
    str=str.replace("@@","/");
    str=str.replace(" ","+");
    var c1, c2, c3, c4;
    var i, len, out;

    len = str.length;
    i = 0;
    out = "";
    while(i < len) {
    /* c1 */
    do {
        c1 = base64Encode[str.charCodeAt(i++) & 0xff];
    } while(i < len && c1 == -1);
    if(c1 == -1)
        break;

    /* c2 */
    do {
        c2 = base64Encode[str.charCodeAt(i++) & 0xff];
    } while(i < len && c2 == -1);
    if(c2 == -1)
        break;

    out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));

    /* c3 */
    do {
        c3 = str.charCodeAt(i++) & 0xff;
        if(c3 == 61)
        return out;
        c3 = base64Encode[c3];
    } while(i < len && c3 == -1);
    if(c3 == -1)
        break;

    out += String.fromCharCode(((c2 & 0xf) << 4) | ((c3 & 0x3c) >> 2));

    /* c4 */
    do {
        c4 = str.charCodeAt(i++) & 0xff;
        if(c4 == 61)
        return out;
        c4 = base64Encode[c4];
    } while(i < len && c4 == -1);
    if(c4 == -1)
        break;
    out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
    }
    return out;
}

function Utf16To8(str) {
    var out, i, len, c;

    out = "";
    len = str.length;
    for(i = 0; i < len; i++) {
    c = str.charCodeAt(i);
    if ((c >= 0x0001) && (c <= 0x007f)) {
        out += str.charAt(i);
    } else if (c > 0x07ff) {
        out += String.fromCharCode(0xe0 | ((c >> 12) & 0x0f));
        out += String.fromCharCode(0x80 | ((c >>  6) & 0x3f));
        out += String.fromCharCode(0x80 | ((c >>  0) & 0x3f));
    } else {
        out += String.fromCharCode(0xc0 | ((c >>  6) & 0x1f));
        out += String.fromCharCode(0x80 | ((c >>  0) & 0x3f));
    }
    }
    return out;
}

function Utf8To16(str) {
    var out, i, len, c;
    var char2, char3;

    out = "";
    len = str.length;
    i = 0;
    while(i < len) {
    c = str.charCodeAt(i++);
    switch(c >> 4)
    { 
      case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
        // 0xxxxxxx
        out += str.charAt(i-1);
        break;
      case 12: case 13:
        // 110x xxxx   10xx xxxx
        char2 = str.charCodeAt(i++);
        out += String.fromCharCode(((c & 0x1f) << 6) | (char2 & 0x3f));
        break;
      case 14:
        // 1110 xxxx  10xx xxxx  10xx xxxx
        char2 = str.charCodeAt(i++);
        char3 = str.charCodeAt(i++);
        out += String.fromCharCode(((c & 0x0f) << 12) |
                       ((char2 & 0x3f) << 6) |
                       ((char3 & 0x3f) << 0));
        break;
    }
    }

    return out;
}
//base64编码结束