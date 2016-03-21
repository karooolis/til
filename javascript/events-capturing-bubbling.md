# Events capturing and bubbling

Today I spent deliberate effort on learning about JavaScript events propagation. I heard discussions about events propagation via bubbling and capturing before but never spent time figuring out how it works exactly, especially since jQuery handles events so nicely for you anyway.

It turned out to be a rather simple concept to understand. Bubbling up of an event refers to directing an event to its intended target. So, for example, consider the structure below:

```html
<div id="grandparent">
	<div id="parent">
		<div id="child"></div>
	</div>
</div>
```

and the following standard JavaScript event handler:

```javascript
let grandparent = document.getElementsById('grandparent');

grandparent.addEventListener('click', function (event) {
  doSomething();
});
```

In the example above, even if a `#child` gets clicked on, the event propagates all the way to the top until `#grandparent` element is reached that will capture the event. If there is no parent to handle the event, it will simply propagate to the document object, and will just disappear into the black hole unhandled.

The event can also be captured, which refers to trickling down of the event. Using the same HTML structure above, if `#child` element was clicked again, the `#grandparent` would handle the event, then `#parent`, then `#child`. To capture the event rather than let it bubble, use `true` as the third argument in `addEventListener` as in the example below.

```javascript
let grandparent = document.getElementsById('grandparent');

grandparent.addEventListener('click', function (event) {
  doSomething();
}, true);
```

## When to capture and when to bubble events?

I could not find any strong cases of why to ever use event capture rather than bubble event. It's grasping at the straws but according [StackOverflow](http://stackoverflow.com/questions/2661199/event-capturing-vs-event-bubbling/10335117#10335117) answer, capturing events may be slightly faster. However, the performance gains are unlikely to result in better user experience.

The other case where capturing events instead of bubbling may be more beneficial is when you want to handle the event earlier. So if it takes the event many layers to bubble up, use of events capturing may be worthwhile for some applications to explore as the event will potentially get handled sooner, and thus quicker.

Anyhow, the reality is that the whole capture/bubble events propagation thing used to be a platform issue where Internet Explorer adapted bubble model, while Netscape used capture model. But now bubbling is the standard way to handle events and it seems that the issue is more historical than anything. Nevertheless, it was interesting to now finally understand it properly.

## Stopping events propagation

One feature I discovered that may be useful is stopping events propagation. It stops the event from bubbling or capturing. I can't think of any examples from the top of my head of why it may be useful but there might be cases where you might want to prevent events from propagating. In such case, see the solution below!

```javascript
event = event || window.event;

if (event.stopPropagation) event.stopPropagation(); // W3C standard variant
else event.cancelBubble = true; // IE
```

## [Demo](http://codepen.io/karolis/pen/YqNWpm/)

To explore the events bubbling, capturing and stopping propagation, I have developed a [demo CodePen](http://codepen.io/karolis/pen/YqNWpm/) to demonstrate the concepts discussed above. Have a look, the code speaks a thousand words!

## Resources
- [Advanced event registration models](http://www.quirksmode.org/js/events_advanced.html) by QuirksMode
- [JavaScript Events: Save the Bubbles!](https://davidwalsh.name/javascript-events) by David Walsh