var css = require("stylus"),
	str = require("fs").readFileSync("stylus.css","utf8");
	
css.render(str,{filename:"stylus.css"},function(err,css){
	if(err) throw err;
	var http = require('http');
	http.createServer(function(req,res){
		res.writeHead(200,{'Content-Type':'text/css'});
		res.end(css);
	}).listen(1337,"127.0.0.1");
	console.log("已经启动  http://127.0.0.1:1337/");
});