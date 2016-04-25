# Rest parameters

Today I learnt about another ES6 feature called rest parameters. As MDN puts it, *rest parameter syntax allows us to represent an indefinite number of arguments as an array.*

Rest parameters in ES6 are used as in example below, the key is declaring the last paramter in function parameter list with a preceding `...` such as `...a`. This turns `a` into array that contains the rest of the parameters in an array.

```javascript
function f (x, y, ...a) {
  return a;
}
f(1, 2, "hello", true, 7); // ["hello", true, 7]
```

The above example can be written in ES5 as well but it's slightly more cumbersome and confusing syntax, as can be seen in the example below.

```javascript
function f (x, y) {
    var a = Array.prototype.slice.call(arguments, 2);
    return a;
};
f(1, 2, "hello", true, 7); // ["hello", true, 7]
```

## Resources

- [Rest parameters (MDN)](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/rest_parameters)