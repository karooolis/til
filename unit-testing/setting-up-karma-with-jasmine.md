# Setting up Karma with Jasmine

It has been awhile since I became interested in incorporating unit testing in my projects but never got around to it. In today's TIL I will be explore how to set up Karma with Jasmine for one's project.

Before we go further, let's clear up what Karma and Jasmine do because it always confused me. 

Karma, in the simplest terms, is a browser test runner. It runs whatever tests you have declared in specified browsers and reports the results.

Jasmine, on the other hand, is a testing framework. It allows to write the tests that Karma runs.

## Installation

It is relatively straightforward to set up Karma with Jasmine. First, let's install Karma in our project's directory.

```
# Install Karma:
$ npm install karma --save-dev

# Install plugins that your project needs:
$ npm install karma-jasmine karma-chrome-launcher --save-dev

# Optional, for convenience. Allows to write `karma start` vs `./node_modules/karma/bin/karma start` as an example:
$ npm install -g karma-cli
```

Now we need to setup Karma configuration file in `karma.conf.js` such as one below: 

```javascript
// Karma configuration
// Generated on Wed Apr 06 2016 14:14:55 GMT+0400 (SAMT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
        'src/*.js',
        'src/test/*.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
```

The best course of action, if you do not have a configuration file that works for you from previous projects is to initiate command `karma init` which will run through configuration options which are straightforward.

## Usage

To use Karma with Jasmine we first need to declare some tests. Let's declare an example test at `src/test/test.js`:

```javascript
describe('JavaScript addition operator', function () {
    it('adds two numbers together', function () {
        expect(1 + 2).toEqual(3);
    });
});
```

The test simply checks if the addition is working properly. I will not delve into details of Jasmine syntax, that is left for another TIL.

Now, to run the following test, we issue a command `karma start`. It will run all the tests in our preconfigured file paths on our selected browsers and report the results as such:

![Karma reporting](https://github.com/ramkarolis/til/blob/master/images/karma-jasmine-basics.png "Karma reporting")

Here you go, that's it for today. In the following TILs I will explore Karma and Jasmine separately in more detail.

## Resources

- [Karma](https://karma-runner.github.io/0.13/index.html)
- [Jasmine](http://jasmine.github.io/)
- [https://egghead.io/lessons/unit-testing-introduction-to-karma](https://egghead.io/lessons/unit-testing-introduction-to-karma)
- [Karma vs testing framework Jasmine, Mocha, QUnit](http://stackoverflow.com/questions/26032124/karma-vs-testing-framework-jasmine-mocha-qunit)