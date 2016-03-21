# Touch device detection

Today I learnt that there is no good way to detect if the device used to access your site is touch screen. 

The current method of touch device detection used by [Modernizr](https://modernizr.com/) itself is as follows:

```javascript
var hasTouch = 'ontouchstart' in window;
```

Apparently, that's not reliable enough due to browser inconsistencies and there have been many [issues](https://github.com/Modernizr/Modernizr/issues/880) posted about this. This is due to the fact that touch events are used for touch device detection. However, not all touch devices expose touch events such as IE Mobile. Furthermore, some non-touch devices expose touch events adding to further confusion. Makes total sense, right?

There are some workarounds documented by Stu Cox in his blog post [You Can't Detect a Touchsreen](http://www.stucox.com/blog/you-cant-detect-a-touchscreen/) but all have their own caveats. He also explains in better detail why currently there is no good way to accurately detect touch devices.

Thus, in can be concluded that if your design relies on detecting whether the device is touch screen, such as the one I was implementing these days, you are in for a disappointment.

Currently, my own solution is to detect if the device is touch-screen based on the imperfect Modernizr implementation of touch device detection by doing the following:

```javascript
if (Modernizr.touch) { 
  document.getElementsByTagName('body')[0].className+=' touchscreen';
}
```

If the device is detected as `touch` device, the body gets added `touch-screen` class which allows to add conditional CSS classes based on the presence of the class. For example, if the device is touchscreen, you could remove hover effects and make sure that the content that mouse-device users see on hover can be seen by touch-device visitors at all times.

```css
.my-hover-element {
	opacity: 0;
}

.my-hover-element:hover {
	opacity: 1;
}

body.touchscreen .my-hover-element {
	opacity: 1;
}
```

On top of that, I use media queries and assume that the device is touchscreen below a certain display width.

```css
@media(max-width:768px) {
	.my-hover-element {
		opacity: 1;
	}
}
```

These techniques are far from perfect and I wouldn't use them for critical application features. However, the implementation works in vast majority of cases and is enough for simple nice-to-have design touches where an incorrect detection of touch or mouse device will not cause major problems.

