



 function ygClock(iStartX,iStartY,clockbg_src,clock_mask_src,hourhand_src, minhand_src,sechand_src,offsetWidth,offsetHeight)
 {
	var _ygClock = this;
	iStartX = iStartX || 10;
	iStartY = iStartY || 10;
	
	for(var i=0;i<arguments.length;i++)
	{
		var arg = arguments[i];
		if(typeof(arg)!="string" && typeof(arg)!="number"){;return;};
		if(arg.length<=0){return;};
	};

	
	var cb = document.createElement("div");
	this.oNode = cb;
	document.body.appendChild(cb);	
	
	



	
	function PoorClock()
	{
		/*For IE5.5+*/

		if(PoorClock.hasStyle !=true)
		{
			var cbs = cb.style;
			cbs.background="purple";
			cbs.color = "yellow";
			cbs.padding = "3px";
			cbs.border="solid 1px yellow";
			cbs.fontSize= "12px";
			cbs.height="auto";
			cbs.width="auto";
			cbs.fontFamily = "Verdana";	
			cbs.whiteSpace="nowrap";
			cbs.fontWeight="bold";
			if(document.all && document.uniqueID)
			{
				
				try
				{
					cbs.cursor = "hand";
					cbs.filter="progid:DXImageTransform.Microsoft.dropshadow(OffX=2, OffY=2, Color='gray', Positive='true')"; 
				}catch(e){};
			}
			else
			{
				cbs.cursor = "pointer";	
			};

			
			PoorClock.hasStyle = true;

		};

	
		var d = _ygClock.getTime();


		
		cb.innerHTML= _ygClock._formatDateString(_ygClock.getTime(),true); 
		setTimeout(PoorClock,500)
		
	};


	function IEClock()
	{
			CanvasClock = null;
			
			
			var cw = clockbg.width;
			var ch =  clockbg.height;
	
			var s1 = 'position:absolute;top:0;overflow:xhidden;left:0;filter:progid:DXImageTransform.Microsoft.Matrix(sizingmethod=\'auto expand\');z-index:';
			var s2 = 'style="position:absolute;top:0;left:0;;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=';
			
			
			cb.innerHTML= [ 
			/*1*/'<div style="'+s1+'1;width:'+cw+'px;height:'+ch+'px;"><div '+s2+clockbg.src+');width:'+cw+';height:'+ch+'px;"></div></div>',
			/*1*/'<div style="'+s1+'1;width:'+cw+'px;height:'+ch+'px;"><div '+s2+hourhand.src+');width:'+hourhand.width+';height:'+hourhand.height+'px;"></div></div>',
			/*2*/'<div style="'+s1+'1;width:'+cw+'px;height:'+ch+'px;"><div '+s2+minhand.src+');width:'+minhand.width+';height:'+minhand.height+'px;"></div></div>',
			/*3*/'<div style="'+s1+'1;width:'+cw+'px;height:'+ch+'px;"><div '+s2+sechand.src+');width:'+sechand.width+';height:'+sechand.height+'px;"></div></div>',
			/*4*/'<div style="'+s1+'1;width:'+cw+'px;height:'+ch+'px;cursor:hand;corsor:pointer;">1<div '+s2+clock_mask.src+');width:'+clock_mask.width+';height:'+clock_mask.height+'px;"></div></div>',
			].join("");
	
			
			
			var divs = cb.childNodes;
			
	
			cw = cw + offsetWidth;
			ch = ch + offsetHeight;

			

			for(var i=1;i<=3;i++)
			{
				var d = divs[i];
				var dd = d.getElementsByTagName("div")[0];
				
				
				d.staticLeft = ( cw )/2;
				d.staticTop = ch /2;
				dd.style.left = ( cw - dd.offsetWidth)/2 + dd.offsetWidth/3 + "px";
				dd.style.top = ch /2 + "px";				
			};
			
			/*Matrix functions*/
			function fnSpin(oObj,iCount)
			{
				var flMultiple = iCount/360; 
				fnSetRotation(oObj, iCount);
				
			};

			var deg2radians = Math.PI * 2 / 360;
			function fnSetRotation(oObj, deg)
			{    
				rad = deg * deg2radians;
				var costheta = Math.cos(rad);
				var sintheta = Math.sin(rad);	

				try{
				oObj.filters.item(0).M11 = costheta;
				oObj.filters.item(0).M12 = -sintheta;
				oObj.filters.item(0).M21 = sintheta;
				oObj.filters.item(0).M22 = costheta;
				}catch(e){PoorClock();return false;};
				
				
				oObj.style.left =  cw/2 - oObj.offsetWidth/2 + "px";
				oObj.style.top = ch/2 - oObj.offsetHeight/2 + "px";
				
				
			};

			
			/*Matrix functions===*/

			
			function drawClock()
			{				 
				var now = _ygClock.getTime();
				cb.title =  _ygClock._formatDateString(now); 

				var hoursAngle = (now.getHours()%12)/12*360 + 180 ;
				var minutesAngle = (now.getMinutes()/60 )*360 + 180 ;
				var secondsAngle = (now.getSeconds()/60)*360 + 180 ;
				
				
				 fnSpin(divs[1],hoursAngle);
				 fnSpin(divs[2],minutesAngle);
				 fnSpin(divs[3],secondsAngle);				
				 setTimeout(drawClock,500);				 
			};
			drawClock();
	};



	function CanvasClock(canvas)
	{
		IEClock = null;
	
		
		var cw = clockbg.width;
		var ch =  clockbg.height;
		
	
		canvas.width = cw ;
		canvas.height = ch;			
		
		canvas.style.background = "url(" +  clockbg_src + ") no-repeat";
		canvas.style.position = "absolute";
		
		
		function drawClock()
		{
			
			
			

			var cw = clockbg.width;
			var ch =  clockbg.height;

			var now =_ygClock.getTime();
			canvas.title =  _ygClock._formatDateString(now); 

			var offsetAngle = (180/360) * (Math.PI*2);
			var minutesAngle = (now.getMinutes()/60 )*(Math.PI*2) + offsetAngle ; 
			var secondsAngle = (now.getSeconds()/60)*(Math.PI*2)  + offsetAngle ; 
			var hoursAngle = ((now.getHours()%12)/12)*(Math.PI*2) + offsetAngle ; 
			
	
			
			var context = canvas.getContext("2d");
			cw = cw + offsetWidth;
			ch = ch + offsetHeight;
		


			context.clearRect(0, 0,cw*2, ch*2);
			context.save();
			context.translate(cw/2,ch/2);
			
		

			context.save();
			context.rotate (minutesAngle);
			context.drawImage (minhand, -minhand.width/2,0, minhand.width, minhand.height);
			context.restore();

			context.save();
			context.rotate(hoursAngle);
			context.drawImage(hourhand,-hourhand.width/2,0,hourhand.width,hourhand.height);
			context.restore();

			context.save();
			context.rotate (secondsAngle);
			context.drawImage (sechand, -sechand.width/2,0, sechand.width,sechand.height);
			context.restore();

			context.translate(-cw/2,-ch/2);			
			context.drawImage (clock_mask, 0,0 , clock_mask.width,clock_mask.height);
			context.restore();
			
			setTimeout(drawClock,500);
	
		};
		
		drawClock();

			
		
	};
	

	

	function CheckClockImage()
	{
		if(clock_mask.complete && clockbg.complete && minhand.complete &&	hourhand.complete && sechand.complete)
		{
			 CheckClockImage = function(){return true;};
			 CompatDetect();
			 return true;
		};

		setTimeout(CheckClockImage,100);
		return false;
	};

	function CompatDetect()
	{

		cb.innerHTML = '<canvas width=0 height=0></canvas>';

		cb.id = "-yg-clock-widget-wow-great-ha-ha-ha-yep" + (Math.random()*100000) + Date.parse(new Date);
		var cbs = cb.style;
		cbs.cssText = "-moz-border-radius:6px;"
		cbs.width = clockbg.width + "px";
		cbs.height = clockbg.width + "px";
		cbs.position = "absolute";			
		
		

		var canvas = cb.getElementsByTagName("canvas")[0];

		if(!canvas || !canvas.getContext)
		{
					
			if(document.all && document.namespaces && document.uniqueID)
			{
				/*IE5.5+ Version*/
				try{
				IEClock();
				}catch(e){PoorClock();};

			}
			else
			{
				/*Other Brosers*/
				PoorClock();
							

			};
		}
		else
		{
			/*Canvas Version*/
			try{
				CanvasClock(canvas);
				}catch(e){PoorClock();};
			
			canvas.style.cursor = "pointer";
		};
		
		
		_ygClock._setDragDrop();	

		function clock_showTimeZoneMenu(e)
		{
			_ygClock._aZindex.push(null);
			_ygClock._aZindex.push(null);
	

			_ygClock.setPosition(null,null,_ygClock._aZindex.length);
			_ygClock.showTimeZoneMenu(e);
			yui.Event.stopPropagation(e);
			yui.Event.preventDefault(e) ;
			return false;
		};

		yui.Event.addListener(cb,"dblclick",clock_showTimeZoneMenu);

		
		_ygClock._aZindex.push(null);		
		_ygClock.setPosition(iStartX,iStartY,_ygClock._aZindex.length);
		_ygClock.complete = true;
		

	};

	var clockbg = new Image();
	clockbg.src = clockbg_src;

	var hourhand = new Image();
	hourhand.src = hourhand_src ;

	var minhand = new Image();
	minhand.src = minhand_src ;

	var sechand = new Image();
	sechand.src = sechand_src;

	var clock_mask = new Image();
	clock_mask.src = clock_mask_src;
	CheckClockImage();
 };




