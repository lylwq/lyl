var http = require("http");
var url = require("url");
function start(route,handle){
    function onRequest(request,response){
		
        /*var path = url.parse(request.url).pathname,
            postData = "";
        request.setEncoding("utf-8");
        request.addListener("data",function(postDataChunk){
            postData += postDataChunk;
            console.log("Received POST data chunk '"+postData+"'.");
        });
        request.addListener("end",function(){
            route(handle,path,response,postData);
        });*/
		
		var pathname = url.parse(request.url).pathname;
		console.log("Request for " + pathname + " received.");
		route(handle , pathname , response , request);
    }
    http.createServer(onRequest).listen(8888);
    console.log("sever has started");
}
exports.start = start;