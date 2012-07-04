var watch = require('./lib/watchn').watch,
	http = require('http'),
	lastChange = new Date(),
	script;

// process.argv[2] is the root of the location to watch
// process.argv[3] is the (optional) regular expression defining the files to watch

watch(process.argv[2], new RegExp(process.argv[3] || '.*'), function (path, curr, prev) {
    lastChange = new Date();
    console.log('change ' + path);
});

http.createServer(function (req, res) {
	var isScriptRequest = req.url === '/script';
	res.writeHead(200, {
		'Content-Type': isScriptRequest ? 'application/javascript' : 'application/json',
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
		'Access-Control-Allow-Headers': 'Content-Type'
	});

	// todo if /script  
	if (isScriptRequest) {
		res.end(script);
	} else {
		res.end(JSON.stringify({lastChange: lastChange}));	
	}
  	
  	console.log('returning: ' + JSON.stringify({lastChange: lastChange}));
}).listen(1337, '127.0.0.1');

script = "(function () {\n    var lastRefresh = new Date();\n    setInterval(function () {\n        $.getJSON('http://localhost:1337', function (data) {\n            if (new Date(data.lastChange) > lastRefresh) {\n                window.location.reload();    \n            }\n        });\n    }, 5000);\n})();";


// TODO: track individual clients. Each client needs to get the change notification, not just the first requester.

// TODO: allow second console argument for file regex