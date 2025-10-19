# MVP Testing Guide

This guide walks through testing the complete user journey in the Level Up platform.

## Prerequisites

- Supabase project set up with all tables created
- Course sync completed (3 courses in database)
- Environment variables set (.env.local)
- Development server running: `npm run dev`

## Testing Checklist

### 1. Authentication Flow

#### Signup Test
- [ ] Navigate to `/register`
- [ ] Fill in form:
  - Full Name: "John Doe"
  - Username: "johndoe" (must be alphanumeric + _ - only)
  - Email: "john@example.com"
  - Password: "TestPassword123!"
- [ ] Click "Sign Up"
- [ ] Should redirect to dashboard
- [ ] Verify in Supabase: new user created in `users` table with:
  - `full_name`: "John Doe"
  - `username`: "johndoe"
  - `total_points`: 0
  - `current_level`: 1

#### Login Test
- [ ] Logout
- [ ] Navigate to `/login`
- [ ] Enter credentials from signup
- [ ] Click "Login"
- [ ] Should redirect to dashboard with user data loaded
- [ ] Avatar shows user's initial (J)

#### Invalid Credentials
- [ ] Try login with wrong email/password
- [ ] Should show error message
- [ ] Should not redirect

### 2. Dashboard

#### Initial Load
- [ ] After login, dashboard shows:
  - [ ] User stats card: 0 points, Level 1
  - [ ] Progress bar: empty (0/500)
  - [ ] "Continue Learning" section: empty (no enrollments yet)
  - [ ] "Recommended Courses" section: shows all 3 courses
- [ ] Verify stats are from user record in database

#### Course Cards
- [ ] Each course card shows:
  - [ ] Course title
  - [ ] Description
  - [ ] Course level (Beginner/Intermediate/Advanced)
  - [ ] "Enroll Now" button (for recommended courses)

### 3. Course Catalog

#### Browse Courses
- [ ] Click "Courses" in header/sidebar
- [ ] Page displays all courses from Supabase:
  - [ ] Web Development Basics
  - [ ] React Fundamentals
  - [ ] JavaScript Advanced
- [ ] Each course shows: title, description, level, duration

#### Filter & Sort
- [ ] Filter by "Beginner" level
- [ ] Should show only beginner courses
- [ ] Try other levels
- [ ] Sort by "Newest" (should work without errors)

#### Enroll in Course
- [ ] Click "Enroll Now" on "Web Development Basics"
- [ ] Button changes to "Loading..."
- [ ] After ~2 seconds, button changes to "Continue Learning"
- [ ] Success message appears
- [ ] Verify in Supabase `enrollments` table:
  - New row with: `user_id`, `course_id`, `enrolled_at`

### 4. Lesson Viewing

#### View First Lesson
- [ ] From course catalog, click "Continue Learning" on "Web Development Basics"
- [ ] Should navigate to lesson viewer
- [ ] Displays markdown content from GitHub (lesson 1 content appears)
- [ ] Sidebar shows:
  - [ ] Course title
  - [ ] Module list
  - [ ] Current progress (1/X lessons)
- [ ] Button shows "Mark as Complete"

#### Mark Lesson Complete
- [ ] Click "Mark as Complete" button
- [ ] Button becomes disabled
- [ ] Notification appears: "+10 points earned!" (or similar)
- [ ] Sidebar progress updates (e.g., 2/X)
- [ ] Dashboard should show new stats:
  - [ ] Total points: 10
  - [ ] Progress bar: 10/500 (2%)
- [ ] Verify in Supabase:
  - [ ] `progress` table: new row with lesson completion
  - [ ] `users` table: `total_points` = 10

#### Lesson Navigation
- [ ] Click "Next Lesson" button
- [ ] Should navigate to next lesson in same module
- [ ] Verify markdown content loaded from GitHub
- [ ] Mark this lesson complete too
- [ ] Points increase to 20

#### Complete Multiple Lessons
- [ ] Continue marking lessons complete (at least 50 lessons for level up)
- [ ] After 50 lessons (500 points): Level should auto-update to 2
- [ ] Notification: "Level Up! You are now Level 2! 🎉"
- [ ] Dashboard reflects new level

### 5. Progress Tracking

#### Course Progress
- [ ] Dashboard "Continue Learning" shows progress:
  - [ ] "Web Development Basics: 50/X lessons (XX%)"
- [ ] Click course → view progress in lesson viewer sidebar

#### Point Calculation
- [ ] Each lesson = 10 points
- [ ] Current level = floor(total_points / 500) + 1
- [ ] At 10 points → Level 1 (not changed yet)
- [ ] At 500 points → Level 2
- [ ] At 1000 points → Level 3
- [ ] Progress bar shows: (total_points % 500) / 500 * 100

### 6. Profile Page

#### View Profile
- [ ] Click "Profile" in header/sidebar
- [ ] Shows user information:
  - [ ] Full Name: "John Doe"
  - [ ] Username: "johndoe"
  - [ ] Email: "john@example.com"
  - [ ] Total Points: X
  - [ ] Current Level: X
  - [ ] Completed Courses: 0 (initially)

