# Object properties

## Using getters and setters

```javascript
'use strict';

var cat = {
	name: {first: 'Fluffy', last: 'LaBeouf'},
	color: 'White'
}

Object.defineProperty(cat, 'fullName',
	{
		get: function() {
			return `${this.name.first} ${this.name.last}`
		}
	},
	{
	  set: function(value) {
	    let nameParts = value.split(' ');
	    this.name.first = nameParts[0];
	    this.name.last = nameParts[1];
	  }
	}
)

display(cat.fullName);
```

## Writable Attribute

Writable attribute prevents an object attribute to be overwritten.

```javascript
'use strict';

var cat = {
	name: {first: 'Fluffy', last: 'LaBeouf'},
	color: 'White'
}

Object.defineProperty(cat, 'name', {writable: false});
cat.name = 'Ruddy';
```

## Enumerable Attribute

Enumerable attribute prevents an object from being enumerated (when using for..in loop), see it in the object's key or serialize it.

```javascript
'use strict';

var cat = {
	name: {first: 'Fluffy', last: 'LaBeouf'},
	color: 'White'
}

Object.defineProperty(cat, 'name', {enumerable: false});

for (let propertyName in cat) {
	console.log(`${propertyName} ${cat[propertyName]}`); // only shows color: White
}

JSON.stringify(cat); // only stringifies color attribute
```

## Configurable Attribute

Configurable attribute prevents an object to be reconfigured.

```javascript
'use strict';

var cat = {
	name: {first: 'Fluffy', last: 'LaBeouf'},
	color: 'White'
}

Object.defineProperty(cat, 'name', {writable: false});
Object.defineProperty(cat, 'name', {configurable: false});
Object.defineProperty(cat, 'name', {writable: true}); // won't work since attribute is now inconfigurable
```