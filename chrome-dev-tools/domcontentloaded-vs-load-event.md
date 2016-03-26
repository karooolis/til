# `DOMContentLoaded` vs. `load` event

Today I learnt the exact difference between `DOMContentLoaded` versus `load` event. While I knew vaguely what both of these terms mean, the fuzziness of my understanding led me to find it out for sure.

## `DOMContentLoaded`

According to official [Google Developers documentation](https://developers.google.com/web/tools/chrome-devtools/profile/network-performance/resource-loading) *"`DOMContentLoaded` is fired when the initial markup of a page has been parsed."* 

So in short, all `DOMContentLoaded` shows is the time it took to download all your site's markup has been downloaded and DOM tree has been constructed. 

## `load` event

*"`load` is fired when a page has fully loaded."* While `DOMContentLoaded` shows the time of how long it took to parse markup of a page, `load` event signifies the amount of time it took to download all the resources that are referenced in markup i.e. stylesheets, images, scripts, other files. Thus, we can consider the page fully complete only after `load` event has been fired.

## How to find out both

It is easy to find out when `DOMContentLoaded` and `load` events are fired by using Chrome Dev Tools. All you have to do is go to "Network" timeline, and look for blue and red lines in network timeline. Blue line shows when `DOMContentLoaded` event has been fired while red line shows when `load` event has been fired.

Also, you can see the exact time it took both of these events to fire at the bottom (footer) of Chrome Dev Tools "Network" tab.

![DOMContentLoaded](https://github.com/ramkarolis/til/blob/master/images/domcontentloaded-load-event.png "DOMContentLoaded")

Before we wrap up today's TIL, have you spotted anything unusual in the timeline above? What you should have spotted is that there are still files being downloaded after `load` event is fired. This is because the downloading of some files is deferred until later, the classic example being images lazy loading where images are only loaded when the user has scrolled down some amount of pixels from the top. There are many other such scenarios where files are not downloaded immediately such as initially hidden images on the slideshow, or deferred loading of certain JavaScript scripts.