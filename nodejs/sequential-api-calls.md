# Sequential API calls

Imagine a scenario where you need to call one API, then another, and finally a third one. Expanding on ["Simple HTTP GET requests"](https://github.com/ramkarolis/til/blob/master/nodejs/simple-http-get-requests.md) TIL entry, we can achieve that by using additional NPM module [`async`](https://www.npmjs.com/package/async) which allows us to all kinds of interesting and useful things. 

The example below makes sure that the URLs passed as command line arguments will all be called and processed sequentially. Simple but powerful.

```javascript
var args = process.argv;
var http = require('http');
var bl = require('bl');
var async = require('async');
var url1 = args[2];
var url2 = args[3];
var url3 = args[4];

async.waterfall([
	function(callback) {
		http.get(url1, function(res) {
			res.pipe(bl(function(err, data) {
				console.log(data.toString());

				callback();
			}))
		});
	},
	function(callback) {
		http.get(url2, function(res) {
			res.pipe(bl(function(err, data) {
				console.log(data.toString());

				callback();
			}))
		});
	},
	function(callback) {
		http.get(url3, function(res) {
			res.pipe(bl(function(err, data) {
				console.log(data.toString());
			}))
		});
	}
]);
```