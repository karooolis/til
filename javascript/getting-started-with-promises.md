# Getting started with JavaScript Promises

Today I learnt the magic behind JavaScript [Promises](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise). Just like callbacks, Promises enable to write asynchronous code facilitating for faster execution of single-threaded JavaScript programs. However, in contrast to callbacks, Promises are an official API created for writing async code and thus by design steer you in writing much more readable and maintainable code. Exciting, right? If you agree, let's get started!

## Browser support

First, let's cover browser support and get that out of the way. Promises have been officialy released with [ECMAScript 2015](http://www.ecma-international.org/ecma-262/6.0/#sec-promise-objects), thus some browsers are still not fully supported, most notably Internet Explorer. Chrome is fine all the way to version 45 and Firefox does just as well. For full coverage, check out [caniuse.com](http://caniuse.com/#feat=promises).

While the browser support for Promises is fairly good, it's not complete unfortunately. Lucky for us, there are several libraries already that help you get around this such as the following:

- [Q](https://github.com/kriskowal/q)
- [when](https://github.com/cujojs/when)
- [WinJS](http://msdn.microsoft.com/en-us/library/windows/apps/br211867.aspx)
- [RSVP.js](https://github.com/tildeio/rsvp.js)
- [Promise.js](https://www.promisejs.org/)

Out of all of them, RSVP.js and Promise.js are the closest to official Promise API implementation. However, Promise is similar to code patterns in a sense thus the underlying principle stays the same for all of these libraries, and only implementation details differ.

## Promise states

Now let's get to the nitty gritty of the Promises by first reviewing the states that a Promise may be in while fulfilling a request. It will become clear why it's important to understand these once we have at a code sample.

- `fulfilled` - The action relating to the promise succeeded;
- `rejected` - The action relating to the promise failed;
- `pending` - Promise hasn't fulfilled or rejected yet, work in progress os to speak;
- `settled` - Promise has fulfilled or rejected, it's done.

## Basic usage

For coding examples, official Promise API is used to avoid ambiguity. The most basic way of creating a new Promise can be seen below:

```javascript
let promise = new Promise((resolve, reject) => {
  // perform something, anything, even async task

  if (/* everything worked fine */) {
    resolve("Send back data, a message or anything!");
  } else {
    reject(Error("Send back an error message"));
  }
});
```

Immediately a few things jump out. First, `new Promise()` constructor is used for creating new Promises. A Promise must be provided with `resolve` and `reject` functions which are called based on the result of the task performed inside the Promise. If the task completed successfully, call `resolve`. If the task failed, call `reject`.

Now, at this stage we want to handle the Promise decared above. Promises are called and handled as such:

```javascript
promise.then((result) => {
  console.log(result); // "Yay, the Promise worked and got resolved"
}).catch((error) => {
  console.log(error); // Error: "Bugger, the Promise got rejected"
});
```

The above code is fairly straightforward. But it does not reveal the true power of Promise. Let's deep further to explore Promises chaining!

## Promises chaining

The true power of Promises lays in the ability to chain them one after another. This allows to handle number of asynchronous tasks one after another in a neat way without getting into callbacks hell.

Consider the example below. Our aim is to roll three dices, one after another, and in total get a sum of less than 6. Note that DRY principle is not followed here, it's all just for demonstration sake.

In order to achieve our desired goal of rolling three dices, one after another, by using Promises chaining we need to wrap each Promise in a function that returns the promise. Each Promise *rolls* a dice and resolves the function if total sum of dices is yet to reach 6.

By returning Promise as a result of a function, it gives us ability to use `.then(...)` whenever that function executes, and then a `.then(...)` after that, and so on, until we reach the desired state. Note that if any of the Promises do not get resolved, the entire chain will break.

```javascript
let rollFirstDice = function() {
	let promise = new Promise((resolve, reject) => {
		// Roll the first dice
		let dice = Math.floor(Math.random() * 6) + 1;
		let sum = dice;
		
		// If dice is below 6, resolve the Promise and keep the chain going
		if (dice < 6) {
			resolve(dice);
		} else {
			reject(new Error('Failure, the dices sum is ' + sum + ' which is above the limit of 5!'));
		}
	});

	return promise;
}

let rollSecondDice = function(sum) {
	let promise = new Promise((resolve, reject) => {
		// Roll the second and add it to first dice
		let dice = Math.floor(Math.random() * 6) + 1;
		sum += dice;	
	
		// If the sum is still below 6, resolve the Promise
		if (sum < 6) {
			resolve(dice);
		} else {
			reject(new Error('Failure, the dices sum is ' + sum + ' which is above the limit of 5!'));
		}
	});

	return promise;
}

let rollThirdDice = function(sum) {
	let promise = new Promise((resolve, reject) => {
		// Roll third dice and add to the total sum
		let dice = Math.floor(Math.random() * 6) + 1;
		sum += dice;	

		if (sum < 6) {
			resolve(sum);
		} else {
			reject(new Error('Failure, the dices sum is ' + sum + ' which is above the limit of 5!'));
		}
	});

	return promise;
}

rollFirstDice()
	// Notice here how we pass rollSecondDice as a resolve function to the Promise returned by rollFirstDice.
	// This kind of pattern allows to chain Promises, very neat!
	.then(rollSecondDice, (error) => {
		console.log(error);
	})
	.then(rollThirdDice, (error) => {
		console.log(error);
	})
	.then((sum) => {
		console.log('Woohoo, we managed to roll three dices with the sum of ' + sum + ' which is less than 6!!');
	}, (error) => {
		console.log(error);
	});
```

I won't even try to show how the above example would look in callbacks. There is a reason why a term [callback hell](http://callbackhell.com/) and I don't want to go there :D

## More practical example

The above code is important to understand but is fairly useless. Following the previous example, let's try out something more useful such as fetching two remote APIs, one after another, and using the results of both.

First, let's put a Promise wrapper around `XMLHttpRequest` that will allow us to conveniently fetch external APIs.

```javascript
let get = (url) => {
	// Return a new promise.
	return new Promise((resolve, reject) => {
		// Do the usual XHR stuff
		var req = new XMLHttpRequest();
		req.open('GET', url);

		req.onload = () => {
			// This is called even on 404 etc
			// so check the status
			if (req.status == 200) {
				// Resolve the promise with the response text
				resolve(req.response);
			} else {
				// Otherwise reject with the status text
				// which will hopefully be a meaningful error
				reject(Error(req.statusText));
			}
		};

		// Handle network errors
		req.onerror = () => {
			reject(Error("Network Error"));
		};

		// Make the request
		req.send();
	});
}
```

The above code resolves on successful HTTP request, and rejects otherwise. As an example, let's try to fetch some text from [Hipster Jesus API](http://hipsterjesus.com/).

```javascript
get('http://hipsterjesus.com/api/').then((response) => {
  console.log("Success!", response);
}, (error) => {
  console.error("Failed!", error);
});
```

If you understood the code in previous examples, this one should be extremely easy to understand. Now let's look at an example of how API calls can be chained.

```javascript
get('http://hipsterjesus.com/api/').then((response) => {
	console.log("Do something with the response! Perhaps use its value in making the next API call", response);

	return new Promise((resolve, reject) => {
		get('http://hipsterjesus.com/api/').then((response) => {
			console.log(response);
		});
	});
}).then((response) => {
	console.log("Second response!", response);
});
```

Now, we make one call to the API, and return a Promise that makes another call. In this way we can keep on chaining Promises indefinitely. However, I'm not sure at this moment if that's the best way to do it. If you know a better way, please let me know in the comments! Otherwise, I will update this thread whenever I find a better way to chain Promises in a cleaner manner, if it's possible at all. However, even then, I find this code, especially the dices example much more readable than callbacks. Thus, *viva la fiesta* Promises!


## Resources

- [Write Better JavaScript with Promises](https://davidwalsh.name/write-javascript-promises) by Landon Schropp
- [JavaScript Promises - There and back again](http://www.html5rocks.com/en/tutorials/es6/promises/) by Jake Archibald
- [Promises](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise)



