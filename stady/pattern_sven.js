/*
4.单例模式

*/
//惰性单例
var getSingle = function(fn) {
	var result;
	return function() {
		return result || (result = fn.apply(this, arguments));
	}
};

/*
5.策略模式
定义一系列的算法，把它们一个个封装起来。并且使它们可以相互替换。
*/
var strategies = {
	"S": function(salary) {
		return salary * 4;
	},
	"A": function(salary) {
		return salary * 3;
	},
	"B": function(salary) {
		return salary * 2;
	}
};

var calculateBonus = function(level, salary) {
	return strategies[level](salary);
};

console.log(calculateBonus('S', 20000)); // 输出： 80000
console.log(calculateBonus('A', 10000)); // 输出： 30000

/*
6.代理模式
单一职责原则指的是，就一个类（通常也包括对象和函数等）而言，应该仅有一个引起它变化的原因
将变化的职责作为代理,通过代理去调用不变的功能.
代理的种类有很多:虚拟代理,缓存代理...
*/
var myImage = (function() {
	var imgNode = document.createElement('img');
	document.body.appendChild(imgNode);

	return {
		setSrc: function(src) {
			imgNode.src = src;
		}
	}
})();

var proxyImage = (function() {
	var img = new Image;
	img.onload = function() {
		myImage.setSrc(this.src);
	}
	return {
		setSrc: function(src) {
			myImage.setSrc('file:///C:/Users/svenzeng/Desktop/loading.gif');
			img.src = src;
		}
	}
})();

proxyImage.setSrc('http://imgcache.qq.com/music/photo//k/000GGDys0yA0Nk.jpg');

/*
7.迭代器模式
迭代器模式的作用是，提供一种方法顺序访问一个聚合对象中的各个元素，而又不需要暴露该对象的内部表示。迭代器模式把迭代的过程从业务逻辑中分离出来
*/
var getActiveUploadObj = function() {
	try {
		return new ActiveXObject("TXFTNActiveX.FTNUpload"); //IE上传控件
	} catch (e) {
		return false;
	}
};

var getFlashUploadObj = function() {
	if (supportFlash()) { // supportFlash函数未提供
		var str = '<object type="application/x-shockwave-flash"></object>';
		return $(str).appendTo($('body'));
	}
	return false;
};

var getFormUpladObj = function() {
	var str = '<input name="file" type="file" class="ui-file"/>'; //表单上传
	return $(str).appendTo($('body'));
};
var iteratorUploadObj = function() {
	for (var i = 0, fn; fn = arguments[i++];) {
		var uploadObj = fn();
		if (uploadObj !== false) {
			return uploadObj;
		}
	}
};
//这样无论以后有再多情况也可以轻松往迭代器里面添加
var uploadObj = iteratorUploadObj(getActiveUploadObj, getFlashUploadObj, getFormUpladObj);

/*
8.发布-订阅模式
*/
var Event = (function() {

	var global = this,
		Event,
		_default = 'default';

	Event = function() {
		var _listen,
			_trigger,
			_remove,
			_slice = Array.prototype.slice,
			_shift = Array.prototype.shift,
			_unshift = Array.prototype.unshift,
			namespaceCache = {},
			_create,
			find,
			each = function(ary, fn) {
				var ret;
				for (var i = 0, l = ary.length; i < l; i++) {
					var n = ary[i];
					ret = fn.call(n, i, n);
				}
				return ret;
			};

		_listen = function(key, fn, cache) {
			if (!cache[key]) {
				cache[key] = [];
			}
			cache[key].push(fn);
		};

		_remove = function(key, cache, fn) {
			if (cache[key]) {
				if (fn) {
					for (var i = cache[key].length; i >= 0; i--) {
						if (cache[key] === fn) {
							cache[key].splice(i, 1);
						}
					}
				} else {
					cache[key] = [];
				}
			}
		};

		_trigger = function() {
			var cache = _shift.call(arguments),
				key = _shift.call(arguments),
				args = arguments,
				_self = this,
				ret,
				stack = cache[key];

			if (!stack || !stack.length) {
				return;
			}

			return each(stack, function() {
				return this.apply(_self, args);
			});
		};

		_create = function(namespace) {
			var namespace = namespace || _default;
			var cache = {},
				offlineStack = [], //离线事件 
				ret = {
					listen: function(key, fn, last) {
						_listen(key, fn, cache);
						if (offlineStack === null) {
							return;
						}
						if (last === 'last') {
							offlineStack.length && offlineStack.pop()();
						} else {
							each(offlineStack, function() {
								this();
							});
						}

						offlineStack = null;
					},
					one: function(key, fn, last) {
						_remove(key, cache);
						this.listen(key, fn, last);
					},
					remove: function(key, fn) {
						_remove(key, cache, fn);
					},
					trigger: function() {
						var fn,
							args,
							_self = this;

						_unshift.call(arguments, cache);
						args = arguments;
						fn = function() {
							return _trigger.apply(_self, args);
						};

						if (offlineStack) {
							return offlineStack.push(fn);
						}
						return fn();
					}
				};

			return namespace ?
				(namespaceCache[namespace] ? namespaceCache[namespace] : namespaceCache[namespace] = ret) : ret;
		};

		return {
			create: _create,
			one: function(key, fn, last) {
				var event = this.create();
				event.one(key, fn, last);
			},
			remove: function(key, fn) {
				var event = this.create();
				event.remove(key, fn);
			},
			listen: function(key, fn, last) {
				var event = this.create();
				event.listen(key, fn, last);
			},
			trigger: function() {
				var event = this.create();
				event.trigger.apply(this, arguments);
			}
		};
	}();

	return Event;

})();