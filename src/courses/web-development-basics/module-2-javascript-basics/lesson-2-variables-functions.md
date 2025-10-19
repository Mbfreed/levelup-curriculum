# Variables and Functions in JavaScript

## Variables Deep Dive

### Variable Declaration

```javascript
// let - can be reassigned, block-scoped
let name = "John";
name = "Jane"; // Valid

// const - cannot be reassigned, block-scoped
const age = 25;
// age = 26; // Error!

// var - function-scoped, can be reassigned
var city = "New York";
```

### Variable Naming Rules

- Start with letter, underscore, or dollar sign
- Can contain letters, numbers, underscores, dollar signs
- Case sensitive
- Cannot use reserved words

```javascript
// Good names
let userName = "john";
let user_age = 25;
let $price = 19.99;

// Bad names
// let 2name = "john"; // Cannot start with number
// let let = "value"; // Cannot use reserved word
```

## Functions

### Function Declaration

```javascript
function add(a, b) {
  return a + b;
}

// Call the function
let result = add(5, 3); // result = 8
```

### Function Expression

```javascript
const multiply = function (a, b) {
  return a * b;
};
```

### Arrow Functions

```javascript
// Basic arrow function
const divide = (a, b) => {
  return a / b;
};

// Shorthand arrow function
const square = (x) => x * x;

// Arrow function with no parameters
const sayHello = () => "Hello!";
```

### Function Parameters

```javascript
// Default parameters
function greet(name = "Guest") {
  return "Hello, " + name;
}

// Rest parameters
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

// Destructuring parameters
function displayUser({ name, age, city }) {
  console.log(`${name} is ${age} years old and lives in ${city}`);
}
```

## Scope and Hoisting

### Block Scope

```javascript
if (true) {
  let blockVar = "I'm in a block";
  const blockConst = "I'm also in a block";
}

// console.log(blockVar); // Error - not accessible outside block
```

### Function Scope

```javascript
function myFunction() {
  var functionVar = "I'm in a function";
  let functionLet = "I'm also in a function";
}

// console.log(functionVar); // Error - not accessible outside function
```

## Practice Exercise

Create functions for:

1. Calculate the area of a rectangle
2. Check if a number is even or odd
3. Generate a random number between min and max
4. Convert temperature from Celsius to Fahrenheit

