# Enrolled Courses Not Loading - Fixed

## Problem

When users loaded the app, their enrolled courses weren't showing as enrolled. They had to click "Enroll" every time, even though they were already enrolled.

## Root Cause

The `CourseContext` was only fetching courses from Supabase but wasn't:

1. Fetching the user's enrollment records from the `enrollments` table
2. Marking courses with `isEnrolled: true` based on enrollment data

## Solution

Updated `CourseContext.jsx` to:

### 1. Load Courses with Structure

- Changed from loading courses from Supabase to loading from local `course.json` files
- Local files have the full `modules` and `lessons` nested structure needed by LessonViewer
- Supabase courses table didn't have this structure

```javascript
const loadedCourses = await loadAllCourses(); // From courseLoader.js
```

### 2. Fetch User Enrollments

- When user is authenticated, fetch their enrollments from Supabase
- Get list of course IDs they're enrolled in

```javascript
const { success: enrollSuccess, enrollments } = await getUserEnrollments(
  user.id
);
const enrolledCourseIds = new Set(enrollments.map((e) => e.course_id));
```

### 3. Mark Enrolled Courses

- Map over loaded courses and mark `isEnrolled: true` for courses in the user's enrollment list
- Set `isEnrolled: false` for courses they're not enrolled in

```javascript
const coursesWithEnrollment = loadedCourses.map((course) => ({
  ...course,
  isEnrolled: enrolledCourseIds.has(course.id),
}));
```

### 4. Reload When User Changes

- Added `user` to the useEffect dependency array
- When user logs in/out, enrollments are re-fetched

## Data Flow

```
App Loads
  ↓
CourseProvider mounted
  ↓
Load courses from local course.json files
  ↓
User authenticated?
  ↓ Yes: Fetch user enrollments from Supabase
  ↓
Mark courses with isEnrolled status
  ↓
Set courses in state
  ↓
CourseCatalog/Dashboard show correct enrollment status ✅
```

## Code Changes

### Before

```javascript
const { success, courses: loadedCourses } = await fetchCourses();
if (success) {
  setCourses(loadedCourses); // No enrollment info!
}
```

### After

```javascript
const loadedCourses = await loadAllCourses(); // Has modules/lessons
const { success, enrollments } = await getUserEnrollments(user.id);
const enrolledCourseIds = new Set(enrollments.map((e) => e.course_id));

const coursesWithEnrollment = loadedCourses.map((course) => ({
  ...course,
  isEnrolled: enrolledCourseIds.has(course.id),
}));

setCourses(coursesWithEnrollment);
```

## Result

✅ Users see "Continue" button for enrolled courses
✅ Users see "Enroll" button for non-enrolled courses
✅ No need to re-enroll when page reloads
✅ Enrollments persist across sessions

## Files Modified

- `/src/contexts/CourseContext.jsx` - Updated course and enrollment loading logic
