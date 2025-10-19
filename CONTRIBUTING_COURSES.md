# 📚 Contributing Courses to Level Up

This guide explains how to contribute new courses or update existing course content.

## Overview

- **Courses are stored as markdown files** in the repo (open source friendly)
- **Course metadata** is synced automatically to Supabase via GitHub Actions
- **Anyone can contribute** by forking the repo and opening a PR
- **Changes auto-sync** when merged to main

---

## 📁 Course Structure

Each course lives in its own folder under `src/courses/`:

```
src/courses/
├── web-development-basics/
│   ├── course.json                    ← Course metadata
│   ├── module-1-html-css/
│   │   ├── lesson-1-introduction.md
│   │   ├── lesson-2-basic-html.md
│   │   ├── lesson-3-css-styling.md
│   │   └── assignment-1-create-portfolio.md
│   ├── module-2-javascript-basics/
│   └── module-3-responsive-design/
├── react-fundamentals/
└── javascript-advanced/
```

---

## 🎯 Step 1: Create Course Metadata (`course.json`)

Create a `course.json` file at the root of your course folder:

```json
{
  "id": "your-course-id",
  "title": "Your Course Title",
  "description": "Brief description of what students will learn",
  "level": "Beginner",
  "tags": ["Tag1", "Tag2", "Tag3"],
  "modules": [
    {
      "id": "module-1-basics",
      "title": "Module 1: Basics",
      "lessons": [
        {
          "id": "lesson-1-intro",
          "title": "Introduction",
          "type": "lesson",
          "filePath": "module-1-basics/lesson-1-intro.md",
          "points": 10
        },
        {
          "id": "assignment-1-practice",
          "title": "Practice Assignment",
          "type": "assignment",
          "filePath": "module-1-basics/assignment-1-practice.md",
          "points": 15
        }
      ]
    }
  ]
}
```

### Required Fields:

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique course identifier (kebab-case, no spaces) |
| `title` | string | Course title |
| `description` | string | What students will learn |
| `level` | string | "Beginner", "Intermediate", or "Advanced" |
| `tags` | array | Search/filter tags (e.g., ["React", "Frontend", "JavaScript"]) |
| `modules` | array | Array of modules |

### Module Fields:

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique module identifier (kebab-case) |
| `title` | string | Module title |
| `lessons` | array | Array of lessons in this module |

### Lesson Fields:

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique lesson identifier (kebab-case) |
| `title` | string | Lesson title |
| `type` | string | "lesson" or "assignment" |
| `filePath` | string | Path to markdown file (relative to course folder) |
| `points` | number | Points earned: 10 for lessons, 15 for assignments |

---

## 📝 Step 2: Create Lesson Content (Markdown Files)

Create markdown files in the appropriate module folder:

```markdown
# Introduction to HTML

## What is HTML?

HTML (HyperText Markup Language) is the standard markup language for creating web pages.

## Key Concepts

- Elements
- Tags
- Attributes

## Example

```html
<!DOCTYPE html>
<html>
  <head>
    <title>My Page</title>
  </head>
  <body>
    <h1>Hello World</h1>
  </body>
</html>
```

## Learning Resources

- [MDN Web Docs](https://developer.mozilla.org)
- [W3Schools HTML](https://www.w3schools.com/html/)

## Next Steps

Complete the assignment to practice what you've learned.
```

---

## 🔄 Step 3: Submit Your Course

1. **Fork** the repository
2. **Create a branch**: `git checkout -b add-course/your-course-name`
3. **Add your course** following the structure above
4. **Commit**: `git commit -m "Add: Your Course Name"`
5. **Push**: `git push origin add-course/your-course-name`
6. **Open a Pull Request** describing your course

---

## ✅ Quality Checklist

Before submitting, ensure:

- [ ] Course folder is in `src/courses/`
- [ ] `course.json` is valid JSON (use a JSON validator)
- [ ] Course ID matches folder name
- [ ] All lesson file paths are correct
- [ ] Markdown files are in the correct folders
- [ ] Course level is one of: Beginner, Intermediate, Advanced
- [ ] All lessons have correct points (10 for lessons, 15 for assignments)
- [ ] No typos or broken links in markdown
- [ ] Course has meaningful tags
- [ ] At least 1 module with 2+ lessons

---

## 🤖 Automatic Sync

**When your PR is merged to `main`:**

1. GitHub Actions detects changes to `src/courses/`
2. Automatically calls the Supabase sync function
3. Your course appears in the app within seconds
4. **No manual action needed!**

---

## 🎓 Course Naming Conventions

### Course IDs (folder names):
- Use kebab-case: `web-development-basics`, not `WebDevelopmentBasics`
- Be descriptive but concise
- Match the `id` field in `course.json`

### Module IDs:
- Format: `module-N-topic`, e.g., `module-1-html-css`
- Start from 1, increment sequentially

### Lesson IDs:
- Format: `lesson-N-topic` or `assignment-N-topic`
- Use the same naming in both the filename and `course.json`

---

## 💡 Tips

### Points System

- **Lesson completion**: 10 points
- **Assignment submission**: 15 points
- Users need 500 points per level
- Example: 5 lessons = 50 points + 1 assignment = 65 points toward Level 1

### Assignment Types

Assignments can be:
- Coding projects (submit link to GitHub/deployment)
- Code challenges
- Practical exercises
- Build something from scratch

### Content Quality

- Keep lessons focused on one topic
- Use clear headings and structure
- Include examples and code snippets
- Add practice exercises
- Link to external resources when helpful

---

## ❓ FAQ

**Q: Can I update an existing course?**
A: Yes! Edit the markdown files or update `course.json` and open a PR.

**Q: How long until my course appears?**
A: After PR is merged, courses sync within seconds automatically.

**Q: Can I add custom metadata?**
A: Only the fields in this guide are supported. Additional fields are ignored.

**Q: What if my markdown has errors?**
A: The sync will still work, but the lesson will display incorrectly. Test locally first.

**Q: Can I use HTML in markdown?**
A: Yes! Regular markdown + HTML is supported.

---

## 📞 Support

For questions:
- Check existing courses for examples
- Review the [main README](../README.md)
- Open an issue on GitHub

Happy teaching! 🚀
