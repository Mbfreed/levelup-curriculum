# DOM Manipulation

## What is the DOM?

The Document Object Model (DOM) is a programming interface that represents HTML documents as a tree structure. Each element is a node that can be accessed and modified with JavaScript.

## DOM Tree Structure

```
Document
└── html
    ├── head
    │   ├── title
    │   └── meta
    └── body
        ├── header
        ├── main
        │   ├── h1
        │   ├── p
        │   └── button
        └── footer
```

## Selecting DOM Elements

### getElementById

```javascript
const element = document.getElementById("myId");
```

### getElementsByClassName

```javascript
const elements = document.getElementsByClassName("myClass");
```

### getElementsByTagName

```javascript
const paragraphs = document.getElementsByTagName("p");
```

### querySelector (Modern)

```javascript
// Select first matching element
const element = document.querySelector("#myId");
const element = document.querySelector(".myClass");
const element = document.querySelector("p");

// Select all matching elements
const elements = document.querySelectorAll(".myClass");
const elements = document.querySelectorAll("p");
```

## Modifying Content

### Text Content

```javascript
// Change text content (safer)
element.textContent = "New text content";

// Change HTML content (can include HTML)
element.innerHTML = "<strong>Bold text</strong>";
```

### Attributes

```javascript
// Get attribute
let src = image.getAttribute("src");

// Set attribute
image.setAttribute("alt", "New description");

// Direct property access
image.src = "new-image.jpg";
image.className = "new-class";
```

### Styling

```javascript
// Inline styles
element.style.color = "red";
element.style.backgroundColor = "blue";
element.style.fontSize = "16px";

// CSS classes
element.classList.add("new-class");
element.classList.remove("old-class");
element.classList.toggle("active");
element.classList.contains("active"); // returns boolean
```

## Creating and Removing Elements

### Creating Elements

```javascript
// Create new element
const newDiv = document.createElement("div");
const newParagraph = document.createElement("p");

// Set content
newParagraph.textContent = "This is a new paragraph";

// Add to DOM
document.body.appendChild(newParagraph);
parentElement.appendChild(newDiv);
```

### Removing Elements

```javascript
// Remove element
element.remove();

// Remove child
parentElement.removeChild(childElement);
```

## Event Handling

### Adding Event Listeners

```javascript
// Basic event listener
button.addEventListener("click", function () {
  console.log("Button clicked!");
});

// Named function
function handleClick() {
  console.log("Button clicked!");
}
button.addEventListener("click", handleClick);

// Arrow function
button.addEventListener("click", () => {
  console.log("Button clicked!");
});
```

### Common Events

```javascript
// Mouse events
element.addEventListener("click", handleClick);
element.addEventListener("mouseover", handleMouseOver);
element.addEventListener("mouseout", handleMouseOut);

// Keyboard events
element.addEventListener("keydown", handleKeyDown);
element.addEventListener("keyup", handleKeyUp);

// Form events
form.addEventListener("submit", handleSubmit);
input.addEventListener("change", handleChange);
input.addEventListener("input", handleInput);

// Window events
window.addEventListener("load", handleLoad);
window.addEventListener("resize", handleResize);
```

### Event Object

```javascript
function handleClick(event) {
  console.log(event.target); // Element that was clicked
  console.log(event.type); // Type of event
  console.log(event.clientX); // Mouse X position
  console.log(event.clientY); // Mouse Y position

  // Prevent default behavior
  event.preventDefault();

  // Stop event bubbling
  event.stopPropagation();
}
```

## Practice Exercise

Create an interactive todo list with:

1. Input field to add new todos
2. Button to add todo
3. Display list of todos
4. Delete button for each todo
5. Mark todos as complete
6. Clear all completed todos

