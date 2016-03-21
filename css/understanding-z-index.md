# Understanding z-index

Today I learnt that z-index is a tad bit more complicated than what I thought. Until now, my assumption has been that elements with positive z-index and position set to anything other than static appear on top of other elements. The higher the z-index, the higher the elements appears in the page.

Luckily, this assumption got me so far without problem as I have never encountered edge case scenarios. However, this assumption can break easily in case the element you are trying to set `z-index` to apper in another HTML element with certain CSS rules which cause that element to create its own stacking context.

## Problem

Let's look at these two CodePen examples procuded by Philip Walton in his article [What No One Told You About Z-Index](http://philipwalton.com/articles/what-no-one-told-you-about-z-index/).

### [z-index example #1](http://codepen.io/philipwalton/pen/ksBaI)

```html
<div>
  <span class="red">Red</span>
</div>
<div>
  <span class="green">Green</span>
</div>
<div>
  <span class="blue">Blue</span>
</div>
```

```css
.red, .green, .blue {
  position: absolute;
  width: 100px;
  color: white;
  line-height: 100px;
  text-align: center;
}

.red {
  z-index: 1;
  top: 20px;
  left: 20px;
  background: red;
}

.green {
  top: 60px;
  left: 60px;
  background: green;
}

.blue {
  top: 100px;
  left: 100px;
  background: blue;
}
```

In example #1, the red rectangle is placed on top of other rectangles because it has z-index applied and no other rectangles do. The rest appear in the order that they appeared in HTML. In this example everything works as expected and there are no surprises. Now look at example #2.

### [z-index example #2](http://codepen.io/philipwalton/pen/dfCtb)

The HTML structure stays the same but CSS is as following:

```css
div:first-child {
  opacity: .99; 
}

.red, .green, .blue {
  position: absolute;
  width: 100px;
  color: white;
  line-height: 100px;
  text-align: center;
}

.red {
  z-index: 1;
  top: 20px;
  left: 20px;
  background: red;
}

.green {
  top: 60px;
  left: 60px;
  background: green;
}

.blue {
  top: 100px;
  left: 100px;
  background: blue;
}
```

In this example, the only additional CSS rule that has been applied is this:

```css
div:first-child {
  opacity: .99; 
}
```

The red rectangle is now at the bottom. What on earth happened here? The answer lays in understanding stacking context.

# Stacking context

Stacking context, according to [Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context) refers to the *three-dimensional conceptualization of HTML elements along an imaginary z-axis relative to the user who is assumed to be facing the viewport or the webpage. HTML elements occupy this space in priority order based on element attributes.*

If you don't run into any edge cases, z-index operates on global level where stacking context is based on the root element `HTML`. That's why z-index works in most cases. However, look at this comprehensive list by MDN which specifies how a new stacking context is formed by any element which is either:

- positioned (absolutely or relatively) with a z-index value other than "auto",
- a flex item with a z-index value other than "auto",that is the parent element display: flex|inline-flex,
- elements with an opacity value less than 1. (See the specification for opacity),
- elements with a transform value other than "none",
- elements with a mix-blend-mode value other than "normal",
- elements with a filter value other than "none",
- elements with a perspective value other than "none",
- elements with isolation set to "isolate",
- position: fixed,
- specifying any attribute above in will-change even if you don't specify values for these attributes directly
- elements with -webkit-overflow-scrolling set to "touch"

That's one comprehensive list shall I say. I don't think it's important to remember it all but it's important to understand how it affects application of z-index in case you run into any problems.

## Solution

Now we can start understanding why example #1 worked as expected and example #2 did not. Look at the markup of example #1 again (courtesy of [Philip Walton](http://philipwalton.com/)):

```html
<div><!-- 1 -->
  <span class="red"><!-- 6 --></span>
</div>
<div><!-- 2 -->
  <span class="green"><!-- 4 --><span>
</div>
<div><!-- 3 -->
  <span class="blue"><!-- 5 --></span>
</div>
```

Each comment tag above indicates elements' order in the stacking context. 

```html
<div><!-- 1 -->
  <span class="red"><!-- 1.1 --></span>
</div>
<div><!-- 2 -->
  <span class="green"><!-- 4 --><span>
</div>
<div><!-- 3 -->
  <span class="blue"><!-- 5 --></span>
</div>
```

The stacking context order is different for the second example where red rectangle now has an order of 1.1. As you may remember, the surrounding `div` tag had an extra CSS rule applied setting its `opacity: 0.99`. As a result, it has created its own stacking context taking out the red rectangle out of the stacking context created by the root element HTML. Thus, even if you try to set the red rectangle of `z-index: 9999`, it won't work. It will only make it appear on top of other rectangles elements that will appear in the same stacking context defined by the same surrounding div.

## Resources
- (What No One Told You About Z-Index)[http://philipwalton.com/articles/what-no-one-told-you-about-z-index/] by Philip Walton
- (The 	stacking context)[https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context] decription by Mozilla Developer network
- (W3 specification of z-index)[https://www.w3.org/TR/CSS2/zindex.html]


