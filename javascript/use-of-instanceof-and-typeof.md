# Use of `instanceof` and `typeof`

Today I needed to check if a variable is an instance of a specific class. It has been achieved by using `instanceof` as follows:

```javascript
if (foo instanceof NumbersFormatter) {
	console.log('`foo` is instance of NumbersFormatter, hooray!');
} else {
	console.log('`foo` is not an instance of NumbersFormatter, booh!');
}
```

Having used `typeof` and `instanceof` many times before but never fully understanding how they work or what they do exactly, today is a good day to invetigate them both more thoroughly.

## `instanceof`

According to MDN, *the `instanceof` operator tests whether an object has in its prototype chain the prototype property of a constructor*.

The syntax of `instanceof` is simple - `object instanceof constructor` where `object` is the object we want to test and `constructor` is the function to test against. The examples below from MDN show useful caes where `instanceof` can be used:

```javascript
// defining constructors
function C(){}
function D(){}

var o = new C();

// true, because: Object.getPrototypeOf(o) === C.prototype
o instanceof C;

// false, because D.prototype is nowhere in o's prototype chain
o instanceof D;

o instanceof Object; // true, because:
C.prototype instanceof Object // true

C.prototype = {};
var o2 = new C();

o2 instanceof C; // true

// false, because C.prototype is nowhere in
// o's prototype chain anymore
o instanceof C; 

D.prototype = new C(); // use inheritance
var o3 = new D();
o3 instanceof D; // true
o3 instanceof C; // true
```

## 'typeof'

MDN defines 'typeof' as follows - *The typeof operator returns a string indicating the type of the unevaluated operand.*

The syntax of 'typeof' is also simple - `typeof operand` where `typeof` is followed by operand which is simply an expression representing the object or primitive whose type is to be returned.

The table below summarizes the supported types and values that `typeof` returns for these types:

Type     | Result
-------- | ---------
Undefined  | "undefined"
Null  | "object"
Boolean  | "boolean"
Number  | "number"
String  | "string"
Symbol  | "symbol"
Function object  | "function"
Any other object | "object"

Examples by the MDN:

```javascript
// Numbers
typeof 37 === 'number';
typeof 3.14 === 'number';
typeof Math.LN2 === 'number';
typeof Infinity === 'number';
typeof NaN === 'number'; // Despite being "Not-A-Number"
typeof Number(1) === 'number'; // but never use this form!

// Strings
typeof "" === 'string';
typeof "bla" === 'string';
typeof (typeof 1) === 'string'; // typeof always returns a string
typeof String("abc") === 'string'; // but never use this form!

// Booleans
typeof true === 'boolean';
typeof false === 'boolean';
typeof Boolean(true) === 'boolean'; // but never use this form!

// Symbols
typeof Symbol() === 'symbol'
typeof Symbol('foo') === 'symbol'
typeof Symbol.iterator === 'symbol'

// Undefined
typeof undefined === 'undefined';
typeof declaredButUndefinedVariable === 'undefined';
typeof undeclaredVariable === 'undefined'; 

// Objects
typeof {a:1} === 'object';

// use Array.isArray or Object.prototype.toString.call
// to differentiate regular objects from arrays
typeof [1, 2, 4] === 'object';

typeof new Date() === 'object';

// The following is confusing. Don't use!
typeof new Boolean(true) === 'object'; 
typeof new Number(1) === 'object'; 
typeof new String("abc") === 'object';


// Functions
typeof function(){} === 'function';
typeof class C {} === 'function';
typeof Math.sin === 'function';
```

## Which one to use?

'typeof' should be used when we want to check if a variable is of a given type such as number, string, boolean, etc.

On the other hand, `instanceof` does not work with primitive types and is only useful in cases where we want to check if object was built using a given constructor or a given constructor exists in object's prototype chain.

Note that `instanceof` returns truthy value too easily, as in the example right below. In the example below, `typeof` would behave in an expected way while it is not immediately clear why `instanceof` returns true..

```javascript
function Class() {};
Class.prototype = Function;

var funcWannaBe = new Class;

console.log(funcWannaBe instanceof Function); //true
console.log(typeof funcWannaBe === "function"); //false
funcWannaBe(); //Uncaught TypeError: funcWannaBe is not a function
```

## Resources

- [Which is best to use: typeof or instanceof?](http://stackoverflow.com/questions/899574/which-is-best-to-use-typeof-or-instanceof) from StackOverflow
- [instanceof](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/instanceof) by MDN
- [typeof](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/typeof) by MDN