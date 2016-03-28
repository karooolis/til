# Reading command line arguments

Today I started properly learning Node.js. I do not believe, among many, that JavaScript is the best back-end language out there simply of its imperfections. Nevertheless, based on research, I found out that Node.js facilitates for quick prototyping, and is perfect for building MVPs. It can support large-scale projects as well but for those I am personally inclined of using Scala or other statically typed languages which I am also very keen on exploring.

Anyway, today I started small by learning how to read command line arguents. It's done by accessing global object's `process` property `process.argv`, as in the example below:

```javascript
// print process.argv
process.argv.forEach((val, index, array) => {
  console.log(`${index}: ${val}`);
});
```

After executing the command `node program.js file.txt two foo=bar` we get the following output:

```javascript
0: /usr/local/bin/node
1: /Users/macbook/Documents/Projects/Sandbox/node-school/program.js
2: file.txt
3: two
4: foo=bar
```

The first element is the path to `node`, second element is the path to the program being run, and all the rest of the arguments are whatever you provide. Can't get any easier than this :)

## Resources

- [Official Node.js documentation, process object section](https://nodejs.org/docs/latest/api/process.html#process_process_argv)