# Quick Reference Guide

Essential commands and references for Level Up platform.

## 🚀 Getting Started

### Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
# Navigate to http://localhost:5173

# Build for production
npm run build

# Preview production build
npm run preview
```

### Environment Setup

```bash
# Copy example env file
cp .env.example .env.local

# Edit .env.local with your Supabase credentials
VITE_SUPABASE_URL=https://[project-id].supabase.co
VITE_SUPABASE_ANON_KEY=[your-anon-key]
```

## 📁 Key Files Reference

### Core State & Config

```
src/contexts/UserContext.jsx          → User auth & profile state
src/contexts/CourseContextSupabase.jsx → Course & lesson state
src/config/supabaseConfig.js           → Supabase client setup
src/utils/courseUtils.js               → 20+ API functions
src/router.jsx                         → Route configuration
src/App.jsx                            → App root with providers
```

### Pages (Updated for Supabase)

```
src/pages/CourseCatalog/CourseCatalogNew.jsx     → Browse courses
src/pages/LessonViewer/LessonViewerNew.jsx       → View lessons
src/pages/Dashboard/DashboardNew.jsx             → User stats
src/pages/Profile/ProfileNew.jsx                 → User profile
```

### Backend

```
supabase/functions/sync-courses/index.ts  → Course sync Edge Function
supabase/migrations/                       → Database schema (if using)
```

## 📖 Documentation

| Document                | Purpose                       |
| ----------------------- | ----------------------------- |
| README.md               | Project overview - START HERE |
| COMPLETION_SUMMARY.md   | What was built (this session) |
| PROJECT_STATUS.md       | MVP features & roadmap        |
| SUPABASE_INTEGRATION.md | Database setup details        |
| TESTING_GUIDE.md        | How to test everything        |
| DEPLOYMENT_GUIDE.md     | How to deploy to production   |
| DEVELOPMENT_PROMPTS.md  | Contribution guidelines       |

## 🔑 API Functions (courseUtils.js)

### Course Management

```javascript
import {
  fetchAllCourses,
  fetchCourseById,
  fetchLessonMarkdown,
  enrollCourse,
  getCourseProgress,
} from "./utils/courseUtils";

// Get all courses
const courses = await fetchAllCourses();

// Get specific course
const course = await fetchCourseById("react-fundamentals");

// Fetch lesson markdown from GitHub
const markdown = await fetchLessonMarkdown(
  "react-fundamentals",
  "module-1/lesson-1.md"
);

// Enroll in course
await enrollCourse(userId, courseId);

// Get progress percentage
const progress = await getCourseProgress(userId, courseId);
```

### Progress & Points

```javascript
import {
  recordLessonCompletion,
  fetchLessonProgress,
} from "./utils/courseUtils";

// Record lesson completion (awards points, updates level)
await recordLessonCompletion(
  userId,
  courseId,
  moduleId,
  lessonId,
  10 // points (default)
);

// Get progress for specific lesson/module
const progress = await fetchLessonProgress(userId, courseId, moduleId);
```

### Token System

```javascript
import { claimTokens } from "./utils/courseUtils";

// Claim tokens for a level
await claimTokens(
  userId,
  level, // 1, 2, 3, etc.
  amount, // from TOKEN_SCALING
  walletAddress
);
```

## 🎯 Common Tasks

### Add a New User Manually (Dev)

```bash
# Via Supabase dashboard:
# 1. Go to Authentication → Users
# 2. Click "Add user"
# 3. Set email, password
# 4. User profile auto-created in users table
```

### Manually Trigger Course Sync

```bash
# Replace [URL] and [KEY] with your Supabase credentials
curl -X POST https://[project-id].supabase.co/functions/v1/sync-courses \
  -H "Authorization: Bearer [ANON_KEY]" \
  -H "Content-Type: application/json"
```

### Check Database

```bash
# Via Supabase dashboard:
# 1. Go to SQL Editor
# 2. Run queries:

SELECT * FROM users;
SELECT * FROM courses;
SELECT * FROM enrollments WHERE user_id = '[user-id]';
SELECT * FROM progress WHERE user_id = '[user-id]';
SELECT * FROM token_claims WHERE user_id = '[user-id]';
```

### Add a Course Content

1. **On GitHub**:

   ```
   courses/
   └── my-course/
       ├── course.json
       └── module-1/
           └── lesson-1.md
   ```

2. **course.json** structure:

   ```json
   {
     "id": "my-course",
     "title": "My Course",
     "description": "Course description",
     "level": "Beginner",
     "duration": "5 hours",
     "modules": [
       {
         "id": "module-1",
         "title": "Module 1",
         "lessons": [
           {
             "id": "lesson-1",
             "title": "Lesson 1",
             "type": "lesson",
             "filePath": "module-1/lesson-1.md",
             "points": 10
           }
         ]
       }
     ]
   }
   ```

3. **Lesson Markdown**:

   ```markdown
   # Lesson Title

   ## Objectives

   - Learn X
   - Build Y

   ## Content

   Your lesson content...
   ```

4. **Sync**:

   ```bash
   # Push to GitHub
   git push origin feature/new-course

   # Create PR and merge
   # After merge, manually trigger sync:
   curl -X POST https://[project-id].supabase.co/functions/v1/sync-courses \
     -H "Authorization: Bearer [KEY]" \
     -H "Content-Type: application/json"
   ```

## 🧪 Testing Quick Checklist

```bash
npm run dev
# Navigate to http://localhost:5173

# 1. Signup (/register)
# 2. Login (/login)
# 3. Dashboard (should show stats)
# 4. Courses (should show catalog)
# 5. Enroll (click Enroll Now)
# 6. Lesson (view markdown)
# 7. Complete (click Mark Complete)
# 8. Points (should increase by 10)
# 9. Profile (edit, add wallet)
# 10. Tokens (claim if level >= 2)

