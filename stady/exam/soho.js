/**
 * ==================================================================
 * 要求：
 * 1, 只能在指定的位置填写自己的代码，本文件里的其他代码不能修改
 * 2, 所有题目都不允许添加全局变量名
 * 3, 本文件应该能在firebug的console里正常执行，并输出结果
 * 4, 代码的执行效率会作为评判的重要标准
 * 5, 共3题
 * ==================================================================
 */

/**
 * ==================================================================
 * 题1: 实现一个遍历数组或对象里所有成员的迭代器
 * ==================================================================
 */
 
var each = function(obj, fn){
	//+++++++++++答题区域+++++++++++
	



	//+++++++++++答题结束+++++++++++
};

try{
	
	var data1 = [4,5,6,7,8,9,10,11,12];
	var data2 = {
		"a": 4,
		"b": 5,
		"c": 6
	};
	
	console.group(data1);
	
	each(data1, function(o){
		if( 6 == this )
			return true;
		else if( 8 == this )
			return false;
		console.log(o + ": \"" + this + "\"");
	});
	
	console.groupEnd();

	/*------[执行结果]------

	1: "4"
	2: "5"
	4: "7"

	------------------*/
	
	console.group(data2);
	
	each(data2, function(v, n){
		if( 5 == this )
			return true;
		console.log(n + ": \"" + v + "\"");
	});
	
	console.groupEnd();

	/*------[执行结果]------

	a: "4"
	c: "6"

	------------------*/
	
}catch(e){
	console.error("执行出错，错误信息: " + e);
}

/**
 * ==================================================================
 * 题2: 实现一个叫Man的类，包含attr, words, say三个方法
 * ==================================================================
 */
var Man;
//+++++++++++答题区域+++++++++++





//+++++++++++答题结束+++++++++++

try{
	
	var me = Man({ fullname: "小红" });
	var she = new Man({ fullname: "小红" });
	
	console.group();
	console.info("我的名字是：" + me.attr("fullname") + "\n我的性别是：" + me.attr("gender"));
	console.groupEnd();
	/*------[执行结果]------

	我的名字是：小红
	我的性别是：<用户未输入>

	------------------*/

	me.attr("fullname", "小明");
	me.attr("gender", "男");
	me.fullname = "废柴";
	me.gender = "人妖"; 
	she.attr("gender", "女");
	
	console.group();
	console.info("我的名字是：" + me.attr("fullname") + "\n我的性别是：" + me.attr("gender"));
	console.groupEnd();
	/*------[执行结果]------

	我的名字是：小明
	我的性别是：男

	------------------*/
	
	console.group();
	console.info("我的名字是：" + she.attr("fullname") + "\n我的性别是：" + she.attr("gender"));
	console.groupEnd();
	/*------[执行结果]------

	我的名字是：小红
	我的性别是：女

	------------------*/

	me.attr({
		"words-limit": 3,
		"words-emote": "微笑"
	});
	me.words("我喜欢看视频。");
	me.words("我们的办公室太漂亮了。");
	me.words("视频里美女真多！");
	me.words("我平时都看优酷！");
	
	console.group();
	console.log(me.say());
	/*------[执行结果]------

	小明微笑："我喜欢看视频。我们的办公室太漂亮了。视频里美女真多！"

	------------------*/

	me.attr({
		"words-limit": 2,
		"words-emote": "喊"
	});

	console.log(me.say());
	console.groupEnd();
	/*------[执行结果]------

	小明喊："我喜欢看视频。我们的办公室太漂亮了。"

	------------------*/
	
}catch(e){
	console.error("执行出错，错误信息: " + e);
}



/**
 * ==================================================================
 * 题3: 实现一个URI解析方法，把url里#之后的参数解析成指定的数据结构
 * ==================================================================
 */
function urlParser(s){
	//+++++++++++答题区域+++++++++++



		
	//+++++++++++答题结束+++++++++++
}

try{
	var url1 = "http://www.abc.com/m/s/#page/2/?type=latest_videos&page_size=20";
	var url2 = "http://www.abc.com/m/s/#type=latest_videos&page_size=20";
	var url3 = "http://www.abc.com/m/s/#page?type=latest_videos&page_size=20";

	console.group();
	console.info( urlParser(url1) );
	console.info( urlParser(url2) );
	console.info( urlParser(url3) );
	console.groupEnd();
	/*------[执行结果]------

	["page", "2", { "type": "latest_videos", "page_size": 20 }]
	[{ "type": "latest_videos", "page_size": 20 }]
	["page", { "type": "latest_videos", "page_size": 20 }]
	
	------------------*/
	
}catch(e){
	console.error("执行出错，错误信息: " + e);
}aa