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
发布-订阅模式的优点非常明显，一为时间上的解耦，二为对象之间的解耦

另外发布-订阅模式虽然可以弱化对象之间的联系，但如果过度使用的话，会导致程序难以跟踪维护和理解。要跟踪一个bug不是件轻松的事情。
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

/*
9.命令模式
用一种松耦合的方式来设计程序，使得请求发送者和请求接收者能够消除彼此之间的耦合关系。
把对象的行为进行封装,通过命令对象进行统一调用,形式上类似于策略模式,只是意图上的不同,命令模式还可方便的记录对象的行为,可以做回放或撤销的功能.
*/
var Ryu = {
	attack: function() {
		console.log('攻击');
	},
	defense: function() {
		console.log('防御');
	},
	jump: function() {
		console.log('跳跃');
	},
	crouch: function() {
		console.log('蹲下');
	}
};　　
var makeCommand = function(receiver, state) { // 创建命令
	return function() {
		receiver[state]();
	}
};　　
var commands = {
	"119": "jump", // W
	"115": "crouch", // S
	"97": "defense", // A
	"100": "attack" // D
};

var commandStack = []; //保存命令的堆栈

document.onkeypress = function(ev) {
	var keyCode = ev.keyCode,
		command = makeCommand(Ryu, commands[keyCode]);

	if (command) {
		command(); // 执行命令
		commandStack.push(command); // 将刚刚执行过的命令保存进堆栈
	}
};　　
document.getElementById('replay').onclick = function() { // 点击播放录像
	var command;
	while (command = commandStack.shift()) { // 从堆栈里依次取出命令并执行
		command();
	}
};

/*
10.组合模式
组合模式可以方便地构造一棵树来表示对象的部分-整体结构。特别我们在开发期间不确定这棵树到底存在多少层次的时候。
组合模式使得客户可以忽略组合对象和叶对象的区别,各自做自己正确的事情，这是组合模式最重要的能力。
*/
var Folder = function( name ){
    this.name = name;
    this.parent = null;    //增加this.parent属性
    this.files = [];
};

Folder.prototype.add = function( file ){
    file.parent = this;    //设置父对象
    this.files.push( file );
};

Folder.prototype.scan = function(){
    console.log( '开始扫描文件夹: ' + this.name );
    for ( var i = 0, file, files = this.files; file = files[ i++ ]; ){
        file.scan();
    }
};

Folder.prototype.remove = function(){
    if ( !this.parent ){    //根节点或者树外的游离节点
        return;
    }
    for ( var files = this.parent.files, l = files.length - 1; l >=0; l-- ){
        var file = files[ l ];
        if ( file === this ){
            files.splice( l, 1 );
        }
    }
};
var File = function( name ){
    this.name = name;
    this.parent = null;
};

File.prototype.add = function(){
    throw new Error( '不能添加在文件下面' );
};

File.prototype.scan = function(){
    console.log( '开始扫描文件: ' + this.name );
};

File.prototype.remove = function(){
    if ( !this.parent ){    //根节点或者树外的游离节点
        return;
    }
    for ( var files = this.parent.files, l = files.length - 1; l >=0; l-- ){
        var file = files[ l ];
        if ( file === this ){
            files.splice( l, 1 );
        }
    }
};

var folder = new Folder( '学习资料' );
var folder1 = new Folder( 'JavaScript' );
var file1 = new Folder ( '深入浅出Node.js' );

folder1.add( new File( 'JavaScript设计模式与开发实践' ) );
folder.add( folder1 );
folder.add( file1 );

folder1.remove();    //移除文件夹
folder.scan();

/*
11.模版方法模式
主要的思想是"好莱坞原则",即"别调用我，我们会调用你".
模版会设计好算法调用的规则,而实现模版的具体算法交给实例化的"子类"去重写.
类似于定义好接口和完成对接口的调用,具体实现交给"子类/实例类".
把具体的流程顺序抽象出来,把变化的方法实现交给实例类.
*/
var Beverage = function(){};

Beverage.prototype.boilWater = function(){
    console.log( '把水煮沸' );
};

