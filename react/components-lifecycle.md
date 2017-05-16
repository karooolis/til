# React Components Lifecycle

Code below demonstrates the entire lifecycle of a React component.

```javascript
DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>React tutorial</title>
    <script src="https://fb.me/react-0.14.7.js"></script>
    <script src="https://fb.me/react-dom-0.14.7.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.2/browser.min.js"></script>
  </head>
  <body>
    <div id="app"></div>
    <script type="text/babel">
      var LifecycleComponent = React.createClass({
        increment: function() {
          this.setState({
            count: this.state.count + 1
          })
        },

        // 1.
        // BEFORE COMPONENT IS RENDERED
        // HAPPENS WHEN CLASS IS INSTANTIATED
        getDefaultProps: function() {
          console.log("Getting our default properties");
        },
        
        // 2.
        // BEFORE COMPONENT IS RENDERED
        // RETURN VALUE IS USED FOR `this.state`
        getInitialState: function() {
          console.log("Getting our initial state");
          return ({
            count: 0
          })
        },

        // 3.
        // BEFORE COMPONENT IS RENDERED
        componentWillMount: function() {
          console.log('Component will mount');
        },
        
        // 4.
        // HAPPENS WHEN OUR COMPONENT CHANGES i.e. ITS STATE CHANGES
        render: function() {
          return (
            <button onClick={this.increment}>{this.state.count}</button>
          )
        },

        // 5.
        // AFTER COMPONENT HAS RENDERED
        // TO USE INTERVAL, TIMEOUT OR AJAX FUNCTIONS,
        // DO THEM ALL HERE
        componentDidMount: function() {
          console.log('Component did mount');
          console.log(ReactDOM.findDOMNode(this));

          this.interval = setInterval(this.increment, 1000);
        },

        // 6.
        // AFTER COMPONENT HAS RENDERED
        // PERFORM ALL THE NECESSARY CLEAN UP OPERATIONS
        // LIKE CLEANING UP INTERVALS
        componentWillUnmount: function() {
          console.log('Unmount component, good to clear up everything inside the component');
          clearInterval(this.interval);
        }
      });

      var LifecycleContainer = React.createClass({
        mount: function() {
            ReactDOM.render(
              <LifecycleComponent />,
              document.getElementById('render-here')
            );
        },

        unmount: function() {
          ReactDOM.unmountComponentAtNode(document.getElementById('render-here'));
        },

        render: function() {
          return (
            <div>
              <button onClick={this.mount}>Mount</button>
              <button onClick={this.unmount}>Unmount</button>
              <div id="render-here"></div>
            </div>
          )
        }
      });

      ReactDOM.render(
        <LifecycleContainer />,
        document.getElementById('app')
      );
    </script>
  </body>
</html>
```
