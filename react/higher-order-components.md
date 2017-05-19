## Higher order components 

Higher order components is a pattern in React that takes a component and returns a new component. This allows to reuse some of the programming logic.

```javascript
<!DOCTYPE html>
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
      let BaseCount = (BasicComponent) => class extends React.Component {
        constructor(props) {
          super(props);
          this.state = {
            count: 0
          }
          this.incrementCount = this.incrementCount.bind(this);
        }

        incrementCount() {
          console.log("I have been clicked");
          this.setState({
            count: this.state.count + 1
          })
        }

        render() {
          return (
            <div className="container">
              <BasicComponent {...this.state} increment={this.incrementCount} />
            </div>
          )
        }
      }

      const Button = (props) => {
        return (
          <button className="btn blue-btn" onClick={props.increment}>Count: {props.count}</button>
        )
      }

      const Label = (props) => {
        return (
          <h1 className="btn blue-btn" onMouseMove={props.increment}>Count: {props.count}</h1>
        )
      }

      let ExtendedButton = BaseCount(Button);
      let ExtendedLabel = BaseCount(Label);

      const App = () => {
        return (
        <div>
          <ExtendedButton/>
          <ExtendedLabel/>
        </div>
        )
      }

      ReactDOM.render(
        <App/>,
        document.getElementById('app')
      );
    </script>
  </body>
</html>
```