Beverage.prototype.brew = function(){
    throw new Error( '子类必须重写brew方法' );
};

Beverage.prototype.pourInCup = function(){
    throw new Error( '子类必须重写pourInCup方法' );
};

Beverage.prototype.addCondiments = function(){
    throw new Error( '子类必须重写addCondiments方法' );
};

Beverage.prototype.customerWantsCondiments = function(){
    return true;    //默认需要调料
};

Beverage.prototype.init = function(){
    this.boilWater();
    this.brew();
    this.pourInCup();
    if ( this.customerWantsCondiments() ){    //如果挂钩返回true，则需要调料
        this.addCondiments();
    }
};


var CoffeeWithHook = function(){};

CoffeeWithHook.prototype = new Beverage();

CoffeeWithHook.prototype.brew = function(){
    console.log( '用沸水冲泡咖啡' );
};

CoffeeWithHook.prototype.pourInCup = function(){
    console.log( '把咖啡倒进杯子' );
};

CoffeeWithHook.prototype.addCondiments = function(){
    console.log( '加糖和牛奶' );
};

CoffeeWithHook.prototype.customerWantsCondiments = function(){
    return window.confirm( '请问需要调料吗？' );
};

var coffeeWithHook = new CoffeeWithHook();
coffeeWithHook.init();


/*
12.享元模式
实现享元模式的关键是把内部状态和外部状态分离开来,并把外部状态保存在其它地方，在合适的时刻再把外部状态组装进共享对象。
*/
var Upload = function( uploadType){
    this.uploadType = uploadType;
};
Upload.prototype.delFile = function( id ){
    uploadManager.setExternalState( id, this );  // (1)

    if ( this.fileSize < 3000 ){
        return this.dom.parentNode.removeChild( this.dom );
    }

    if ( window.confirm( '确定要删除该文件吗? ' + this.fileName ) ){
        return this.dom.parentNode.removeChild( this.dom );
    }
};
var UploadFactory = (function(){
    var createdFlyWeightObjs = {};

    return {
        create: function( uploadType){
            if ( createdFlyWeightObjs [ uploadType] ){
                return createdFlyWeightObjs [ uploadType];
            }

            return createdFlyWeightObjs [ uploadType] = new Upload( uploadType);
        }
    }
})();

var uploadManager = (function(){
    var uploadDatabase = {};

    return {
        add: function( id, uploadType, fileName, fileSize ){
            var flyWeightObj = UploadFactory.create( uploadType );

            var dom = document.createElement( 'div' );
            dom.innerHTML = 
                    '<span>文件名称:'+ fileName +', 文件大小: '+ fileSize +'</span>' +
                    '<button class="delFile">删除</button>';

            dom.querySelector( '.delFile' ).onclick = function(){
                flyWeightObj.delFile( id );
            }

            document.body.appendChild( dom );

            uploadDatabase[ id ] = {
                fileName: fileName,
                fileSize: fileSize,
                dom: dom        
            };

            return flyWeightObj ;
        },
        setExternalState: function( id, flyWeightObj ){
            var uploadData = uploadDatabase[ id ];
            for ( var i in uploadData ){
                flyWeightObj[ i ] = uploadData[ i ];
            }
        }
    }
})();

var id = 0;

window.startUpload = function( uploadType, files ){
   for ( var i = 0, file; file = files[ i++ ]; ){
      var uploadObj = uploadManager.add( ++id, uploadType, file.fileName, file.fileSize );
   }
};
startUpload( 'plugin', [
    {
        fileName: '1.txt',
        fileSize: 1000
    },
    {
        fileName: '2.html',
        fileSize: 3000
    },
    {
        fileName: '3.txt',
        fileSize: 5000
    }
]);

startUpload( 'flash', [
    {
        fileName: '4.txt',
        fileSize: 1000
    },
    {
        fileName: '5.html',
        fileSize: 3000
    },
    {
        fileName: '6.txt',
        fileSize: 5000
    }
]);

