# Routes in Express

On my journey to learn Node.js, I have started to learn about Express framework by exploring how its routing system works. Below is a really simple `Hello World` app that accepts two routes, a GET and POST request to the root of the directory. 

```javascript
var express = require('express');
var app = express();

// GET request to root of the project
app.get('/', function (req, res) {
  res.send('GET request to the homepage');
});

// POST request to root of the project
app.post('/', function (req, res) {
  res.send('POST request to the homepage');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
```

Now let's look at some more Express routing examples.

## Specific page route

```javascript
// Matches /about
app.get('/about', function (req, res) {
  res.send('about');
});
```

## Route with parameter

```javascript
app.get('/user/:id', function (req, res) {
  res.send('user with ID - ' + req.params.id);
});
```

## Using subset of RegEx for route matching

Either `/acd` or `/abcd` will be matched

```javascript
app.get('/ab?cd', function(req, res) {
  res.send('ab?cd');
});
```

`/abcd`, `/abbcd`, `/abbbcd` and so on will be matched.

```javascript
app.get('/ab+cd', function(req, res) {
  res.send('ab+cd');
});
```

`/ab(anything random)cd` will be matched.

```javascript
app.get('/ab*cd', function(req, res) {
  res.send('ab*cd');
});
```

Matches either `/abe` or `/abcde`.

```javascript
app.get('/ab(cd)?e', function(req, res) {
  res.send('ab(cd)?e');
});
```

Matches anything with an `a` in the route name

```javascript
app.get(/a/, function(req, res) {
  res.send('/a/');
});
```

Accepts any route that ends with fly i.e. `/dragonfly`, `/butterfly`, not `flydragon`.

```javascript
app.get(/.*fly$/, function(req, res) {
  res.send('/.*fly$/');
});
```

## Callbacks

More than one callback function can handle a route (make sure you specify the next object). For example:

```javascript
app.get('/next-example', function (req, res, next) {
  console.log('the response will be sent by the next function ...');
  next();
}, function (req, res) { // this is the declared `next` function
  res.send('Hello from B!');
});
```

Also, an array of callbacks can handle a route as such:

```javascript
var callback0 = function (req, res, next) {
  console.log('Callback0 here!');
  next();
}

var callback1 = function (req, res, next) {
  console.log('Callback 1, yo ;)');
  next();
}

var callback2 = function (req, res) {
  res.send('Hello from `next example`!');
}

app.get('/callbacks-example', [callback0, callback1, callback2]);
```

A combination of independent functions and arrays of functions can handle a route as well. For example:

```javascript
var callback0 = function (req, res, next) {
  console.log('Callback0 calling..');
  next();
}

var callback1 = function (req, res, next) {
  console.log('Callback1 saying hi!');
  next();
}

app.get('/another-callbacks-example', [callback0, callback1], function (req, res, next) {
  console.log('the response will be sent by the next function ...');
  next();
}, function (req, res) {
  res.send('Hello from `another callbacks example`!');
});
```

## Chainable route handlers

Chainable route handlers enable a somewhat cleaner definition of routes when same route handles different types of HTTP requests. It's done by chaining appropraite functions onto `app.route()`.

Below is an example of chained route handlers that are defined by using app.route():

```javascript
app.route('/book')
  .get(function(req, res) {
    res.send('Get a random book');
  })
  .post(function(req, res) {
    res.send('Add a book');
  })
  .put(function(req, res) {
    res.send('Update the book');
  });
```

## Resources

- [Express routing](http://expressjs.com/en/guide/routing.html)

