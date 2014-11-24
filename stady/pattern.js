/**
 * 
 * 4.2类式继承
 */
function extend( subClass , superClass ){
	var F = function(){};
	F.prototype  = superClass.prototype;
	subClass.prototype = new F();
	subClass.prototype.constructor = subClass;

	//有了superCLass属性就可以直接调用超类中的方法,这样可以重定义超类的方法时调用超类的方法.
	subClass.superClass = superClass.prototype;
	if( superClass.prototype.constructor == Object.prototype.constructor ){
		superClass.prototype.constructor = superClass;
	}
}

function Person(name){
	this.name = name;
}
Person.prototype.getName = function(){
	return this.name;
}

function Author( name , books ){
	//用superClass属性代替具体的父类名,是子父类更加解耦
	Author.superClass.constructor.call(this,name);
	this.books = books;
}
extend(Author , Person);

Author.prototype.getBooks = function(){
	return this.books;
}

Author.prototype.getName = function(){
	//重定义父类方法,且可使用父类方法
	var name = Author.superClass.getName.call(this);
	return name + 'Author of ' + this.getBooks().join(',');
}

/*
	4.3 原型继承
*/
var CompoundObject = {};
CompoundObject.string1 = 'default value';
CompoundObject.createChildObject = function(){
	return {
		bool : true,
		num : 10
	}
};
CompoundObject.childObject = CompoundObject.createChildObject();
var coc = clone(CompoundObject);
coc.childObject = CompoundObject.createChildObject();
coc.childObject.num = 5;

function clone(object){
	function F(){};
	F.prototype = object;
	return new F;
}


/*
5.4 单体模式 使用闭包
*/
var GiantCorp = {};

//使用闭包创建单体
GiantCorp.DataParser = (function(){
	var whitespaceRegex = /\s+/;

	function stripWhitespace(str){
		return str.replace(whitespaceRegex , '');
	}
	function stringSplit(str , delimiter){
		return str.split(delimiter);
	}

	return {
		stringToArray : function(str , delimiter , stripWS){
			if( stripWS){
				str = stripWhitespace(str);
			}
			var outputArray = stringSplit(str , delimiter);
			return outputArray;
		}
	}

})();

/*
	5.5 惰性实例化
*/
var MyNamespace = {};
MyNamespace.Singleton = (function(){

	var uniqueInstance;

	function constructor(){
		//...
	}

	return {
		getInstance : function(){
			if(!uniqueInstance){
				uniqueInstance = constructor();
			}
			return uniqueInstance;
		}

	}

})();

/*
	5.7 分支
*/
var SimpleXhrFactory = (function(){

	var standard = {
		createXhrObject : function(){
			return new XMLHttpRequest();
		}
	};

	var activeXNew = {
		createXhrObject : function(){
			return new ActiveXObject('Msxml2.XMLHTTP');
		}
	};

	var activeXOld = {
		createXhrObject : function(){
			return new ActiveXObject('Microsoft.XMLHTTP');
		}
	};

	var testObject;

	try{
		testObject = standard.createXhrObject();
		return standard;
	}catch(e){
		try{
			testObject = activeXNew.createXhrObject();
			return activeXNew;
		}catch(e){
			try{
				testObject = activeXOld.createXhrObject();
				return activeXOld;
			}catch(e){
				throw new Error('No XHR Object');
			}
		}
	}

})();

/*
	7工厂模式
*/
//XHR工厂 : 普通xhr对象
var SimpleHandler = function(){};
SimpleHandler.prototype = {
	request : function(method , url , callback , postVars){
		var xhr = this.createXhrObject();
		xhr.onreadystatechange = function(){
			if(xhr.readyState !== 4){return}
			(xhr.status === 200) ? 
				callback.success(xhr.responseText , xhr.responseXML):
				callback.failure(xhr.status);
		}
		xhr.open(method , url , true);
		if( method !== 'POST' ){postVars = null}
		xhr.send( postVars );
	},
	createXhrObject : function(){
		var methods = [
			function(){return new XMLHttpRequest();},
			function(){return new ActiveXObject('Msxml2.XMLHTTP');},
			function(){return new ActiveXObject('Microsoft.XMLHTTP');},
		];

		for( var i = 0 , len = methods.length ; i < len ; i++ ){
			try{
				methods[i]();
			}catch(e){
				continue;
			}
			//memoize
			this.createXhrObject = methods[i];
			return methods[i];
		}
		throw new Error('Error');
	}
}

