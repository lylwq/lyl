
$(window).ready(function(){
	//全局变量          
	var backgroundForestImg = new Image();//森林背景图          
	var mushroomImg = new Image();//蘑菇图          
	var ctx;//2d画布          
	var screenWidth;//画布宽度          
	var screenHeight;//画布高度
	
	//公用 定义一个游戏物体戏对象       
	function GameObject()       
	{       
	    this.x = 0;//x 坐标      
	    this.y = 0;//y 坐标      
	    this.image = null; //图片
	}
	//定义公用蘑菇Mushroom 继承游戏对象GameObject       
	function Mushroom() {}
	Mushroom.prototype = new GameObject();//游戏对象GameObject
	var mushroom = new Mushroom();
	//蘑菇实例
	
	//循环描绘物体       
	function gameLoop(mushroom)
	{       
	    //清除屏幕       
	    ctx.clearRect(0, 0, screenWidth, screenHeight);       
	    ctx.save();       
	    //绘制背景       
	    ctx.drawImage(backgroundForestImg, 0, 0);       
	    //绘制蘑菇       
	    ctx.drawImage(mushroom.image, mushroom.x, mushroom.y);
	    ctx.restore();
	}
	//加载图片
	function loadImages()
	{
	    mushroomImg.src = "mushroom.png";//蘑菇
	    backgroundForestImg.src = "forest1.jpg";//森林背景图
	}
	function addEventHandlers(){
		$("#container").mousemove(function(e){
			mushroom.x = e.pageX - (mushroom.image.width / 2);
		});
	}  
		
	addEventHandlers();		
    loadImages();
    ctx = document.getElementById("canvas").getContext("2d"); //获取2d画布
    screenWidth = parseInt($("#canvas").attr("width")); //画布宽度
    screenHeight = parseInt($("#canvas").attr("height"));
    mushroom.image = mushroomImg;
    mushroom.x = parseInt(screenWidth/2);
    mushroom.y = screenHeight - 40;//蘑菇Y坐标
    setInterval(function(){gameLoop(mushroom)}, 10);
});