ygClock.prototype._iBaseIndex = 9999;
ygClock.prototype._aZindex = [];
ygClock.prototype._aClock = [];
ygClock.prototype._bMove = false;
ygClock.prototype._iOffsetX = 0;
ygClock.prototype._iOffsetY = 0;
ygClock.prototype._sTimeZoneCity = "";
ygClock.prototype._iTimeZoneOffset = -((new Date).getTimezoneOffset())/60 ;
ygClock.prototype.complete = false;








ygClock.prototype._aTimeZoneSpace = [
"Taipei,Taiwan - TW,8",
"Sunntvale,California - USA - US,-8",


"Athens,Greece - GR,2",
"Atlanta,Georgia - USA - US,5",
"Auckland,New Zealand - NZ,12",
"Baghdad,Iraq - IQ,3",
"Bangkok,Thailand - TH,7",
"Barcelona,Spain - ES,1",
"Beijing,China - CN,8",
"Berlin,Germany - DE,1",
"Bombay - Mumbai,India - IN,6",
"Brasilia,Brazil - BR,-3",
"Brussels,Belgium - BE,1",
"Budapest,Hungary - HU,1",
"Buenos Aires,Argentina - AR,-3",
"Cairo,Italy - IT,2",
"Cape Town,South Africa - ZA,1",
"Chicago,Illinois - USA - US,-6",
"Christchurch,New Zealand - NZ,12",
"Copenhagen,Denmark - DK,1",
"Dallas,Texas - USA - US,-6",
"Delhi,India - IN,5,30,",
"Detroit,Michigan - USA - US,-5",
"Dover,Delaware - USA - US,-5",
"Dubai,United Arab Emirates - AE,3",
"Dublin,Ireland - IE,0",
"Florence,Italy - IT,2",
"Frankfurt,Germany - DE,1",
"Geneva,Switzerland - CH,1",
"GMT,GMT - ,0",
"Guatemala City,Guatemala - GT,-6",
"Havana,Cuba - CU,-5",
"Helsinki,Finland - FI,2",
"Hong Kong,Hong Kong - HK,8",
"Honolulu,Hawaii - US,-10",
"Jakarta,Indonesia - ID,7",
"Jerusalem,Israel - IL,2",
"Johannesburg,South Africa - ZA,2",
"Kabul,Afghanistan - AF,5",
"Kahira,Egypt - EG,2",
"Kamchatka,Russia - RU,11",
"Kobe,Japan - JP,9",
"Kuala Lumpur,Malaysia - MY,8",
"Kuwait City,Kuwait - KW,3",
"Kyoto,Japan - JP,9",
"Lima,Peru - PE,-5",
"Lome,Togo - TO,0",
"London,England - UK - GB,0",
"Los Angeles,California - USA - US,-8",
"Lubumbashi,Zaire - ZR,1",
"Taipei,Taiwan - TW,8"];




