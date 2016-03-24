# call vs. bind vs. apply

Today let's expore the differences between `call`, `bind` and `apply` by examining each of these separately first.

## `call`

The first use case for `call` is to use it for chaining object constructors. It allows to achieve what is similar to an inheritance tree in Java. An example of such constructor chaining can be seen below. We have a generic `Animal` constructor, and more specific constructors for `Zebra` and `Parrot` that inherit all properties of a generic animal i.e. name and gender.

The first argument for `call` is the context for `this` while the rest are just optional parameters.

```javascript
function Animal(name, gender) {
	this.name = name;
	this.gender = gender;
}

function Zebra(name, gender, specialPowers) {
	Animal.call(this, name, gender);
	this.specialPowers = specialPowers;
	this.type = "zebra";
}

function Parrot(name, gender, specialPowers) {
	Animal.call(this, name, gender);
	this.specialPowers = specialPowers;
	this.type = "parrot";
}

let zebra = new Zebra('Johnny', 'male', 'running at 5mph');
let parrot = new Parrot('Leyla', 'female', 'talking in English');
```

Another interesting example that I have never seen before is to use `call` for invoking anonymous functions as such:

```javascript
let animals = [zebra, parrot];

for (let i in animals) {
  (function(animal) {
    this.info = function() {
      console.log('#' + i + ': ' + this.type + ' ' + this.name
                  + ': ' + this.specialPowers);
    }
    this.info();
  }).call(animals[i], i);
}
```

Finally, perhaps the most common use case of `call` is to invoke functions with a specified context `this` such as in example below. It comes handy when you want to keep another context of `this` rather than the one created by the invoked function.

```javascript
function greet() {
  let reply = [this.type, this.name, this.specialPowers].join(' ');
  console.log(reply);
}

greet.call(zebra); // zebra Johnny running at 5mph
greet.call(parrot); // parrot Leyla talking in English
```

## `bind`

As defined by MDN, *"the bind() method creates a new function that, when called, has its `this` keyword set to the provided value, with a given sequence of arguments preceding any provided when the new function is called."*

In short, it's different to `call` in a sense that it does not invoke a new function but once it's invoked, it is already binded with a predefined `this` context.
```javascript
var Button = function(content) { 
  this.content = content;
};
Button.prototype.click = function() {
  console.log(this.content + ' clicked');
}

var myButton = new Button('OK');
myButton.click(); // OK clicked

var looseClick = myButton.click;
looseClick(); // undefined clicked because `this` is not myButton but the global object

var boundClick = myButton.click.bind(myButton);
boundClick(); // OK clicked, works as expected due to binding

// Additional exmaple showing binding some parameters
var sum = function(a, b) {
  return a + b;
};

var add5 = sum.bind(null, 5);
console.log(add5(10));
```

## `apply`

`apply` is very similar to `call` in a sense that they both invoke a given function. The only difference is in how the arguments are passed. In `call`, each argument is declared indivudally such as `greet.call(this, arg1, arg2, arg3, arg4)` while `apply` takes an array as an argument list as such `greet.apply(this, [arg1, arg2, arg3, arg4])`. Let's look at a quick example.

```javascript
function higherNumber(a, b) {
  console.log(Math.max.apply(null, [a, b]));
}

higherNumber(10, 5); // 10
higherNumber.apply(this, [10, 5]); // 10
higherNumber.call(this, 10, 5); // 10
```

You can see how `call` and `apply` behave the same.

## Summary

`call`, `apply` and `bind` all deal with the same fundamental problem - keeping `this` to the one required by the developer rather than the newly created context inside new function invocations. They are all helpful in scenarios such as async callbacks where the desired `this` would get lost in the way. Also, they help to prevent such code smells as `let that = this` where you want to save a given `this` for later. Embarrased to say, I used to that extensively!

In total, all of the methods discussed above have their place. `call` and `apply` are essentially the same, only the usage details differ. `bind` is helpful for predefining given functions with appropriate `this` context. It's definitely helpful to understand them and use wisely :)


## Resources

- [Function.prototype.call()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call)
- [Function.prototype.bind()](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_objects/Function/bind)
- [bind() interactive example](http://www.javascripture.com/Function#bind)
- [Function.prototype.apply()](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_objects/Function/apply)