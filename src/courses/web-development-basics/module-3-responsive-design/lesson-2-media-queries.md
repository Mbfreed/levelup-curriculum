# Media Queries

## What are Media Queries?

Media queries allow you to apply CSS styles based on device characteristics like screen size, orientation, and resolution.

## Basic Syntax

```css
@media (condition) {
  /* CSS rules */
}
```

## Common Breakpoints

```css
/* Mobile First Approach */
/* Default styles for mobile */

/* Small devices (landscape phones) */
@media (min-width: 576px) {
}

/* Medium devices (tablets) */
@media (min-width: 768px) {
}

/* Large devices (desktops) */
@media (min-width: 992px) {
}

/* Extra large devices */
@media (min-width: 1200px) {
}
```

## Media Query Features

### Width and Height

```css
/* Exact width */
@media (width: 768px) {
}

/* Minimum width */
@media (min-width: 768px) {
}

/* Maximum width */
@media (max-width: 768px) {
}

/* Width range */
@media (min-width: 768px) and (max-width: 1024px) {
}
```

### Orientation

```css
/* Portrait orientation */
@media (orientation: portrait) {
}

/* Landscape orientation */
@media (orientation: landscape) {
}
```

### Device Type

```css
/* Print styles */
@media print {
}

/* Screen only */
@media screen {
}

/* Screen and print */
@media screen, print {
}
```

## Responsive Design Patterns

### Mobile First

```css
/* Mobile styles (default) */
.container {
  width: 100%;
  padding: 10px;
}

/* Tablet styles */
@media (min-width: 768px) {
  .container {
    width: 750px;
    margin: 0 auto;
    padding: 20px;
  }
}

/* Desktop styles */
@media (min-width: 1024px) {
  .container {
    width: 1200px;
    padding: 30px;
  }
}
```

### Desktop First

```css
/* Desktop styles (default) */
.container {
  width: 1200px;
  margin: 0 auto;
  padding: 30px;
}

/* Tablet styles */
@media (max-width: 1023px) {
  .container {
    width: 100%;
    padding: 20px;
  }
}

/* Mobile styles */
@media (max-width: 767px) {
  .container {
    padding: 10px;
  }
}
```

## Common Responsive Patterns

### Flexible Grid

```css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}
```

### Flexible Images

```css
img {
  max-width: 100%;
  height: auto;
}
```

### Flexible Typography

```css
h1 {
  font-size: clamp(1.5rem, 4vw, 3rem);
}
```

## Viewport Meta Tag

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

## Practice Exercise

Make your portfolio responsive:

1. Mobile-first approach
2. Flexible grid layout
3. Responsive typography
4. Hide/show elements on different screen sizes
5. Test on different devices

