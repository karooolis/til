# Maps and sets in ES6

Today I found out and explored new data structures in ES6, primarily `Map` and `Set`. Before ES6, there were no data structures for mapping values to values which made parts of coding process unnecessarily cumbersome. Luckily, ES6 with its new specifications and data structures is here!

## `Map`

`Map` data structure allows to use arbitrary values as keys.

### `Map` operations

`Map` consists of several useful operations that anyone from other backgrounds such as Java should already be familiar with. The example below speaks for itself and operations are self-explanatory.

```javascript
let map = new Map();
    
map.set('foo', 123);
map.get('foo'); //123
    
map.has('foo'); // true
map.delete('foo'); // true
map.has('foo'); // false

map.set('foo', true);
map.set('bar', false);

map.size; // 2
map.clear();
map.size; // 0
```

### Setting up a `Map`

`Map` can be set either via an iterable over key-value “pairs”, such as an array, or via a chain of `set` methods.

```javascript
// Iterable method
let map = new Map([
	[ 1, 'one' ],
	[ 2, 'two' ],
	[ 3, 'three' ]
]);

map.get(2); // 'two'

// Chain method
let map2 = new Map()
	.set(1, 'one')
	.set(2, 'two')
	.set(3, 'three');

map2.get(2); // 'two'
```

### Keys

One surprising thing I found about `Map`, but perhaps useful in some scenarios, is that any value can be a key, even an object:

```javascript
let map = new Map();

const KEY1 = {};
map.set(KEY1, 'hello');
console.log(map.get(KEY1)); // hello

const KEY2 = {};
map.set(KEY2, 'world');
console.log(map.get(KEY2)); // world
```

### Iterating `Map`

`Map` has three methods: `keys()`, `values()` and `entries()`. Each one return an array of either keys, values, or both, key and a value. Thus, when iterating `Map` data structure, any of these methods can be used to retrieve an array which can then be iterated over using all the traditional loop methods, as in the example below.

```javascript
let map = new Map([
  [false, 'no'],
  [true,  'yes'],
]);

for (let key of map.keys()) {
    console.log(key);
}
// Output:
// false
// true

for (let value of map.values()) {
    console.log(value);
}
// Output:
// no
// yes

for (let entry of map.entries()) {
    console.log(entry[0], entry[1]);
}
// Output:
// false no
// true yes

for (let [key, value] of map.entries()) {
  console.log(key, value);
}
```

There are many other useful things that can be done with `Map` such as filtering, use of spread operator and so on but this will be discussed in next TILs. For now I deliberately choose to not delve into these topics too deep but let myself be aware of the possibilities.

## `Set`

`Set` data structure is a type of data structure where no repeating values are allowed. `Set` operations and use of it is rather similar to `Map`, the key difference lies in the fact that key and value are the same in a `Set`.

### `Set` operations

```javascript
let set = new Set();
set.add('red');

set.has('red'); // true
set.delete('red'); // true
set.has('red'); // false

set.add('red');
set.add('green');

set.size; // 2
set.clear();
set.size; // 0
```

### Setting up a `Set`

```javascript
// Iterable method
let set = new Set(['red', 'green', 'blue']);

// Chain method
let set2 = new Set().add('red').add('green').add('blue');
```

### Iterating `Set`

Iterating `Set` is straightforward and can be done using any traditional loop methods. Note how in the examle, just like in `Map`, the values are iterated in order that they were inserted.

```javascript
let set = new Set(['red', 'green', 'blue']);
for (let x of set) {
  console.log(x);
}
// Output:
// red
// green
// blue
```

## Resources

- [ECMAScript 6: maps and sets](http://www.2ality.com/2015/01/es6-maps-sets.html) by 2ality
- [ES6 Data Structures](https://chrisrng.svbtle.com/es6-data-structures) by Chris Ng