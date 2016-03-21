# Looping objects

Today I took some time to understand how to loop JavaScript objects properly.

## `for ... in` implementation

One of the most common ways to loop objects is to use the following syntax.

```javascript
for (let key in object) {
	if (!object.hasOwnProperty(key)) continue; // skip loop if the property is from prototype
	console.log(key + " = " + object[key]);
}
```

This loops through each key in the object which is what we desire. However, it also loops through each prototype higher up in the prototype chain which in most cases is undesirable. To understand the above code better, let's investigate the following piece of code where we declare a `Person` class constructor and `Student` class constructor that extends `Person`:

```javascript
// Person constructor
function Person(name, age) {
	this.name = name;
	this.age = Number(age);
}

Person.prototype.sayHi = function sayHi() {
	return 'Hi, ' + this.name + '!';
};

Person.prototype.sayHelloAll = function() {
	return 'Hello everyone!';
};

// Extend Person (Student is a type of Person)
function Student(name, age, college) {
	this.college = college;
  Person.call(this, name, age);
}

Student.prototype = Object.create(Person.prototype);

Student.prototype.echo = function echo() {
  console.log(Person.prototype.sayHi.call(this));
};

// Declaring objects
var student = new Student("Hubert", "22", "George Tech");
var person = new Person("Neil", "21");
```

As you can see, `Person` has properties of `name` and `age`, plus its prototype has been declared with `sayHi` and `sayHelloAll` funcions.

`Student` inherits all the same properties, plus gains additional one called `college`, and Student's prototype also gets additional method `echo`.

Now let's try to loop through the newly created `student` and `person` objects using `for...in` syntax.

```javascript
/*
 * OUTPUT:
 * name = Neil
 * age = 22
 */
for (var key in person) {
	if (!person.hasOwnProperty(key)) continue; // skip loop if the property is from prototype
	console.log(key + " = " + person[key]);
}

/*
 * OUTPUT:
 * college = George Tech
 * name = Hubert
 * age = 22
 */
for (var key in student) {
	if (!student.hasOwnProperty(key)) continue; // skip loop if the property is from prototype
	console.log(key + " = " + student[key]);
}
```

The above output looks reasonable. Person has name and age properties while student has an additional college propery. However, one question. What about the `sayHi`, `sayHelloAll` and `echo` functions? Where did they disappear?

The answer lies in the fact that `hasOwnProperty` does not look at the prototype chain of the object. Both functions are declared as part of the object's prototype, not the object itself, and thus `hasOwnProperty('sayHi'` returns `false`. It may seem confusing at first but it sinks in eventually.

To demonstrate what's happening, let's just quickly have a look at what happens when you remove `hasOwnPropery` check:

```javascript
/*
 * OUTPUT:
 * name = Neil
 * age = 22
 * sayHi = function sayHi() { return 'Hi, ' + this.name + '!'; }
 * sayHelloAll = function () { return 'Hello everyone!'; }
 */
for (var key in person) {
	console.log(key + " = " + person[key]);
}

/*
 * OUTPUT:
 * college = George Tech
 * name = Hubert
 * age = 22
 * sayHi = function sayHi() { return 'Hi, ' + this.name + '!'; }
 * sayHelloAll = function () { return 'Hello everyone!'; }
 * echo = function echo() { console.log(Person.prototype.sayHi.call(this)); }
 */
for (var key in student) {
	console.log(key + " = " + student[key]);
}
```

In the above example, not only the name, age and college got into the output but also previously skipped functions. This is because `for...in` loops through the entire prototype chain and outputs whatever it finds there. So if you extend an `Array` object for example, you will get a long list of unwanted functions and property names that in most cases will be not relevant to you.

## `Object.keys` alternative

The alternative to the above somewhat verbose syntax became available at ES5. The syntax is not that much less verbose but it's more readable, at least in my opinion. Have a look:

```javascript
/*
 * OUTPUT:
 * name = Neil
 * age = 22
 */
Object.keys(person).forEach(function(key) {
    console.log(key + " = " + person[key]);
});

/*
 * OUTPUT:
 * college = George Tech
 * name = Hubert
 * age = 22
 */
Object.keys(student).forEach(function(key) {
    console.log(key + " = " + student[key]);
});
```

## Summary

Looping objects in JavaScript is fairly straightforward. You can choose between two alternatives, `for...in` and `Object.keys`, both of which work well. `Object.keys` is more readable in more opinion but `for...in` appears to be faster according to [this test](http://jsperf.com/objdir). The differences in performance are negligible though so just use what makes your heart warm :)