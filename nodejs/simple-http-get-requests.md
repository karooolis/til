# Simple HTTP GET requests

Today I learnt how to perform simple HTTP GET requests on Node.js. The code below speaks for itself. The HTTP requests are made with `http` module, and `bl` module as a helper to deal with data buffer stream. 

`http` module works by returning a response object which contains all the data about the response such as response headers, status code and so on.

I thought that the response object would also contain the received data but somewhat counterintuitively, the response object only has a `"data"` event, which gets called to buffer data from a stream received from the called URL. Thus, we need to be careful when receiving data and receive the whole stream which is demonstrated in the example below. It can be done using only `http` module but I found out that using an additional `bl` module makes the process a bit more expressive.

```javascript
var args = process.argv;
var http = require('http');
var bl = require('bl');
var url = args[2];

// Example using `http` module only.
// `response.on("data")` buffers the stream and we need to make sure ourselves
// that all received data is captured appropriately.
http.get(url, function (response) {
	response.setEncoding('utf8');
	response.on("data", function(data) {
		str += data;
	});

	response.on('end', function() {
		console.log(str.length);
		console.log(str);
	});
});

// Example using `bl` 
// `bl` is used to pipe all the data into one buffer stream
// alleaviating us from extra work as in example above.
http.get(url, function (response) {
	response.pipe(bl(function (err, data) {
		console.log(data);
	}));
});
```