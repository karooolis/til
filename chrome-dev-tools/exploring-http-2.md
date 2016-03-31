# Exploring HTTP/2

A lot of best practices for reducing critical rendering path as discussed in [previous TIL](https://github.com/ramkarolis/til/blob/master/html-css/critical-rendering-path.md) are effectively working around the core deficiencies of HTTP/1 or HTTP/1.1.

Since HTTP/2 is already with us and can be used, and is used by giants such as Google or Twitter, I decided to explore a little bit more what the hype is all about.

Note that today's TIL does not really fit into any categories but since I use Chrome Dev Tools for inspecting network performance, I will leave the entry in "Chrome Dev Tools" section for now.


## Aim of HTTP/2

The aim of HTTP/2 is to improve web performance and address limitations of HTTP/1.x, mostly inefficient way to fetch resources from the server to the client. So, the aim of HTTP/2 is to improve web performance by:

- Incorporating more efficient use of network resources;
- Reduced perception of latency.


## HTTP/2 characteristics

In this section let's explore the main characteristics introduced in the new HTTP/2 protocol:

- Better resource usage
⋅⋅- Only one TCP connection per web server (unlike up to 6 TCP connections in HTTP/1.1);
- Promote uptake
⋅⋅- Reuse of existing HTTP message semantics
⋅⋅- Reuse of http:// and https:// URI schemes
- Simplify parsing and permit multiplexing
⋅⋅- Binary framing layer replaces legacy text syntax
- Protection against pervasive monitoring
⋅⋅- “Optional” use of TLS encryption for privacy
- Allows servers to “push” responses proactively into client caches


## HTTP/2 binary framing and streams

The second to last characteric in previous section may be a bit confusing but it is perhaps the most important one. It states that one of HTTP/2 new capabilities is *"Binary framing layer replaces legacy text syntax"*. To explain that in human language, HTTP/1 used to transfer data as plain text which is not as straightforward for computers to process as binary representation. Thus, in HTTP/2 binary representation has been incorporated where request and response messages are split into one or more frames, and the frame is represented in binary.

As a result, the frames can be transmitted via streams where multiple streams can be concurrently active in a connection (multiplexing). The streams can also be handled in any order, thus seemingly reducing round-trip time. In contrast, in HTTP/1.* the browser would have to wait for all packets to come in a sequence and only then was able to do something with them.

To be honest, I am still struggling to understand how multiplexing works exactly. But the effect it helps to achieve is shown below where same amount of resources can now be downloaded a lot faster:

![Multiplexing example](https://github.com/ramkarolis/til/blob/master/images/multiplexing.png "Multiplexing example")


## How to find out what protocol is being used

There are a number of ways to check what protocol has been used to fetch website resources but the easiest one I found is as in the screenshow below:

![YouTube using HTTP/2](https://github.com/ramkarolis/til/blob/master/images/youtue-h2.png "YouTube using HTTP/2")

All you have to do is open Chrome Dev Tools, open "Network" tab, right-click on the network resources list and mark a checkbox for "Protocol" which will show what protocol has been used to fetch each resource. As you can see, YouTube is already taking advantage of HTTP/2 and using it for pretty much all of its resources.

## What do I need to do about it?

As a server administrator, you will need to configure your server to use HTTP/2 protocols and provide a fallback to HTTP/1.* in case the user's browser does not support the new protocol. As for the client, nothing changes, it is made to work as seamlessly as possible.

As for a front-end developer such as myself, I am still not sure how it will impact my work. It is clear that there will be no need to use domain-sharding anymore and other trickeries like that. It seems like a lot of optimizations will come from how the server is configured rather than the front-end. As soon as I have to build a new project using HTTP/2, I will explore further the optimizations techniques I can use as a front-end developer to use it to its full potential.

## Summary

HTTP/2 is a great protocol that overcomes many issues of HTTP/1.* which so far has served us for good 15 years. The new protocol integrates well with existing technologies and will not add any extra difficulties to the Internet users. The server administrators will have some work to do though to prepare their websites to work with HTTP/2.

As for front-end peeps, I am still not sure how it affects what I will be doing in terms of performance other than the fact that a large proportion of current optimization techniques such as HTTP/1 will become irrelevant. However, I imagine that image spriting, lazy-loading, concatenation and minimization will still be just as relevant.

## Resources

- [HTTP/2 demo](http://www.http2demo.io/)
- [HTTP/2 Frequently Asked Questions](https://http2.github.io/faq/)