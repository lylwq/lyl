//var exec = require("child_process").exec;
var querystring = require("querystring"),
	fs = require("fs"),
	formidable = require("formidable"),
    util = require("util");

function start(response){
    console.log("Request handle 'start' was called.");
    var body = '<html>'+
        '<head>'+
        '<meta http-equiv="Content-Type" content="text/html; '+
        'charset=UTF-8" />'+
        '</head>'+
        '<body>'+
        '<form action="/upload" method="post">'+
        //'<textarea name="text" rows="20" cols="60"></textarea>'+
		'<input type="file" name="upload" />'+
        '<input type="submit" value="Upload File" />'+
        '</form>'+
        '</body>'+
        '</html>';


    response.writeHead(200,{"Content-Type":"text/html"});
    response.write(body);
    response.end();
	
	
	/*exec("find /",
    { timeout: 10000, maxBuffer: 20000*1024 },
    function (error, stdout, stderr) {
      response.writeHead(200, {"Content-Type": "text/plain"});
      response.write(stdout);
      response.end();
    });*/
}
function upload(response,request){
    console.log("Request handle 'upload' was called.");
    /*response.writeHead(200,{"Content-Type":"text/plain"});
    response.write("You've sent: " + querystring.parse(postData).text);
    response.end();*/
	var form = new formidable.IncomingForm();
	console.log("about to parse");
    form.uploadDir = "c://img";
     /*    files = [],
        fields = [];
    form
        .on('field', function(field, value) {
        console.log(field, value);
        fields.push([field, value]);
    })
        .on('file', function(field, file) {
            console.log(field, file);
            files.push([field, file]);
        })
        .on('end', function() {
            console.log('-> upload done');
            response.writeHead(200, {'content-type': 'text/plain'});
            response.write('received fields:\n\n '+util.inspect(fields));
            response.write('\n\n');
            response.end('received files:\n\n '+util.inspect(files));
        });
    form.parse(request);*/
	form.parse(request , function(error , fields , files){
		console.log("parsing done : " + arguments);

        /*fs.renameSync(files.upload.path , "c://img/test.png");
        原文中的files是个空对象,推测是因为formidable修改了内部代码,
        而且就算fields.upload有值,在chrome和FF里面也只是个文件名,不是路径,所以也传不成功
        在IE中能成功,但是是将文件剪切...
        */
        fs.renameSync(fields.upload , "c://img/test.png");
		response.writeHead(200 , {"Content-Type":"text/html"});
		response.write("received image:<br/>");
		response.write("<img src='/show' />");
		response.end();
	});
}
function show(response){
	console.log("Request handler 'show' was called.");
	fs.readFile("c://img/test.png" , "binary" , function(error , file){
		if(error){
			response.writeHead(500 , {"Content-Type":"text/plain"});
			response.write(error + "\n");
			response.end();
		}else{
			response.writeHead(200 , {"Content-Type" : "image/png"});
			response.write(file , "binary");
			response.end();
		}
	});
}
exports.start = start;
exports.upload = upload;
exports.show = show;