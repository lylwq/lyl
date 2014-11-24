if(typeof Object.beget !== "function"){
	Object.beget = function(o){
		var F = function(){};
		F.prototype = o;
		return new F();
	}
}
//给函数原型对象添加方法，使所有
Function.prototype.method = function(name,func){
	if(this.prototype[name])return;
	this.prototype[name]=func;
	return this;
}

Number.method('integer',function(){
	return Math[this<0?'ceil':'floor'](this);
});
String.method('trim',function(){
	return this.replace(/^\s+|\s+$/g,"");
});
