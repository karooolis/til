# Critical Rendering Path

Today I learnt about critical rendering path and how it affects website's performance. Look at the picture below taken from [developers.google.com](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/?hl=en) which contrasts how differently optimized and unoptimized websites get rendered. 

![Progressive rendering](https://github.com/ramkarolis/til/blob/master/images/progressive-rendering.png "Progressive rendering")

Optimized (progressive) rendering is all about understanding how website's resources are loaded and rendered on the screen. By understanding that, you get the power to pipeline the resources in such way that most crucial parts of the website are loaded first, allowing the user to start interacting with the website quicker.

The process of rendering the page starts with constructing DOM and CSSOM trees. So let's examine first what these are.

## DOM tree

Below is an example of a plain HTML page with some text and an image. Upon receiving this document, the browser starts constructing a DOM object (Document Object Model) which the browser uses for further processing of the page.

```html
<html>
  <head>
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <link href="style.css" rel="stylesheet">
    <title>Critical Path</title>
  </head>
  <body>
    <p>Hello <span>web performance</span> students!</p>
    <div><img src="awesome-photo.jpg"></div>
  </body>
</html>
``` 

The DOM construction consists of the following 4 stages:

1. Conversion - the browser reads raw packet bytes and translates them individual characters based on specified encoding of the file i.e. UTF-8.
2. Tokenizing - tokens are built ouf of individual characters according to appropriate HTML standard declared in the markup such as W3C HTML5 standard.
3. Lexing - tokens constructed above are constructed into so called "objects" which define each node's properties and rules. For example, `<html>` object may behave differently from `<p>` object.
4. DOM construction - the final stage is to construct the DOM tree which essentially links the created objects into a tree data structure that captures parent-children relationships in the markup i.e. `<html>` object is a parent of `<body>` object and so on.

The screenshot above taken from Google illustrates the above process nicely:

![DOM Construction process](https://github.com/ramkarolis/til/blob/master/images/dom-construction-process.png "DOM Construction process")

The DOM tree captures the properties and relationships of the documet markup but it does not tell us how the elements should look like. This is where DOM's close cousin CSSOM tree comes into play.

With the DOM tree ready, we are able to start building its compadre, CSSOM tree.

## CSSOM tree

Just like with DOM tree, we need to build a data structure out of the code below that the browser can understand. To achieve that, CSSOM tree is built using essentially the same process as when using DOM tree.

```css
body { font-size: 16px }
p { font-weight: bold }
span { color: red }
p span { display: none }
img { float: right }
```

![CSSOM tree](https://github.com/ramkarolis/til/blob/master/images/dom-construction-process.png "CSSOM tree")

## Render tree

Once CSSOM and DOM trees are constructed, the browser builds a render tree as below. The purpose of render tree is to compute the layout of each visible element and use that as an input to the paint process. In paint process the pixels are finally rendered on the screen.

![Render tree construction](https://github.com/ramkarolis/til/blob/master/images/render-tree-construction.png "Render tree construction")

The process of render tree is as follows:

1. Start at the root of the DOM tree and traverse each visible node. Nodes with rule `display:none` and other nodes that do not affect the layout such as `<script>` tags are ignored.
2. For each visible node find the appropriate matching CSSOM rules and apply them.
3. Emit visible nodes with content and their computed styles.

Once we have the layout setup with the render tree, the pixels can finally be rendered on the screen!

## Recap of rendering process so far

To recap, the entire process of putting pixels on the screen goes as follows:

1. Process HTML markup and build the DOM tree.
2. Process CSS markup and build the CSSOM tree.
3. Combine the DOM and CSSOM into a render tree.
4. Run layout on the render tree to compute geometry of each node.
5. Paint the individual nodes to the screen.

As explained by Ilya Grigorik, *optimizing the critical rendering path is the process of minimizing the total amount of time spent in steps 1 through 5 in the above sequence.* So let's explroe how we can optimize the size by using our newly gained knowledge of how websites are rendered on the screen!

## Optimizing Critical Rendering Path

To optimize the CRP, we first need to consider the construction of DOM and CSSOM trees. Both of these are render blocking activities, meaning that the browser holds rendering of any processed content until these trees are constructed. 

This means that the user will not see any content until both, DOM and CSSOM trees are constructed. There is nothing we can do to circumvent the construction of DOM construction.

However, there is no need to construct a CSSOM tree for `print` media type if the user is not printing anything. Or there is no point in applying CSS rules of desktop devices when browsing the site on a mobile device. It just lengthens the rendering process. Instead, we can use media types and media queries as in example below to distinguish which CSS stylesheets we want to render.

```css
<link href="style.css" rel="stylesheet">
<link href="print.css" rel="stylesheet" media="print">
<link href="other.css" rel="stylesheet" media="(min-width: 40em)">
```

Note that all of the above will still be downloaded, albeit with lower priority than blocking priority. And only resources to whom the media type and media query conditions apply will be rendered.

JavaScript is also parser blocking meaning that when the browser encounters script tag, it must pause DOM construction, execute the script, and then come back to DOM construction, delaying when the page is rendered. It can be circumveneted by using `async` to delay the loading of JavaScript resources. Putting them at the bottom of `<body>` also helps by ensuring that all the markup and stylesheets up to that point are rendered.

In summary, to optimize the critical rendering path we need to:

- Minimize the number of critical resources (by using `async` or `defer`, media queries and media types)
- Minimize the number of critical bytes (compress resources)
- Minimize the critical path length (some resources can only be rendered after others are finished, lay the markup wisely to reduce the effects of render blocking. Render blocking resources should be downloaded first! CSS in the head, scripts at the bottom and preferably loaded asyncrhonously. Delay downloading of unnecessary images below the fold.)

Additional, more comprehensive performance optimization recommendations can be found at [PageSpeed rules and recommendations
](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/page-speed-rules-and-recommendations?hl=en) which is beyond today's TIL scope.

## Resources

- All of the above is taken from [Critical Rendering Path](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/?hl=en)