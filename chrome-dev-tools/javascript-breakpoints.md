# JavaScript breakpoints

Today I learnt about how to use Chrome debugging tools, primarily the use of `debugger`. All you have to do is put `debugger` anywhere in the code, as in the example below:

```javascript
let foo = doSomething();
let bar = funcs(foo);

debugger;
```

When the program encounters the keyword `debugger`, it stops execution presenting us with ability to inspect all the declared variables and go over the program step-by-step using the commands below (screenshot from Google Chrome Dev tools documentation):

![Chrome Dev tools breakpoint controls](https://github.com/ramkarolis/til/blob/master/images/breakpoint-controls.png "Chrome Dev tools breakpoint controls")

It is also possible to set breakpoints in the browser directly by going to the source of your script and clicking on the line number, as in the screenshot below. Then whenever the program encounters that line, the debugging panel opens up.

Setting up breakpoints via `debugger` keyword or directly on the browser are both incredibly useful features! However, so far I find `debugger` keyword to be used more often as a replacement for `console.log`. Partly old habits I guess but also you don't have to search for a specific line in the Google Chrome scripts panel since you already have the code opened up in the editor.

## Resources

- [Breakpoints](https://developers.google.com/web/tools/chrome-devtools/debug/breakpoints/add-breakpoints?hl=en)
- [Debugger keyword](https://developer.chrome.com/devtools/docs/console#setting-breakpoints-in-javascript)