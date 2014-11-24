//深拷贝
dom.deepCopy = function(result, source) {
    for (var key in source) {
        var copy = source[key];
        if (source === copy) continue;
        if (dom.is(copy, "Object")) {
            result[key] = arguments.callee(result[key] || {},
            copy)
        } else if (dom.is(copy, "Array")) {
            result[key] = arguments.callee(result[key] || [], copy)
        } else {
            result[key] = copy
        }
    }
    return result
};
var is = function(obj, type) {
    var toString = Object.prototype.toString,
    undefined;
    return (type === "Null" && obj === null) || (type === "Undefined" && obj === undefined) || toString.call(obj).slice(8, -1) === type
};


//深拷贝2
function cloneObject(obj){
    var o = obj.constructor === Array ? [] : {};
    for(var i in obj){
        if(obj.hasOwnProperty(i)){
            o[i] = obj[i] && typeof obj[i] === "object" ? cloneObject(obj[i]) : obj[i];
        }
    }
    return o;
}
//var obj = {a:[1,null,"tt","",0],b:{c:null}}
//console.log(cloneObject(obj));