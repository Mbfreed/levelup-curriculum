# Flexbox and CSS Grid

## What is Flexbox?

Flexbox (Flexible Box Layout) is a one-dimensional layout method for laying out items in rows or columns. It makes it easy to align and distribute space among items.

## Flexbox Container Properties

### display: flex

```css
.container {
  display: flex;
}
```

### flex-direction

```css
.container {
  flex-direction: row; /* Default - horizontal */
  flex-direction: column; /* Vertical */
  flex-direction: row-reverse; /* Reverse horizontal */
  flex-direction: column-reverse; /* Reverse vertical */
}
```

### justify-content (Main Axis)

```css
.container {
  justify-content: flex-start; /* Default */
  justify-content: flex-end;
  justify-content: center;
  justify-content: space-between;
  justify-content: space-around;
  justify-content: space-evenly;
}
```

### align-items (Cross Axis)

```css
.container {
  align-items: stretch; /* Default */
  align-items: flex-start;
  align-items: flex-end;
  align-items: center;
  align-items: baseline;
}
```

## Flexbox Item Properties

### flex

```css
.item {
  flex: 1; /* Grow and shrink equally */
  flex: 2; /* Take twice the space */
  flex: 1 1 200px; /* grow shrink basis */
}
```

### flex-grow, flex-shrink, flex-basis

```css
.item {
  flex-grow: 2; /* Grow twice as much */
  flex-shrink: 1; /* Shrink normally */
  flex-basis: 200px; /* Initial size */
}
```

## CSS Grid

CSS Grid is a two-dimensional layout system for creating complex layouts.

### Basic Grid

```css
.container {
  display: grid;
  grid-template-columns: 200px 200px 200px;
  grid-template-rows: 100px 100px;
  gap: 20px;
}
```

### Grid Template Areas

```css
.container {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar main main"
    "footer footer footer";
}

.header {
  grid-area: header;
}
.sidebar {
  grid-area: sidebar;
}
.main {
  grid-area: main;
}
.footer {
  grid-area: footer;
}
```

### Grid Properties

```css
.item {
  grid-column: 1 / 3; /* Start at line 1, end at line 3 */
  grid-row: 2 / 4; /* Start at line 2, end at line 4 */
  grid-area: 1 / 1 / 3 / 3; /* row-start / col-start / row-end / col-end */
}
```

## When to Use Flexbox vs Grid

### Use Flexbox for:

- One-dimensional layouts
- Component-level layouts
- Aligning items in a container
- Distributing space

### Use Grid for:

- Two-dimensional layouts
- Page-level layouts
- Complex positioning
- Overlapping elements

## Practice Exercise

Create a layout using:

1. Flexbox for a navigation bar
2. Grid for a card layout
3. Flexbox for card content
4. Responsive design that works on mobile

