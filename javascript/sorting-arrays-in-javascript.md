# Sorting arrays in JavaScripts

Today I learnt about `sort` function that allows to conveniently sort arrays in JavaScript. The simplest way to use it is to simply call it on an array as such:

```javascript
var fruit = ['cherries', 'apples', 'bananas'];
fruit.sort(); // ['apples', 'bananas', 'cherries']
```

The default sort order is defined by Unicode code points. This brings unexpected results when we try to sort an array of numbers as such:

```javascript
var scores = [1, 10, 2, 21]; 
scores.sort(); // [1, 10, 2, 21];
```

In the example above, 10 comes before 2 which is most likely not what you would expect. However, since 10 comes before 2 in Unicode code point order, it will be treated as smaller than 2.

## `compareFunction`

The `compareFunction` is where really all the meat lays. It allows us to sort arrays made up of any type of objects by defining `compareFunction` where we either specify whether two objects are equal, or which one of them is bigger.

`compareFunction` accepts two parameters `a` and `b`, and would be called as such:

```javascript
let scores = [1, 10, 2, 21]; 
scores.sort((a, b) => {
	a = parseInt(a);
	b = parseInt(b);

	if (a === b) return 0;
	if (a > b) return 1;
	else return -1;
}); // [1, 2, 10, 21]
```

To reiterate, we pass a so called `compareFunction` to `sort` with two parameters, `a`, and `b`. If `a` and `b` are equal according to our criteria, we return 0. If `a` is bigger than `b`, we return 1. Otherwise, we return -1.

You can probably see by now how `compareFunction` can be used to sort literally anything. For example, below is the function I wrote today that sorts an array of dates in ascending order. Note that it uses [Moment.js](http://momentjs.com/) for convenience but that does not change the idea. Cool stuff if you ask me :)

```javascript
filteredDates.sort(function(a, b) {
  let aDate = moment(a.fullTime, "YYYY MM DD, HH:mm:ss")
  let bDate = moment(b.fullTime, "YYYY MM DD, HH:mm:ss")
  let dateA = new Date(aDate)
  let dateB = new Date(bDate)
  return dateA - dateB;
});
```

## Resources

- [MDN Array.prototype.sort()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)