## Syntatic Sugar for React

In this document I will keep a track of various syntantic sugar for React library.

##### Conscise this.setState

The syntax below allows to shorten `this.setState` from `this.setState({videos: videos})` to `this.setState({videos})`. It's only possible when key and value names are the same.

```javascript
fetchData(videos => {
  this.setState({ videos })
})
```
