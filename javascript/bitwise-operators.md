# Bitwise operators

Today I learnt something fascinating about JavaScript. I never realized that you can work in binary or octat literals in JavaScript. The example below.

```javascript
// ES6 syntax
0b111110111 === 503 // 503 in binary
0o767 === 503 // 503 in octat

// ES5 syntax
parseInt("111110111", 2) === 503;
parseInt("767", 8) === 503;
```

These binary literals can then be manipulated to achieve useful results. 

```javascript
let FLAG_A = 0b0001; // 1 
let FLAG_B = 0b0010; // 2
let FLAG_C = 0b0100; // 4
let FLAG_D = 0b1000; // 8

// Creating a bitmask with OR logical operator
let mask = FLAG_A | FLAG_B | FLAG_D; // 0001 | 0010 | 1000 => 1011

// Using bitmasks to check if specific value is set via AND opeartor
if (0b101 & FLAG_C) { // 0101 & 0100 => 0100 => true
   // do stuff
}

// Making use of NOT operator
let mask = ~(FLAG_A | FLAG_C); // ~0101 => 1010

// Operators can be written in short form
let FLAG_E = 0b1101;
FLAG_E &= mask; // 1101 & 1010 => 1000

// Toggling flags with XOR operator.
// Set the bits that need to be inverted with 1 in toggle mask.
let TOGGLED_MASK = FLAG_C ^ 0b0110; // 0100 ^ 0110 => 0010
```

Final note, integers may be converted to binary via simple `toString` manipulation as such:

```javascript
// Converting integer to binary string
var nMyNumber = 11;
var sBinString = nMyNumber.toString(2);
```

## Resources

- [Extended Literals](http://es6-features.org/#BinaryOctalLiteral) by Ralf S. Engelschall
- [Bitwise operators](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators) by MDN