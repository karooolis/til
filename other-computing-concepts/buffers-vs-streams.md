# Buffers vs. streams

Today I learnt the difference between buffers and streams as my knowledge about these concepts until now was rather vague. Still is, but at acceptable level, at least for the moment.

In general, streams are for reading and writing binary data from files, the network, etc. In other words, is the information being passed in a binary format between two interacting points via a connection.

Buffers, on the other hand, allow to speed up memory access by reading a few thousand bytes at once, rather than one byte at a time which is very inefficient.

## Buffers and streams in Node.js

The above descriptions generally apply to all languages. In Node.js specifically, *"buffers provide a binary-friendly, higher-performance alternative to strings by exposing raw memory allocation outside the V8 heap"*. Buffers in JavaScript can be declared like any other data structures. They are commonly used in Node.js libraries where data is written or being read from files, network, etc.

```javascript
buf = new Buffer(256);
buf.write("Simply Easy Learning");
```

In Node.js, streams provide a way to read/write data in chunks. Rather than reading a huge file all at once, it can be split into chunks. Streams are `EventEmitters` and thus emit events as they process chunks. This allows the developer to listen for those events and use data from that chunk.

Streams can be readable, writable and duplex but more about it in another TIL. Below is an example of a readable stream where `file.txt` is being read into stream and processed using event emitter `data`.

```javascript
var fs = require('fs');
var readableStream = fs.createReadStream('file.txt');
var data = '';

readableStream.setEncoding('utf8');

readableStream.on('data', function(chunk) {
    data+=chunk;
});

readableStream.on('end', function() {
    console.log(data);
});
```

## Resources

- [What is the difference between streams and buffers in JavaScript/Node.js?](https://www.quora.com/What-is-the-difference-between-streams-and-buffers-in-JavaScript-Node-js)
- [Node fundamentals: Timers, EventEmitters, Streams and Buffers](http://book.mixu.net/node/ch9.html)
- [The Basics of Node.js Streams](http://www.sitepoint.com/basics-node-js-streams/)
- [What exactly does “Stream” and “Buffer” mean in Java I/O?](http://stackoverflow.com/questions/15984789/what-exactly-does-stream-and-buffer-mean-in-java-i-o)





treams (InputStream, OutputStream and everything that extends these) are for reading and writing binary data from files, the network, or whatever other device.

Readers and writers are for reading and writing text (characters). They are a layer on top of streams, that converts binary data (bytes) to characters and back, using a character encoding.

Reading data from disk byte-by-byte is very inefficient. One way to speed it up is to use a buffer: instead of reading one byte at a time, you read a few thousand bytes at once, and put them in a buffer, in memory. Then you can look at the bytes in the buffer one by one.

Oracle's Java tutorial about I/O explains it in detail.

Looking at the line of code you provided:

BufferedReader br=new BufferedReader(new InputStreamReader(System.in));
System.in is an InputStream. You create an InputStreamReader which reads bytes from System.in. Then you wrap that in a BufferedReader.

So, in the end, you have a BufferedReader that reads from an InputStreamReader that reads from System.in.

