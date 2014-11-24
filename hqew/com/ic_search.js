var Quote_MaterielRequestID = null;
var Quote_CompanyName = null;
var Quote_Guid = null;

function icgetUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
    { return decodeURIComponent(r[2]); }
    else
    { return ""; }
}
function onover(me) {
    me.className = "stb_ul stb_ul_bg";
}
function onout(me, type) {
    if (type == "2") {
        me.className = "stb_ul";
    }
}
function Trim(ss)
{
  // 用正则表达式将前后空格
  // 用空字符串替代。
  return ss.replace(/(^\s*)|(\s*$)/g, "");
}

function getsellerIcparam() {
    
    var eDays = document.getElementById("cexpiredays");
    var ExpireDays = eDays[eDays.selectedIndex].value;

    var eCity = document.getElementById("caddress");
    var CityID = eCity[eCity.selectedIndex].value;

    var eType = document.getElementById("cbuss");
    var UserType = eType[eType.selectedIndex].value;

    var keyword = icgetUrlParam("SearchKeyword");
    var PageIndex = icgetUrlParam("PageIndex") == "" ? 1 : icgetUrlParam("PageIndex");

    var liveDate = new Date();
    liveDate.setTime(liveDate.getTime() + 30 * 1000);  //设置cookie过期时间

    document.cookie = "CityID=" + CityID;
    document.cookie = "ExpireDays=" + ExpireDays;
    document.cookie = "UserType=" + UserType;
    document.cookie = "path=/";
    document.cookie = "expires=" + liveDate.toUTCString();

    return "/seller/ic_search_p1_" + CityID + ".html";
    //return "/seller/ic_search.html?SearchKeyword=" + keyword + "&PageIndex=" + PageIndex + "&ExpireDays=" + ExpireDays + "&CityID=" + CityID + "&UserType=" + UserType;
}

function sellerIc_Search() {
    window.location.href = getsellerIcparam();
}


function chagetime(strvalue) {
    var keyword = getParam();
    window.location.href = "/seller/ic_search.aspx?keyword=" + keyword + "&ExpireDays=" + strvalue;
}
function chagecity(strvalue) {
    var keyword = getParam();
    window.location.href = "/seller/ic_search.aspx?keyword=" + keyword + "&CityID=" + strvalue;
}
function chagebuss(strvalue) {
    var keyword = getParam();
    window.location.href = "/seller/ic_search.aspx?keyword=" + keyword + "&UserType=" + strvalue;
}

function setselect() {
    //document.getElementById("qkeyword").value= icgetUrlParam("keyword");
    var ExpireDays = getCookie("ExpireDays");
    var CityID = getCookie("CityID");
    var UserType = getCookie("UserType");
    if (ExpireDays != "") {
        if (document.getElementById("cexpiredays")&&ExpireDays) {
            document.getElementById("cexpiredays").value = ExpireDays;
        }
    }
    if (CityID != ""&&CityID) {
        if (document.getElementById("caddress")) {
            document.getElementById("caddress").value = CityID;
            
        }
    }
    if (UserType != ""&&UserType) {
        if (document.getElementById("cbuss")) {
            document.getElementById("cbuss").value = UserType;
        }
    }

}

//验证是否为正整数
function IsPlusNumber(str) {
    var exp = /[^0-9()]/g;
    if (str.search(exp) != -1) {
        return false;
    }
    return true;
}

//验证是否为金额格式，只精确一位小数。
function CheckIsDecimalMoney(str) {
    if (str == "" || str == null) {
        return true;
    }
    if (/^[+]?\d*\.{0,2}\d{0,2}$/.test(str)) {
        if (str.substr(str.length - 1, 1) == '.') {
            return false;
        }
        return true;
    }

    else {
        return false;
    }
}

//点击查看联系方式弹出"登录"框
function login(isFeeUser) {
    Quote_Guid = null;
    Quote_MaterielRequestID = null;
    Quote_CompanyName = null;

    ShowLoginTips();
}


//点击查看联系方式弹出"付费会员"框
function Notice(isFeeUser) {
    if(isFeeUser!="1")
    {
        Quote_Guid = null;
        Quote_MaterielRequestID = null;
        Quote_CompanyName = null;

        ShowNoticeTips();
    }
}

//如果不是付费会员，则弹出这个层
function notice() {
    swin.height = "222";
    swin.width = "314";
    swin.el = "swin_notice";
    swin.show();
}
function Aclose() {
    swin.close();
}

function textfocus(me) {
    me.className = "lbtxtc";
}
function textblur(me) {
    me.className = "lbtxt";
}

function register() {
    window.open("/member/ireg.aspx");
}

//弹出"登录"框
function ShowLoginTips() {
    swin.height = "292";
    swin.width = "314";
    swin.el = "swin_login";
    swin.show();
	
    document.getElementById("lUserName").focus();
}


