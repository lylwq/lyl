/// <reference path="jquery-1.3.1.js"/>
//定义全局的默认方法程序集和参数程序集常量
var __FunAssemblyName = "Hqew.BLL.DLL";
var __ParamAssemblyName = "Hqew.Model.DLL";
$.fn.ajaxForm = function (options) {
    if (options.initData != null) {
        this.each(function () {
            options.form = $(this);
            $.ajaxRequest(options);
        });
        options.initData = null;
    }
    return this.ajaxFormUnbind().bind('submit.form-plugin', function () {
        $(this).ajaxSubmit(options);
        return false;
    }).each(function () {
        $(":submit,input:image", this).bind('click.form-plugin', function (e) {
            var form = this.form;
            form.clk = this;
            if (this.type == 'image') {
                if (e.offsetX != undefined) {
                    form.clk_x = e.offsetX;
                    form.clk_y = e.offsetY;
                } else if (typeof $.fn.offset == 'function') {
                    var offset = $(this).offset();
                    form.clk_x = e.pageX - offset.left;
                    form.clk_y = e.pageY - offset.top;
                } else {
                    form.clk_x = e.pageX - this.offsetLeft;
                    form.clk_y = e.pageY - this.offsetTop;
                }
            }
            setTimeout(function () {
                form.clk = form.clk_x = form.clk_y = null;
            }, 10);
        });
    });
};
$.fn.ajaxFormUnbind = function () {
    this.unbind('submit.form-plugin');
    return this.each(function () {
        $(":submit,input:image", this).unbind('click.form-plugin');
    });
};
$.fn.ajaxSubmit = function (options) {
    return this.each(function () {
        options.form = $(this);
        $.ajaxRequest(options);
    });
};
$.fn.formToJSON = function () {
    var oEntity = {};
    if (this.length == 0) return oEntity;
    var els = $("input,select,textarea", this[0]);
    for (var i = 0, max = els.length; i < max; i++) {
        var aValue = $.fieldValue(els[i]);
        if (aValue === null || typeof aValue == 'undefined' || aValue == '' || ($.isArray(aValue) && !aValue.length)) {
            continue;
        }
        var aCondition = els[i].name.split('__');
        if (aCondition.length == 2) {
            if (!oEntity[aCondition[0]]) {
                oEntity[aCondition[0]] = {};
            }
            oEntity[aCondition[0]][aCondition[1]] = (!oEntity[aCondition[0]][aCondition[1]]) ? aValue : oEntity[aCondition[0]][aCondition[1]] + "," + aValue;
        } else {
            oEntity[els[i].name] = (!oEntity[els[i].name]) ? aValue : oEntity[els[i].name] + "," + aValue;
        }
    }
    return oEntity;
};
$.fn.fillTemplate = function (model) {
    return this.each(function () {
        if (model == null) model = {};
        var sTem = $.replaceTemplate($(this).html(), model);
        $(this).html(sTem);
        $(this).attr("JsonData", $.toJSON(model));
    });
};
$.fn.fillTbodyTemplate = function (aList) {
    return this.each(function () {
        var eRowTem = $("tr", this).eq(0),
            sNewRowTem = eRowTem.outer(),
        	sBody = "<tr><td colspan=\""+this.getElementsByTagName("tr")[0].getElementsByTagName("td").length+"\" style=\"height:100px\" class=\"g-ta-c\">暂时没有相关数据</td></tr>",
			_len = aList.length;
		if(_len>0){
			sBody = "";
			for (var i = 0; i < _len; i++) {
				aList[i].__RowIndex__ = i + 1;
				sBody += $.replaceTemplate(sNewRowTem, aList[i]);
			}
		}
        eRowTem.siblings().remove();
        $(this).append(sBody);
        $("tr", this).show().eq(0).hide();
        $(this).attr("JsonData", $.toJSON(aList));
    });
};
$.fn.fillTbodyList = function (aList, pageOptions) {
    return this.each(function () {
        if (aList == null) aList = [];
        $(this).fillTbodyTemplate(aList);
        $(this).closest('.g-grid').siblings('.g-pagerwp').find('.g-pager').css('visibility', 'visible').pageBar1(pageOptions);
    });
};
$.fn.pageBar1 = function (options) {
    var configs = {
        PageIndex: 1,
        PageSize: 15,
        TotalPage: 0,
        RecordCount: 0,
        showPageCount: 4,
        onPageClick: function () {
            return false
        }
    };
    $.extend(configs, options);
    var tmp = "",
        i = 0,
        j = 0,
        a = 0,
        b = 0,
        totalpage = parseInt(configs.RecordCount / configs.PageSize);
    totalpage = configs.RecordCount % configs.PageSize > 0 ? totalpage + 1 : totalpage;
    tmp += "<span>总记录数：" + configs.RecordCount + "</span > ";
    tmp += " <span>页数：" + totalpage + "</span>";
    if (configs.PageIndex > 1) {
        tmp += "<a>&lt;</a>"
    } else {
        tmp += "<a class=\"no\">&lt;</a>"
    }
    tmp += "<a>1</a>";
    if (totalpage > configs.showPageCount+1) {
        if (configs.PageIndex <= configs.showPageCount) {
            i = 2;
            j = i + configs.showPageCount;
            a = 1;
        } else if (configs.PageIndex > totalpage - configs.showPageCount) {
            i = totalpage - configs.showPageCount;
            j = totalpage;
            b = 1;
        } else {
            var k = parseInt((configs.showPageCount - 1) / 2);
            i = configs.PageIndex - k;
            j = configs.PageIndex + k + 1;
            a = 1;
            b = 1;
            if ((configs.showPageCount - 1) % 2) {
                i -= 1
            }
        }
    }
    else{
        i = 2;
        j = totalpage;
    }
    if (b) {
        tmp += "..."
    }
    for (; i < j; i++) {
        tmp += "<a>" + i + "</a>"
    }
    if (a) {
        tmp += " ... "
    }
    if (totalpage > 1) {
        tmp += "<a>" + totalpage + "</a>"
    }
    if (configs.PageIndex < totalpage) {
        tmp += "<a>&gt;</a>"
    } else {
        tmp += "<a class=\"no\">&gt;</a>"
    }
    this.html(tmp).children('a').click(function () {
        var cls = $(this).attr('class');
        if (this.innerHTML == '&lt;') {
            if (cls != 'no') {
                configs.onPageClick(configs.PageIndex - 2)
            }
        } else if (this.innerHTML == '&gt;') {
            if (cls != 'no') {
                configs.onPageClick(configs.PageIndex)
            }
        } else {
            if (cls != 'cur') {
                configs.onPageClick(parseInt(this.innerHTML) - 1)
            }
        }
    }).each(function () {
        if (configs.PageIndex == parseInt(this.innerHTML)) {
            $(this).addClass('cur')
        }
    })
};
$.fn.fillTableTemplate = function (aList) {
    return this.each(function () {
        var eRowContainer = $("tr", this);
        var sHeader = eRowContainer.eq(0).outer();
        var eRowTem = eRowContainer.eq(1);
        var sRowTem = eRowTem.outer();
        var sNewRowTem = eRowTem.css("display", "").outer();
        sNewRowTem = sNewRowTem.replace("<TR ", "<tr ");
        sNewRowTem = sNewRowTem.replace("</TR> ", "<tr>");
        sNewRowTem = sNewRowTem.replace("<tr ", "<tr onmouseover=\"this.className='s_msover';\" onmouseout=\"this.className='';\" ");
        var sBody = "";
        for (var i = 0; i < aList.length; i++) {
            aList[i].__RowIndex__ = i + 1;
            sBody += $.replaceTemplate(sNewRowTem, aList[i]);
        }
        $(this).html(sHeader + sRowTem + sBody);
        $(this).attr("JsonData", $.toJSON(aList));
    });
};
$.fn.fillPageList = function (aList, pageOptions) {
    return this.each(function () {
        if (aList == null) aList = [];
        $(this).fillTableTemplate(aList);
        $("#" + $(this).attr("id") + "_PageBar").pageBar(pageOptions);
    });
};
$.fn.pageBar = function (options) {
    return this.each(function () {
        var configs = {
            PageIndex: 1,
            PageSize: 15,
            TotalPage: 0,
            RecordCount: 0,
            showPageCount: 4,
            onPageClick: function () {
                return false;
            }
        };
        $.extend(configs, options);
        //实现翻页控件的功能
        var opt = {
            callback: configs.onPageClick
        }; //callback
        opt.items_per_page = configs.PageSize;
        opt.num_display_entries = configs.showPageCount;
        opt.current_page = --configs.PageIndex;
        opt.num_edge_entries = 1;
        opt.prev_text = "上一页";
        opt.next_text = "下一页";
        $(this).pagination(configs.RecordCount, opt)
        $(this).find('a').each(function () {
            if ($(this).html() == configs.PageIndex + 1) {
                $(this).addClass('cur')
            }
        });
        return this;
    });
};
$.fn.fillForm = function (model) {
    return this.each(function () {
        if (model == null) model = {};
        var els = $("input,textarea,select", this);
        for (var i = 0, max = els.length; i < max; i++) {
            var sValue = model[els[i].name];
            if (typeof sValue == 'undefined') continue;
            $(els[i]).setFieldValue(sValue);
        }
    });
};
$.fn.getRow = function (nRowIndex) {
    var row = {};
    var data = this.attr("JsonData");
    if ((data == null) || (typeof data == 'undefined')) return row;
    var aList = $.evalJSON(data);
    if (!$.isArray(aList)) return row;
    if (nRowIndex < 1) nRowIndex = 1;
    if (aList.length >= nRowIndex) {
        row = aList[nRowIndex - 1];
    }
    return row;
};
$.fn.getSelectedRows = function () {
    var aSelected = [];
    if (this.length == 0) return aSelected;
    var theThis = $(this[0]);
    $("input[name='" + theThis.attr("id") + "_CheckBoxIds']", this[0]).each(function () {
        if (this.disabled || !this.checked) return;
        aSelected.push(theThis.getRow(this.value));
    });
    return aSelected;
};
$.ajaxRequest = function (options) {
    var configs = {
        AssemblyName: __FunAssemblyName,
        ClassName: null,
        MethodName: null,
        ParamModelName: null,
        ParamAssemblyName: __ParamAssemblyName,
        form: null,
        target: null,
        page: {
            AllowPaging: false,
            PageIndex: 0,
            PageSize: 15,
            TotalPage: 0,
            RecordCount: 0,
            showPageCount: 4
        },
        onRequest: null,
        onResponse: null,
        onComplete: null,
        onError: null,
        initData: null
    };
    options.page = $.extend({}, configs.page, options.page);
    $.extend(configs, options);
    var param = {};
    //获取参数转化为json数据        
    if (configs.form) {
        param = configs.form.formToJSON();
    }
    //处理请求数据
    if (configs.onRequest) {
        param = configs.onRequest(param);
        if (param === null) {
            return
        }
    }
    var jsonData = null;
    if (configs.initData == null) {
        jsonData = serializeRequest(configs, param);
    }
    var infoTip = new Tip('数据加载中...'),
	    _errorInfo = new Tip('服务器端出错'),
		_jq = jQuery;
    var ajaxOptions = {
        requestConfigs: configs,
        requestParam: param,
        url: '/Ajax/WebAdapter.aspx',
        type: "Post",
        dataType: "json",
        data: jsonData,
        error: function (msg) {
            //infoTip.hide();
            requestConfigs = this.requestConfigs;
            //调用成功处理函数
            if (requestConfigs.onError) {
                requestConfigs.onError(msg);
            }            
            else {
                //alert("服务器端出错！");
				_errorInfo.show();
				_jq("#tip16").css("backgroundColor","#e00000").find("img").hide();
            }
        },
        success: function (data) {
            //TipLoading.hide();//隐藏数据加载层
            var oJson = data,
                mValue = {},
                oPage = {},
                requestConfigs = this.requestConfigs,
                requestParam = this.requestParam,
                ajaxOpt = this;
            if (oJson.Complete.toLowerCase() == 'succeed') { //成功
                if (oJson.Result != null) {
                    switch (oJson.ResultType.toLowerCase()) {
                    case 'conditionresult':
                        oPage.AllowPaging = oJson.Result.AllowPaging;
                        oPage.TotalPage = oJson.Result.TotalPage;
                        oPage.PageIndex = oJson.Result.PageIndex == undefined ? 1 : oJson.Result.PageIndex;
                        oPage.PageSize = oJson.Result.PageSize;
                        oPage.RecordCount = oJson.Result.TotalCount;
                        oPage.showPageCount = requestConfigs.page.showPageCount;
                        oPage = $.extend({}, requestConfigs.page, oPage);
                        oPage.onPageClick = function (pageIndex) {
                            $.extend(requestConfigs.page, oPage);
                            requestConfigs.page.PageIndex = ++pageIndex;
                            ajaxOpt.data = serializeRequest(requestConfigs, requestParam);
                            infoTip.show(); //显示加载层
                            $.ajax(ajaxOpt);
                        };
                        mValue = oJson.Result.ResultList;
                        break;
                    default:
                        mValue = oJson.Result;
                        break;
                    }
                }
                //处理响应数据
                if (requestConfigs.onResponse) {
                    setPageIndex(requestConfigs.target, oPage); //保存当前页 by immater 2010-4-14
                    mValue = requestConfigs.onResponse(mValue, oPage);
                }
                //自动填充
                if (requestConfigs.target) {
                    var targetTag = requestConfigs.target[0].tagName.toLowerCase();
                    switch (targetTag) {
                    case "table":
                        requestConfigs.target.fillPageList(mValue, oPage);
                        break;
                    case "form":
                        requestConfigs.target.fillForm(mValue);
                        break;
                    case "tbody":
                        requestConfigs.target.fillTbodyList(mValue, oPage);
                        break;
                    default:
                        requestConfigs.target.fillTemplate(mValue);
                        break;
                    }
                }
                //调用成功处理函数
                if (requestConfigs.onComplete) {
                    requestConfigs.onComplete(mValue, oPage);
                }
                infoTip.hide();
            }
            else if(oJson.Complete.toLowerCase() == 'loginex')
            {
                infoTip.hide();
                parent.window.location=oJson.Message;
            }
            else { //失败
                infoTip.hide();
                alert(oJson.Message);
            }
        }
    };
    if (configs.initData != null) {
        ajaxOptions.success(configs.initData);
    } else {
        //TipLoading.show();//显示数据加载层
        infoTip.show();
        $.ajax(ajaxOptions);
    }
    //保存当前页 by immater 2010-4-14

    function setPageIndex(target, opage) {
        if (target == null || opage == null) {
            return false;
        }
        opage.PageIndex = opage.PageIndex == 0 ? 1 : opage.PageIndex;
        var tabID = $(target).attr("id") + "_PageIndex";
        var elpageindex = $("#" + tabID);
        if (elpageindex.length == 0) {
            $('body').append('<input type="hidden" value="' + opage.PageIndex + '" id="' + tabID + '" \/>');
        } else {
            $(elpageindex).val(opage.PageIndex);
        }
    };

    function serializeRequest(config, param) {
        //分页处理
        if (configs.page.AllowPaging) {
            param.AllowPaging = true;
            param.PageSize = param.PageSize || configs.page.PageSize;
            param.RecordCount = configs.page.RecordCount;
            var __el = $("#" + $(config.target).attr("id") + "_PageIndex");
/*if (config.page.PageIndex < 1) {
                param.PageIndex = $(__el).length == 0 ? 1 : $(__el).val();
            } else {
                param.PageIndex = configs.page.PageIndex == 0 ? 1 : config.page.PageIndex;
            }*/
            param.PageIndex = config.page.PageIndex;
        }
        var request = {
            FunAssemblyName: configs.AssemblyName,
            FunClassName: configs.ClassName,
            FunMethodName: configs.MethodName,
            ParamAssemblyName: configs.ParamAssemblyName,
            ParamClassName: configs.ParamModelName,
            ParamType: $.isArray(param) ? "List" : "Entity",
            ParamData: $.toJSON(param)
        };
        return $.toJSON(request);
    };
};
$.JsonToArray = function (json) {
    var ret = [];
    $.each(json, function () {
        ret.push(this)
    })
    return ret
};
$.replaceTemplate = function (content, model) {
    content = content.replace(/%7B/g, '{');
    content = content.replace(/%7D/g, '}');
    content = content.replace(/%7b/g, '{');
    content = content.replace(/%7d/g, '}');
    var oReg = new RegExp('\\{\\#(.+?)\\#\\}', 'g');
    model = $.JsonToArray(model);
    var sTem = content.replace(oReg, function () {
        var str = model[arguments[1]];
        if (str == undefined || str == null) {
            str = "";
        }
        return str;
    });
    return sTem;
};