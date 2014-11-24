// myEvent 0.2.2
// 2011.04.07 - TangBin - planeart.cn - MIT Licensed
/**
 * 事件框架
 * @namespace
 * @see http://www.planeart.cn/?p=1285
 */
var myEvent = (function () {

var _ret, _name,
	_fid = 1,
	_guid = 1,
	_time = (new Date).getTime(),
	_nEid = '{$eid}' + _time,
	_nFid = '{$fid}' + _time,
	_DOM = document.addEventListener,
	_noop = function () {},
	_create = function (guid) {
		return function (event) {
			event = myEvent.fix(event || window.event);
			var type = (event || (event = document.event)).type,
				elem = _cache[guid].elem,
				data = arguments,
				events = _cache[guid].events[type],
				i = 0,
				length = events.length;
			
			for (; i < length; i ++) {
				if (events[i].apply(elem, data) === false) event.preventDefault();
			};
			
			event = elem = null;
		};
	},
	_cache = {/* 
		1: {
			elem: (HTMLElement),
			events: {
				click: [(Function), (..)],
				(..)
			},
			listener: (Function)
		},
		(..)
	*/};

var API = function () {};
API.prototype = {
	
	/**
	 * 事件绑定
	 * @param	{HTMLElement}	元素
	 * @param	{String}		事件名
	 * @param	{Function}		要绑定的函数
	 */
	bind: function (elem, type, callback) {
		var events, listener,
			guid = elem[_nEid] || (elem[_nEid] = _guid ++),
			special = this.special[type] || {},
			cacheData = _cache[guid];
		
		if (!cacheData) cacheData = _cache[guid] = {
			elem: elem,
			listener: _create(guid),
			events: {}
		};
		
		events = cacheData.events;
		listener = cacheData.listener;
		if (!events[type]) events[type] = [];
		if (!callback[_nFid]) callback[_nFid] = _fid ++;
		if (!special.setup || special.setup.call(elem, listener) === false) {
			events[type].length === 0 && this.add(elem, type, listener);
		};
		events[type].push(callback);
	},
	
	/**
	 * 事件卸载
	 * @param	{HTMLElement}	元素
	 * @param	{String}		事件名
	 * @param	{Function}		要卸载的函数
	 */
	unbind: function (elem, type, callback) {
		var events, special, i, list, fid,
			guid = elem[_nEid],
			cacheData = _cache[guid];
		
		if (!cacheData) return;
		events = cacheData.events;
		
		if (callback) {
			
			list = events[type];
			fid = callback[_nFid];
			if (!list) return;

			for (i = 0; i < list.length; i ++) {
				list[i][_nFid] === fid && list.splice(i--, 1);
			};
			if (!list.length) this.unbind(elem, type);
			
		} else if (type) {
			
			special = this.special[type] || {};
			if (!special.teardown || special.teardown.call(elem) === false) {
				this.remove(elem, type, cacheData.listener);
			};
			delete events[type];
			
		} else {
		
			for (i in events) {
				this.remove(elem, i, cacheData.listener);
			};
			delete _cache[guid];
			
		};

	},
	
	/**
	 * 事件触发 (注意：不会触发浏览器默认行为与冒泡)
	 * @param	{HTMLElement}	元素
	 * @param	{String}		事件名
	 * @param	{Array}			(可选)附加数据
	 */
	triggerHandler: function (elem, type, data) {
		var guid = elem[_nEid],
			cacheData = _cache[guid],
			event = {
				type: type,
				target: elem,
				currentTarget: elem,
				preventDefault: _noop,
				stopPropagation: _noop
			};
			
		data = data || [];
		data.unshift(event);

		cacheData && cacheData.events[type] && _cache[guid].listener.apply(elem, data);
		
		try {
			elem['on' + type] && elem['on' + type].apply(elem, data);
			//elem[type] && elem[type]();
		} catch (e) {};
	},
	
	// 自定义事件接口
	special: {},
	
	// 原生事件绑定接口
	add: _DOM ? function (elem, type, listener) {
		elem.addEventListener(type, listener, false);
	} : function (elem, type, listener) {
		elem.attachEvent('on' + type, listener);
	},
	
	// 原生事件卸载接口
	remove: _DOM ? function (elem, type, listener) {
		elem.removeEventListener(type, listener, false);
	} : function (elem, type, listener) {
		elem.detachEvent('on' + type, listener);
	},
	
	// 修正
	fix: function (event) {
		if (_DOM) return event;
		
		var name,
			newEvent = {},
			doc = document.documentElement,
			body = document.body;
		
		newEvent.target = event.srcElement || document;
		newEvent.target.nodeType === 3 && (newEvent.target = newEvent.target.parentNode);
		newEvent.preventDefault = function () {event.returnValue = false};
		newEvent.stopPropagation = function () {event.cancelBubble = true};
		newEvent.pageX = newEvent.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
		newEvent.pageY = newEvent.clientY + (doc && doc.scrollTop  || body && body.scrollTop  || 0) - (doc && doc.clientTop  || body && body.clientTop  || 0);
		newEvent.relatedTarget = event.fromElement === newEvent.target ? event.toElement : event.fromElement;
		
		// !!直接写event IE导致内存泄漏，Firefox会报错
		// 伪装event
		for (name in event) newEvent[name] = event[name];
		return newEvent;
	}

};

return new API();
})();


