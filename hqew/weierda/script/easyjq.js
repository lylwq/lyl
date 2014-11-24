(function(){
window._$ = window.$;
var query = window.query = window.$ = function(data){
	if (typeof data == 'string') {
		var selector = selectorEngine(data);
		return new query.fn.init(selector);
	}else if(data instanceof Function){
		return new query.fn.ready(data);
	}else{
		if(!data)return;
		var ret=[data];
		return new query.fn.init(ret);
	};
};
query.fn = query.prototype = { 
	init: function(selector){
		if(selector) this.data = selector;
		return this;
	},

	ready: !+'\v1' ? function(f){
		(function(){
			try{
				document.documentElement.doScroll('left');
			} catch (error){
				setTimeout(arguments.callee, 0);
				return;
			};
			f();
		})();
	} : function(f){
			document.addEventListener('DOMContentLoaded', f, false);
	},

	bind: function(type,fn){
		var i = -1, l = this.data.length;
		if (window.addEventListener){
			while (++i < l){
				this.data[i].addEventListener(type, fn, false);
			};
		} else {
			e = "on" + type;
			while (++i < l){
				var d = this.data[i];
				d.attachEvent(e, (function(d){
					return function(){
						fn.call(d);
					}
				})(d));
			};
		};
		return this;
	}, 

	blur: function(f){return this.bind('blur',f)},
	click: function(f){return this.bind('click',f)},
	change: function(f){return this.bind('change',f)},
	dblclick: function(f){return this.bind('dblclick',f)},
	error: function(f){return this.bind('error',f)},
	focus: function(f){return this.bind('focus',f)},
	keydown: function(f){return this.bind('keydown',f)},
	keypress: function(f){return this.bind('keypress',f)},
	keyup: function(f){return this.bind('keyup',f)},
	load: function(f){return this.bind('load',f)},
	mousedown: function(f){return this.bind('mousedown',f)},
	mouseup: function(f){return this.bind('mouseup',f)},
	mousemove: function(f){return this.bind('mousemove',f)},
	mouseover: function(f){return this.bind('mouseover',f)},
	mouseout: function(f){return this.bind('mouseout',f)},
	mouseenter: function(f){return this.bind('mouseenter',f)},
	mouseleave: function(f){return this.bind('mouseleave',f)},
	resize: function(f){return this.bind('resize',f)},
	scroll: function(f){return this.bind('scroll',f)},
	select: function(f){return this.bind('select',f)},
	submit: function(f){return this.bind('submit',f)},
	unload: function(f){return this.bind('unload',f)},
	
	parent : function(){
		var res=[];
		for(var i=0,dl=this.data.length;i<dl;i+=1){
			
		}
	},
	children : function(){
		if(!this.firstChild)return;
		var chrs=[];
		
	},
	index :function(){
		
	},
	addClass : function(c_n){
		for(var i=0,dl=this.data.length;i<dl;i+=1){
			var da=this.data[i],oc=da.className;
			if(oc.indexOf(c_n)<0){
				da.className = oc+" "+c_n;	
			}
		}
		return this;
	},
	removeClass : function(c_n){
		var i,td=this.data,dl=this.data.length;
		if(!c_n){
			for(i=0;i<dl;i+=1){td[i].className=''}
		}else{
			for(i=0;i<dl;i+=1){
				var oc=td[i].className;
				td[i].className=oc.replace(c_n,"")
			}
		}
		return this;
	},
	hasClass : function(c_n){
		var i,td=this.data,dl=this.data.length;
		for(i=0;i<dl;i+=1){
			if(td[i].className.indexOf(c_n)>-1)return true;
		}
		return false;		
	},
	filterByAttr : function(attr,at_val){
	    if(!attr&&!at_val)return this;
	    var result=[],td=this.data;
	    for(var i=0,len=this.data.length;i<len;i+=1){
		    if(at_val&&td[i].getAttribute(attr)&&td[i].getAttribute(attr).toString().indexOf(at_val)>-1){
			    result.push(td[i]);
			    continue;
		    }
		    if(arguments.length===1&&!at_val&&td[i].getAttribute(attr)){
			    result.push(td[i]);
		    }
	    }
	    return new query.fn.init(result);
   },
   selectAll : function(state){
   		var td = this.data;
   		for(var i=0,ln=td.length;i<ln;i+=1){
   			td[i].checked=state;
   		}
   }
};
query.fn.init.prototype = query.fn;
})();
(function($){ 
	$.noConflict = function(){ 
		window.$ = window._$;
	};
	$.trim = function(str){
		return str.toString().replace(/(^\s*)|(\s*$)/g,"");
	}
})(query);

eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('2 P=(5(){2 b=/(?:[\\w\\-\\\\.#]+)+(?:\\[\\w+?=([\\\'"])?(?:\\\\\\1|.)+?\\1\\])?|\\*|>/S,g=/^(?:[\\w\\-7]+)?\\.([\\w\\-7]+)/,f=/^(?:[\\w\\-7]+)?#([\\w\\-7]+)/,j=/^([\\w\\*\\-7]+)/,h=[H,H];5 d(o,m){m=m||M;2 k=/^[\\w\\-7#]+$/.z(o);4(!k&&m.F){3 c(m.F(o))}4(o.O(",")>-1){2 v=o.N(/,/g),t=[],s=0,r=v.8;y(;s<r;++s){t=t.L(d(v[s],m))}3 e(t)}2 p=o.6(b),n=p.C(),l=(n.6(f)||h)[1],u=!l&&(n.6(g)||h)[1],w=!l&&(n.6(j)||h)[1],q;4(u&&!w&&m.I){q=c(m.I(u))}T{q=!l&&c(m.R(w||"*"));4(u){q=i(q,"A",D("(^|\\\\s)"+u+"(\\\\s|$)"))}4(l){2 x=m.U(l);3 x?[x]:[]}}3 p[0]&&q[0]?a(p,q):q}5 c(o){V{3 X.Q.Y.K(o)}J(n){2 l=[],m=0,k=o.8;y(;m<k;++m){l[m]=o[m]}3 l}}5 a(w,p,n){2 q=w.C();4(q===">"){3 a(w,p,G)}2 s=[],k=-1,l=(q.6(f)||h)[1],t=!l&&(q.6(g)||h)[1],v=!l&&(q.6(j)||h)[1],u=-1,m,x,o;v=v&&v.E();9((m=p[++u])){x=m.B;W{o=!v||v==="*"||v===x.13.E();o=o&&(!l||x.Z===l);o=o&&(!t||D("(^|\\\\s)"+t+"(\\\\s|$)").z(x.A));4(n||o){11}}9((x=x.B));4(o){s[++k]=m}}3 w[0]&&s[0]?a(w,s):s}2 e=(5(){2 k=+10 12();2 l=(5(){2 m=1;3 5(p){2 o=p[k],n=m++;4(!o){p[k]=n;3 G}3 14}})();3 5(m){2 s=m.8,n=[],q=-1,o=0,p;y(;o<s;++o){p=m[o];4(l(p)){n[++q]=p}}k+=1;3 n}})();5 i(q,k,p){2 m=-1,o,n=-1,l=[];9((o=q[++m])){4(p.z(o[k])){l[++n]=o}}3 l}3 d})();',62,67,'||var|return|if|function|match|_|length|while|||||||||||||||||||||||||for|test|className|parentNode|pop|RegExp|toLowerCase|querySelectorAll|true|null|getElementsByClassName|catch|call|concat|document|split|indexOf|selectorEngine|prototype|getElementsByTagName|ig|else|getElementById|try|do|Array|slice|id|new|break|Date|nodeName|false'.split('|'),0,{}))
