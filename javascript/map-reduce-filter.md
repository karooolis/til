# Functional programming in JavaScript: map, reduce, filter

Today I learnt about `map`, `reduce` and `filter`, and how they can make JavaScript code cleaner.

## `map`

`map` can be thought of as a loop. You loop through each item in an array and process it with a callback function. Whatever the function returns will be placed in the new array.

```javascript
let myArray = [1, 2, 3, 4];

let newArray = myArray.map((number) => number * 2); // newArray becomes [2, 4, 6, 8]
```

## `filter`

`filter` works similarly to `map`. However, the callback function can only return boolean values. If it returns `true`, the given value is put into the new array. If it's `false`, the value is omitted.

```javascript
let myArray = [1, 2, 3, 4];

let newArray = myArray.filter((number) => number % 2 === 0); // newArray becomes [2, 4]
```

## `reduce`

`reduce` is not as intuitive to understand as others at first but is also fairly straightforward and an elegant solution to many elements. What it does is basically iterate over an array, just like `filter` or `map` but rather than returning an array, it returns a single value. The value is derived by processing all values in the array through a callback, and adding up the result. I find that the examples work the best for me so look at one below:

```javascript
let myArray = [1, 2, 3, 4];

let sum = myArray.reduce((total, number) => total + number); // sum = 10 
```

The `reduce` basically works as this (taken from [joepie91](http://cryto.net/~joepie91/blog/2015/05/04/functional-programming-in-javascript-map-filter-reduce/)):

1. The second argument to the function call is considered to be the 'starting value' for the total - this is what you start out with.
2. For each item in the array, it calls the callback, with the total value up to that point, and the item itself. For the first item, the 'total value' is the starting value.
3. You return a new 'total value'. In this case, it's the sum of all previous numbers plus the current number. This return value is used as the 'total value' for the next item.
4. After running out of items, the 'cumulative' total value is returned.

## Chaining `map`, `reduce` and `filter`

While all these functions are powerful by themselves, they become even more impressive once chained. For example, let's try to filter values in array based on some criteria, process them in some way and reduce all that to one result.

```javascript
let myArray = [1, 2, 3, 4];

let sum = myArray.filter((number) => number % 2 === 0)
	.map((number) => number * 2)
	.reduce((total, number) => total + number); // sum = 12
```

In the example above, we filter each number in array based on whether it's even. Then we double the value of all even numbers. Finally, we sum up whatever is left and get 12. I don't know about you but I just love how it looks, so elegant and so easy to work with once you get it :)

## Resources

- [Functional programming in Javascript: map, filter and reduce](http://cryto.net/~joepie91/blog/2015/05/04/functional-programming-in-javascript-map-filter-reduce/)