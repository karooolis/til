# Default function parameters

Today's TIL is short but sweet and I cannot believe I was not aware of this new ES6 feature before. So, today I found out that you can set default values in ES6, similarly to Java for example.

In the example below, we supply function `multiply` with only one parameter setting `a` to 5. Since we do not declare the second parameter, the default one is used which is 1. In the second call we do declare `b` to 2, and thus default value is no longer used.

```javascript
function multiply(a, b = 1) {
  return a*b;
}

multiply(5); // 5
multiply(5, 2); // 10
```

The code above is essentially a syntactic sugar, albeit an awesome one, for ES5 function below:

```javascript
function multiply(a, b) {
  var b = typeof b !== 'undefined' ?  b : 1;

  return a*b;
}

multiply(5); // 5
```

## Resources

- [Default parameters (MDN)](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/default_parameters)