# Extending jQuery

Today I learnt how to extend jQuery to create your own jQuery methods such as below:

```javascript
$("#element").doSomethingCrazy(parameters, callback);
```

Such extension of jQuery can make the code more readable and easier to reason about. Let's look at a concrete example of how to achieve it:

```javascript
// Extend jQuery by using `extend` function
jQuery.fn.extend({
  generateRandomBg: function() {
    return this.each(function() { // iterate through each element in a selection since at this point `this` is an array of objects
      var randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
      return this.style.background = randomColor; // now `this` refers to individual DOM object
    });
  }
});

// Use the newly created $.generateRandomBg() method
$("html, body").on("click", function () {
  $(this).generateRandomBg();
});
```

The above code is fairly straightforward to understand. The basic principle is to use `jQuery.fn.extend` and provide it with any number of functions that will get attached to jQuery.

The only thing that caught me by suprise for a second but then made total sense is that `this` initially refers to an array of objects rather than an individual object. In order to manipulate individual object, you have to iterate over `this` where, consequantly the `this` inside the iteration will refer to an individual object. This is because one jQuery `click` event may be called on several DOM objects.

Anyhow, no wonder jQuery is so popular when it's so easy and pleasant to work with!

### [Demo](http://codepen.io/karolis/pen/YqNRLK/)