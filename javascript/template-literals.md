# Template literals

Today's TIL is short and sweet. It is about template literals that allow embedded expressions, similar to what you have in Ruby for example. Template literals also allow for multi-line strings and string interolation features.

Template literals are marked by back-ticks such as `\``.

## Multi-line strings

One feature that ES5 is severely lacking is multi-line strings. You would have to concatenate several strings appended with `\n` into one long string. It is a bit cumbersome to deal with, especially if the string is long. The code to accommodate that also did not look great. Luckily, ES6 is here for the rescue!

```javascript
console.log("string text line 1\n"+
"string text line 2");
// "string text line 1
// string text line 2"
```

## Expression interpolation

Expression interpolation allows to include variables in a string without using strings concatenation which is very convenient. 

```javascript
var a = 5;
var b = 10;
console.log(`Fifteen is ${a + b} and\nnot ${2 * a + b}.`);
// "Fifteen is 15 and
// not 20."
```

## Tagged template literals

Tagged template is a more advanced use of template literals. As MDN describes it, *with them you are able to modify the output of template literals using a function.*

In the example below we use a tagged template literal to output a string that uses `template` function to process the input.

```javascript
function template(strings, ...keys) {
  return (function(...values) {
    var dict = values[values.length - 1] || {};
    var result = [strings[0]];
    keys.forEach(function(key, i) {
      var value = Number.isInteger(key) ? values[key] : dict[key];
      result.push(value, strings[i + 1]);
    });
    return result.join('');
  });
}

var t1Closure = template`${0}${1}${0}!`;
t1Closure('Y', 'A');  // "YAY!" 
var t2Closure = template`${0} ${'foo'}!`;
t2Closure('Hello', {foo: 'World'});  // "Hello World!"
```

## Browser compatibility

Unfortunately though, a I am writing this TIL, the browser-support is still limited with Internet Explorer having no support for it just yet. Hopefully that will change soon.


## Resources

- [Template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) by MDN