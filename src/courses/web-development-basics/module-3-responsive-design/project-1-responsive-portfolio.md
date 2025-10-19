# Project 1: Responsive Portfolio

## Objective

Create a fully responsive portfolio website that works perfectly on all devices using mobile-first design principles.

## Requirements

### Mobile-First Design

- Start with mobile layout (320px+)
- Progressive enhancement for larger screens
- Touch-friendly interface
- Fast loading on mobile

### Responsive Breakpoints

- Mobile: 320px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px+

### Content Sections

1. **Header**

   - Navigation (hamburger menu on mobile)
   - Logo/brand name
   - Responsive navigation

2. **Hero Section**

   - Introduction text
   - Call-to-action button
   - Responsive images

3. **About Section**

   - Personal information
   - Skills list
   - Responsive layout

4. **Projects Section**

   - Project cards
   - Responsive grid layout
   - Hover effects

5. **Contact Section**
   - Contact form
   - Social media links
   - Responsive form layout

### Technical Requirements

#### HTML

- Semantic HTML5 elements
- Proper meta tags
- Viewport meta tag
- Accessible form labels

#### CSS

- Mobile-first media queries
- Flexible grid layouts
- Responsive typography
- CSS Grid and Flexbox

#### JavaScript

- Mobile menu toggle
- Smooth scrolling
- Form validation
- Interactive elements

## Design Guidelines

### Typography

```css
/* Mobile-first typography */
h1 {
  font-size: 2rem;
}
h2 {
  font-size: 1.5rem;
}
p {
  font-size: 1rem;
}

/* Tablet typography */
@media (min-width: 768px) {
  h1 {
    font-size: 2.5rem;
  }
  h2 {
    font-size: 2rem;
  }
  p {
    font-size: 1.1rem;
  }
}

/* Desktop typography */
@media (min-width: 1024px) {
  h1 {
    font-size: 3rem;
  }
  h2 {
    font-size: 2.5rem;
  }
  p {
    font-size: 1.2rem;
  }
}
```

### Layout

```css
/* Mobile layout */
.container {
  width: 100%;
  padding: 1rem;
  margin: 0 auto;
}

/* Tablet layout */
@media (min-width: 768px) {
  .container {
    max-width: 750px;
    padding: 2rem;
  }
}

/* Desktop layout */
@media (min-width: 1024px) {
  .container {
    max-width: 1200px;
    padding: 3rem;
  }
}
```

### Navigation

```css
/* Mobile navigation */
.nav-mobile {
  display: block;
}

.nav-desktop {
  display: none;
}

/* Desktop navigation */
@media (min-width: 768px) {
  .nav-mobile {
    display: none;
  }

  .nav-desktop {
    display: flex;
  }
}
```

## Performance Requirements

### Images

- Optimized image formats (WebP, AVIF)
- Responsive images
- Lazy loading
- Proper alt text

### CSS

- Minified CSS
- Critical CSS inlined
- Non-critical CSS loaded asynchronously

### JavaScript

- Minified JavaScript
- Event delegation
- Efficient DOM manipulation

## Accessibility Requirements

- Semantic HTML
- ARIA labels
- Keyboard navigation
- Color contrast
- Screen reader friendly

## Submission Requirements

### Files Structure

```
responsive-portfolio/
├── index.html
├── styles.css
├── script.js
├── images/
│   ├── hero-mobile.jpg
│   ├── hero-desktop.jpg
│   └── project-screenshots/
├── README.md
└── package.json (if using build tools)
```

### GitHub Repository

- Clean commit history
- Detailed README
- Live URL in description
- Proper file organization

### Live URL

- Deployed and accessible
- All functionality working
- Fast loading times
- Mobile-friendly

## Evaluation Criteria

### Responsive Design (40 points)

- Works on all screen sizes
- Mobile-first approach
- Proper breakpoints
- Touch-friendly interface

### Code Quality (30 points)

- Clean, readable code
- Proper HTML structure
- Efficient CSS
- Well-organized JavaScript

### Performance (20 points)

- Fast loading times
- Optimized images
- Efficient code
- Good user experience

### Accessibility (10 points)

- Semantic HTML
- Keyboard navigation
- Screen reader friendly
- Proper contrast

## Bonus Points

- **Advanced Features**: Animations, transitions, PWA features
- **Performance**: Lighthouse score 90+
- **Accessibility**: WCAG 2.1 AA compliance
- **Innovation**: Unique design elements

## Resources

- [MDN Responsive Design](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)
- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [Mobile-First Design](https://web.dev/responsive-web-design-basics/)

## Deadline

Submit your responsive portfolio by the end of the week. Include both GitHub repository and live URL.

Good luck! 🚀

