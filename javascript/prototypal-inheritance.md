# Prototypal inheritance

## Creating Prototype Inheritance Chains

```javascript
'use strict';

function Animal(voice) {
  this.voice = voice || 'grunt';
}

Animal.prototype.speak = function() {
  console.log(this.voice);
}

function Cat(name, color) {
  Animal.call(this, 'Meoow');
  this.name = name;
  this.color = color;
}

Cat.prototype = Object.create(Animal.prototype);
Cat.prototype.constructor = Cat;

let fluffy = new Cat('Fluffy', 'white');
```

## Creating Prototypes with Chains

```
'use strict';

class Animal {
  constructor(voice) {
    this.voice = voice || 'grunt';
  }
  
  speak() {
    console.log(this.voice);
  }
}

class Cat extends Animal {
  constructor(name, color) {
    super('Meow');
    
    this.name = name;
    this.color = color;
  }
}

let fluffy = new Cat('Fluffy', 'white');
```