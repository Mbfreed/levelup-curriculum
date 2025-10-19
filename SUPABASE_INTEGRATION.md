# Supabase Integration Guide

This document outlines the new Supabase-based architecture and integration points.

## Architecture Overview

### Frontend Components

1. **Authentication** (`UserContext.jsx`)
   - Manages user login/signup via Supabase Auth
   - Stores user profile in Supabase `users` table
   - Auto-syncs user data on auth state changes

2. **Courses** (`CourseContextSupabase.jsx`)
   - Fetches courses from Supabase `courses` table
   - Loads lesson markdown from GitHub raw URLs
   - Tracks user enrollments and progress

3. **Utilities** (`courseUtils.js`)
   - Course fetching functions
   - Lesson completion and points tracking
   - Progress calculation
   - Assignment submission

### Pages

- **CourseCatalogNew.jsx** - Display all courses, enroll in courses
- **LessonViewerNew.jsx** - View lessons, mark complete, track progress
- **DashboardNew.jsx** - User stats, continue learning, recommended courses
- **ProfileNew.jsx** - User info, token claiming, completed courses

## Setup Instructions

### 1. Environment Variables

Create `.env.local` with:

```
VITE_SUPABASE_URL=https://lonsuwvdmtoinrhbytzn.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

### 2. Update Router

Replace old page imports with new ones:

```jsx
// OLD
import CourseCatalog from "./pages/CourseCatalog/CourseCatalog";
import LessonViewer from "./pages/LessonViewer/LessonViewer";
import Dashboard from "./pages/Dashboard/Dashboard";
import Profile from "./pages/Profile/Profile";

// NEW
import CourseCatalogNew from "./pages/CourseCatalog/CourseCatalogNew";
import LessonViewerNew from "./pages/LessonViewer/LessonViewerNew";
import DashboardNew from "./pages/Dashboard/DashboardNew";
import ProfileNew from "./pages/Profile/ProfileNew";
```

### 3. Update Provider Setup

In `main.jsx` or `App.jsx`:

```jsx
import { UserProvider } from "./contexts/UserContext";
import { CourseProvider } from "./contexts/CourseContextSupabase";

function App() {
  return (
    <UserProvider>
      <CourseProvider>
        {/* Routes */}
      </CourseProvider>
    </UserProvider>
  );
}
```

### 4. Database Schema

Ensure these tables exist in Supabase:

```sql
-- users table
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email TEXT UNIQUE,
  full_name TEXT,
  username TEXT UNIQUE,
  wallet_address TEXT,
  total_points INT DEFAULT 0,
  current_level INT DEFAULT 1,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- courses table
CREATE TABLE courses (
  id TEXT PRIMARY KEY,
  title TEXT,
  description TEXT,
  level TEXT,
  duration TEXT,
  modules JSONB,
  git_path TEXT,
  last_synced_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- enrollments table
CREATE TABLE enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  course_id TEXT REFERENCES courses(id),
  enrolled_at TIMESTAMP DEFAULT NOW(),
  status TEXT DEFAULT 'in-progress',
  UNIQUE(user_id, course_id)
);

-- progress table
CREATE TABLE progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  course_id TEXT REFERENCES courses(id),
  module_id TEXT,
  lesson_id TEXT,
  completed_at TIMESTAMP,
  points_earned INT DEFAULT 0,
  UNIQUE(user_id, lesson_id)
);

-- completions table (for certificates)
CREATE TABLE completions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  course_id TEXT REFERENCES courses(id),
  completed_at TIMESTAMP DEFAULT NOW(),
  certificate_eligible BOOLEAN DEFAULT true,
  UNIQUE(user_id, course_id)
);

-- token_claims table
CREATE TABLE token_claims (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  level INT,
  tokens_claimed INT,
  claimed_at TIMESTAMP DEFAULT NOW(),
  tx_hash TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);
