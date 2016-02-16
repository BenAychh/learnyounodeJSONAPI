var http = require('http');
var server = http.createServer(callback);
server.listen(process.argv[2]);
function callback(request, response) {
  var lastEqual = request.url.lastIndexOf('=');
  var dateString = request.url.substring(lastEqual + 1);
  var date = new Date(dateString);
  var dateObject = {};
  if (request.url.indexOf('/api/parsetime') !== -1) {
    dateObject = {
      "hour": date.getHours(),
      "minute": date.getMinutes(),
      "second": date.getSeconds()
    };
    console.log(dateObject);
  } else if (request.url.indexOf('/api/unixtime') !== -1) {
    dateObject = {
      "unixtime": date.getTime()
    };
    console.log(dateObject);
  }
  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(dateObject));
}