# Full guide: TESTING_GUIDE.md
```

## 🚀 Deployment Quick Start

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
# Follow prompts, auto-deploys on git push
```

### Docker

```bash
docker build -t levelup .
docker run -p 3000:3000 levelup
# App runs on http://localhost:3000
```

### Static (GitHub Pages)

```bash
npm run build
npx gh-pages -d dist
# Deployed to your-username.github.io/repo-name
```

**Full guide**: DEPLOYMENT_GUIDE.md

## 🐛 Debugging

### Lesson Markdown Not Loading

```javascript
// Check courseUtils.js fetchLessonMarkdown()
// Verify GitHub URL is correct:
// https://raw.githubusercontent.com/levelupdevs1/levelup-curriculum/main/src/courses/{courseId}/{filePath}

// Check browser Network tab:
// Should see successful request to GitHub raw URL
```

### Points Not Updating

```javascript
// 1. Check browser console for errors
// 2. Open DevTools → Network tab
// 3. Look for failed requests
// 4. Check Supabase RLS policies on progress table
// 5. Verify user_id is correct

// Manual check in Supabase:
SELECT * FROM progress WHERE user_id = 'your-user-id' ORDER BY created_at DESC;
SELECT * FROM users WHERE id = 'your-user-id';
```

### Level Not Updating

```javascript
// Check calculation: level = floor(total_points / 500) + 1
// At 0 pts: level 1
// At 500 pts: level 2
// At 1000 pts: level 3

// Manual check:
SELECT total_points, current_level FROM users WHERE id = 'your-user-id';
```

## 📊 Database Query Reference

### User Stats

```sql
SELECT id, full_name, username, total_points, current_level, wallet_address
FROM users
WHERE username = 'johndoe';
```

### Course Progress

```sql
SELECT p.course_id, COUNT(*) as completed_lessons
FROM progress p
WHERE p.user_id = '[user-id]'
GROUP BY p.course_id;
```

### Points per User

```sql
SELECT user_id, COUNT(*) as lessons_completed, SUM(points_awarded) as total_points
FROM progress
GROUP BY user_id;
```

### Token Claims

```sql
SELECT user_id, level, amount, claimed_at
FROM token_claims
WHERE user_id = '[user-id]'
ORDER BY claimed_at DESC;
```

## 🔧 Configuration Reference

### Environment Variables

```env
# .env.local (development)
VITE_SUPABASE_URL=https://[project-id].supabase.co
VITE_SUPABASE_ANON_KEY=[your-anon-key]

# .env.production.local (production)
VITE_SUPABASE_URL=https://[prod-project-id].supabase.co
VITE_SUPABASE_ANON_KEY=[prod-anon-key]
```

### Token Scaling

```javascript
// From ProfileNew.jsx
const TOKEN_SCALING = {
  1: 10, // Level 1: 10 tokens
  2: 50, // Level 2: 50 tokens
  3: 70, // Level 3: 70 tokens
  4: 100, // Level 4: 100 tokens
  5: 150, // Level 5: 150 tokens
  6: 200, // Level 6: 200 tokens
  // Add more levels as needed
};
```

### Points System

```javascript
// Constants (from database/UI logic)
POINTS_PER_LESSON = 10;
POINTS_PER_ASSIGNMENT = 15;
POINTS_PER_LEVEL = 500; // Level up every 500 points

// Formula
current_level = floor(total_points / 500) + 1;
points_to_next_level = 500 - (total_points % 500);
progress_percentage = ((total_points % 500) / 500) * 100;
```

## 📚 Useful Links

- **Supabase Docs**: https://supabase.com/docs
- **React Docs**: https://react.dev
- **React Router**: https://reactrouter.com
- **GitHub API**: https://docs.github.com/en/rest
- **Vite Docs**: https://vitejs.dev
- **CSS Modules**: https://create-react-app.dev/docs/adding-a-css-modules-stylesheet/

## 🆘 Getting Help

### Before Asking

1. Check README.md
2. Check relevant documentation
3. Check browser console for errors
4. Check Supabase logs
5. Check GitHub issues

### Issue Template

```markdown
## Description

Brief description of the issue

## Steps to Reproduce

1. ...
2. ...
3. ...

## Expected Behavior

What should happen

## Actual Behavior

What actually happens

## Logs/Screenshots
```

## ✅ Production Checklist

- [ ] All environment variables set
- [ ] Database backups enabled
- [ ] SSL certificate installed
- [ ] HTTPS enforced
- [ ] Error monitoring set up
- [ ] Uptime monitoring configured
- [ ] Custom domain configured
- [ ] Complete test flow passed
- [ ] Performance optimized
- [ ] Security audit completed

See DEPLOYMENT_GUIDE.md for full checklist.

## 🎯 Helpful Commands

```bash
# Git
git status                    # Check what changed
git log --oneline -10         # Last 10 commits
git diff                      # See exact changes
git add .                     # Stage all changes
git commit -m "message"       # Commit with message
git push origin main          # Push to GitHub

# npm
npm install                   # Install dependencies
npm run dev                   # Start dev server
npm run build                 # Build for production
npm run preview              # Preview production build
npm list                      # List dependencies
npm outdated                  # Check for updates

# Supabase
supabase init                 # Initialize Supabase
supabase start                # Start local dev
supabase db push             # Push migrations
supabase functions deploy    # Deploy Edge Functions
```

---

**Last Updated**: October 19, 2025  
**Version**: MVP 1.0  
**Status**: Production Ready ✅

For complete information, see the main documentation files.
