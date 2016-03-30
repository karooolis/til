# Using modules in Node.js

Today I learnt how modules can be used in Node.js. It's rather simply and is basically the same as to what other CommonJS based dependency systems such as Browserify do.

To create a module, we need to assign `module.exports` to whatever we require. It can literally be anything: a function, object or even a primitive value if needed (latter scenario is most likely never going to be needed but it is possible).

As an example, a file called `mymodule.js` has been created below which exports a function. The function reads a directory and filters the files by extension. Note how asynchronous callback is used for the purpose of notifying the caller with an error or actual data.

```javascript
// FILE: mymodule.js
var fs = require('fs');

module.exports = function (dirName, extensionFilter, callback) {
	fs.readdir(dirName, function (err, buf) {
		if (err) return callback(err);

		var str = buf.toString();
		var arr = str.split(",");
		var files = [];

		for (var file of arr) {
			var splitFile = file.split(".");

			if (splitFile[1] != null && splitFile[1] == extensionFilter) {
				// console.log(file);

				files.push(file);
			}
		}

		callback(null, files);
	});
}
```

The program below is an example of how the module declared above would be used by importing the module via `var mymodule = require(`./mymodule.js');`.

```javascript
var args = process.argv;
var mymodule = require('./mymodule.js');

mymodule(args[2], args[3], function (err, data) {
	if (err) return console.log(err);

	for (var file of data) {
		console.log(file);
	}
});
```

## Idiomatic callback functions

Just to add to the above, since callback functions are used so regularly in modules, there is an established pattern of doing early returns for errors within callbacks. Thus, an idomatic callback function would look like below:

```javascript
function foo(callback) {
	// DO SOMETHING

	if (err) return callback(err); // early return

	callback(null, data); // if all went well, call callback with `null` for the error argument
}
```