//专用链接对象
var QueuedHandler = function(){
	this.queue = [];
	this.requestInProgress = false;
	this.retryDelay = 5;
}
extend( QueuedHandler , SimpleHandler );
QueuedHandler.prototype.request = function(method , url , callback , postVars , override){
	if(this.requestInProgress && !override){
		this.queue.push({			
			method : method , 
			url : url , 
			callback : callback , 
			postVars : postVars
		});
	}else{
		this.requestInProgress = true;
		var xhr = this.createXhrObject();
		var that = this;
		xhr.onreadystatechange = function(){
			if(xhr.readyState !== 4){return}
			if(xhr.status === 200){
				callback.success(xhr.responseText , xhr.responseXML);
				that.advanceQueue();
			}else{
				callback.failure(xhr.status);
				setTimeout(function(){
					that.request(method , url , callback , postVars , true);
				},that.retryDelay * 1000 );
			}
				callback.success(xhr.responseText , xhr.responseXML):
				callback.failure(xhr.status);
		}
		xhr.open(method , url , true);
		if( method !== 'POST' ){postVars = null}
		xhr.send( postVars );
	}
}
QueuedHandler.prototype.advanceQueue = function(){
	if(this.queue.length === 0){
		this.requestInProgress = false;
		return;
	}
	var req = this.queue.shift();
	this.request(req.method , req.url , req.callback , req.postVars , true);
}

//离线链接对象
var OfflineHandler = function(){
	this.storedRequests = [];
}
extend(OfflineHandler , SimpleHandler);
OfflineHandler.prototype.request = function(method , url , callback , postVars){
	if(XHrManager.isOffline()){
		this.storedRequests.push({			
			method : method , 
			url : url , 
			callback : callback , 
			postVars : postVars
		});
	}else{
		this.flushStoredRequests();
		OfflineHandler.superclass.request(method , url , callback , postVars);
	}
}
OfflineHandler.prototype.flushStoredRequests = function(){
	for( var i = 0 , len = storedRequests.length ; i < len ; i++ ){
		var req = storedRequests[i];
		OfflineHandler.superclass.request(req.method , req.url , req.callback , req.postVars)
	}
}

//XHR管理对象
var XhrManager = {
	createXhrHander : function(){
		var xhr;
		if(this.isOffline()){
			xhr = new OfflineHandler();
		}else if( this.isHighLatency() ){
			xhr = new QueuedHandler();
		}else{
			xhr = new SimpleHandler();
		}
		Interface.ensureImplements(xhr , AjaxHandler);
		return xhr;
	},
	isOffline : function(){},
	isHighLatency : function(){}
}

//视图显示对象
var DisplayModule = new Interface('DisplayModule' , ['append' , 'remove' , 'clear']);
var listDisplay = function( id , parent){
	this.list = document.createElement('ul');
	this.list.id = id;
	parent.appendChild(this.list);
};
listDisplay.prototype = {
	append : function(text){
		var newEl = document.createElement('li');
		this.list.appendChild(newEl);
		newEl.innerHTML = text;
		return newEl;
	},
	remove : function(el){
		this.list.removeChild(el);
	},
	clear : function(){
		this.list.innerHTML = '';
	}
}


//配置对象
var conf = {
	id : 'cnn-top-stories',
	feedUrl : 'http://rss.cnn.com/rss/cnn_topstories.rss',
	updateInterval : 60,
	parent : $('feed-readers')
}


//订阅类
var FeedReader = function(display , xhrHandler , conf){
	this.display = display;
	this.xhrHandler = xhrHandler;
	this.conf = conf;

	this.startUpdates();
}
FeedReader.prototype = {
	fetchFeed : function(){
		var that = this;
		var callback = {
			success : function(text , xml){ that.parseFeed(text , xml) },
			failure : function(status){ that.showError(status) }
		};
		this.xhrHandler.request('GET' , 'feedProxy.php?feed=' + this.conf.feedUrl , callback);
	},
	parseFeed : function(responseText , respnseXML){
		this.display.clear();
		var items = responseXML.getElementsByTagName('item');
		for(var i = 0 , len = items.length ; i < len ; i++){
			var title = items[i].getElementsByTagName('title')[0];
			var link = items[i].getElementsByTagName('link')[0];
			this.display.append('<a href="' + link.firstChild.data + '">' + title.firstChild.data + '</a>');
		}
	},
	showError : function(statusCode){
		this.display.clear();
		this.display.append('Error fetching feed.');
	},
	stopUpdates : function(){ clearInterval(this.interval) },
	startUpdates : function(){
		this.fetchFeed();
		var that = this;
		this.interval = setInterval(function(){ that.fetchFeed(); } , this.conf.updateInterval * 1000 );
	}
}

//订阅管理类
var FeedManager = {
	createFeedReader : function( conf ){
		var displayModule = new LisDisplay(conf.id + '-display' , conf.parent);
		InterFace.ensureImplements( displayModule , DisplayModule );

		var xhrHandler = XhrManager.createXhrHandler();
		InterFace.ensureImplements(xhrHandler , AjaxHandler);

		return new FeedReader(displayModule , xhrHandler , conf);
	}
}