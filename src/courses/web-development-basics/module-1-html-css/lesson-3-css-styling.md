# CSS Styling Basics

## What is CSS?

CSS (Cascading Style Sheets) is a language used to describe the presentation of HTML documents. It controls how web pages look and feel.

## Three Ways to Add CSS

### 1. Inline Styles

```html
<p style="color: blue; font-size: 16px;">This text is blue and 16px</p>
```

### 2. Internal Stylesheet

```html
<head>
  <style>
    p {
      color: blue;
      font-size: 16px;
    }
  </style>
</head>
```

### 3. External Stylesheet (Recommended)

```html
<head>
  <link rel="stylesheet" href="styles.css" />
</head>
```

## CSS Selectors

### Element Selector

```css
p {
  color: blue;
}
```

### Class Selector

```css
.highlight {
  background-color: yellow;
}
```

### ID Selector

```css
#main-title {
  font-size: 24px;
}
```

## Common CSS Properties

### Colors

```css
color: blue; /* Text color */
background-color: red; /* Background color */
border-color: green; /* Border color */
```

### Typography

```css
font-family: Arial, sans-serif;
font-size: 16px;
font-weight: bold;
text-align: center;
```

### Spacing

```css
margin: 10px; /* Outside spacing */
padding: 15px; /* Inside spacing */
width: 200px;
height: 100px;
```

### Borders

```css
border: 2px solid black;
border-radius: 5px; /* Rounded corners */
```

## CSS Box Model

Every HTML element is a box with:

- **Content**: The actual content (text, images)
- **Padding**: Space inside the element
- **Border**: Line around the element
- **Margin**: Space outside the element

```
┌─────────────────────────┐ ← Margin
│ ┌─────────────────────┐ │ ← Border
│ │ ┌─────────────────┐ │ │ ← Padding
│ │ │     Content     │ │ │
│ │ └─────────────────┘ │ │
│ └─────────────────────┘ │
└─────────────────────────┘
```

## Layout Properties

### Display

```css
display: block; /* Takes full width */
display: inline; /* Takes only needed width */
display: flex; /* Flexible layout */
```

### Flexbox

```css
.container {
  display: flex;
  justify-content: center; /* Horizontal alignment */
  align-items: center; /* Vertical alignment */
}
```

## Practice Exercise

Style your HTML page from the previous lesson with:

- Different colors for headings and paragraphs
- Centered text for the main heading
- A colored background
- Spacing between elements
- Rounded corners on images

