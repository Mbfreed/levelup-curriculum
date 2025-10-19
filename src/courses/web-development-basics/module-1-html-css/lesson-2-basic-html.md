# Basic HTML Structure

## What is HTML?

HTML (HyperText Markup Language) is the standard markup language for creating web pages. It describes the structure of a web page using elements and tags.

## Basic HTML Document Structure

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My First Web Page</title>
  </head>
  <body>
    <h1>Welcome to My Website</h1>
    <p>This is my first paragraph.</p>
  </body>
</html>
```

## Common HTML Elements

### Headings

```html
<h1>Main Heading</h1>
<h2>Subheading</h2>
<h3>Smaller Heading</h3>
```

### Paragraphs and Text

```html
<p>This is a paragraph.</p>
<strong>This text is bold</strong>
<em>This text is italic</em>
```

### Links and Images

```html
<a href="https://example.com">Visit Example</a>
<img src="image.jpg" alt="Description of image" />
```

### Lists

```html
<!-- Unordered List -->
<ul>
  <li>First item</li>
  <li>Second item</li>
</ul>

<!-- Ordered List -->
<ol>
  <li>First step</li>
  <li>Second step</li>
</ol>
```

## Semantic HTML

Semantic HTML elements clearly describe their meaning:

- `<header>` - Header content
- `<nav>` - Navigation links
- `<main>` - Main content
- `<section>` - A section of content
- `<article>` - Self-contained content
- `<aside>` - Sidebar content
- `<footer>` - Footer content

## Best Practices

1. **Always close tags**: `<p>Content</p>`
2. **Use lowercase**: `<div>` not `<DIV>`
3. **Add alt text to images**: `<img src="photo.jpg" alt="Beautiful sunset">`
4. **Use semantic elements**: Choose the right element for the content
5. **Indent your code**: Makes it easier to read

## Practice Exercise

Create an HTML page with:

- A main heading
- Three paragraphs
- A list of your favorite foods
- A link to your favorite website
- An image (you can use a placeholder)

