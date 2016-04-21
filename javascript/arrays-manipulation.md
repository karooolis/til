# Arrays manipulation (push or delete at specific index)

Today I had to work with arrays quite a bit, especially removing an item at specific index, or pushing a new item at a given index.

## Deleting items

The code below is an example taken from David Walsh blog that lets us remove an item with specific value at a given index which we find out using `indexOf`.

```javascript
// Start with an initial array
lets array = ["a", "b", "c"];

// Find and remove item from an array
lets i = array.indexOf("b");
if(i != -1) array.splice(i, 1);
```

If we want to remove all values from a given array, the code below will do. We just loop through an array, and if value we are looking for is detected, we delete it from the array by taking advantage of `splice`.

```javascript
for (let i = array.length-1; i--;) {
	if (array[i] === "b") array.splice(i, 1);
}
```

## Pushing items

Now, in order to push an item to a JavaScript array, `splice` once again comes handy. It can take 3 arguments where the 3rd argument is an item that we want to push, as seen below:

```javascript
// The original array
let array = ["one", "two", "four"];

// splice(position, numberOfItemsToRemove, item)
array.splice(2, 0, "three"); // ["one", "two", "three", "four"];
```

In order to make the above function slightly more convenient, we can extend an Array prototype as such:

```javascript
Array.prototype.insert = (index, item) => {
  this.splice(index, 0, item);
};

let array = ["one", "two", "four"];
array.insert(2, "three"); // ["one", "two", "three", "four"];
```

## Resources

- [Remove an Item From an Array with JavaScript](https://davidwalsh.name/remove-item-array-javascript)
- []()