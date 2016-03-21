# Speed based scrollTo

It's really common to use smooth scrolling functionality instead of immediate jump when linking parts of the page. This helps the user keep track of where he is at and not get lost.

The most common way to achieve this is with jQuery with something along those lines:

```javascript
let duration = 2000;

$('html, body').animate({
    scrollTop: $("#elementToScrollTo").offset().top
}, duration);
```

The problem with the above approach is that scrolling is based on duration rather than speed. Thus, if you have some links close to the top of the page, the entire page may scroll really slowly. And if you have an element somewhere far away at the bottom, the same duration may cause the scrolling to be too quick.

Here is my own solution to use constant scrolling speed when linking to any element on the screen:

```javascript
$('a[data-anchor]').on('click', function(e) {
  e.preventDefault();
  
  let anchor = $(this).attr('data-anchor');
  let top = $('div[data-name=' + anchor + ']').offset().top;

  let scrolledTop = $(window).scrollTop();
  let distance = Math.abs(scrolledTop - top);
  let duration = distance;

  $('html, body').animate({scrollTop:top}, duration);
});
```

The idea is to calculate the scroll animation duration based on how far the user has already scrolled on the screen, and how far is the element that the user wants to be *scrolled* to. For example, if the user has already scrolled `2000px` from the top of the page, and has clicked a link to an area on the page that is `200px `from the top, the duration is `2000 - 200 = 1800` which we pass to jQuery `animate` function. Now, each pixel will take 1ms to scroll.Simple and effective :)

Demo on [CodePen](http://codepen.io/karolis/pen/wGWRJO/).

By the way, in previous edition of this TIL there was a gotcha. The scrolling animation duration was only based on how far element is from the top of the page and didn't take into accout how much the user has already scrolled. That made scrolling animation to some elements much faster than to others. With this update, the animation speed will always stay constant.