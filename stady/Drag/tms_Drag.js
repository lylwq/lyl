jQuery.fn.extend({
	L_drag:function(options){
		
		var systypes = options.data || {},//获取数据源集合
		    containId = options.containId || "container";
			
		var dom = $(document),
		    _drag = $('<div class="tms-drag" id="tms-drag"></div>').appendTo($('body')),//拖拽元素容器
			onStop = options.onStop || function(){};
		
		this.live("mousedown",function(event){
			var offset = $(this).offset(),
				cX = event.clientX - offset.left,//鼠标相对与所点击元素左上角的坐标
				cY = event.clientY - offset.top;
			_drag.html(this.cloneNode(true)).css({"left":event.clientX-cX,"top":event.clientY-cY}).show();
			
			dom.bind("mousemove.l_dragMove",function move(event){
						   
				window.getSelection ? window.getSelection().removeAllRanges() : dom[0].selection.empty();//取消拖拽时产生的选中文本
				_drag.css({"left":event.clientX-cX,"top":event.clientY-cY});
				
			}).bind("mouseup.l_dragUp",function(event){				
				var _curDrag = _drag.children(),
				    _con = $("#"+containId),
				    _con_x = _con.offset().left,
				    _con_y = _con.offset().top,
				    _con_h = _con.height(),
				    _con_w = _con.width(),
				    _rectype = 	_curDrag.attr("rectype");		    
				    //onStop = (_curDrag.attr("rectype")==="layout" || _curDrag.attr("rectype")==="part")?onStop_layout:onStop_asm;
				    
				if(event.clientX>_con_x && event.clientX<_con_x+_con_w && 
				    event.clientY>_con_y&&event.clientY<_con_y+_con_h){
				    onStop(_drag.children().attr("recid"),_rectype);
				}
				
				if(_drag[0].releaseCapture){_drag[0].releaseCapture();}
				_drag.css({"left":"-100px","top":"-100px"}).hide();
				dom.unbind("mousemove.l_dragMove").unbind("mouseup.l_dragUp");//取消绑定mousemove事件的move句柄
			});
			
			if(this.setCapture){_drag[0].setCapture()}	
			else{event.preventDefault();}			
			
		});
	},
	
	L_move:function(options){
	    var dom = $(document),
	        _drag = options.drag || this;
	    this.bind("mousedown",function(event){
	        var offset = $(this).offset(),
				cX = event.clientX - offset.left,
				cY = event.clientY - offset.top;
	        
	        dom.bind("mousemove.l_moveMove",function(event){
	            window.getSelection ? window.getSelection().removeAllRanges() : dom[0].selection.empty();//取消拖拽时产生的选中文本
	            _drag.css({"left":event.clientX-cX,"top":event.clientY-cY});
	        }).bind("mouseup.l_moveUp",function(){
	            if(_drag[0].releaseCapture){_drag[0].releaseCapture();}
	            dom.unbind("mousemove.l_moveMove").unbind("mouseup.l_moveUp");
	        });
	        
	        if(this.setCapture){_drag[0].setCapture()}	
			else{event.preventDefault();}			
	    });
	    
	}
});
