// var http = require('http');
// var string = [];
// for (var i = 2; i < process.argv.length; i++) {
//   var actualNumber = i - 2;
//   string[i - 2] = '';
//   (function(number) {
//     http.get(process.argv[i], function(response) {
//       dataProcessor(response, number);
//     });
//   })(actualNumber);
// }
// function dataProcessor (response, number) {
//   response.on('data', function(data) {
//     string[number] += data.toString();
//   });
//   response.on('end', checkFinished);
// }
// function checkFinished() {
//   var finished = true;
//   for (var i = 0; i < string.length; i++) {
//     if (string[i] === '') {
//       finished = false;
//       break;
//     }
//   }
//   if (finished) {
//     string.forEach(function(data) {
//       console.log(data);
//     });
//   }
// }

// var net = require('net');
// var server = net.createServer(callback);
// server.listen(process.argv[2]);
// function callback(socket) {
//   var date = new Date();
//   var year = date.getFullYear();
//   var month = date.getMonth() + 1 + '';
//   if (month.length === 1) {
//     month = '0' + month;
//   }
//   var day = date.getDate() + '';
//   if (day.length === 1) {
//     day = '0' + day;
//   }
//   var hour = date.getHours();
//   var minute = date.getMinutes();
//   socket.end(year + '-' + month + '-' + day + ' ' + hour + ':' + minute + '\n');
// }

// var http = require('http');
// var fs = require('fs');
// var server = http.createServer(callback);
// server.listen(process.argv[2]);
// function callback(request, response) {
//   var fileStream = fs.createReadStream(process.argv[3]);
//   fileStream.on('open', function() {
//     fileStream.pipe(response);
//   });
// }

// var http = require('http');
// var server = http.createServer(callback);
// server.listen(process.argv[2]);
// function callback(request, response) {
//   request.on('data', function(data) {
//     var string = '';
//     string += data.toString().toUpperCase();
//     response.write(string);
//   });
// }

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
