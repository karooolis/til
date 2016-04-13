# Express - serving static content

It's very easy to serve static content in Express by using `express.static` built-in middleware function. For example, to make all assets publicly available from `/public` directory i.e. `http://localhost:3000/images/kitten.jpg`, `http://localhost:3000/css/style.css`, declare a route as such:

```javascript
app.use(express.static('public'));
```

To use multiple static assets directories, simply declare the `express.static` middleware function multiple times:

```javascript
app.use(express.static('public'));
app.use(express.static('files'));
```

It is also possible to create a virtual path prefix. For example, you can serve static files from `/public` directory but use prefix `/static` as such:

```javascript
app.use('/static', express.static('public'));
```

Now the files from `/public` directory are accessible by `http://localhost:3000/static/images/kitten.jpg`, `http://localhost:3000/static/css/style.css`, etc.

## Resources

- [Express static files](http://expressjs.com/en/starter/static-files.html)