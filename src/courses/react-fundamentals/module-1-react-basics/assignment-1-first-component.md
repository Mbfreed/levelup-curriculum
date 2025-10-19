# Assignment 1: Your First React Component

## Objective

Create your first React application with multiple components that demonstrate props, state, and event handling.

## Requirements

### Components to Create

1. **App Component**

   - Main component that renders all other components
   - Contains state for the application

2. **Header Component**

   - Accepts a title prop
   - Displays the application title

3. **Counter Component**

   - Has state for count
   - Increment and decrement buttons
   - Display current count

4. **UserCard Component**

   - Accepts props: name, email, avatar (optional)
   - Has state for showing/hiding email
   - Toggle button for email visibility

5. **TodoList Component**
   - State for list of todos
   - Add new todo functionality
   - Remove todo functionality
   - Mark todo as complete

### Technical Requirements

#### Props Usage

- Pass data between components using props
- Use prop destructuring where appropriate
- Include default props for optional values

#### State Management

- Use useState hook for all state
- Update state correctly (don't mutate directly)
- Handle state updates properly

#### Event Handling

- Handle button clicks
- Handle form submissions
- Handle input changes

#### Component Structure

```jsx
App
├── Header
├── Counter
├── UserCard
└── TodoList
    └── TodoItem (for each todo)
```

## Submission Requirements

### Files Structure

```
my-react-app/
├── src/
│   ├── App.js
│   ├── components/
│   │   ├── Header.js
│   │   ├── Counter.js
│   │   ├── UserCard.js
│   │   ├── TodoList.js
│   │   └── TodoItem.js
│   └── index.js
├── package.json
└── README.md
```

### GitHub Repository

- Create a new repository
- Upload all files
- Include a detailed README
- Provide a live URL

### Live URL

- Deploy using Netlify, Vercel, or GitHub Pages
- Test all functionality before submission
- Include the live URL in your submission

## Evaluation Criteria

### Component Structure (30 points)

- Proper component organization
- Correct use of props and state
- Clean, readable code

### Functionality (40 points)

- All components work correctly
- State updates properly
- Event handling works
- No console errors

### Code Quality (20 points)

- Consistent formatting
- Meaningful variable names
- Proper React patterns

### Creativity (10 points)

- Unique design elements
- Additional features
- Good user experience

## Tips for Success

1. **Start Simple**: Begin with basic components
2. **Test Frequently**: Check your work in the browser
3. **Use Props**: Pass data between components
4. **Manage State**: Use useState for dynamic data
5. **Handle Events**: Make your components interactive

## Resources

- [React Official Tutorial](https://reactjs.org/tutorial/tutorial.html)
- [React Hooks Documentation](https://reactjs.org/docs/hooks-intro.html)
- [Props and State Guide](https://reactjs.org/docs/components-and-props.html)

## Deadline

Submit your React application by the end of the week. Include both GitHub repository and live URL.

Good luck! 🚀