//弹出"付费会员"框
function ShowNoticeTips() {
    swin.height = "292";
    swin.width = "314";
    swin.el = "swin_notice";
    swin.show();
}



//弹出报价层（登陆后调用）
function ShowQuoteTips(guid, materielRequestID, companyName,isFeeUser) {
    if(isFeeUser!=null && isFeeUser!="1"){
        Quote_Guid = null;
        Quote_MaterielRequestID = null;
        Quote_CompanyName = null;
        ShowNoticeTips();
    }
    else
    {
        var obj = document.getElementById("MR" + materielRequestID);

		var nodes = obj.children;

        var model = nodes[0].innerHTML;
        var productor = nodes[2].innerHTML;
        var productDate = nodes[3].innerHTML;
        var package = nodes[4].innerHTML;
        var remark = nodes[5].innerHTML;

        document.getElementById("UiQCompanyName").title = companyName;
        document.getElementById("UiQCompanyName").innerHTML = companyName;
        document.getElementById("UiQPModel").innerHTML = model;
        document.getElementById("UiQPModel").title = model;
        document.getElementById("UiQPProductor").innerHTML = productor;
        document.getElementById("UiQPProductor").title = productor;
        document.getElementById("UiQPProductDate").innerHTML = productDate;
        document.getElementById("UiQPProductDate").title = productDate;
        document.getElementById("UiQPPackage").innerHTML = package;
        document.getElementById("UiQPPackage").title = package;
        document.getElementById("UiQPQuantity").innerHTML = nodes[1].innerHTML;
        document.getElementById("UiQPRemark").innerHTML = remark;
        document.getElementById("UiQPRemark").title = remark;

        swin.height = "231";
        swin.width = "80";
        swin.el = "tms_quoteTips";
        swin.show();

        document.getElementById("fGuid").value = guid;
        document.getElementById("fPModel").value = model;
        document.getElementById("fPProductor").value = productor == '&nbsp;' ? '' : productor;
        document.getElementById("fPProductDate").value = productDate == '&nbsp;' ? '' : productDate;
        document.getElementById("fPPackage").value = package == '&nbsp;' ? '' : package;
        document.getElementById("fPQuantity").value = nodes[1].innerHTML;
        document.getElementById("fQuotePrice").value = '';
        document.getElementById("fQuotePrice").focus();
    }
}

//执行发送报价动作
function SendQuote() {
    var fGuid = Trim(document.getElementById("fGuid").value);
    var fPModel = Trim(document.getElementById("fPModel").value);
    var fPProductor = Trim(document.getElementById("fPProductor").value);
    var fPProductDate = Trim(document.getElementById("fPProductDate").value);
    var fPPackage = Trim(document.getElementById("fPPackage").value);
    var fPQuantity = Trim(document.getElementById("fPQuantity").value);
    var fPRemark = Trim(document.getElementById("fPRemark").value);
    var fQuotePrice = Trim(document.getElementById("fQuotePrice").value);

    if (fPModel == '') {
        alert('必须填写型号！');
        document.getElementById("fPModel").select();
        return;
    }

    if (fPQuantity == '') {
        alert('必须填写数量！');
        document.getElementById("fPQuantity").select();
        return;
    }

    if (fPQuantity != '') {
        var last = fPQuantity.substr(fPQuantity.length - 1, 1);

        if (!IsPlusNumber(fPQuantity.substr(0, fPQuantity.length - 1)) || (!IsPlusNumber(last) && last != 'k' && last != 'K')) {
            alert('数量必须为正整数或者正整数后面带一位K字（如：1000、100K）！');
            document.getElementById("fPQuantity").select();
            return;
        }
    }

    if (fQuotePrice == '' || !CheckIsDecimalMoney(fQuotePrice) || parseFloat(fQuotePrice) <= 0) {
        alert('必须填写价格，且必须为大于0的正整数或带两位小数位（如：10、10.5）！');
        document.getElementById("fQuotePrice").select();
        return;
    }

    document.getElementById("fSendBtn").disabled = true;

    var httpRequest = new HttpRequest();
    httpRequest.targetUrl = '/seller/ic_quote.aspx';
    httpRequest.method = 'post';
    httpRequest.param = "QuoteGuid=" + fGuid + "&PModel=" + fPModel + "&PProductor=" + fPProductor + "&PProductDate=" + fPProductDate + "&PPackage=" + fPPackage + "&PQuantity=" + fPQuantity + "&PRemark=" + fPRemark + "&QuotePrice=" + fQuotePrice
    httpRequest.callBack = SendQuoteComplete;
    httpRequest.Send();
}

//发送报价结果返回
function SendQuoteComplete(status, html) {
    if (status == 4) {
        document.getElementById("fSendBtn").disabled = false;

        Aclose();

        if (Trim(html) == '') {
            if (getCookie("Quote_NotTips") != "1") {
                ShowQuoteResultTips();
            }
        }
        else {
            document.getElementById("UiQSendQuoteMsg").innerHTML = "发送挫败：" + html;
            ShowQuoteResultTips();
        }
    }
}

