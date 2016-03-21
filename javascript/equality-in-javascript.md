# Equality in Javascript: == vs. ===

JavaScript is well-known for its two type of equality operators `==` and `===`. I don't know a single other language that does it. So, what's the difference between the two?

`==` is so called lenient equality operator. It tries to compare two values even if their type is not the same. In order to do that, JavaScript translates values of different type to the same type, and then performs the strict equality in the end.

`===` is so called strict equality operator. It only considers values of the same type. However, it won't throw an error if you try to compare two different type values.

## Strict equality `===`

Strict equals compares two values of the same type. Thus, values with different types will never be equal. So, in case both values have the same type, the following assertions hold true:

```javascript
true !== false
undefined === undefined     // true
null === null               // true
undefined === null          // false
NaN === NaN                 // false, all languages implement that according to IEEE standard to prevent erroneous calculations 
5 === 5                     // true
"abc" === "abc"             // true
"abc" === new String("abc") // quite surprisingly false. This is because "abc" is a primitive while new String("abc") is object type.

let a = {}, b = {};
a === b                     // false, because it's not the same object
a === a                     // true
```

All the above examples behave like equality operators in all other sane languages.

## Lenient equality `==`

Lenient equality is perhaps one of the easiest ways to pick on JavaScript and call it a terrible language like many programmers enjoy doing. This is because lenient equality is indeed quite terrible and can result in unexpected behaviors. Remember, in the end, the machine can only compare values that are of the same type. Thus, JavaScript will perform type coercion where values being compared will be transformed to both have same type. That's just calling for a disaster.

Look at the examples below taken from the famous [JavaScript: The Good Parts](http://www.amazon.com/JavaScript-Good-Parts-Douglas-Crockford/dp/0596517742/ref=sr_1_1?s=books&ie=UTF8&qid=1458252924&sr=1-1&keywords=javascript+the+good+parts) by Douglas Crockford. 

```javascript
'' == '0'           // false
0 == ''             // true
0 == '0'            // true

false == 'false'    // false
false == '0'        // true

false == undefined  // false
false == null       // false
null == undefined   // true

' \t\r\n ' == 0     // true
```

Now, all of the above are crazy and even though I'm sure behind the scenes there is a logical explanations to all these equality operations, they don't make intuitive sense, making your program unreliable. If you don't understand what lenient equality operator `==` does, how can you guarantee the correctness of your program?

Now, let's look at a few other examples that make a bit more intuitive sense.

```javascript
null == undefined          // true and I exploit it myself in JavaScript programs quite often

1 == true                  // true because anything above 0 is true, like most languages. Boolean is first converted to an integer. As long as boolean is > 0, the equality will hold true.
0 == true                  // false

5 == '5'                   // true, string gets converted to integer

"true" == true             // false. Wll done JavaScript for at least not failing here
"abc" == new String("abc") // true because string object got converted to a primitive
```

## Summary

Summary is short in today's TIL. In goes as this - use strict equality `===`!! Only do lenient equality if you know what you are doing. For example using `variable == null` is quite common as it checks for both, `null` and `undefined`. But stay cautious!

Also, in addition of strict equality being predictable, it will never be slower than lenient equality because it does not do type coercion. So that's an added bonus as well to keep in mind :)

## Resources
- [Equality in JavaScript: === versus ==](http://www.2ality.com/2011/06/javascript-equality.html)
- [Does it matter which equals operator (== vs ===) I use in JavaScript comparisons?](http://stackoverflow.com/questions/359494/does-it-matter-which-equals-operator-vs-i-use-in-javascript-comparisons)