ygClock.prototype.showTimeZoneMenu = function(e)
{
		if(this.complete)
		{
			var div;
			var _ygClock = this;
			if(this.oNodeTimeZoneMenu==null)
			{
				div = document.createElement("div");
				document.body.appendChild(div);
				var a = this._aTimeZoneSpace;
				var x = a.length;
				var sHTML = [];

				var bo = "border-top:window 1px solid; border-left:window 1px solid; border-bottom:buttonshadow 1px solid; border-right:buttonshadow 1px solid;";
				var bi = "border-bottom:window 1px solid; border-right:window 1px solid; border-top:buttonshadow 1px solid; border-left:buttonshadow 1px solid;";
			


				var cs = ' style="padding:1px 0;font-size:x-small;font-family:Verdana;border-bottom:solid 1px #dedede;" ';
				for(var i=0;i<x;i++)
				{
					var d = a[i].split(",");
					sHTML.push(
					[
						'<tr><td',cs,'>  ',
						d[0],
						'</td><td',cs,' >',
						d[1],
						'</td><td',cs,' width="100" align="right">',
						d[2],
						' &nbsp;&nbsp;</td></tr>'
					].join('')
					);
				};
				sHTML = [
				
				'<div style="background:white;background:buttonface;'+bo+';opacity:0.9;-moz-border-radius:4px;filter:alpha(opacity:90);zoom:1;width:410px;">',
				'<div style="text-align:right;padding:3px;"><label style="float:left;padding:2px;font-family:Georgia;font-weight:bold;"></label><button onclick="this.parentNode.parentNode.parentNode.style.visibility=\'hidden\';return false;" style="cursor:pointer;">Fermer</button><div style="clear:both;"></div></div>',
				'<table style="border-collapse:collapse;table-layout:fixed;width:370px;">',
				'<thead><tr><th>Ville</th><th>Pays</th><th style="width:100px;">Zone</th></tr></thead>',
				'</table>',
				'<div style="padding:0 2px;height:200px;width:400px;overflow:auto;margin:2px;background:white;'+bi+'">',
				'<table style="border-collapse:collapse;table-layout:fixed;border:none;width:370px;">',
				'<tbody>' + sHTML.join("") + '</tbody>',
				'</table></div>',
				'<div style="background:white;background:buttonface;'+bo+';font-size:1px;">&nbsp;</div>',
				'</div>'
					
				];

				div.innerHTML = sHTML.join("");
				this.oNodeTimeZoneMenu = div;
				var div_s = div.style;
				div_s.position ="absolute";
				div_s.visibility="hidden";
				div_s.top = "-5000px";

				
				_ygClock.oNodeLastHoverRow =null;
				_ygClock.oNodeLastSelectRow =null;

				function onMouseOver_TimeZoneMenuRow(e)
				{
					var lh = _ygClock.oNodeLastHoverRow;
					var ls = _ygClock.oNodeLastSelectRow;
					
					if(lh!=null)
					{
						if(lh!=this)
						{
							if(lh!=ls)
							{
								lh.style.background="white";
								lh.style.color="black";				
							};
						};
					};
					_ygClock.oNodeLastHoverRow = this;
					if(ls!=this)
					{
						this.style.background="#99CCFF";	
					};
				};

				function onClick_TimeZoneMenuRow(e)
				{
					var lh = _ygClock.oNodeLastHoverRow;
					var ls = _ygClock.oNodeLastSelectRow;
					
					if(ls!=null)
					{
						if(ls!=this)
						{							
							ls.style.background="white";
							ls.style.color="black";							
						};
					};
					_ygClock.oNodeLastHoverRow = this;
					this.style.background="#333366";	
					this.style.color="white";
					_ygClock._iTimeZoneOffset = parseInt(this.cells[2].innerHTML);
					_ygClock._sTimeZoneCity = this.cells[0].innerHTML;
					div.getElementsByTagName("label")[0].innerHTML = 	_ygClock._sTimeZoneCity;


					_ygClock.oNodeLastSelectRow = this;
				};


				var rows = div.getElementsByTagName("table")[1].getElementsByTagName("tr");
				for(var i=0;i<rows.length;i++)
				{
					yui.Event.addListener(rows[i],"mouseover",onMouseOver_TimeZoneMenuRow);
					yui.Event.addListener(rows[i],"click",onClick_TimeZoneMenuRow);
				};


			};
			div = this.oNodeTimeZoneMenu;
			var div_s = div.style;
			var o_s = this.oNode.style;
			div_s.visibility="visible";
			div_s.zIndex = o_s.zIndex;
			div_s.left =  o_s.left;
			div_s.top =  this.oNode.offsetHeight + parseInt( o_s.top ) + "px";
			

			
			yui.Event.stopPropagation(e);
			yui.Event.preventDefault(e) ;
			return false;
		}
		else
		{
			alert("clock not complete");
		};		
};




