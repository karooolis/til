# const vs. let vs. var

Today I learnt more `const` and `let` that were introduced in ECMAScript 6 as an addition to varialbles declaration keyword `var`. Let's look at each one of these separately to get an understanding of how they might be used.

## `var`

The good ol' `var`, still with us, still going strong. It allows to declare variables that are scoped to the nearest function block, unless it's declared outside a function block. Then the variable is global to the entire application.

Note that variables declared with `var` become visible in their enclosing function block and can be accessed in a line in the code before they are actually declared, if that makes sense. Have a look at the code below if it does not. You will see that you can access `i` in line 2 even before it's declared in line 4. However, it returns value `undefined` since no value has been assigned to `i` at that point.

```javascript
function varExample() {
	console.log("i before the loop", i);

	for (var i = 0; i < 5; i++) {
		console.log("i inside the loop", i);
	};

	console.log("i afer the loop", i);
};

OUTPUT:
i before the loop undefined
i inside the loop 0
i inside the loop 1
i inside the loop 2
i inside the loop 3
i inside the loop 4
i afer the loop 5
```

## `let`

`let` is the close cousin of `var`, albeit with some significant differences. In contrast to `var`, `let` is scoped to the nearest enclosing block, or global if outside any block, just like `var`. Thus, variables scope declared with `let` is just as big, or smaller, than that of `var`. `let` works just like variable declarations in most other languages where variables are declared by block scope rather than function scope. To have variables declared by function scope was and still is one among many JavaScript peculiarities.

Anyhow, let's look at an example below to get a better idea of how `let` and block scoping works.

```javascript
function letExample() {
	console.log("i before the loop", i);

	for (let i = 0; i < 5; i++) {
		console.log("i inside the loop", i);
	};

	console.log("i afer the loop", i);
};

OUTPUT:
ReferenceError: i is not defined
```

Now, since variable `i` is declared with `let i = 0`, it is only visible inside the `for loop` block. Thus, trying to access it outside the block will cause a reference error. Removing the calls causing reference errors, the output is as expected, see below.

```javascript
function letExample() {
	for (let i = 0; i < 5; i++) {
		console.log("i inside the loop", i);
	};
};

OUTPUT:
i inside the loop 0
i inside the loop 1
i inside the loop 2
i inside the loop 3
i inside the loop 4
```

Now, another two interesting examples to demonstrate the difference between function and block scoping:

```javascript
function varExample2() {
	let isTrue = false;

	if (isTrue) {
		var foo = "bar";
	} else {
		console.log(foo);
	}
};

OUTPUT:
undefined

function letExample2() {
	let isTrue = false;

	if (isTrue) {
		let foo = "bar";
	} else {
		console.log(foo);
	}
};

OUTPUT:
ReferenceError: foo is not defined
```

In the `varExample2()`, the `foo` variable declared with `var` is available, albeit `undefined`. This is because it is scoped to the entire function `varExample2()` and can be accessed anywhere from that function.

In contrast, in `letExample2()`, we get a reference error once again. This is because `foo` is declared with `let`, making the variable scoped by its enclosing block which in this case is the `if` statement.

## `const`

`const` is a cool one. It's similar to `final` variable declaration in Java where it makes the variable impossible to reassign with a different value once the variable has been already assigned with a value. This is where the name for `const` derives from, meaning constant. Also, it's worth remembering that `const` variables are block scoped, just like `let`.

Let's look for an example to get a better idea of how `const` works.

```javascript
function constExample() {
	const foo = "hello";

	console.log(foo);

	foo = "bye";
};

OUTPUT:
TypeError: Assignment to constant variable.
```
Just as expected, we cannot reassign `foo` with a new value.

## When to use each

There is no real reason to use `var` anymore for declaring variables. `let` works just as well for all situations and makes the code more predictable by signalling that the variable is only available for this block and it will definitely not reappear anywhere else.

As for `const`, it should be used to declare variables that will never change throughout the entirety of the program, such as access keys, names, configurations and things like that. From a technical standpoint, apparently it also allows JavaScript engines to compile the code in such way that it's more performant.

In summary, from now on I will only use `let` for variables that will have their values reassigned, and `const` for values for which I do not expect or want the value to change during the entirety of an application. As for `var`, I am not sure if there is any real reason to use it anymore and the Internet does not reveal any reasons either.

## Resources

- [let](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Statements/let)
- [const](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Statements/const)
- [Const in javascript? When to use it and is it necessary](http://stackoverflow.com/questions/21237105/const-in-javascript-when-to-use-it-and-is-it-necessary)
- [JavaScript ES6+: var, let, or const?](https://medium.com/javascript-scene/javascript-es6-var-let-or-const-ba58b8dcde75#.dq90wp1qi)
