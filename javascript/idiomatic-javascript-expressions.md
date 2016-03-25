# Idiomatic JavaScript expressions using || and &&

Today I learnt about a clever use of `||` and `&&` for idiomatic JavaScript expressions. By idiomatic I mean the kind of expressions that take less code but are just as expressive.

## Assigning values

It is a common scenario to assign a variable to another variable only if it is not equal to `null`. It can be done in two ways, first one is the most common way, second one is the idiomatic way. I am digging the idiomatic expressions already!

```javascript
// Regular way
function foo(bar)
​	if (!bar) {
  	bar  = "Default value";
  }
}

// Idiomatic expression
function fooShortcut(bar)
  bar  = bar || "Default value";
}
```

## Returning function value

Another common scenario in JavaScript is return either `true` or `false` based on some condition. Compare the two equivalent functions below and let me know if you disagree that the second way is neater! The solution is simple but elegant.

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
   return age && age > 17 ;
}
```

## Condition based `if/else`

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

## Assigning values if other values exist

This one is similar to the first example above. The difference here is that instead of just checking one value, you are checking several values and assign a variable based on the condition.

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

### Credit

Most examples taken from [Javascript is Sexy](http://javascriptissexy.com/12-simple-yet-powerful-javascript-tips/).
