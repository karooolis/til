# Function Expression vs. Function Declaration

The main difference between function expression and function declaration is that function expressions only load when interpreter reads the line of code that expresses the function. On the other hand, function declarations get hoisted which means that they are loaded before any code is executed. 

For a reference, function expression and function declaration look like the following:

```javascript
// Function declaration
function foo() {
	return "yoo";
}

// Function expression
var bar = function() {
    return "heyyy";
};
```

## Hoisting

To demonstrate hoisting, the main difference between function expression and declaration, look at the example below and inspect the result:

```javascript
alert(foo()); // "yoo"

function foo() {
	return "yoo";
}
```

`foo` will be called successfully despite the fact that it is declared after it gets invoked. This is because JavaScript engine puts it at the top no matter what, making the function available no matter where it's being called from.

Now, in contrast, you can only call functions declared via function expression after they have been declared in the code i.e. once interpreter has reached the line of the function.

```javascript
alert(foo()); // example.js:1 Uncaught TypeError: foo is not a function

let foo = function() {
	return "yoo";
}
```

The above example did not work and throws an error that `foo is not a function`. If we put the `foo()` call below the function expression, it will work as expected.

```javascript
let foo = function() {
	return "yoo";
}

alert(foo()); // "yoo"
```

## Which one to use?

Having observed what other JavaScript nerds have to say about this, the only good reason to use function declaration is so that you don't have to worry about calling undeclared functions as they will be hoisted to the top. This may lead to poorer code though and thus may not be such a good idea. Therefore, function expressions are always more desirable. But there are no hard-rules of which one to use so use. I believe just being aware of the difference is enough so you actually understand what the code is doing :)

## Resources

- [Function Declarations vs. Function Expressions](https://javascriptweblog.wordpress.com/2010/07/06/function-declarations-vs-function-expressions/)
- [What is the difference between a function expression vs declaration in JavaScript?](http://stackoverflow.com/questions/1013385/what-is-the-difference-between-a-function-expression-vs-declaration-in-javascrip)