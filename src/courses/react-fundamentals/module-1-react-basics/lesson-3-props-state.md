# Props and State in React

## What are Props?

Props (short for properties) are how you pass data from parent components to child components. They are read-only and cannot be modified by the child component.

### Passing Props

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

// Usage
<Welcome name="Sara" age={25} />;
```

### Destructuring Props

```jsx
function Welcome({ name, age }) {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>You are {age} years old.</p>
    </div>
  );
}
```

## What is State?

State is data that belongs to a component and can change over time. When state changes, React re-renders the component.

### useState Hook

```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

### Multiple State Variables

```jsx
function Form() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);

  return (
    <form>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        placeholder="Age"
      />
    </form>
  );
}
```

## Props vs State

| Props                  | State                        |
| ---------------------- | ---------------------------- |
| Passed from parent     | Managed within component     |
| Read-only              | Can be modified              |
| Cannot be changed      | Can be updated with setState |
| Used for configuration | Used for dynamic data        |

## Practice Exercise

Create a UserCard component that:

1. Accepts props for name, email, and avatar
2. Has state for showing/hiding email
3. Has a button to toggle email visibility
4. Displays the user information nicely