/*
12.7 通用对象池
*/
var objectPoolFactory = function( createObjFn ){
    var objectPool = [];

    return {
        create: function(){
            var obj = objectPool.length === 0 ? 
                createObjFn.apply( this, arguments ) : objectPool.shift();

            return obj;
        },
        recover: function( obj ){
            objectPool.push( obj );
        }
    }
};

/*
13.职责链模式
职责链模式可以很好的帮助我们管理代码，降低发起请求的对象和处理请求的对象之间的耦合性。职责链中的节点数量和顺序是可以自由变化的，我们可以在运行时刻决定链中包含哪些节点。
例如:作用域链、原型链、或是dom节点中的事件冒泡
*/

var order500yuan = function( orderType, pay, stock ){
    if ( orderType === 1 && pay === true ){
        console.log( '500元定金预购, 得到100优惠券' );
    }else{
        return 'nextSuccessor';    //我不知道下一个节点是谁，反正把请求往后面传递
    }
};

var order200yuan = function( orderType, pay, stock ){
    if ( orderType === 2 && pay === true ){
        console.log( '200元定金预购, 得到50优惠券' );
    }else{
        return 'nextSuccessor';    //我不知道下一个节点是谁，反正把请求往后面传递
    }
};

var orderNormal = function( orderType, pay, stock ){
    if ( stock > 0 ){
        console.log( '普通购买, 无优惠券' );
    }else{
        console.log( '手机库存不足' );
    }
};

var Chain = function( fn ){
    this.fn = fn;
    this.successor = null;
};

Chain.prototype.setNextSuccessor = function( successor ){
    return this.successor = successor;
};

Chain.prototype.passRequest = function(){
    var ret = this.fn.apply( this, arguments );

    if ( ret === 'nextSuccessor' ){
        return this.successor && this.successor.passRequest.apply( this.successor, arguments );
    }

    return ret;
};
//如果某个任务需要异步返回结果才能决定后面的调用,就不需返回'nextSuccessor',而是直接调用next;
Chain.prototype.next= function(){
    return this.successor && this.successor.passRequest.apply( this.successor, arguments );
};

order500yuan = new Chain( order500yuan );
order200yuan = new Chain( order200yuan );
orderNormal = new Chain( orderNormal );

order500yuan.setNextSuccessor( order200yuan );
order200yuan.setNextSuccessor( orderNormal );

order500yuan.passRequest( 1, true, 500 );        // 输出： 500元定金预购, 得到100优惠券
order500yuan.passRequest( 2, true, 500 );     // 输出：200元定金预购, 得到50优惠券
order500yuan.passRequest( 3, true, 500 );     // 输出：普通购买, 无优惠券
order500yuan.passRequest( 1, false, 0 );      // 输出： 手机库存不足

/*
14.中介者模式
中介者模式是将多个对象间的相互影响封装到中介者中,对象只需要加入到中介者,当对象的状态发生改变影响到其他对象时,只需要给中介者发送消息,由中介者处理后面的事情.
而中介者对象经常是巨大的。中介者对象自身往往就是一个难以维护的对象
*/

function Player( name, teamColor ){
    this.name = name;  //角色名字
    this.teamColor = teamColor;  //队伍颜色 
    this.state = 'alive';    //玩家生存状态
};

Player.prototype.win = function(){
    console.log( this.name + ' won ' );
};

Player.prototype.lose = function(){
    console.log( this.name +' lost' );
};

/*******************玩家死亡*****************/

Player.prototype.die = function(){
    this.state = 'dead';
    playerDirector.reciveMessage( 'playerDead', this );    //给中介者发送消息，玩家死亡
};

/*******************移除玩家*****************/

Player.prototype.remove = function(){
    playerDirector.reciveMessage( 'removePlayer', this );     //给中介者发送消息，移除一个玩家
};

/*******************玩家换队*****************/

Player.prototype.changeTeam = function( color ){
    playerDirector.reciveMessage( 'changeTeam', this, color );    //给中介者发送消息，玩家换队
};

