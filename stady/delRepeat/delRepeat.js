//数组去重
Array.prototype.delRepeat=function(){
	var newArray=[];
	var provisionalTable = {};
	for (var i = 0, item; (item= this[i]) != null; i++) {
        if (!provisionalTable[item]) {
            newArray.push(item);
            provisionalTable[item] = true;
        }
    }
    return newArray;
}


Array.prototype.delRepeat=function(){
	var newArray=new Array();
	var len=this.length;
	for (var i=0;i<len ;i++){
		for(var j=i+1;j<len;j++){
			if(this[i]===this[j]){
				j=++i;
			}
		}
		newArray.push(this[i]);
	}
	return newArray;
}
