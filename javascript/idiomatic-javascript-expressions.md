# Idiomatic JavaScript expressions using || and &&

Today I learnt about a clever use of `||` and `&&` for idiomatic JavaScript expressions. By idiomatic I mean the kind of expressions that take less code but are just as expressive.

## 1. Assigning values

It is a common scenario to assign a variable to another variable only if it is not equal to `null`. It can be done in two ways, first one is the most common way, second one is the idiomatic way. I am digging the idiomatic expressions already!

```javascript
// Regular way
function foo(bar) {
​	if (!bar) {
		bar  = "Default value";
	}
}

// Idiomatic expression
function fooShortcut(bar) {
	bar  = bar || "Default value";
}

// Another way to declare default function parameter
function fooShortcut2(bar) {
	bar = typeof bar !== 'undefined' ? bar : "Default value";
}
```

## 2. Returning function value

Another common scenario in JavaScript is to return either `true` or `false` based on some condition. Compare the two equivalent functions below and let me know if you disagree that the second way is neater! The solution is simple but elegant.

```javascript
// Regular way
function isAdult(age) {
	if (age && age > 17) {
		return true;
	} else {
		return false;
	}
}

// Short circuiting with &&
function isAdult(age) {
   return age && age > 17;
}
```

## 3. Condition based `if/else`

Another, less intuitive application of idiomatic expressions is to execute a function based on some condition. Have a look below for an example.

While I am not excited about this one as much as previous examples because it takes more effort to decipher, it is still pretty cool. Thus, I will probably not use such expresision in my own code simply because such code, in my opinion, is harder to read and maintain.

```javascript
// Regular way
if (userName) {
  logIn (userName);
}
 else {
   signUp ();
}

// Idiomatic expression
userName && logIn (userName) || signUp ();
```

## 4. Assigning values if other values exist

This one is similar to the first example where we set a variable to value only if the value was not `null`. The difference here is that instead of just checking one value, you are checking several values and assign a variable based on the condition.

```javascript
let user = {
	id: 1023,
	name: "Karolis",
	loggedIn: true
};

// Regular way
let userID;
​if (user && user.loggedIn) {
  userID = user.id;
} else {
  userID = null;
}

// Idiomatic expression
let userID = user && user.loggedIn && user.id
```

## Summary

Idiomatic expresions are cool! They are more expressive and thus take less code to write but are just as easy to read and understand. However, some examples above are more intuitive than others. For this reason I will use the less intuitive examples (#3 and #4) sparingly while from now on I will try to find any situation where idiomatic expressions presented in examples #1 and #2 could be used.

### Credit

Examples taken from and inspired by [Javascript is Sexy](http://javascriptissexy.com/12-simple-yet-powerful-javascript-tips/).