ygClock.prototype.getTime = function()
{
	
	var d = new Date;
	d = Date.parse(d) + d.getTimezoneOffset()*60*1000 ;/*GMT Time*/
	d = d  + this._iTimeZoneOffset*3600000;
	d = new Date(d);

	return d;
};

ygClock.prototype._aMonths = ["Jan","Feb","Mar","Apr","May","June","July","August","Sep","Oct","Nov","Dec"];
ygClock.prototype._formatDateString =  function(dDate,bHTMLSpace)
{
	

		var d = dDate;
		var p = "AM";
		var M = this._aMonths[ d.getMonth()];
		
		var D = d.getDate();
		var Y = d.getFullYear();
		var m = d.getMinutes();
		if(m<10){m = "0" + m};

		var h =  d.getHours();
		if(h>12){h-=12;p = "PM"};
		if(bHTMLSpace)
		{
			return [  this._sTimeZoneCity,"&nbsp;",h,":",m,"&nbsp;",p,"<small>&nbsp;",M,"-",D,"-",Y,"</small>" ].join("");
		}
		else
		{
			return [  this._sTimeZoneCity,"  ", h,":",m," ",p,"  ",M,"-",D,"-",Y].join("");
		};
};

ygClock.prototype._setDragDrop = function()
{
	var _ygClock = this;
	var  cb = this.oNode;
	yui.Event.addListener(cb, "mousedown",move_0);

	function move_0(e)
	{
		_ygClock._aZindex.push(null);
		
		
		if(_ygClock._bMove)
		{
			yui.Event.removeListener(document, "mousemove",move_1);
			yui.Event.removeListener(document, "mouseup",move_2);
		};
		
		yui.Event.removeListener(cb, "mousedown",move_0);
		yui.Event.addListener(document, "mousemove",move_1);
		yui.Event.addListener(document, "mouseup",move_2);
		
		var p = _ygClock.getPosition();

		_ygClock._iOffsetX = yui.Event.getPageX(e) - p[0];
		_ygClock._iOffsetY = yui.Event.getPageY(e) - p[1];
	
		_ygClock._bMove = true;

		yui.Event.stopPropagation(e);
		yui.Event.preventDefault(e) ;

		_ygClock.setPosition(null,null,_ygClock._aZindex.length);

		return false;
	};

	function move_1(e)
	{

		var ex =  ( yui.Event.getPageX(e) - _ygClock._iOffsetX ) ;
		var ey =  ( yui.Event.getPageY(e) - _ygClock._iOffsetY ) ;
		var ez =  ( _ygClock._iOffsetZ) ;			
		_ygClock.setPosition(ex,ey);

		yui.Event.stopPropagation(e);
		yui.Event.preventDefault(e) ;
		return false;
		
	};

	function move_2(e)
	{
		yui.Event.addListener(cb, "mousedown",move_0);
		yui.Event.removeListener(document, "mousemove",move_1);
		yui.Event.removeListener(document, "mouseup",move_2);
		_ygClock._bMove = false;

		
		yui.Event.stopPropagation(e);
		yui.Event.preventDefault(e) ;
		return true;		
	};


};

