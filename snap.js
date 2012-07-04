var watch = require('./lib/watchn').watch,
	http = require('http'),
	hasFileChange = false;

watch(process.argv[2], /.+/, function (path, curr, prev) {
    hasFileChange = true;
    console.log('change to ' + path);
});

http.createServer(function (req, res) {
	res.writeHead(200, {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
		'Access-Control-Allow-Headers': 'Content-Type'
	});
  	res.end(JSON.stringify({hasFileChange: hasFileChange}));
  	console.log('returning: ' + JSON.stringify({hasFileChange: hasFileChange}));
  	hasFileChange = false;
}).listen(1337, '127.0.0.1');


// TODO: track individual clients. Each client needs to get the change notification, not just the first requester.

// TODO: allow second console argument for file regex