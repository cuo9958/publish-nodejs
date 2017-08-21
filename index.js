var util = require('util');
var http = require("http");
var spawn = require('child_process');

function onRequest(request, response) {
    response.writeHead(200, { "Content-type": "text/html; charset=utf-8" });
    if (request.url.startsWith('/publish')) {
        var param = request.url.replace('/publish', '').replace('/', '');
        var ls = spawn.exec("sh /home/xhh/web.sh "+param);
        ls.stdout.on('data', function (data) {
            console.log(data.toString());
            response.write(data);
        });
        ls.stderr.on('data', function (data) {
            response.write(data);
        });
        ls.on("exit", function (code) {
            console.log(code);
            response.write("退出");
            response.end();
        });
    } else {
        response.write("ok");
        response.end();
    }
}
http.createServer(onRequest).listen(9090, function () {
    console.log("监听9090端口");
});