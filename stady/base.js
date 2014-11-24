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

/*Selector Engine*/
var mini = (function () {
    var snack = /(?:[\w\-\\.#]+)+(?:\[\w+?=([\'"])?(?:\\\1|.)+?\1\])?|\*|>/ig,
        exprClassName = /^(?:[\w\-_]+)?\.([\w\-_]+)/,
        exprId = /^(?:[\w\-_]+)?#([\w\-_]+)/,
        exprNodeName = /^([\w\*\-_]+)/,
        na = [null, null];

    function _find(selector, context) {
        context = context || document;
        var simple = /^[\w\-_#]+$/.test(selector);
        if (!simple && context.querySelectorAll) {
            return realArray(context.querySelectorAll(selector))
        }
        if (selector.indexOf(',') > -1) {
            var split = selector.split(/,/g),
                ret = [],
                sIndex = 0,
                len = split.length;
            for (; sIndex < len; ++sIndex) {
                ret = ret.concat(_find(split[sIndex], context))
            }
            return unique(ret)
        }
        var parts = selector.match(snack),
            part = parts.pop(),
            id = (part.match(exprId) || na)[1],
            className = !id && (part.match(exprClassName) || na)[1],
            nodeName = !id && (part.match(exprNodeName) || na)[1],
            collection;
        if (className && !nodeName && context.getElementsByClassName) {
            collection = realArray(context.getElementsByClassName(className))
        } else {
            collection = !id && realArray(context.getElementsByTagName(nodeName || '*'));
            if (className) {
                collection = filterByAttr(collection, 'className', RegExp('(^|\\s)' + className + '(\\s|$)'))
            }
            if (id) {
                var byId = context.getElementById(id);
                return byId ? [byId] : []
            }
        }
        return parts[0] && collection[0] ? filterParents(parts, collection) : collection
    }
    function realArray(c) {
        try {
            return Array.prototype.slice.call(c)
        } catch(e) {
            var ret = [],
                i = 0,
                len = c.length;
            for (; i < len; ++i) {
                ret[i] = c[i]
            }
            return ret
        }
    }
    function filterParents(selectorParts, collection, direct) {
        var parentSelector = selectorParts.pop();
        if (parentSelector === '>') {
            return filterParents(selectorParts, collection, true)
        }
        var ret = [],
            r = -1,
            id = (parentSelector.match(exprId) || na)[1],
            className = !id && (parentSelector.match(exprClassName) || na)[1],
            nodeName = !id && (parentSelector.match(exprNodeName) || na)[1],
            cIndex = -1,
            node, parent, matches;
        nodeName = nodeName && nodeName.toLowerCase();
        while ((node = collection[++cIndex])) {
            parent = node.parentNode;
            do {
                matches = !nodeName || nodeName === '*' || nodeName === parent.nodeName.toLowerCase();
                matches = matches && (!id || parent.id === id);
                matches = matches && (!className || RegExp('(^|\\s)' + className + '(\\s|$)').test(parent.className));
                if (direct || matches) {
                    break
                }
            } while ((parent = parent.parentNode));
            if (matches) {
                ret[++r] = node
            }
        }
        return selectorParts[0] && ret[0] ? filterParents(selectorParts, ret) : ret
    }
    var unique = (function () {
        var uid = +new Date();
        var data = (function () {
            var n = 1;
            return function (elem) {
                var cacheIndex = elem[uid],
                    nextCacheIndex = n++;
                if (!cacheIndex) {
                    elem[uid] = nextCacheIndex;
                    return true
                }
                return false
            }
        })();
        return function (arr) {
            var length = arr.length,
                ret = [],
                r = -1,
                i = 0,
                item;
            for (; i < length; ++i) {
                item = arr[i];
                if (data(item)) {
                    ret[++r] = item
                }
            }
            uid += 1;
            return ret
        }
    })();

    function filterByAttr(collection, attr, regex) {
        var i = -1,
            node, r = -1,
            ret = [];
        while ((node = collection[++i])) {
            if (regex.test(node[attr])) {
                ret[++r] = node
            }
        }
        return ret
    }
    return _find
})();

/*主体*/
(function () {
	var toString = Object.prototype.toString,
	hasOwn = Object.prototype.hasOwnProperty,
	push = Array.prototype.push,
	slice = Array.prototype.slice,
	trim = String.prototype.trim,
	indexOf = Array.prototype.indexOf,
	root,
	rhtml = /<|&#?\w+;/,
    
	Q = window.$ = window.jQuery = window.Q = function (x,content) {
        if (x instanceof Function) {
            return new Q.fn.ready(x)
        } else {
            return new Q.fn.init(x,content)
        }
    };
    Q.fn = Q.prototype = {
        init: function (x ,content) {
            if (typeof x === 'object') {
                return this.filter(x !== null ? (x.length === undefined ? [x] : x) : [])
            } else if (typeof x === 'string') {
                return this.filter(mini(x,content))
            }
        },
        filter: function (e) {
            if (e.length === 0) { return }
            var i = -1,
                j = 0;
            while (e[++i]) {
                if (e[i].nodeType === undefined ? true : e[i].nodeType === 1) {
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
        css: function (v, n) {
            if (v === undefined) {
                return this.length > 0 ? this[0].className : null
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
        attr: function (j) {
            if (typeof j === 'object') {
                this.each(function () {
                    for (var n in j) {
                        this[n] === undefined ? this.setAttribute(n, j[n]) : this[n] = j[n]
                    }
                });
                return this
            } else {
                return this.length > 0 ? (this[0][j] === undefined ? this[0].getAttribute(j) : this[0][j]) : null
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
                if (j === 'width') {
                    return this.length > 0 ? this[0].clientWidth : null
                } else if (j === 'height') {
                    return this.length > 0 ? this[0].clientHeight : null
                } else {
                    return this.length > 0 ? this[0].style[j] : null
                }
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
        width: function (v) {
            return this.style(v === undefined ? 'width' : {
                width: v
            })
        },
        height: function (v) {
            return this.style(v === undefined ? 'height' : {
                height: v
            })
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
        index: function () {
            var i = -1,
                j = 0,
                t = this[0],
                e = t.parentNode.childNodes;
            while (e[++i]) {
                if (e[i].nodeType === 1) {
                    if (e[i] === t) {
                        return j
                    }
                    j++
                }
            }
        },
        parent: function () {
            this[0] = this[0].parentNode;
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
        prevs: function () {
            var i = 0,
                s = this[0].previousSibling;
            while (s) {
                if (s.nodeType === 1) {
                    this[i++] = s
                }
                s = s.previousSibling
            }
            this.length = i;
            return this
        },
        next: function () {
            do {
                this[0] = this[0].nextSibling
            } while (this[0].nodeType !== 1);
            this.length = 1;
            return this
        },
        nexts: function () {
            var i = 0,
                s = this[0].nextSibling;
            while (s) {
                if (s.nodeType === 1) {
                    this[i++] = s
                }
                s = s.nextSibling
            }
            this.length = i;
            return this
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
        childs: function (i) {
            return i === undefined ? this.filter(this[0].childNodes) : this.filter(this[0].childNodes).eq(i)
        },
        siblings: function () {
            var i = -1,
                j = 0,
                t = this[0],
                e = t.parentNode.childNodes;
            while (e[++i]) {
                if (e[i].nodeType === 1 && e[i] !== t) {
                    this[j++] = e[i]
                }
            }
            this.length = j;
            return this
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
		wrap:function(){
		    return this.domManip(arguments,function(elem){
		        var _par = this.parentNode,
		            _nex = this,
		            _chl = elem.childNodes[0];
		        _par.insertBefore(elem,this);
		        while(_chl.firstChild && _chl.firstChild.nodeType==1){
		            _chl = _chl.firstChild;
		        }
		        _chl.appendChild(this);
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
	
    Q.fn.init.prototype = Q.fn;
	
	/*
		Q对象扩展接口,参数可为1个或多个对象,
		arguments=1:将对象内的所有成员合并到Q对象
		arguments>1:将参数1以外的对象合并到参数1对象中(后者覆盖前者)
	*/
	Q.extend = Q.fn.extend = function(){
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
        isFunction: function (obj) {
            return toString.call(obj) === "[object Function]";
        },
        isArray: function (obj) {
            return toString.call(obj) === "[object Array]";
        }
	});
	
})();

/*事件绑定*/
Q(['blur', 'error', 'focus', 'click', 'dblclick', 'change', 'select', 'submit', 'keydown', 'keypress', 'keyup', 'mousedown', 'mouseup', 'mousemove', 'mouseover', 'mouseout', 'mouseenter', 'mouseleave', 'resize', 'scroll', 'load', 'unload']).each(function () {
    var e = this;
    Q.fn[e] = function (c) {
        return this.bind(e, c)
    }
});

/*动态加载JS*/
Q.Js = function (o) {
    function jsfind() {
        var s = document.getElementsByTagName('script'),
            i = s.length;
        while (i--) {
            if (s[i].src == ((o.url.toLowerCase().indexOf('http') > -1) ? '' : location.href.cut(location.href.lastIndexOf('/'))) + o.url) {
                return s[i]
            }
        }
        return null
    }
    function jscreate() {
        var s = document.createElement('script');
        s.type = 'text/javascript';
        s.src = o.url;
        s.charset = o.charset || 'utf-8';
        document.getElementsByTagName('head')[0].appendChild(s);
        return s
    }
    function jsload(e) {
        if (window.addEventListener) {
            e.addEventListener('load', function () {
                o.success()
            },
            false)
        } else {
            e.attachEvent('onreadystatechange', function (a) {
                if (e.readyState == 'loaded' || e.readyState == 'complete') {
                    o.success()
                }
            })
        }
    }
    jsload(jsfind() || jscreate())
};

/*AJAX*/
Q.ajax = function (o) {
    var x = null,
        s = null;

    function msg(e, m) {
        if (e) {
            e.innerHTML = m
        }
    }
    if (o.start) {
        o.start()
    } else {
        s = document.createElement('div');
        s.style.cssText = 'position:absolute;top:100px;right:100px;padding:10px 20px;border:#ccc solid 1px;color:#666;background:#f3f3f3';
        msg(s, 'Loading');
        document.getElementsByTagName('body')[0].appendChild(s)
    }
    try {
        x = new XMLHttpRequest()
    } catch(e) {
        try {
            x = new ActiveXObject('Microsoft.XMLHTTP')
        } catch(e) {
            msg(s, 'Can Not Create XMLHTTP Object');
            return false
        }
    }
    x.open(o.method || 'post', o.url, o.async || true);
    x.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    x.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                msg(s, 'Success');
                if (o.stop) {
                    o.stop()
                } else if (s) {
                    setTimeout(function () {
                        s.parentNode.removeChild(s)
                    },
                    5000)
                }
                switch (o.type) {
                case 'xml':
                    o.success(this.responseXML);
                    break;
                case 'text':
                    o.success(this.responseText);
                    break;
                case 'json':
                    o.success(eval('(' + this.responseText + ')'));
                    break;
                case 'script':
                    eval('(' + this.responseText + ')');
                    o.success();
                    break;
                default:
                    o.success(this.responseText);
                    break
                }
            } else {
                msg(s, this.statusText);
                if (o.error) {
                    o.error(this.statusText)
                }
            }
        }
    };
    x.send(o.param || '')
};