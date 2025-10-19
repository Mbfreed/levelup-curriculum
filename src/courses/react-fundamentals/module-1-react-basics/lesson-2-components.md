# React Components

## What are Components?

Components are the building blocks of React applications. They are reusable pieces of UI that can accept inputs (props) and return React elements.

## Types of Components

### Function Components

```jsx
function Button(props) {
  return <button>{props.text}</button>;
}
```

### Class Components

```jsx
class Button extends React.Component {
  render() {
    return <button>{this.props.text}</button>;
  }
}
```

## Component Composition

### Parent and Child Components

```jsx
function App() {
  return (
    <div>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

function Header() {
  return <header>My App</header>;
}

function Main() {
  return <main>Main content</main>;
}

function Footer() {
  return <footer>Footer content</footer>;
}
```

### Component Trees

```
App
├── Header
├── Main
│   ├── Article
│   └── Sidebar
└── Footer
```

## Props

Props are inputs to components. They are read-only and passed down from parent to child.

### Passing Props

```jsx
function UserCard(props) {
  return (
    <div>
      <h2>{props.name}</h2>
      <p>{props.email}</p>
    </div>
  );
}

// Usage
<UserCard name="John Doe" email="john@example.com" />;
```

### Default Props

```jsx
function Button(props) {
  return <button>{props.text}</button>;
}

Button.defaultProps = {
  text: "Click me",
};
```

### Props Destructuring

```jsx
function UserCard({ name, email, age }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>{email}</p>
      <p>Age: {age}</p>
    </div>
  );
}
```

## Component Lifecycle

### Function Components with Hooks

```jsx
import { useState, useEffect } from "react";

function MyComponent() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Component mounted");
    return () => console.log("Component unmounted");
  }, []);

  return <div>Count: {count}</div>;
}
```

## Conditional Rendering

### if/else

```jsx
function UserGreeting(props) {
  if (props.isLoggedIn) {
    return <h1>Welcome back!</h1>;
  }
  return <h1>Please sign up.</h1>;
}
```

### Ternary Operator

```jsx
function UserGreeting(props) {
  return (
    <div>
      {props.isLoggedIn ? <h1>Welcome back!</h1> : <h1>Please sign up.</h1>}
    </div>
  );
}
```

### Logical && Operator

```jsx
function Mailbox(props) {
  return (
    <div>
      <h1>Hello!</h1>
      {props.unreadMessages.length > 0 && (
        <h2>You have {props.unreadMessages.length} unread messages.</h2>
      )}
    </div>
  );
}
```

## Lists and Keys

### Rendering Lists

```jsx
function TodoList(props) {
  const todos = props.todos;
  const listItems = todos.map((todo) => <li key={todo.id}>{todo.text}</li>);
  return <ul>{listItems}</ul>;
}
```

### Keys

Keys help React identify which items have changed, are added, or are removed.

```jsx
const todoItems = todos.map((todo) => (
  <TodoItem
    key={todo.id}
    id={todo.id}
    text={todo.text}
    completed={todo.completed}
  />
));
```

## Practice Exercise

Create a Todo application with:

1. TodoList component that renders a list of todos
2. TodoItem component for individual todos
3. AddTodo component for adding new todos
4. Use proper props and keys
5. Add conditional rendering for empty state