ygClock.prototype.setPosition =function( iPixelLeft, iPixelTop, iZindex)
{
	var _ygClock = this;
	var cb = this.oNode;
	var  cbs = this.oNode.style;
	if(iPixelLeft && !isNaN(  iPixelLeft )){	cbs .left = iPixelLeft + "px";};
	if(iPixelTop && !isNaN(  iPixelTop)){	cbs .top =iPixelTop + "px";};
	if( iZindex && !isNaN( iZindex) ){cbs.zIndex = iZindex +  _ygClock._iBaseIndex };

	if(this.oNodeTimeZoneMenu )
	{
		var div = this.oNodeTimeZoneMenu;
		if(div.style.visibility.toLowerCase()!="hidden")
		{
			cbs = div.style;
			if(iPixelLeft && !isNaN(  iPixelLeft )){	cbs .left = iPixelLeft + "px";};
			if(iPixelTop && !isNaN(  iPixelTop)){	cbs .top =iPixelTop + cb.offsetHeight  + "px";};
			if( iZindex && !isNaN( iZindex) ){cbs.zIndex = iZindex +  _ygClock._iBaseIndex };
		};

	};

};

ygClock.prototype.getPosition = function()
{		
	var _ygClock = this;
	var  cb = this.oNode;
	
	var cbs = cb.style;
	return [parseInt(cbs.left),parseInt(cbs.top),parseInt(cbs.zIndex)];		
};





