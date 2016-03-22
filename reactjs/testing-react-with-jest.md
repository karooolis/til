# Testing React components with Jest

It's been a long time since I wanted to explore deeper of how to perform unit tests in JavaScript, and especially React. Today is the day!

[Jest](http://facebook.github.io/jest/) is a JavaScript unit testing library created by Facebook specifically for React. However, it can be used for regular JavaScript just as well. 

## Basic usage

To start looking at some examples, first install Jest using the [following instructions](https://github.com/facebook/jest). If you are done, let's get started!

First, we declare a demo function that multiplies two variables and save it as `./multiply.js`:

```javascript
function multiply(a, b) {
	return a * b;
}
module.exports = multiply;
```

Then, to test that function, we create a unit test inside `__tests__/multiply-test.js` as such:

```javascript
jest.unmock('../multiply'); // unmock to use the actual implementation of multiply

describe('multiply', () => {
  it('multiply 3 * 4 to equal 12', () => {
    const multiply = require('../multiply');
    expect(multiply(3, 4)).toBe(12);
  });
});
```

And voila, now all that's left is to run `npm test`. Now, simple JavaScript function unit tests by itself is going to be barely useful in most cases. Let's see how to test some React components which is where fun and the power lays!

## Testing React components

To start testing React components, we need to declare one first, d'oh. I have created one at `./mylement.js`. All it does is changes its text upon a click from *"I am not active :("* to *"I am active!"*. No need to overcomplicate things.

```javascript
import React from 'react';

export default class MyElement extends React.Component {

  constructor(props) {
    super(props);
    this.state = {isActive: false};

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState({isActive: !this.state.isActive});
  }

  render() {
    return (
      <div onClick={this.onClick}>{this.state.isActive ? "I am active!" : "I am not active :("}</div>
    );
  }
}
```

To test the newly created React component, we need a new unit test that will render that component on the screen and simulate the events we are interested in. I have created such test at `__tests__/MyElement-test.js`:

```javascript
/* eslint-disable no-unused-vars */
'use strict';

jest.unmock('../MyElement');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import MyElement from '../MyElement';

describe('MyElement', () => {

  it('changes the text after click', () => {
    // Render a checkbox with label in the document
    const element = TestUtils.renderIntoDocument(
      <MyElement />
    );

    const elementNode = ReactDOM.findDOMNode(element);

    // Verify the correct default text
    expect(elementNode.textContent).toEqual('I am not active :(');

    // Simulate a click and verify that it is now On
    TestUtils.Simulate.click(elementNode);

    // Verify text has been changed successfully
    expect(elementNode.textContent).toEqual('I am active!');
  });

});
```

There is quite a bit of boilerplte going on here. For example note how we have to import React testing utilities. Or how much codes it takes to just simulate  React component on the screen.

Anyhow, once all the boilerplate code is in place i.e. all dependencies are imported, testing React components becomes fairly straightforward. For example, to simulate a click event on the element node, all we have to do is write this `TestUtils.Simulate.click(elementNode);` and then test the expected result.

Note that React components simulation is done by [react-addons-test-utils](https://facebook.github.io/react/docs/test-utils.html) which can be used in any testing library. Thus, you could perform React components testing in Mocha just as well as Jest.

## Summary

In summary, while I love the simplicity of Jest, the unit tests take too slow. Even these few simple tests would take my machine up to 10 seconds. The issue is thoroughly discussed [on Github](https://github.com/facebook/jest/issues/116) and at the moment it does not look like it become speedy any time soon which is a shame.

Thus, even though Jest looks great on paper, and it is for the most paper, I doubt Jest will be my primary choice for unit tests simply due to speed concerns. However, if if becomes speedier in the near future, I will definitely jump into Jest's bandwagon for sure :) But for now keep on looking!