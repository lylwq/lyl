/*
name:表单验证方法
param:  @eles:需要验证的元素id字符串,用英文逗号分割
        @form:要验证的表单
desc:   在需要验证的元素上设定自定义属性ip_vali,属性值为验证的类型,
        若要自定以提示语句,则要设定自定义属性ip_msg,属性值为自定义提示语句,顺序同验证类型,若不设,则使用默认语句
        目前只是类型:must-非空,isInt-整数,isNum-数字
author:Mr.钻
qq:516373557
*/
var ip_validate = function(){
	var isSub = true,
	dom = document,
	cur_eles = [],
	valiFuns = {
		must : function(ele){
			if(this.trim(ele.value.toString())===""){
			    isSub=false;
			    return false;
			}
			return true;
		},
		isInt : function(ele){
		    return ele.value.match(/^[0-9]+$/);
		},
		isNum : function(ele){
		    return !isNaN(ele.value);
		},
		trim : function(str){
		    return str.replace(/^\s+|\s+$/,"")
		}
	},
	valiMsg = {
	    must:"内容不能为空!",
	    isInt:"请输入整数!",
	    isNum:"请输入数字!"
	},
	valiFun = function(ele,type){
	    if(valiFuns[type] instanceof Function){
	        return valiFuns[type](ele);
	    }
	};
	
	return function (eles,form){
	    cur_eles = eles.split(",");
	    for(var i=0,ln=cur_eles.length;i<ln;i+=1){
	        var t_e = dom.getElementById(cur_eles[i]),
	        t_attr=t_e.getAttribute("ip_vali"),
	        t_msg=t_e.getAttribute("ip_msg");
	        t_ats=t_attr.split(" "),
	        t_msgs=t_msg.split(" ");
	        
	        for(var j=0,j_ln=t_ats.length;j<j_ln;j+=1){
	            if(!valiFun(t_e,t_ats[j])){
	                
	                t_msgs[j]?alert(t_msgs[j]):alert(valiMsg[t_ats[j]]);
	                t_e.focus();
	                return false;
	            }
	        }
	        
	    }
	    form.submit();
	};
	
	
}();