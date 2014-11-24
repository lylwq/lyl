function fun_tab( tar, tar_cname , cons_id ){
	
	if(typeof(tar) !== "object")return;
	var dom = document,
	_tar_sib = tar.parentNode.children,
	cons = dom.getElementById(cons_id).children,
	tar_sib=[];
	for(var j = 0,len=_tar_sib.length;j<len;j+=1){
		var _t=_tar_sib[j];
		if(_t.getAttribute("tab_target"))tar_sib.push(_t);
	}
	replaceClass(tar_sib,tar_cname,"g_dn");	
	tar.className += ' '+tar_cname;
	tar.blur();
	
	function replaceClass(list,t_cname,c_cname){
		var _temp;
		for(var i = 0,len = list.length;i<len;i+=1){
			var _tar = list[i],
			_con = cons[i];
			list[i].className = _tar.className.toString().replace(t_cname,"");
			if(_con.className.indexOf(c_cname)<0){					
				cons[i].className += c_cname;
			}
			if(tar.getAttribute("tab_target")===_con.id){
				_temp = _con;
			}
		}
		_temp.className = _temp.className.toString().replace(c_cname,"");
	}
}