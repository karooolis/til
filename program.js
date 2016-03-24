"use strict"

function Product(name, price) {
  this.name = name;
  this.price = price;

  if (price < 0) {
    throw RangeError('Cannot create product ' +
                      this.name + ' with a negative price');
  }
}

function Food(name, price) {
  Product.call(this, name, price);
  this.category = 'food';
}

function Toy(name, price) {
  Product.call(this, name, price);
  this.category = 'toy';
}

var cheese = new Food('feta', 5);
var fun = new Toy('robot', 40);

console.log(fun.name, fun.price, fun.category);
console.log(cheese.name, cheese.price, cheese.category);

// Call 


function Animal(name, gender) {
	this.name = name;
	this.gender = gender;
}

function Zebra(name, gender, specialPowers) {
	Animal.call(this, name, gender);
	this.specialPowers = specialPowers;
	this.type = "zebra";
}

function Parrot(name, gender, specialPowers) {
	Animal.call(this, name, gender);
	this.specialPowers = specialPowers;
	this.type = "parrot";
}

let zebra = new Zebra('Johnny', 'male', 'running at 5mph');
let parrot = new Parrot('Leyla', 'female', 'talking in English');

let animals = [zebra, parrot];

for (let i in animals) {
  (function(animal) {
    this.info = function() {
      console.log('#' + i + ': ' + this.type + ' ' + this.name
                  + ': ' + this.specialPowers);
    }
    this.info();
  }).call(animals[i], i);
}








function greet() {
  let reply = [this.type, this.name, this.specialPowers].join(' ');
  console.log(reply);
}


//greet();

// greet.call(zebra); // zebra Johnny running at 5mph
// greet.call(parrot); // parrot Leyla talking in English





var whatsThis = function() { console.log(this); }
whatsThis.apply('hello');
whatsThis.call('hello');







function higherNumber(a, b) {
  console.log(Math.max.apply(null, [a, b]));
}

higherNumber(10, 5); // 10
higherNumber.apply(this, [10, 5]); // 10
higherNumber.call(this, 10, 5); // 10


// myArray = [10, 2];
// myObject = myFunction.apply(myObject, myArray);  // Will also return 20
