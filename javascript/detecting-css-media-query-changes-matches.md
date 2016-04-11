# Detecting CSS media query changes/matches

Today I came upon a [StackOverflow question](http://stackoverflow.com/questions/20181219/twitter-bootstrap-how-to-detect-when-media-queries-starts/36552369#36552369) asking how to detect media query changes. There were many solutions but all were a bit cumbersome so I came up with a better one by using `matchMedia`.

`matchMedia` allows to do media queries in JavaScript. This is very convenient for detecting when a given CSS media query is applied so as to synchronize the inner workings between CSS and JavaScript code.

Usage of `matchMedia` is very simple. The example below speaks for itself:

```javascript
if (window.matchMedia("(min-width: 400px)").matches) {
  /* the viewport is at least 400 pixels wide */
} else {
  /* the viewport is less than 400 pixels wide */
}
```

The only problem with above example is that it only runs once, when the page launches. However, it is common to want to detect when new CSS media query is applied. So either we would need to incorporate `window.resize()` for assistance, or use a library `enquire.js` which does just that for us.

The example below detects when any of Bootstrap CSS media queries are applied, and informs when any of them are matched or unmatched.

```javascript
let rules = [
    '(max-width: 768px)',  // extra small devices, default
    '(min-width: 768px)',  // small devices
    '(min-width: 992px)',  // medium devices
    '(min-width: 1200px)'  // large devices
];

for (let rule of rules) {
    enquire.register(rule, {
      match: function() {
        console.log(rule + ' matched');
      },      

      unmatch: function() {
        console.log(rule + ' unmatched');
      } 
    });
}
```

### [Demo](http://codepen.io/karolis/pen/dMdVRq)

## Resources 

- [Window.matchMedia()](https://developer.mozilla.org/en/docs/Web/API/Window/matchMedia)
- [matchMedia polyfill](https://github.com/paulirish/matchMedia.js)
- [enquire.js](http://wicky.nillia.ms/enquire.js/)