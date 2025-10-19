# Mobile-First Design

## What is Mobile-First?

Mobile-first is a design approach where you start designing for the smallest screen size and then progressively enhance for larger screens.

## Why Mobile-First?

1. **Performance**: Smaller screens need faster loading
2. **User Experience**: Most users are on mobile devices
3. **Progressive Enhancement**: Easier to add features than remove them
4. **SEO Benefits**: Google favors mobile-friendly sites

## Mobile-First Workflow

### 1. Start with Mobile

```css
/* Mobile styles (default) */
.container {
  width: 100%;
  padding: 10px;
  font-size: 14px;
}

.navigation {
  display: none; /* Hidden on mobile */
}

.mobile-menu {
  display: block;
}
```

### 2. Enhance for Tablet

```css
/* Tablet styles */
@media (min-width: 768px) {
  .container {
    width: 750px;
    margin: 0 auto;
    padding: 20px;
    font-size: 16px;
  }

  .mobile-menu {
    display: none;
  }

  .navigation {
    display: flex;
  }
}
```

### 3. Enhance for Desktop

```css
/* Desktop styles */
@media (min-width: 1024px) {
  .container {
    width: 1200px;
    padding: 30px;
    font-size: 18px;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
  }
}
```

## Mobile-First Components

### Navigation

```css
/* Mobile navigation */
.mobile-nav {
  position: fixed;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100vh;
  background: white;
  transition: left 0.3s ease;
}

.mobile-nav.open {
  left: 0;
}

/* Desktop navigation */
@media (min-width: 768px) {
  .mobile-nav {
    display: none;
  }

  .desktop-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
```

### Cards

```css
/* Mobile cards */
.card {
  width: 100%;
  margin-bottom: 20px;
  padding: 15px;
}

/* Tablet cards */
@media (min-width: 768px) {
  .cards {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
}

/* Desktop cards */
@media (min-width: 1024px) {
  .cards {
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
  }
}
```

## Touch-Friendly Design

### Button Sizes

```css
/* Touch targets should be at least 44px */
.button {
  min-height: 44px;
  min-width: 44px;
  padding: 12px 24px;
}
```

### Spacing

```css
/* Adequate spacing between clickable elements */
.clickable {
  margin: 10px;
  padding: 15px;
}
```

## Performance Considerations

### Image Optimization

```css
/* Responsive images */
img {
  max-width: 100%;
  height: auto;
}

/* Different images for different screens */
.hero-image {
  background-image: url("hero-mobile.jpg");
}

@media (min-width: 768px) {
  .hero-image {
    background-image: url("hero-desktop.jpg");
  }
}
```

### Font Loading

```css
/* System fonts for better performance */
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}
```

## Testing Mobile-First

### Browser DevTools

1. Open Chrome DevTools
2. Click device toggle icon
3. Test different screen sizes
4. Check touch interactions

### Real Device Testing

1. Test on actual mobile devices
2. Check different browsers
3. Test touch gestures
4. Verify performance

## Practice Exercise

Redesign your portfolio with mobile-first approach:

1. Start with mobile layout
2. Add tablet enhancements
3. Add desktop features
4. Test on different devices
5. Optimize for performance

