# Simple API server

Today I learnt how to create a very basic HTTP server using Node.js. The example above accepts `GET` request with either `unixtime` or `parsetime` query string and a parameter given as ISO time-string.

The server does not do any error checking and what not. It just assumes everything goes well and returns JSON object based on the parameter passed.

```javascript
var http = require('http')
var url = require('url')

function parsetime(time) {
	return {
		hour: time.getHours(),
		minute: time.getMinutes(),
		second: time.getSeconds()
	}
}

function unixtime(time) {
	return {
		unixtime: time.getTime()
	}
}

var server = http.createServer(function(req, res) {
	var parsedUrl = url.parse(req.url, true)
	var time = new Date(parsedUrl.query.iso)
	var result

	if (/^\/api\/parsetime/.test(req.url))
		result = parsetime(time)
	else if (/^\/api\/unixtime/.test(req.url))
		result = unixtime(time)

	if (result) {
		res.writeHead(200, { 'Content-Type': 'application/json' })
		res.end(JSON.stringify(result))
	} else {
		res.writeHead(404)
		res.end()
	}
})

server.listen(Number(process.argv[2]));
```