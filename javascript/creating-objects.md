# Different ways of creating an object

## Object literals

```javascript
let cat = {
	name: 'Purrrply',
	color: 'purple',
	speak: () => {
		console.log('Meooow');
	}
}
```

## Constructor Functions

```javascript
function Cat(name, color) {
	this.name = name;
	this.color = color;
	this.speak = () => {
		console.log('Meooow');
	}
} 

let cat = new Cat('Ruddy', 'brown');
```

## Object.create

```
var cat = Object.create(Object.prototype, {
  name: {
    value: 'Fluffy',
    writable: true,
    enumerable: true,
    configurable: true
  },
  color: {
    value: 'White',
    writable: true,
    enumerable: true,
    configurable: true
  }
});

cat.speak = () => { console.log('Meoooow'); };
```

## ES6 Classes

```
class Cat3 {
  constructor(name, color) {
    this.name = name;
    this.color = color;
  }
  
  speak(){
    display('Meoooow');
  }
} 

let cat = new Cat('Dude', 'black');
```
