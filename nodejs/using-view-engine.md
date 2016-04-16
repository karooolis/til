# Express - using view engine

Today I learnt how to use view engine with Express framework.

To use a view engine, you need to declare it in the runner (routes) file i.e. `app.js`. It's done with a function `app.set('view engine, 'ENGINE NAME')`. Then, we need to tell Express where these view files will be stored as such `app.set('views', './src/views')`. Finally, to return a view as a response to a route request, `res.render` is used.

For example, to use [EJS](http://www.embeddedjs.com/) view engine, the `app.js` file would looks as follows:

```javascript
app.set('views', './src/views');

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('index', {
        title: 'Hello from render',
        list: ['a', 'b']
    });
});
```

Notice how we pass a JSON object as a second parameter to `res.render`. The variables declared in the object are available in the rendered view file and can be used as such:

```html
<ul class="nav navbar-nav">
    <% for(var i = 0; i < list.length; i++) { %>
        <li><a><%= list[i] %></a></li>
    <% } %>
</ul>
```

## Resources

- [EmbeddedJS](http://www.embeddedjs.com/)
- [Using template engines with Express](http://expressjs.com/en/guide/using-template-engines.html)