#### Edit Profile
- [ ] Click "Edit Profile" button
- [ ] Full Name: change to "John Smith"
- [ ] Wallet Address: enter "0x1234567890abcdef1234567890abcdef12345678"
- [ ] Click "Save Changes"
- [ ] Success message appears
- [ ] Verify in Supabase `users` table:
  - [ ] `full_name`: "John Smith"
  - [ ] `wallet_address`: wallet entered
- [ ] Page refreshes with new data

#### Claim Tokens (Before Level Up)
- [ ] If level < 2: "Token Claiming" section shows:
  - [ ] "Reach Level 2 to claim your first tokens!"
- [ ] No claim button available

#### Claim Tokens (After Level Up)
- [ ] After reaching Level 2:
  - [ ] "Claimable Tokens: 50" (from TOKEN_SCALING[2])
- [ ] Click "Claim Level X Tokens" button
- [ ] Checks if wallet_address is set:
  - [ ] If not set: Error "Please connect wallet first"
  - [ ] If set: Proceeds to claim
- [ ] After claim:
  - [ ] Button shows "Already Claimed ✓"
  - [ ] Verify in Supabase `token_claims` table:
    - New row: `user_id`, `level`, `amount` (50)
  - [ ] Record shows claim timestamp

#### Completed Courses
- [ ] If no courses completed: "No completed courses yet"
- [ ] After completing a full course:
  - [ ] Course appears in list
  - [ ] "Mint NFT (Coming Soon)" button visible

### 7. End-to-End Flow

**Complete Journey:**
1. [ ] Signup as new user
2. [ ] See dashboard with 0 points, Level 1
3. [ ] Enroll in "Web Development Basics"
4. [ ] Complete 50 lessons (500 points)
5. [ ] See "Level Up!" notification → Level 2
6. [ ] Go to profile
7. [ ] Add wallet address
8. [ ] Claim 50 tokens for Level 2
9. [ ] See token claim record
10. [ ] Complete more lessons, reach Level 3
11. [ ] Claim 70 tokens
12. [ ] See cumulative tokens increasing

### 8. Error Handling

#### Invalid Operations
- [ ] Try to enroll twice in same course:
  - [ ] Should show "Already enrolled" or skip duplicate
- [ ] Try to mark same lesson complete twice:
  - [ ] Second click should be disabled or ignored
- [ ] Mark complete without authentication:
  - [ ] Should redirect to login
- [ ] Claim tokens without wallet:
  - [ ] Should show error message

#### Network Errors
- [ ] Open browser dev tools → Network tab
- [ ] Throttle to "Slow 3G"
- [ ] Try enrolling in course
- [ ] Should show loading state
- [ ] Should eventually complete or show error

### 9. Data Verification (Supabase)

After completing above tests, verify in Supabase:

**users table:**
```sql
SELECT id, full_name, username, total_points, current_level, wallet_address
FROM users
WHERE username = 'johndoe';
```
Expected: Points increasing, level correct, wallet set

**enrollments table:**
```sql
SELECT user_id, course_id, enrolled_at
FROM enrollments
WHERE user_id = (SELECT id FROM users WHERE username = 'johndoe');
```
Expected: 1 row for Web Development Basics

**progress table:**
```sql
SELECT COUNT(*) as lessons_completed, MAX(updated_at) as last_completed
FROM progress
WHERE user_id = (SELECT id FROM users WHERE username = 'johndoe');
```
Expected: 50+ lessons

**token_claims table:**
```sql
SELECT level, amount, claimed_at
FROM token_claims
WHERE user_id = (SELECT id FROM users WHERE username = 'johndoe');
```
Expected: Rows for each level claimed

### 10. Known Limitations (MVP)

- [ ] Assignments not yet implemented (only lesson completion tracked)
- [ ] Peer review system not available
- [ ] Blockchain NFT minting shows "Coming Soon"
- [ ] Admin sync button not implemented (use Edge Function directly)
- [ ] Discussion forum not integrated with new UI
- [ ] Wallet connection is manual (no MetaMask integration yet)

## Debugging Tips

### Issue: Lessons not loading
- Check browser console for errors
- Verify GitHub repo is accessible
- Check courseUtils.js `fetchLessonMarkdown()` function
- Ensure course.json has correct filePath for lessons

### Issue: Points not updating
- Open browser DevTools → Network tab
- Check POST to `/recordLessonCompletion` call
- Verify Supabase RLS policies allow user update

### Issue: Level not updating
- Check Supabase: `SELECT floor(total_points / 500) + 1 AS level`
- Verify calculation in UserContext.jsx `addPoints()` function
- Check notification trigger in LessonViewerNew.jsx

### Issue: Enrollments fail
- Check if user_id is correctly retrieved from context
- Verify Supabase RLS policy on enrollments table
- Check GitHub token rate limits (if many enrolls in short time)

## Success Criteria

✅ All tests pass
✅ No console errors
✅ Data persists correctly in Supabase
✅ User can complete full flow: signup → learn → earn → claim
✅ Points and levels calculate correctly
✅ Notifications appear at appropriate times

## Next Steps

Once testing complete:
1. Deploy to production (Vercel recommended)
2. Create admin panel for course management
3. Implement assignment submission system
4. Add peer review functionality
5. Integrate blockchain for NFT minting
6. Set up GitHub Actions for automated course sync