var playerDirector= ( function(){
    var players = {},    //保存所有玩家
       operations = {}; //中介者可以执行的操作

    /****************新增一个玩家***************************/
    operations.addPlayer = function( player ){    
        var teamColor = player.teamColor;    //玩家的队伍颜色
        players[ teamColor ] = players[ teamColor ] || [];    //如果该颜色的玩家还没有成立队伍，则新成立一个队伍
        players[ teamColor ].push( player );    //添加玩家进队伍。
    };

    /****************移除一个玩家***************************/
    operations.removePlayer = function( player ){
        var teamColor = player.teamColor,    //玩家的队伍颜色
            teamPlayers = players[ teamColor ] || [];    //该队伍所有成员
        for ( var i = teamPlayers.length - 1; i >= 0; i-- ){    //遍历删除
            if ( teamPlayers[ i ] === player ){
                teamPlayers.splice( i, 1 );
            }
        }
    };

    /****************玩家换队***************************/
    operations.changeTeam = function( player, newTeamColor ){    //玩家换队
        operations.removePlayer( player );    //从原队伍中删除
        player.teamColor = newTeamColor;    //改变队伍颜色
        operations.addPlayer( player );        //增加到新队伍中
    };

    operations.playerDead = function( player ){      //玩家死亡
        var teamColor = player.teamColor,
            teamPlayers = players[ teamColor ];    //玩家所在队伍

        var all_dead = true;

        for ( var i = 0, player; player = teamPlayers[ i++ ]; ){
            if ( player.state !== 'dead' ){
                all_dead = false;
                break;
            }
        }

        if ( all_dead === true ){    //全部死亡

            for ( var i = 0, player; player = teamPlayers[ i++ ]; ){
                player.lose();    //本队所有玩家lose
            }

            for ( var color in players ){
                if ( color !== teamColor ){
                    var teamPlayers = players[ color ];    //其他队伍的玩家
                    for ( var i = 0, player; player = teamPlayers[ i++ ]; ){
                        player.win();    //其他队伍所有玩家win
                    }
                }
            }
        }
    };

    var reciveMessage = function(){
        var message = Array.prototype.shift.call( arguments );    //arguments的第一个参数为消息名称.
        operations[ message ].apply( this, arguments );
    };

    return {
        reciveMessage: reciveMessage
    }

})();

var playerFactory = function( name, teamColor ){
    var newPlayer = new Player( name, teamColor );     //创造一个新的玩家对象
    playerDirector.reciveMessage( 'addPlayer', newPlayer );    //给中介者发送消息，新增玩家

    return newPlayer;
};

/*
15.装饰者模式
可以给函数动态的添加另外相对的职能,增加各职能的重用性,减少各职能间的耦合.
除了给函数动态添加职能,更可以给对象动态添加只能.
before/after方法实际上是返回一个新的方法,所以原方法上的一些属性会被丢失.而且这种装饰方式其实也叠加了函数的作用域，如果装饰的链条过长，性能上也会受到一些影响。
*/
//Function.prototype.after
Function.prototype.before = function( beforefn ){
    var __self = this;  
    return function(){
    	//可以根据前方函数的返回值来决定后面的函数是否执行
    	/*if ( beforefn.apply( this, arguments ) === false ){    
            //beforefn返回false的情况直接return，不再执行后面的原函数。
            return;
        }*/
        beforefn.apply( this, arguments );        //  (1)

        return __self.apply( this, arguments );    //  (2)
    }
}


var ajax= function( type, url, param ){
    console.log(param);     // 发送ajax请求的代码略..
};


var getToken = function(){
    return 'Token';
}

ajax = ajax.before(function( type, url, param ){
    param.Token = getToken();
});

ajax( 'get', 'http://xxx.com/userinfo', { name: 'sven' } );


/*********************************/
//给appendDom函数装饰上计算执行时间的功能
var appendDom = function(){
    for ( var i = 0; i < 1000; i++ ){
        document.body.appendChild( document.createElement( 'div' ) );
    }
};
var funcExecTime = function( fn ){

    return (function(){
        var startTime;

        return fn.before(function(){
            startTime = +new Date;
        }).after(function(){
            var endTime = +new Date
            console.log( '消耗的时间: ' + endTime - startTime );            
        });

    })();
};


appendDom = funcExecTime ( appendDom ); 
appendDom();
