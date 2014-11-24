
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


function PageLoad() {
    new Marquee("StockList", 0, 2, 638, 100, 20, 7000, 4000, 140);
}

function Trim(ss) {
    return ss.replace(/(^\s*)|(\s*$)/g, "");
}


function icsearch() {
    var keyword = document.getElementById("IcSearchKeyword").value;
    if (Trim(keyword) == "") {
        alert("请输入您要找的产品型号！");
    }
    else if (Trim(keyword).length < 2) {
        alert("型号不能少于两个字符！");
    }
    else
    {
        setHeadSearchCookies(keyword,"ic");  //记cookies 
		var striccb = "";
		if(keyword.length == 2){
			striccb = "1";
		}
		window.location.href= "/ic/"+Base64Encode(keyword)+"_1000_____"+striccb+"_.html";
    }
}


function i_ic_search(evt)//onkeypress="icsearch(event);" 
{
    evt = evt ? evt : (window.event ? window.event : null);
    if (evt.keyCode == 13) {
        icsearch();
    }
}

//搜索PDF
function SearchPdf() {

    var keyword = Trim(document.getElementById("PdfSearchKeyword").value);
    if(keyword == '')
    {
        alert('请输入一个IC型号！');
        document.getElementById("PdfSearchKeyword").select();
        return false;
    }
    else if (keyword.length < 3) {
        alert('型号不能少于三个字符！');
        document.getElementById("PdfSearchKeyword").select();
        return false;
    }

    window.open('/tech/' + keyword + '.html')
}
function s_search() {
    var keyword = Trim(document.getElementById("sckeyword").value);
    var defValue = document.getElementById("sckeyword").defaultValue;
    if (keyword == "" || keyword == defValue) {
        document.getElementById("sckeyword").value = defValue;
        return false;
    }
    else {
        //window.location.href = "/buyer/sc_search.html?SearchKeyWord=" + keyword;
        window.open("/buyer/sc_search.html?SearchKeyWord=" + keyword);
    }
}
function sousuoClick() {
    var tx = document.getElementById("stockSoSuo");
    var sVal = Trim(tx.value);
    if (sVal == '请输入一个IC或二三极管型号...' || sVal == '') {
        tx.value = '请输入一个IC或二三极管型号...';
    }
    else {
        if(sVal.length<2){
            alert("搜索型号不能少于2个字符！");
        }else{
            window.open("/mall/" + encodeURIComponent(sVal)+".html");
        }
    }
}


function i_sc_search(evt)
{
    evt = evt ? evt : (window.event ? window.event : null);
    if (evt.keyCode == 13) {
        sousuoClick();
    }
}