```

## Key Features

### Course Syncing

The Supabase Edge Function `sync-courses` automatically:
1. Fetches all `course.json` files from GitHub
2. Parses course structure
3. Updates the `courses` table

**Manual Trigger:**
```bash
curl -X POST https://your-project.supabase.co/functions/v1/sync-courses \
  -H "Authorization: Bearer your_anon_key" \
  -H "Content-Type: application/json"
```

### Progress Tracking

When a user completes a lesson:
1. `recordLessonCompletion()` is called
2. Progress record is created
3. Points are awarded (+10 for lessons, +15 for assignments)
4. User level is auto-calculated (every 500 points = 1 level)
5. Level-up notification shown if applicable

### Token Claiming

Users can claim platform tokens when they level up:
- Level 1: 10 tokens
- Level 2: 50 tokens
- Level 3: 70 tokens
- Level 4: 100 tokens
- Level 5: 150 tokens
- Level 6+: 200 tokens

**Requirements:**
- User must connect wallet
- Tokens recorded in `token_claims` table
- Blockchain integration (future)

## Points System

```
Lesson Completion: +10 points
Assignment Submission (approved): +15 points
Level Threshold: 500 points per level
```

### Calculation

```javascript
newLevel = Math.floor(totalPoints / 500) + 1
```

## File Structure

```
src/
├── config/
│   └── supabaseConfig.js           # Supabase client
├── contexts/
│   ├── UserContext.jsx              # Auth & user data
│   └── CourseContextSupabase.jsx    # Courses & progress
├── utils/
│   └── courseUtils.js               # Course functions
└── pages/
    ├── CourseCatalog/
    │   └── CourseCatalogNew.jsx
    ├── LessonViewer/
    │   └── LessonViewerNew.jsx
    ├── Dashboard/
    │   └── DashboardNew.jsx
    └── Profile/
        └── ProfileNew.jsx
```

## API Functions

### User Functions

- `register(fullName, username, email, password)` - Sign up
- `login(email, password)` - Sign in
- `logout()` - Sign out
- `updateUser(updates)` - Update user profile
- `addPoints(points)` - Award points and auto-level up

### Course Functions

- `fetchAllCourses()` - Get all courses
- `fetchCourseById(courseId)` - Get single course
- `fetchLessonMarkdown(courseId, filePath)` - Get lesson content
- `fetchUserEnrollments(userId)` - Get user's courses
- `enrollCourse(userId, courseId)` - Enroll user
- `recordLessonCompletion(...)` - Mark lesson done
- `getCourseProgress(userId, courseId)` - Get course %
- `submitAssignment(...)` - Submit assignment
- `markCourseCompleted(...)` - Mark course done

## Migration from Firebase

### Old vs New

| Feature | Firebase | Supabase |
|---------|----------|----------|
| Auth | Firebase Auth | Supabase Auth |
| Database | Firestore | PostgreSQL |
| User Data | Firestore | `users` table |
| Courses | JSON file | `courses` table |
| Progress | Firestore | `progress` table |
| Enrollments | Firestore | `enrollments` table |

### Removing Firebase

1. Delete `firebaseConfig.js`
2. Remove firebase imports from old components
3. Update router to use new pages
4. Delete old context files (keep backup)

## Testing Checklist

- [ ] User can sign up with email, password, full_name, username
- [ ] User can log in
- [ ] Courses load from Supabase
- [ ] User can enroll in course
- [ ] User can view lesson markdown
- [ ] Lesson completion records progress
- [ ] Points awarded (+10 for lesson)
- [ ] Level auto-calculates correctly
- [ ] User can claim tokens
- [ ] Dashboard shows stats correctly
- [ ] Profile shows user info
- [ ] Course progress calculated correctly

## Next Steps

1. Update routes in `router.jsx` to use new pages
2. Test signup/login flow
3. Test course browsing and enrollment
4. Test lesson viewing and completion
5. Test token claiming
6. Remove old Firebase code
7. Deploy to production

## Support

For issues with:
- **Auth**: Check UserContext and Supabase Auth settings
- **Courses**: Verify sync function and GitHub URLs
- **Progress**: Check progress table RLS policies
- **Points**: Verify calculation logic in `recordLessonCompletion()`
