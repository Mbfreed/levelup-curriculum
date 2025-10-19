# Introduction to JavaScript

## What is JavaScript?

JavaScript is a programming language that makes web pages interactive. It runs in the browser and allows you to create dynamic content, handle user interactions, and modify the page in real-time.

## Why JavaScript?

- **Client-side**: Runs in the user's browser
- **Dynamic**: Can change content without page reload
- **Interactive**: Responds to user actions
- **Universal**: Works on all modern browsers

## Adding JavaScript to HTML

### Internal JavaScript

```html
<script>
  console.log("Hello, World!");
</script>
```

### External JavaScript

```html
<script src="script.js"></script>
```

## Basic JavaScript Concepts

### Variables

```javascript
// Declaring variables
let name = "John";
const age = 25;
var city = "New York";
```

### Data Types

```javascript
// String
let message = "Hello, World!";

// Number
let count = 42;
let price = 19.99;

// Boolean
let isActive = true;
let isComplete = false;

// Array
let fruits = ["apple", "banana", "orange"];

// Object
let person = {
  name: "John",
  age: 25,
  city: "New York",
};
```

### Functions

```javascript
// Function declaration
function greet(name) {
  return "Hello, " + name + "!";
}

// Function expression
const greet = function (name) {
  return "Hello, " + name + "!";
};

// Arrow function
const greet = (name) => {
  return "Hello, " + name + "!";
};
```

## DOM Manipulation

The Document Object Model (DOM) represents the HTML page as objects that JavaScript can manipulate.

### Selecting Elements

```javascript
// Select by ID
const element = document.getElementById("myId");

// Select by class
const elements = document.getElementsByClassName("myClass");

// Select by tag
const paragraphs = document.getElementsByTagName("p");

// Modern selectors
const element = document.querySelector("#myId");
const elements = document.querySelectorAll(".myClass");
```

### Modifying Content

```javascript
// Change text content
element.textContent = "New text";

// Change HTML content
element.innerHTML = "<strong>Bold text</strong>";

// Change attributes
element.setAttribute("class", "new-class");
element.src = "new-image.jpg";
```

### Event Handling

```javascript
// Add event listener
button.addEventListener("click", function () {
  alert("Button clicked!");
});

// Common events
element.addEventListener("mouseover", handleMouseOver);
element.addEventListener("keydown", handleKeyDown);
element.addEventListener("submit", handleSubmit);
```

## Practice Exercise

Create a simple interactive page with:

1. A button that changes the text of a paragraph
2. An input field that displays its value in real-time
3. A list that you can add items to
4. A counter that increases when clicked

## Next Steps

In the next lesson, we'll dive deeper into JavaScript variables, functions, and control structures.

