Array.prototype.indexOf = function (v) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == v) {
            return i
        }
    }
    return -1
};
Array.prototype.remove = function (v) {
    var i = this.indexOf(v);
    if (i > -1) {
        this.splice(i, 1)
    }
    return [i, v]
};
String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "")
};
String.prototype.len = function () {
    return this.replace(/[^\x00-\xff]/g, "**").length
};
String.prototype.cut = function (l) {
    if (this.len() <= l) {
        return this
    } else {
        for (var i = Math.floor(l / 2); i < this.length; i++) {
            if (this.substr(0, i).len() >= l) {
                return this.substr(0, i)
            }
        }
    }
};

(function () {
	var toString = Object.prototype.toString,
	hasOwn = Object.prototype.hasOwnProperty,
	push = Array.prototype.push,
	slice = Array.prototype.slice,
	trim = String.prototype.trim,
	indexOf = Array.prototype.indexOf,
	root,
	rhtml = /<|&#?\w+;/,
    
	Q = window.Q = function (x) {
        if (x instanceof Function) {
            return new Q.p.ready(x)
        } else {
            return new Q.p.init(x)
        }
    };
    Q.p = Q.prototype = {
        init: function (x) {
            this.selector(x)
        },
        selector: function (x, e) {
            e = e || document;
            if (typeof x === 'object') {
                return this.filter(x.length === undefined ? [x] : x)
            } else if (typeof x === 'string') {
                var id = (x.match(/^(?:[\w\-]+)?#([\w\-]+)/) || [null, null])[1],
                    cl = (x.match(/^(?:[\w\-]+)?\.([\w\-]+)/) || [null, null])[1],
                    tn = (x.match(/^([\w\-]+)/) || [null, null])[1];
                if (id) {
                    this[0] = e.getElementById(id);
                    this.length = 1;
                    return this
                } else if (cl || tn) {
                    return this.filter(e.getElementsByTagName(tn ? tn : '*'), 'className', cl)
                }
            }
        },
        filter: function (e, a, v) {
            var i = -1,
                j = 0;
            while (e[++i]) {
                if (v ? RegExp('(^|\\s)' + v + '(\\s|$)').test(e[i][a]) : (e[i].nodeType === undefined ? true : e[i].nodeType === 1)) {
                    this[j++] = e[i]
                }
            }
            this.length = j;
            return this
        },
        each: function (c) {
            var i = this.length;
            while (i--) {
                c.call(this[i], i)
            }
        },
        attr: function (j) {
            if (typeof j === 'object') {
                this.each(function () {
                    for (var n in j) {
                        this[n] === undefined ? this.setAttribute(n, j[n]) : this[n] = j[n]
                    }
                });
                return this
            } else {
                return this[0][j] === undefined ? this[0].getAttribute(j) : this[0][j]
            }
        },
        html: function (v) {
            return this.attr(v === undefined ? 'innerHTML' : {
                innerHTML: v
            })
        },
        val: function (v) {
            return this.attr(v === undefined ? 'value' : {
                value: v
            })
        },
        css: function (v, n) {
            if (v === undefined) {
                return this[0].className
            } else {
                this.each(function () {
                    if (n === undefined) {
                        if (!RegExp('(^|\\s)' + v + '(\\s|$)').test(this.className)) {
                            this.className += ' ' + v
                        }
                    } else {
                        this.className = this.className.replace(RegExp('(^|\\s)' + v + '(\\s|$)'), ' ' + n).trim()
                    }
                });
                return this
            }
        },
        style: function (j) {
            if (typeof j === 'object') {
                this.each(function () {
                    for (var n in j) {
                        this.style[n] = j[n]
                    }
                });
                return this
            } else {
                return this[0].style[j]
            }
        },
        show: function () {
            return this.style({
                display: 'block'
            })
        },
        hide: function () {
            return this.style({
                display: 'none'
            })
        },
        eq: function (i) {
            this[0] = this[i === -1 ? this.length - 1 : i];
            this.length = 1;
            return this
        },
        prev: function () {
            do {
                this[0] = this[0].previousSibling
            } while (this[0].nodeType !== 1);
            this.length = 1;
            return this
        },
        next: function () {
            do {
                this[0] = this[0].nextSibling
            } while (this[0].nodeType !== 1);
            this.length = 1;
            return this
        },
        parent: function () {
            this[0] = this[0].parentNode;
            this.length = 1;
            return this
        },
        childs: function () {
            return this.selector(this[0].childNodes)
        },
        fchild: function () {
            this[0] = this[0].firstChild;
            while (this[0].nodeType !== 1) {
                this[0] = this[0].nextSibling
            }
            this.length = 1;
            return this
        },
        lchild: function () {
            this[0] = this[0].lastChild;
            while (this[0].nodeType !== 1) {
                this[0] = this[0].previousSibling
            }
            this.length = 1;
            return this
        },
        siblings: function () {
            var t = [],
                i = -1,
                e = this[0].parentNode.childNodes;
            while (e[++i]) {
                if (e[i] !== this[0]) {
                    t.push(e[i])
                }
            }
            return this.selector(t)
        },
        bind: function (e, c) {
            if (window.addEventListener) {
                this.each(function () {
                    this.addEventListener(e, c, false)
                })
            } else {
                this.each(function () {
                    this.attachEvent("on" + e, (function (a) {
                        return function () {
                            c.call(a)
                        }
                    })(this))
                })
            }
            return this
        },
        ready: !+'\v1' ?
        function (c) {
            (function () {
                try {
                    document.documentElement.doScroll('left')
                } catch(error) {
                    setTimeout(arguments.callee, 0);
                    return
                }
                c()
            })()
        } : function (c) {
            document.addEventListener('DOMContentLoaded', c, false)
        },
		/*文档处理(参数数组,回调函数) 
		  fun:将不同参数转换成统一的文档片段,并传入回调函数对其调用
		  return this*/
		domManip:function(args,callback){
			var elem = args[0],
			doc = document,
			fragment = doc.createDocumentFragment(),
			div = doc.createElement("div"),
			ret=[];
			if(typeof elem==="string"){
				if(rhtml.test(elem)){
					div.innerHTML = elem;
					elem = div.childNodes;
				}else{
					elem = doc.createTextNode(elem);
				}
			}
			
			if(elem && elem.nodeType){
				ret.push(elem);
			}else{
				ret = Q.merge(ret,elem);
			}
			
			for(var i=0,len=ret.length;i<len;i+=1){
				fragment.appendChild(ret[i]);
			}
			for(var j=0,len=this.length,ll=len-1;j<len;j+=1){
				callback.call(this[j],
							  (len>1 && j<ll)?Q.clone(fragment):fragment);
			}
			return this;
		},
		//元素内尾部添加
		append:function(){
			return this.domManip(arguments,function(elem){
					console.log(this);
				if(this.nodeType===1){
					this.appendChild(elem);
				}
			});
		},
		//元素内头部添加
		prepend:function(){
			return this.domManip(arguments,function(elem){
				if(this.nodeType===1){
					this.insertBefore(elem,this.firstChild);
				}
			});
		},
		//添加到元素外前
		before:function(){
			return this.domManip(arguments,function(elem){
				if(this && this.parentNode){
					this.parentNode.insertBefore(elem,this);
				}
			});
		},
		//添加到元素外后
		after:function(){
			return this.domManip(arguments,function(elem){
				var p;
				if(this && (p = this.parentNode)!=null){
					p.insertBefore(elem,this.nextSibling);
				}
			});
		},
		//删除元素
		remove:function(){
			this.each(function(){
				this.parentNode.removeChild(this);
			});
			return this;
		},
		//替换元素
		replaceBy:function(){
			return this.domManip(arguments,function(elem){
				if(this && this.parentNode){
					var par = this.parentNode;
					par.insertBefore(elem,this)
					par.removeChild(this);
				}
			});
		},
		clone:function(){			
			return Q.map(this,function(){
				return Q.clone(this);
			});
		},
		
		length:0,
		push: push,
		sort: [].sort,
		splice: [].splice
    
	};
	
    Q.p.init.prototype = Q.p;
	
	/*
		Q对象扩展接口,参数可为1个或多个对象,
		arguments=1:将对象内的所有成员合并到Q对象
		arguments>1:将参数1以外的对象合并到参数1对象中(后者覆盖前者)
	*/
	Q.extend = Q.p.extend = function(){
		var src,options,target,copy,name,
		i = 0,
		argl = arguments.length;
		if(!argl){return;}
		if(argl===1){
			src = this;
		}
		else{
			src = arguments[0];
			i = 1;
		}
		
		for(;i<argl;i+=1){
			
			if((target = arguments[i])===null){return;}
			
			for(name in target){
				copy = target[name];
				src[name]=copy;
			}
		}
		return src;
	}
	
	/*公用方法*/
	Q.extend({
			 
		//合并(集合1,集合2)将集合2中的所有元素添加到集合1尾部
		merge : function(first,second){
			for(var i=first.length,sl=second.length,j=0;j<sl;j+=1,i+=1){
				first[i] = second[j];
			}
			return first;
		},
		clone:function(elem){
			return elem.cloneNode(true);
		},
		//将数组内的所有元素执行回调函数,并将每个执行结果添加到结果集
		//返回:执行后的结果集
		map:function(elems,callback,arg){
			var ret=[],
			i=0,
			len=elems.length||0,
			val;
			
			for(;i<len;i+=1){
				val = callback.call(elems[i],arg);
				if(val){
					ret.push(val);
				}
			}
			return ret;
		},

	});
	
})();
Q(['blur', 'error', 'focus', 'click', 'dblclick', 'change', 'select', 'submit', 'keydown', 'keypress', 'keyup', 'mousedown', 'mouseup', 'mousemove', 'mouseover', 'mouseout', 'mouseenter', 'mouseleave', 'resize', 'scroll', 'load', 'unload']).each(function () {
    var e = this;
    Q.p[e] = function (c) {
        this.bind(e, c)
    }
});
Q.Js = function (o) {
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = o.u;
    s.charset = o.s || 'utf-8';
    s.onload = s.onreadystatechange = function () {
        if (!s.readyState || s.readyState === "loaded" || s.readyState === "complete") {
            o.c.call(this);
            s.onload = s.onreadystatechange = null;
            s.parentNode.removeChild(s)
        }
    };
    document.getElementsByTagName('head')[0].appendChild(s)
};
Q.Ajax = function (o) {
    var x = null;
    try {
        x = new XMLHttpRequest()
    } catch(e) {
        x = new ActiveXObject("Microsoft.XMLHTTP")
    }
    x.open(o.m, o.u, o.a);
    x.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    x.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            switch (o.t) {
            case 'xml':
                o.c.call(this, this.responseXML);
                break;
            case 'text':
                o.c.call(this, this.responseText);
                break;
            case 'json':
                o.c.call(this, eval('(' + this.responseText + ')'));
                break;
            case 'script':
                eval('(' + this.responseText + ')');
                o.c.call(this);
                break;
            default:
                o.c.call(this, this.responseText);
                break
            }
        }
    };
    x.send(o.p || null)
};