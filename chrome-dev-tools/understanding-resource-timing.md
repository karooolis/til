# Understanding Resource Timing

Resoursce timing helps to understand the phases that take place when gathering resources over the network. It is crucial to understand these to be able to identify network performance bottlenecks and fix them. Thus, today I took time to learn resource timing in greater detail by using Chrome Dev Tools.

## Phases of network request

![Phases of network request](https://github.com/ramkarolis/til/blob/master/images/resource-timing.png "Phases of network request")

### 1. Queuing and/or Stalled/Blocking

Resources are not always queued but if they are, it indicates that the request may be:

- Postponed by the rendering engine because it's considered lower priority than critical resources. For example, scripts and styles are often given higher priority than images.
- The request was put on hold to wait for an unavailable TCP socket that's about to free up.
- The request was put on hold because the browser only allows six TCP connections per origin on HTTP/1.
- Time spent making disk cache entries, typically very quick.

After queueing we may also experience stalling or blocking. It indicates the request spent waiting before it could be sent.  Stalling/blocking can occur because of any of the reasons described for Queueing. Additionally, this time is inclusive of any time spent in proxy negotiation.

The most common issue I found in practise is the limitation of six TCP connections per origin on HTTP/1. This can be overcome by using CDNs and domain sharding where you distribute the downloading of resources over several domains, eliminating the limitation of six TCP connectonts per origin.

### 2. DNS Lookup

DNS Lookup shows time spent performing the DNS lookup. Every new domain on a page requires a full roundtrip to do the DNS lookup. Thus, this makes the domain sharding technique described in above section slightly less effective due to additional time taken to lookup each new domain.

### 3. Initial Connection

Initial Connection indicates the time taken to establish a connection, including TCP handshakes/retries and negotiating a SSL.

### 4. Request Sent / Waiting (TTFB)

Request Sent shows time spent issuing the network request. Typically a fraction of a milisecond because at this stage the TCP handshake is completed and the request size is negligible. Thus it travels as fast as the network allows.

Waiting (TTFB - Time to First Byte) phase is executed immediately after the request is sent. It tells us the time spent waiting for the initial response. TTFB captures the latency of a round trip to the server in addition to the time spent waiting for the server to deliver the response.

![Slow TTFB](https://github.com/ramkarolis/til/blob/master/images/slow-ttfb.png "Slow TTFB")

Slow TTFB (over the recommended 200ms) may have two potential causes:

1. Bad network conditions between client and server, or
2. A slowly responding server application

To improve the network conditions between client and server, it's advisable to first host the application as close to the client as possible. Usually CDNs are really good at this so probably the best choice would be to go with one of them and trust their expertise of delivering your content in a highly optimized manner.

If TTFB is still slow, something is up with the application itself. The application is replying too slow which may be caused by a number of issues i.e. slow algorithms, inefficient database queries, improper server configuration, slow hardware and so on. There are a host issues and it is up to the developer to find out the culprit of the problem in this case.

### 5. Content Download

When first byte is received, the actual downloading of a file starts. Content download phase tells us time spent receiving the response data. If it takes a long time to download files, improving TTFB or other metrics will not help. It is usually an indicator that the files are too big. Thus, the only way to improve content download speed is to reduce the file sizes if possible.

![Large content indicator](https://github.com/ramkarolis/til/blob/master/images/large-content-indicator.png "Large content indicator")

## Resources

- [Understanding Resource Timing](https://developers.google.com/web/tools/chrome-devtools/profile/network-performance/understanding-resource-timing) - most definitions are copied from here.