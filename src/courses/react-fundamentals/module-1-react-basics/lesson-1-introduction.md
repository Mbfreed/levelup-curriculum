# Introduction to React

## What is React?

React is a JavaScript library for building user interfaces, particularly web applications. It was created by Facebook and is now maintained by Meta and the community.

## Why React?

- **Component-Based**: Build encapsulated components that manage their own state
- **Declarative**: Describe what the UI should look like for any given state
- **Learn Once, Write Anywhere**: Use React for web, mobile, and desktop apps
- **Virtual DOM**: Efficient updates and rendering
- **Ecosystem**: Large community and rich ecosystem

## Setting Up React

### Create React App

```bash
npx create-react-app my-app
cd my-app
npm start
```

### Vite (Modern Alternative)

```bash
npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev
```

## JSX

JSX is a syntax extension that lets you write HTML-like code in JavaScript.

### Basic JSX

```jsx
const element = <h1>Hello, World!</h1>;
```

### JSX with Variables

```jsx
const name = "John";
const element = <h1>Hello, {name}</h1>;
```

### JSX with Expressions

```jsx
const user = {
  firstName: "John",
  lastName: "Doe",
};

const element = (
  <h1>
    Hello, {user.firstName} {user.lastName}!
  </h1>
);
```

## Your First React Component

### Function Component

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

// Usage
<Welcome name="Sara" />;
```

### Arrow Function Component

```jsx
const Welcome = (props) => {
  return <h1>Hello, {props.name}</h1>;
};
```

## React Elements vs Components

### Elements

```jsx
const element = <h1>Hello, world</h1>;
```

### Components

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

## Rendering Elements

```jsx
import React from "react";
import ReactDOM from "react-dom/client";

function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Welcome name="Sara" />);
```

## Practice Exercise

Create your first React app with:

1. A Welcome component that accepts a name prop
2. A Counter component that displays a number
3. A Button component that accepts text and onClick props
4. Use all components in your main App component

