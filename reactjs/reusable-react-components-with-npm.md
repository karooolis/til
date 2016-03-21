# Reusable React components with NPM

Today I learnt that creating NPM module is much more straightforward than I thought it would, especially if you are already familiar with something like [Browserify](http://browserify.org/).

While NPM modules are great for all kinds of uses, I found that they play extremely nicely with React. Each of React components can be can be published as an NPM module and reused by yourself, work colleagues or others later on. It proved to be a good solution in my workplace where until now we used to copy/paste code from previous projects.

## Creating NPM module for a React component

The NPM module creation starts by typing `npm init`. You will have to select the name, keywords, license and some other configurations, most important of which is perhaps entry file name which is essentially the driver of the module. Also, for later reference, let's say the name you chose is `reusable-react-component`.

Inside your entry file you need to setup your code, in this case a reusable React component as shown below and dependancies.

```javascript
let ReusableComponent = React.createClass({
	render: function() {
		return <h1>Hello, {this.props.name}!</h1>;
	}
});

module.exports = ReusableComponent;
```

Once that's done, typing `npm publish` will publish your component into NPM registry and make it available for reuse.

## Re-using published React component

The modularized and published React component can later be reused by first installing it in the directory by issuing `npm install reusable-react-component`. Then, it can be rendered as follows:

```javascript
let ReusableCompoent = require('Reusable Component');

ReactDOM.render(
  <ReusableCompoent name="Dudeson" />,
  document.getElementById('example')
);
```