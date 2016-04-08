# Testing Browserify modules with Karma and Jasmine

Following up on yesterday's Karma and Jasmine TIL, today I found out how to test Browserify modules with Karma and Jasmine.

The setup includes a number of NPM modules i.e. `browserify`, `jasmine-core`, `karma`, `karma-browserify` and `watchify`, along with browser launchers such as `karma-chrome-launcher`.

The `package.json` for this setup can be seen below. Type `npm install` to set up the project.

```javascript
{
  "name": "karma-browserify-example",
  "version": "0.0.1",
  "description": "Karma with Browserify example",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Karolis Ramanauskas",
  "license": "ISC",
  "devDependencies": {
    "browserify": "^13.0.0",
    "jasmine-core": "^2.4.1",
    "karma": "^0.13.22",
    "karma-browserify": "^5.0.3",
    "karma-chrome-launcher": "^0.2.3",
    "karma-jasmine": "^0.3.8",
    "watchify": "^3.7.0"
  }
}
```

Now, let's define an examplary Browserify module in root of the project directory in `calculations.js`.

```javascript
let calculations = {
	add: function (a, b) {
		return a + b;
	},

	subtract: function (a, b) {
		return a - b;
	},

	multiply: function (a, b) {
		return a * b;
	},

	power: function (a, b) {
		return Math.pow(a, b);
	}	
};

module.exports = calculations;
```

To test the module, create `tests/calculationsSpec.js` file, import the module and test it as usual:

```javascript
var calculations = require("../calculations");

describe('JavaScript calculations module', function () {
  it('adds two numbers together', function () {
    expect(calculations.add(1, 2)).toEqual(3);
  });

  it('subtracts two numbers together', function () {
    expect(calculations.subtract(1, 2)).toEqual(-1);
  });

  it('multiplies two numbers together', function () {
    expect(calculations.multiply(1, 2)).toEqual(2);
  });

  it('power of a number', function () {
    expect(calculations.power(1, 2)).toEqual(1);
  });
});
```

The above setup works flawlessly. The only problem I found is that now if you have a function not declared as a module, it will not get picked up automatically by Karma anymore. Anyway, it's not a big issue since all the functionality is going to be defined as modules anyway.

## Resources

- [karma-browserify plugin](https://github.com/nikku/karma-browserify)