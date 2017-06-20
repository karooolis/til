# Syntactic Sugar for React

In this document I will keep a track of various syntantic sugar for React library.

## Conscise this.setState

The snippet allows to shorten `this.setState` from `this.setState({videos: videos})` to `this.setState({videos})`. It's only possible when key and value names are the same.

```javascript
fetchData(videos => {
	this.setState({ videos })
})
```

## Conscise this.props for functional components

The snippet allows to swap `this.props.dataPoint` to simply `dataPoint` from within the component.

```javascript
const DataListItem = ({dataPoint}) => {
	return <li>{dataPoint.name}</li>
}
```
