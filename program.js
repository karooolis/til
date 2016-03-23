"use strict";

function varExample2() {
	let isTrue = false;

	if (isTrue) {
		var foo = "bar";
	} else {
		console.log(foo);
	}
};

function letExample2() {
	let isTrue = false;

	if (isTrue) {
		let foo = "bar";
	} else {
		console.log(foo);
	}
};


function constExample() {
	const foo = "hello";

	console.log(foo);

	foo = "bye";
};



//varExample2();
console.log("/----------------------/");
//letExample2();
console.log("/----------------------/");
constExample();