// DOM就绪事件
myEvent.ready = (function () {
	var readyList = [], DOMContentLoaded,
		readyBound = false, isReady = false;

	function ready () {
		if (!isReady) {
			if (!document.body) return setTimeout(ready, 13);
			isReady = true;

			if (readyList) {
				var fn, i = 0;
				while ((fn = readyList[i++])) {
					fn.call(document, {});
				};
				readyList = null;
			};
		};
	};

	function bindReady () {
		if (readyBound) return;

		readyBound = true;

		if (document.readyState === 'complete') {
			return ready();
		};

		if (document.addEventListener) {
			document.addEventListener('DOMContentLoaded', DOMContentLoaded, false);
			window.addEventListener('load', ready, false);
		} else if (document.attachEvent) {
			document.attachEvent('onreadystatechange', DOMContentLoaded);
			window.attachEvent('onload', ready);
			var toplevel = false;
			try {
				toplevel = window.frameElement == null;
			} catch (e) {};

			if (document.documentElement.doScroll && toplevel) {
				doScrollCheck();
			};
		};
	};

	myEvent.special.ready = {
		setup: bindReady,
		teardown: function () {}
	};

	if (document.addEventListener) {
		DOMContentLoaded = function () {
			document.removeEventListener('DOMContentLoaded', DOMContentLoaded, false);
			ready();
		};
	} else if (document.attachEvent) {
		DOMContentLoaded = function () {
			if (document.readyState === 'complete') {
				document.detachEvent('onreadystatechange', DOMContentLoaded);
				ready();
			};
		};
	};

	function doScrollCheck () {
		if (isReady) return;

		try {
			document.documentElement.doScroll('left');
		} catch (e) {
			setTimeout(doScrollCheck, 1);
			return;
		};
		ready();
	};

	return function (callback) {
		bindReady();

		if (isReady) {
			callback.call(document, {});
		} else if (readyList) {
			readyList.push(callback);
		};

		return this;
	};
})();

// Hashchange Event v1.3
(function (window, undefined) {
    var config = {
			delay: 50,
			src: null,
			domain: null
		},
		str_hashchange = 'hashchange',
        doc = document,
		isIE = !-[1,],
        fake_onhashchange, special = myEvent.special,
        doc_mode = doc.documentMode,
        supports_onhashchange = 'on' + str_hashchange in window && (doc_mode === undefined || doc_mode > 7);

    function get_fragment(url) {
        url = url || location.href;
        return '#' + url.replace(/^[^#]*#?(.*)$/, '$1');
    };
	
    special[str_hashchange] = {
        setup: function () {
            if (supports_onhashchange) return false;
			
            myEvent.ready(fake_onhashchange.start);
        },
        teardown: function () {
            if (supports_onhashchange) return false;
            myEvent.ready(fake_onhashchange.stop);
        }
    };
	
	/** @inner */
    fake_onhashchange = (function () {
        var self = {},
            timeout_id, last_hash = get_fragment(),
			/** @inner */
            fn_retval = function (val) {
                return val;
            },
            history_set = fn_retval,
            history_get = fn_retval;
			
        self.start = function () {
            timeout_id || poll();
        };
		
        self.stop = function () {
            timeout_id && clearTimeout(timeout_id);
            timeout_id = undefined;
        };

        function poll() {
            var hash = get_fragment(),
                history_hash = history_get(last_hash);
            if (hash !== last_hash) {
                history_set(last_hash = hash, history_hash);
                myEvent.triggerHandler(window, str_hashchange);
            } else if (history_hash !== last_hash) {
                location.href = location.href.replace(/#.*/, '') + history_hash;
            };
            timeout_id = setTimeout(poll, config.delay);
        };
		
        isIE && !supports_onhashchange && (function () {
            var iframe,iframe_src, iframe_window;
			
            self.start = function () {
                if (!iframe) {
                    iframe_src = config.src;
                    iframe_src = iframe_src && iframe_src + get_fragment();
					
					iframe = doc.createElement('<iframe tabindex="-1" style="display:none" title="empty" src="' + (iframe_src || 'javascript:0') + '"></iframe>');
					myEvent.bind(iframe, 'load', function () {
						myEvent.unbind(iframe, 'load');
						iframe_src || history_set(get_fragment());
                        poll();
                    });
					doc.getElementsByTagName('html')[0].appendChild(iframe);
					iframe_window = iframe.contentWindow;
                    doc.onpropertychange = function () {
                        try {
                            if (event.propertyName === 'title') {
                                iframe_window.document.title = doc.title;
                            };
                        } catch (e) {};
                    };
                };
            };
			
            self.stop = fn_retval;
			
			/** @inner */
            history_get = function () {
                return get_fragment(iframe_window.location.href);
            };
			
			/** @inner */
            history_set = function (hash, history_hash) {
                var iframe_doc = iframe_window.document,
                    domain = config.domain;
                if (hash !== history_hash) {
					iframe_doc.title = doc.title;
                    iframe_doc.open();
                    domain && iframe_doc.write('<script>document.domain="' + domain + '"</script>');
					iframe_doc.close();
                    iframe_window.location.hash = hash;
                };
            };
        })();
		
        return self;
    })();
})(this);