//点击"登陆"
function CheckLogin() {
    var lUserName = Trim(document.getElementById("lUserName").value);
    var lPassword = Trim(document.getElementById("lPassword").value);

    if (lUserName == '') {
        CheckLoginComplete(4, '请填写用户名！');
        return;
    }

    if (lPassword == '') {
        CheckLoginComplete(4, '请填写登录密码！');
        document.getElementById("lPassword").select();
        return;
    }

    document.getElementById("UilLoginning").innerHTML = '正在登陆，请稍候……';

    document.getElementById("UilBtndiv").style.display = 'none';

    var httpRequest = new HttpRequest();
    httpRequest.targetUrl = '/Common/AjaxLogin.aspx';
    httpRequest.method = 'get';
    httpRequest.param = "UserName=" + lUserName + "&Password=" + lPassword;
    httpRequest.callBack = CheckLoginComplete;
    httpRequest.Send();


}

//登陆结果 
function CheckLoginComplete(status, html) {
    if (status == 4) {
        //debugger;
        if (html.indexOf("{") > -1) {
            eval("var result=" + html);
            if (result.wrong) {
                document.getElementById("UilLoginning").innerHTML = result.wrong;
                document.getElementById("UilBtndiv").style.display = '';
            }
            if (result.pass) {
                document.getElementById("UilLoginning").innerHTML = '您已登录成功，请稍候……';
                if (result.pass == "False") {
                    swin.close();
                    document.getElementById("notice_close").onclick="Aclose();window.setTimeout(PageReload, 200);";
                    document.getElementById("notice_a").onclick="Aclose();window.setTimeout(PageReload, 200);";
                    ShowNoticeTips();                    
                } else {
                    window.setTimeout(PageReload, 2000);
                    document.cookie = "Quote_Guid=" + Quote_Guid;
                    document.cookie = "Quote_MaterielRequestID=" + Quote_MaterielRequestID;
                    document.cookie = "Quote_CompanyName=" + Quote_CompanyName;
                }
            }
        } else {
            document.getElementById("UilLoginning").innerHTML = html;
            document.getElementById("UilBtndiv").style.display = '';
        }
    }
}

function PageReload() {
    window.location.reload();
}


//在未登陆时点"报价"
function LoginAndQuote(guid, materielRequestID, companyName) {
    ShowLoginTips();

    Quote_Guid = guid;
    Quote_MaterielRequestID = materielRequestID;
    Quote_CompanyName = companyName;
}

function getCookie(name) {
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) {
        return arr[2];
    }
    else {
        return null;
    }
}

//检查是否登陆后要弹出报价框 在页面Onload事件调用 
function CheckIsQuote() {
    var guid = getCookie("Quote_Guid");
    var materielRequestID = getCookie("Quote_MaterielRequestID");
    var companyName = getCookie("Quote_CompanyName");

    if (materielRequestID != '' && materielRequestID != null && materielRequestID != 'null') {

        ShowQuoteTips(guid, materielRequestID, companyName);

        document.cookie = "Quote_MaterielRequestID=";
        document.cookie = "Quote_CompanyName=";
        document.cookie = "Quote_Guid=";
    }
}

//弹出报价发送结果框
function ShowQuoteResultTips() {
    swin.width = "452";
    swin.el = "swin_quoteResultTips";
    swin.show();
}


//关闭报价结果框
function CloseQuoteResultTips(type) {
    //不再提示
    if (type == 1) {
        var date = new Date();
        var expireDays = 7;
        //将date设置为7天以后的时间 
        date.setTime(date.getTime() + expireDays * 24 * 3600 * 1000);

        document.cookie = "Quote_NotTips=1;expires=" + date.toGMTString();
    }

    swin.close();
}

var textId;
function ShowDiv(e) {
    if (textId != null) {
        document.getElementById('div_' + textId).style.display = 'none'; ;
    }
    textId = e.id;
    var p = AbsPos(e);
    var o = document.getElementById('div_' + textId);
    o.style.display = 'block';
    o.style.top = 128 + "px"; ;
    o.style.left = p.x + "px";
}

function SelectArea(txt) {
    document.getElementById(textId).value = txt;
    document.getElementById('div_' + textId).style.display = 'none';
}
function CloseDiv() {
    document.getElementById('div_' + textId).style.display = 'none';
}
function AbsPos(el) {
    for (var lx = 0, ly = 0; el != null; lx += el.offsetLeft, ly += el.offsetTop, el = el.offsetParent);
    return { x: lx, y: ly }
}
document.onclick = function() {
    var o = document.getElementById('div_' + textId);
    if (o != null && document.activeElement.id != textId) {
        o.style.display = "none";
    }
}