/*
w[1]="Abidjan;Cote d'Ivoire - CI;+;0;;"
w[2]="Abu Dhabi;United Arab Emirates - AE;+;4;;"
w[3]="Adana;Turkey - TR;+;2;;"
w[4]="Addis Ababa; Ethiopia - ET;+;3;;"
w[5]="Adelaide *;South Australia - Australia - AU;+;10;30;"
w[6]="Aden; South Yemen - YE;+;3;;"
w[7]="Aklavik;Yukon - Canada - CA;-;9;;"
w[8]="Aleutian;Aleutian Islands;-;10;;"
w[9]="Alexandria;Egypt - EG;+;2;;"
w[10]="Algiers;Algeria - DZ;+;0;;"
w[11]="Amsterdam;Netherlands - NL;+;1;;"
w[12]="Anadyr; Russia - RU;+;13;;"
w[13]="Anchorage;Alaska - USA - US;-;9;;"
w[14]="Ankara;Turkey - TR;+;2;;"
w[15]="Antananarivo; Madagascar - MG;+;3;;"
w[16]="Antwerp;Belgium - BE;+;0;;"
w[17]="Asuncion *;Paraguay - PY;-;3;;"
w[18]="Athens;Greece - GR;+;2;;"
w[19]="Atlanta;Georgia - USA - US;+;5;;"
w[20]="Auckland *;New Zealand - NZ;+;12;;"
w[21]="Aveiro;Portugal - PT;+;0;;"
w[22]="Baghdad;Iraq - IQ;+;3;;"
w[23]="Bamako;Mali - ML;+;0;;"
w[24]="Bandar Seri Begawan;Brunei - BN;+;8;;"
w[25]="Bangkok;Thailand - TH;+;7;;"
w[26]="Bangui;Central African Republic - CF;+;1;;"
w[27]="Banjul;Gambia - GM;+;1;;"
w[28]="Barcelona;Spain - ES;+;1;;"
w[29]="Barranquilla;Colombia - CO;-;5;;"
w[30]="Beijing;China - CN;+;8;;"
w[31]="Beirut;Lebanon - LB;+;2;;"
w[32]="Belgrade;Serbia - YU;+;1;;"
w[33]="Belize City;Belize - BZ;-;5;;"
w[34]="Berlin;Germany - DE;+;1;;"
w[35]="Blantyre;Malawi - MW;+;2;;"
w[36]="Bogota;Colombia - CO;-;5;;"
w[37]="Bologna;Italy - IT;+;2;;"
w[38]="Bombay - Mumbai;India - IN;+;6;;"
w[39]="Brasilia;Brazil - BR;-;3;;"
w[40]="Bratislava;Slovak Republic - SK;+;1;;"
w[41]="Brazzaville;Congo - CG;+;0;;"
w[42]="Bridgetown;Barbados - BB;-;4;;"
w[43]="Brisbane;Queensland - Australia - AU;+;10;;"
w[44]="Brussels;Belgium - BE;+;1;;"
w[45]="Bucharest;Romania - RO;+;2;;"
w[46]="Budapest;Hungary - HU;+;1;;"
w[47]="Buenos Aires;Argentina - AR;-;3;;"
w[48]="Bujumbura;Burundi - BI;+;2;;"
w[49]="Cairo;Italy - IT;+;2;;"
w[50]="Calcutta;India - IN;+;6;;"
w[51]="Calgary;Alberta - Canada - CA;-;6;;"
w[52]="Cali;Colombia - CO;+;0;;"
w[53]="Cape Town;South Africa - ZA;+;1;;"
w[54]="Caracas;Venezuela - VE;-;4;;"
w[55]="Cebu;Philippines - PH;+;8;;"
w[56]="Chicago;Illinois - USA - US;-;6;;"
w[57]="Christchurch;New Zealand - NZ;+;12;;"
w[58]="Colombo;Sri Lanka - LK;+;5;30;"
w[59]="Conakry;Guinea - GN;+;0;;"
w[60]="Copenhagen;Denmark - DK;+;1;;"
w[61]="Cotonou;Benin - BJ;+;0;;"
w[62]="Dakar;Senegal - SN;+;0;;"
w[63]="Dallas;Texas - USA - US;-;6;;"
w[64]="Darwin;Northern Territory - Australia - AU;+;10;;"
w[65]="Delhi;India - IN;+;5;30;"
w[66]="Detroit;Michigan - USA - US;-;5;;"
w[67]="Dhaka;Bangladesh - BD;+;6;;"
w[68]="Djibouti;Djibouti - DJ;+;2;;"
w[69]="Dover;Delaware - USA - US;-;5;;"
w[70]="Dubai;United Arab Emirates - AE;+;3;;"
w[71]="Dublin;Ireland - IE;+;0;;"
w[72]="Dusseldorf;Germany - DE;+;1;;"
w[73]="Edmonton;Alberta - USA - US;-;7;;"
w[74]="Fairbanks;Alaska - USA - US;-;9;;"
w[75]="Florence;Italy - IT;+;2;;"
w[76]="Fort de France;Martinique - MQ;-;4;;"
w[77]="Frankfurt;Germany - DE;+;1;;"
w[78]="Freetown;Sierra Leone - SL;+;0;;"
w[79]="Gaborone;Botswana - BW;+;1;;"
w[80]="Geneva;Switzerland - CH;+;1;;"
w[81]="Gibraltar;Spain - ES;+;1;;"
w[82]="Scotland;England - GB;+;0;;"
w[83]="GMT;GMT - ;+;0;;"
w[84]="Guatemala City;Guatemala - GT;-;6;;"
w[85]="Guayaquil;Ecuador - EC;-;5;;"
w[86]="Hamilton;Bermuda - GM;-;4;;"
w[87]="Harare;Zimbabwe - ZW;+;2;;"
w[88]="Havana;Cuba - CU;-;5;;"
w[89]="Helsinki;Finland - FI;+;2;;"
w[90]="Hobart;Tasmania - Australia - AU;+;10;;"
w[91]="Hong Kong;Hong Kong - HK;+;8;;"
w[92]="Honolulu;Hawaii - US;-;10;;"
w[93]="Indianapolis;Indiana - USA - US;-;5;;"
w[94]="Ipswich;Queensland - Australia - AU;+;10;;"
w[95]="Islamabad;Pakistan - PK;+;5;;"
w[96]="Istanbul;Turkey - TR;+;2;;"
w[97]="Jakarta;Indonesia - ID;+;7;;"
w[98]="Jerusalem;Israel - IL;+;2;;"
w[99]="Johannesburg;South Africa - ZA;+;2;;"
w[100]="Kabul;Afghanistan - AF;+;5;;"
w[101]="Kaduna;Nigeria - NG;+;0;;"
w[102]="Kahira;Egypt - EG;+;2;;"
w[103]="Kamchatka;Russia - RU;+;11;;"
w[104]="Kano;Nigeria - NG;+;1;;"
w[105]="Karachi;Pakistan - PK;+;5;;"
w[106]="Kathmandu;Nepal - NP;+;6;;"
w[107]="Kiev;Ukraine - UA;+;3;;"
w[108]="Kigali;Rwanda - RW;+;1;;"
w[109]="Kingston;Jamaica - JM;-;5;;"
w[110]="Kinshasa;Zaire - ZR;+;1;;"
w[111]="Kobe;Japan - JP;+;9;;"
w[112]="Kosice;Slovak Republic - SK;+;1;;"
w[113]="Kuala Lumpur;Malaysia - MY;+;8;;"
w[114]="Kuwait City;Kuwait - KW;+;3;;"
w[115]="Kyoto;Japan - JP;+;9;;"
w[116]="La Paz;Bolivia - BO;-;5;;"
w[117]="Lagos;Nigeria - NG;+;1;;"
w[118]="Libreville;Gabon - GA;+;0;;"
w[119]="Lima;Peru - PE;-;5;;"
w[120]="Limon;Costa Rica - CR;-;5;;"
w[121]="Lisbon;Portugal - PT;+;0;;"
w[122]="Lome;Togo - TO;+;0;;"
w[123]="London;England - UK - GB;+;0;;"
w[124]="Los Angeles;California - USA - US;-;8;;"
w[125]="Lubumbashi;Zaire - ZR;+;1;;"
w[126]="Luxembourg;Luxembourg - LU;+;1;;"
w[127]="Madrid;Spain - ES;+;1;;"
w[128]="Manama;Bahrain - BH;+;3;;"
w[129]="Manila;Philippines - PH;+;8;;"
w[130]="Maracaibo;Venezuela - VE;-;5;;"
w[131]="Maseru;Lesotho - LS;+;2;;"
w[132]="Mayaguez;Puerto Rico - PR;-;4;;"
w[133]="Mbabane;Swaziland - SZ;+;2;;"
w[134]="Medan;Indonesia - ID;+;8;;"
w[135]="Medellin;Colombia - CO;-;5;;"
w[136]="Melbourne *;Victoria - Australia - AU;+;10;;"
w[137]="Mexico City;Mexico - MX;-;6;;"
w[138]="Milan;Italy - IT;+;1;;"
w[139]="Mogadishu;Somalia - SO;+;3;;"
w[140]="Mombasa;Kenya - KE;+;3;;"
w[141]="Monrovia;Liberia - LR;+;0;;"
w[142]="Monte Carlo;Monaco - MC;+;1;;"
w[143]="Montevideo;Uruguay - UY;-;3;;"
w[144]="Montreal;Quebec - Canada - CA;-;5;;"
w[145]="Morgantown;West Virginia - USA - US;-;5;;"
w[146]="Moscow;Russia - RU;+;3;;"
w[147]="Mumbai - Bombay;India - IN;+;5;30;"
w[148]="Munich;Germany - DE;+;1;;"
w[149]="Murmansk;Rusia - RU;+;2;;"
w[150]="Muscat;Oman - OM;+;3;;"
w[151]="N'Djamena;Chad - TD;+;0;;"
w[152]="Nagasaki;Japan - JP;+;9;;"
w[153]="Nagoya;Japan - JP;+;9;;"
w[154]="Nairobi;Kenia - KE;+;3;;"
w[155]="Naples;Italy - IT;+;1;;"
w[156]="Nassau;Bahamas - BS;-;5;;"
w[157]="New Hebrides;New Hebrides - US;+;11;;"
w[158]="New York City;New York - USA - US;-;5;;"
w[159]="Newfoundland;Newfoundland - Canada - CA;-;3;;"
w[160]="Niamey;Niger - NE;+;0;;"
w[161]="Nice;France - FR;+;1;;"
w[162]="Nicosia;Cyprus - CY;+;2;;"
w[163]="Nome;Alaska - USA - US;-;9;;"
w[164]="Nottingham;England - UK - GB;+;0;;"
w[165]="Nouakchott;Mauritania - MR;+;0;;"
w[166]="Nuk;Greenland - GL;-;3;30;"
w[167]="Odessa;Ukraine - UA;+;3;;"
w[168]="Oran;Algeria - DZ;+;0;;"
w[169]="Osaka;Japan - JP;+;9;;"
w[170]="Oslo;Norway - NO;+;1;;"
w[171]="Ottawa;Ontario - Canada - CA;-;5;;"
w[172]="Ouagadougou;Burkina Faso - BF;+;0;;"
w[173]="Oulu;Finland - FI;+;2;;"
w[174]="Oxford;England - UK - GB;+;0;;"
w[175]="Palma;Mallorca - ES;+;1;;"
w[176]="Panjim;Goa - India - IN;+;5;30;"
w[177]="Paramaribo;Suriname - SR;-;4;;"
w[178]="Paris;France - FR;+;1;;"
w[179]="Peking;China - CN;+;8;;"
w[180]="Perth;Western Australia - Australia - AU;+;8;;"
w[181]="Phoenix;Arizona - USA - US;-;7;;"
w[182]="Ponce;Puerto Rico - PR;-;4;;"
w[183]="Port Louis;Mauritius - MU;+;4;;"
w[184]="Port Moresby;Papua New Guinea - PG;+;10;;"
w[185]="Port of Spain;Trinidad and Tobago - TT;-;4;;"
w[186]="Prague;Czech Republic - CZ;+;1;;"
w[187]="Praia;Cape Verde - CV;-;2;;"
w[188]="Puntarenas;Costa Rica - CR;-;5;;"
w[189]="Quebec;Quebec - Canada - CA;-;5;;"
w[190]="Quito;Ecuador - EC;-;5;;"
w[191]="Rangoon;Barma - ;+;7;;"
w[192]="Reykjavik;Iceland - IS;-;1;;"
w[193]="Riga;Latvia - LW;+;4;;"
w[194]="Rio de Janeiro;Brazil - BR;-;3;;"
w[195]="Riyadh;Saudi Arabia - SA;+;3;;"
w[196]="Rome;Italy - IT;+;1;;"
w[197]="Saigon;Vietnam - VN;+;7;;"
w[198]="Saint Petersburg - Leningrad;Russia - RU;+;3;;"
w[199]="Salt Lake City;Utah - USA - US;-;7;;"
w[200]="Salzburg;Austria - AU;+;1;;"
w[201]="San Francisco;California - USA - US;-;8;;"
w[202]="San Jose;Costa Rica - CR;-;6;;"
w[203]="San Juan;Puerto Rico - PR;-;4;;"
w[204]="Santa Cruz de Tenerife;Canarias Islands - ES;+;0;;"
w[205]="Santiago *;Chile - CL;-;3;;"
w[206]="Santo Domingo;Dominican Republic - DO;-;4;;"
w[207]="Sao Paulo;Brazil - BR;-;3;;"
w[208]="Sapporo;Japan - JP;+;9;;"
w[209]="Sarajevo;Bosnia - BA;+;1;;"
w[210]="Seattle;Washington - USA - US;-;8;;"
w[211]="Seoul;South Korea - KR;+;9;;"
w[212]="Shanghai;China - CN;+;8;;"
w[213]="Singapore;Singapore - SG;+;8;;"
w[214]="Sofia;Bulgaria - BG;+;2;;"
w[215]="Stockholm;Sweden - SE;+;1;;"
w[216]="Stuttgart;Germany - DE;+;1;;"
w[217]="Surabaya;Indonesia - ID;+;7;;"
w[218]="Suva;Fiji Islands - FJ;+;12;;"
w[219]="Sydney *;New South Wales - Australia - AU;+;11;;"
w[220]="Taipei;Taiwan - TW;+;8;;"
w[221]="Tallinn;Estonia - EE;+;2;;"
w[222]="Tampere;Finland - FI;+;2;;"
w[223]="Tashkent;Uzbekistan - UZ;+;3;;"
w[224]="Tegucigalpa;Honduras - HN;-;5;;"
w[225]="Tehran;Iran - IR;+;4;;"
w[226]="Tel Aviv;Israel - IL;+;2;;"
w[227]="Tokyo;Japan - JP;+;9;;"
w[228]="Toronto;Ontario - Canada - CA;-;5;;"
w[229]="Tripoli;Libya - LY;+;1;;"
w[230]="Tunis;Tunisia - TN;+;1;;"
w[231]="Turin;Italy - IT;+;1;;"
w[232]="Ulanbatar;Mongolia - MN;+;8;;"
w[233]="Valletta;Malta - MT;+;1;;"
w[234]="Vancouver;British Columbia - Canada - CA;-;8;;"
w[235]="Vatican;Vatican City - VA;+;1;;"
w[236]="Venice;Italy - IT;+;1;;"
w[237]="Victoria Falls;Zimbabwe - ZW;+;2;;"
w[238]="Vienna;Austria - AT;+;1;;"
w[239]="Vientiane;Laos - LA;+;7;;"
w[240]="Vladimir;Russia - RU;+;3;;"
w[241]="Vladivostok;Russia - RU;+;10;;"
w[242]="Warsaw;Poland - PL;+;1;;"
w[243]="Washington DC;Washington - USA - US;-;5;;"
w[244]="Wellington *;New Zealand - NZ;+;12;;"
w[245]="Winnipeg;Manitoba - Canada - CA;-;6;;"
w[246]="Yalta;Ukraine - UA;+;3;;"
w[247]="Zagreb;Croatia - HR;+;1;;"
w[248]="Zaragoza;Spain - ES;+;1;;"
w[249]="Zurich;Switzerland - CH;+;1;;"
*/

