# Jasmine test cases

In today's TIL I am exploring all types of unit tests that Jasmine allows to write.

## Test composition

Each test case in Jasmine contains `describe` function with two parameters: title of a spec suite and a function `it`. Like `describe`, `it` takes a string which is the name of a spec, and a function which runs the test. 

Within spec suite defined by `describe` function you can have a number of spec tests defined by function `it`, as such:

```javascript
describe("A suite", function() {
  it("contains spec with an expectation", function() {
    expect(true).toBe(true);
  });

  it("contains spec with another expectation", function() {
    expect(true).toBe(!false);
  });
});
```

## Expectations

Jasmine tests rely on expectation built with the function `expect` which takes a value which is referred to as the actual. The actual is the result of a condition we want to test such as `2 + 2` or `add(2, 2). The expectation is chained with Matcher function, which accepts the expected value.

All matchers can be seen in the example below ([taken from Jasmine documentation](http://jasmine.github.io/2.4/introduction.html)). There is a bunch that works for most scenarios. However, if needed, you can still create your own Matcher function [as shown here](http://jasmine.github.io/2.4/custom_matcher.html).

```javascript
describe("Included matchers:", function() {

  it("The 'toBe' matcher compares with ===", function() {
    var a = 12;
    var b = a;

    expect(a).toBe(b);
    expect(a).not.toBe(null);
  });

  describe("The 'toEqual' matcher", function() {

    it("works for simple literals and variables", function() {
      var a = 12;
      expect(a).toEqual(12);
    });

    it("should work for objects", function() {
      var foo = {
        a: 12,
        b: 34
      };
      var bar = {
        a: 12,
        b: 34
      };
      expect(foo).toEqual(bar);
    });
  });

  it("The 'toMatch' matcher is for regular expressions", function() {
    var message = "foo bar baz";

    expect(message).toMatch(/bar/);
    expect(message).toMatch("bar");
    expect(message).not.toMatch(/quux/);
  });

  it("The 'toBeDefined' matcher compares against `undefined`", function() {
    var a = {
      foo: "foo"
    };

    expect(a.foo).toBeDefined();
    expect(a.bar).not.toBeDefined();
  });

  it("The `toBeUndefined` matcher compares against `undefined`", function() {
    var a = {
      foo: "foo"
    };

    expect(a.foo).not.toBeUndefined();
    expect(a.bar).toBeUndefined();
  });

  it("The 'toBeNull' matcher compares against null", function() {
    var a = null;
    var foo = "foo";

    expect(null).toBeNull();
    expect(a).toBeNull();
    expect(foo).not.toBeNull();
  });

  it("The 'toBeTruthy' matcher is for boolean casting testing", function() {
    var a, foo = "foo";

    expect(foo).toBeTruthy();
    expect(a).not.toBeTruthy();
  });

  it("The 'toBeFalsy' matcher is for boolean casting testing", function() {
    var a, foo = "foo";

    expect(a).toBeFalsy();
    expect(foo).not.toBeFalsy();
  });

  it("The 'toContain' matcher is for finding an item in an Array", function() {
    var a = ["foo", "bar", "baz"];

    expect(a).toContain("bar");
    expect(a).not.toContain("quux");
  });

  it("The 'toBeLessThan' matcher is for mathematical comparisons", function() {
    var pi = 3.1415926,
      e = 2.78;

    expect(e).toBeLessThan(pi);
    expect(pi).not.toBeLessThan(e);
  });

  it("The 'toBeGreaterThan' matcher is for mathematical comparisons", function() {
    var pi = 3.1415926,
      e = 2.78;

    expect(pi).toBeGreaterThan(e);
    expect(e).not.toBeGreaterThan(pi);
  });

  it("The 'toBeCloseTo' matcher is for precision math comparison", function() {
    var pi = 3.1415926,
      e = 2.78;

    expect(pi).not.toBeCloseTo(e, 2);
    expect(pi).toBeCloseTo(e, 0);
  });

  it("The 'toThrow' matcher is for testing if a function throws an exception", function() {
    var foo = function() {
      return 1 + 2;
    };
    var bar = function() {
      return a + 1;
    };

    expect(foo).not.toThrow();
    expect(bar).toThrow();
  });

  it("The 'toThrowError' matcher is for testing a specific thrown exception", function() {
    var foo = function() {
      throw new TypeError("foo bar baz");
    };

    expect(foo).toThrowError("foo bar baz");
    expect(foo).toThrowError(/bar/);
    expect(foo).toThrowError(TypeError);
    expect(foo).toThrowError(TypeError, "foo bar baz");
  });
});
```

## Setup and Teardown

The `beforeEach` function is called once before each spec in the describe in which it is called, and the `afterEach` function is called once after each spec. In the example below, we increment foo by one before each spec, and reset it back to 0 after each spec is finished.

```javascript
describe("A spec using beforeEach and afterEach", function() {
  var foo = 0;

  beforeEach(function() {
    foo += 1;
  });

  afterEach(function() {
    foo = 0;
  });

  it("is just a function, so it can contain any code", function() {
    expect(foo).toEqual(1);
  });

  it("can have more than one expectation", function() {
    expect(foo).toEqual(1);
    expect(true).toEqual(true);
  });
});
```

The `beforeAll` function is called only once before all the specs in describe are run, and the `afterAll` function is called after all specs finish.

```javascript
describe("A spec using beforeAll and afterAll", function() {
  var foo;

  beforeAll(function() {
    foo = 1;
  });

  afterAll(function() {
    foo = 0;
  });

  it("sets the initial value of foo before specs run", function() {
    expect(foo).toEqual(1);
    foo += 1;
  });

  it("does not reset foo between specs", function() {
    expect(foo).toEqual(2);
  });
});
```

## Nesting `describe` blocks

Calls to `describe` can be nested, allowing to compose specs as a tree of functions. In such nesting, `beforeEach` and `afterEach` functions are executed at a level they were declared at, and at the children levels. Thus, this is similar to block scoping of variables where variable declared at parent level is available at children leve.

```javascript
describe("A spec", function() {
  var foo;

  beforeEach(function() {
    foo = 0;
    foo += 1;
  });

  afterEach(function() {
    foo = 0;
  });

  it("is just a function, so it can contain any code", function() {
    expect(foo).toEqual(1);
  });

  it("can have more than one expectation", function() {
    expect(foo).toEqual(1);
    expect(true).toEqual(true);
  });

  describe("nested inside a second describe", function() {
    var bar;

    beforeEach(function() {
      bar = 1;
    });

    it("can reference both scopes as needed", function() {
      expect(foo).toEqual(bar);
    });
  });
});
```

## Skipping suites

`xdescribe` function allows to disable the test suite making any specs inside to be skipped. I presume this is helpful for cases when you want to disable a test suite temporarily but do not want to get rid of it entirely by commenting or deleting it. So whenever you want to disable a test suite temporarily, `xdescribe` looks very useful.

```javascript
xdescribe("A spec", function() {
  var foo;

  beforeEach(function() {
    foo = 0;
    foo += 1;
  });

  it("is just a function, so it can contain any code", function() {
    expect(foo).toEqual(1);
  });
});
```

## Pending specs

`xit`, similar to `xdescribe`, allows to write pending specs that do not get evaluated when running test suite. Empty `it` with no test function also works the same.

```javascript
describe("Pending specs", function() {
	xit("can be declared 'xit'", function() {
    expect(true).toBe(false);
  });

  it("can be declared with 'it' but without a function");

  it("can be declared by calling 'pending' in the spec body", function() {
    expect(true).toBe(false);
    pending('this is why it is pending');
  });
});
```

## Spies

Spies are used to stub any function and track calls to it and all arguments. A spy only exists in the `describe` or `it` block in which is is defined, and will be removed after each spec.

These are the 3 Matches used with spies:
- `toHaveBeenCalled` matcher will return true if the spy was called.
- `toHaveBeenCalledTimes` matcher will pass if the spy was called the specified number of times.
- `toHaveBeenCalledWith` matcher will return true if the argument list matches any of the recorded calls to the spy.

```javascript
describe("A spy", function() {
  var foo, bar = null;

  beforeEach(function() {
    foo = {
      setBar: function(value) {
        bar = value;
      }
    };

    spyOn(foo, 'setBar');

    foo.setBar(123);
    foo.setBar(456, 'another param');
  });

  it("tracks that the spy was called", function() {
    expect(foo.setBar).toHaveBeenCalled();
  });

  it("tracks that the spy was called x times", function() {
    expect(foo.setBar).toHaveBeenCalledTimes(2);
  });

  it("tracks all the arguments of its calls", function() {
    expect(foo.setBar).toHaveBeenCalledWith(123);
    expect(foo.setBar).toHaveBeenCalledWith(456, 'another param');
  });

  it("stops all execution on a function", function() {
    expect(bar).toBeNull();
  });
});
```

### `jasmine.createSpy`

When there is not a function to spy on, `jasmine.createSpy` can create a “bare” spy. This spy acts as any other spy – tracking calls, arguments, etc. But there is no implementation behind it. Spies are JavaScript objects and can be used as such.

```javascript
describe("A spy, when created manually", function() {
  var whatAmI;

  beforeEach(function() {
    whatAmI = jasmine.createSpy('whatAmI');

    whatAmI("I", "am", "a", "spy");
  });

  it("is named, which helps in error reporting", function() {
    expect(whatAmI.and.identity()).toEqual('whatAmI');
  });

  it("tracks that the spy was called", function() {
    expect(whatAmI).toHaveBeenCalled();
  });

  it("tracks its number of calls", function() {
    expect(whatAmI.calls.count()).toEqual(1);
  });

  it("tracks all the arguments of its calls", function() {
    expect(whatAmI).toHaveBeenCalledWith("I", "am", "a", "spy");
  });

  it("allows access to the most recent call", function() {
    expect(whatAmI.calls.mostRecent().args[0]).toEqual("I");
  });
});
```

## Matching anything with `jasmine.any`

`jasmine.any` takes a constructor or “class” name as an expected value. It returns true if the constructor matches the constructor of the actual value.

```javascript
describe("jasmine.any", function() {
  it("matches any value", function() {
    expect({}).toEqual(jasmine.any(Object));
    expect(12).toEqual(jasmine.any(Number));
  });

  describe("when used with a spy", function() {
    it("is useful for comparing arguments", function() {
      var foo = jasmine.createSpy('foo');
      foo(12, function() {
        return true;
      });

      expect(foo).toHaveBeenCalledWith(jasmine.any(Number), jasmine.any(Function));
    });
  });
});
```

## Matching existence with `jasmine.anything`

`jasmine.anything` returns `true` if the actual value is not `null` or `undefined`.

```javascript
describe("jasmine.anything", function() {
  it("matches anything", function() {
    expect(1).toEqual(jasmine.anything());
  });

  describe("when used with a spy", function() {
    it("is useful when the argument can be ignored", function() {
      var foo = jasmine.createSpy('foo');
      foo(12, function() {
        return false;
      });

      expect(foo).toHaveBeenCalledWith(12, jasmine.anything());
    });
  });
});
```

## Partial matching with `jasmine.objectContaining`

`jasmine.objectContaining` is for those times when an expectation only cares about certain key/value pairs in the actual.

```javascript
describe("jasmine.objectContaining", function() {
  var foo;

  beforeEach(function() {
    foo = {
      a: 1,
      b: 2,
      bar: "baz"
    };
  });

  it("matches objects with the expect key/value pairs", function() {
    expect(foo).toEqual(jasmine.objectContaining({
      bar: "baz"
    }));

    expect(foo).not.toEqual(jasmine.objectContaining({
      c: 37
    }));
  });

  describe("when used with a spy", function() {
    it("is useful for comparing arguments", function() {
      var callback = jasmine.createSpy('callback');

      callback({
        bar: "baz"
      });

      expect(callback).toHaveBeenCalledWith(jasmine.objectContaining({
        bar: "baz"
      }));

      expect(callback).not.toHaveBeenCalledWith(jasmine.objectContaining({
        c: 37
      }));
    });
  });
});
```

## Partial Array Matching with `jasmine.arrayContaining`

`jasmine.arrayContaining` is for those times when an expectation only cares about some of the values in an array.

```javascript
describe("jasmine.arrayContaining", function() {
  var foo;

  beforeEach(function() {
    foo = [1, 2, 3, 4];
  });

  it("matches arrays with some of the values", function() {
    expect(foo).toEqual(jasmine.arrayContaining([3, 1]));
    expect(foo).not.toEqual(jasmine.arrayContaining([6]));
  });

  describe("when used with a spy", function() {
    it("is useful when comparing arguments", function() {
      var callback = jasmine.createSpy('callback');

      callback([1, 2, 3, 4]);

      expect(callback).toHaveBeenCalledWith(jasmine.arrayContaining([4, 2, 3]));
      expect(callback).not.toHaveBeenCalledWith(jasmine.arrayContaining([5, 2]));
    });
  });
});
```

## String Matching with `jasmine.stringMatching`

`jasmine.stringMatching` is for when you don’t want to match a string in a larger object exactly, or match a portion of a string in a spy expectation.

```javascript
describe('jasmine.stringMatching', function() {
  it("matches as a regexp", function() {
    expect({foo: 'bar'}).toEqual({foo: jasmine.stringMatching(/^bar$/)});
    expect({foo: 'foobarbaz'}).toEqual({foo: jasmine.stringMatching('bar')});
  });

  describe("when used with a spy", function() {
    it("is useful for comparing arguments", function() {
      var callback = jasmine.createSpy('callback');

      callback('foobarbaz');

      expect(callback).toHaveBeenCalledWith(jasmine.stringMatching('bar'));
      expect(callback).not.toHaveBeenCalledWith(jasmine.stringMatching(/^bar$/));
    });
  });
});
```

## Custom asymmetric equality tester

When you need to check that something meets a certain criteria, without being strictly equal, you can also specify a custom asymmetric equality tester simply by providing an object that has an `asymmetricMatch` function.

```javascript
describe("custom asymmetry", function() {
  var tester = {
    asymmetricMatch: function(actual) {
      var secondValue = actual.split(',')[1];
      return secondValue === 'bar';
    }
  };

  it("dives in deep", function() {
    expect("foo,bar,baz,quux").toEqual(tester);
  });

  describe("when used with a spy", function() {
    it("is useful for comparing arguments", function() {
      var callback = jasmine.createSpy('callback');

      callback('foo,bar,baz');

      expect(callback).toHaveBeenCalledWith(tester);
    });
  });
});
```

## Jasmine Clock

The Jasmine Clock is available for testing time dependent code.

Jasmine Clock is installed with a call to `jasmine.clock().install` in a spec or suite that needs to manipulate time.

Do not forget to uninstall Jasmine Clock with `jasmine.clock().uninstall` you are done to restore the original functions.

The clock is useful to make `setTimeout` or `setInterval` synchronous, executing the registered functions only once the clock is ticked forward in time.

To execute registered functions, move time forward via the `jasmine.clock().tick` function, which takes a number of milliseconds.

Additionally, the Jasmine Clock can also be used to mock the current date. If you do not provide a base time to mockDate it will use the current date.

```javascript
describe("Manually ticking the Jasmine Clock", function() {
  var timerCallback;

  beforeEach(function() {
    timerCallback = jasmine.createSpy("timerCallback");
    jasmine.clock().install();
  });

  afterEach(function() {
    jasmine.clock().uninstall();
  });

  it("causes a timeout to be called synchronously", function() {
    setTimeout(function() {
      timerCallback();
    }, 100);

    expect(timerCallback).not.toHaveBeenCalled();

    jasmine.clock().tick(101);

    expect(timerCallback).toHaveBeenCalled();
  });

  it("causes an interval to be called synchronously", function() {
    setInterval(function() {
      timerCallback();
    }, 100);

    expect(timerCallback).not.toHaveBeenCalled();

    jasmine.clock().tick(101);
    expect(timerCallback.calls.count()).toEqual(1);

    jasmine.clock().tick(50);
    expect(timerCallback.calls.count()).toEqual(1);

    jasmine.clock().tick(50);
    expect(timerCallback.calls.count()).toEqual(2);
  });

  describe("Mocking the Date object", function(){
    it("mocks the Date object and sets it to a given time", function() {
      var baseTime = new Date(2013, 9, 23);

      jasmine.clock().mockDate(baseTime);

      jasmine.clock().tick(50);
      expect(new Date().getTime()).toEqual(baseTime.getTime() + 50);
    });
  });
});
```

## Asynchronous Support

This section is useful for running specs that require testing asynchronous operations.

Calls to `beforeAll`, `afterAll`, `beforeEach`, `afterEach`, and it can take an optional single argument that should be called when the async work is complete.

This spec will not start until the `done` function is called in the call to `beforeEach` above. And this spec will not complete until its `done` is called.

By default jasmine will wait for 5 seconds for an asynchronous spec to finish before causing a timeout failure. If the timeout expires before done is called, the current spec will be marked as failed and suite execution will continue as if done was called.

If specific specs should fail faster or need more time this can be adjusted by passing a timeout value to it, etc.

If the entire suite should have a different timeout, `jasmine.DEFAULT_TIMEOUT_INTERVAL` can be set globally, outside of any given describe.

```javascript
describe("Asynchronous specs", function() {
  var value;

  beforeEach(function(done) {
    setTimeout(function() {
      value = 0;
      done();
    }, 1);
  }); 

  it("should support async execution of test preparation and expectations", function(done) {
    value++;
    expect(value).toBeGreaterThan(0);
    done();
  }); 

  describe("long asynchronous specs", function() {
    beforeEach(function(done) {
      done();
    }, 1000);

    it("takes a long time", function(done) {
      setTimeout(function() {
        done();
      }, 9000);
    }, 10000);

    afterEach(function(done) {
      done();
    }, 1000);
  });
});
```

## Summary

Jasmine is an extremely powerful testing framework with an elegant syntax. All these tests are nice but still do not cover all my needs. In future TILs I am hoping to find out how to use Karma with Jasmine to test React components, as Jest so far is not working that well.

## Resources

- [Jasmine 2.4 docs](http://jasmine.github.io/2.4/introduction.html)

