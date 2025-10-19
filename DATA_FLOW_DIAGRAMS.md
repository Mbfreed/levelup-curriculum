# Data Flow Diagrams - Lesson Completion Persistence

## 1. Application Load Flow

```
┌─────────────────────────────────────────────────────────────────┐
│ 1. User opens app or navigates to dashboard                     │
└────────────────┬────────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│ 2. UserContext loads user auth + profile from Supabase          │
│    useEffect([]) on mount                                       │
│    - user: { id, email, ... } from auth                         │
│    - profile: { id, total_points, current_level, ... }          │
└────────────────┬────────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│ 3. CourseContext useEffect([user]) triggered                    │
│    - If !user: Load courses with isEnrolled: false             │
│    - If user: Continue to step 4                               │
└────────────────┬────────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│ 4. Load courses from LOCAL files                                │
│    const courses = await loadAllCourses()                       │
│    Each course has: modules[].lessons[] with structure          │
└────────────────┬────────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│ 5. Fetch user enrollments from Supabase                         │
│    const { enrollments } = await getUserEnrollments(user.id)    │
│    Returns: [{course_id: "1"}, {course_id: "2"}]               │
└────────────────┬────────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│ 6. For EACH enrolled course, fetch progress                     │
│    for (course of enrolledCourses) {                            │
│      const { progress } = await getCourseProgress(              │
│        user.id,                                                 │
│        course.id                                                │
│      )                                                          │
│    }                                                            │
└────────────────┬────────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│ 7. Query Supabase progress table                                │
│    SELECT * FROM progress                                       │
│    WHERE user_id = 'USER_ID' AND course_id = 'COURSE_ID'       │
│                                                                 │
│    Returns:                                                     │
│    [                                                            │
│      {                                                          │
│        lesson_id: "1-1-1",           ◄── KEY: matches lesson.id│
│        points_earned: 10,                                       │
│        completed_at: "2024-01-15T...",                          │
│        ...                                                      │
│      },                                                         │
│      { lesson_id: "1-1-3", ... },                              │
│      ...                                                        │
│    ]                                                            │
└────────────────┬────────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│ 8. Create Set of completed lesson IDs                           │
│    const completedLessonIds = new Set(                          │
│      progress.map(p => p.lesson_id)                            │
│    )                                                            │
│    Result: Set { "1-1-1", "1-1-3", "1-2-5", ... }             │
└────────────────┬────────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│ 9. Map lessons and mark isCompleted                             │
│    modules: modules.map(module => ({                            │
│      ...module,                                                 │
│      lessons: module.lessons.map(lesson => ({                  │
│        ...lesson,                                               │
│        isCompleted: completedLessonIds.has(lesson.id)  ◄── KEY │
│      }))                                                        │
│    }))                                                          │
│                                                                 │
│    Result: lesson.isCompleted = true if in Set                 │
└────────────────┬────────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│ 10. Update CourseContext state with courses                     │
│     setCourses(updatedCourses)                                  │
│                                                                 │
│     Now available to all components via useCourse()            │
└────────────────┬────────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│ 11. LessonCard renders with completion status                   │
│     {lesson.isCompleted && (                                    │
│       <div className="completed">                               │
│         <CheckCircle />                                         │
│         <span>Completed</span>                                  │
│       </div>                                                    │
│     )}                                                          │
└─────────────────────────────────────────────────────────────────┘
```

## 2. Lesson Completion Flow

```
┌─────────────────────────────────────────────────────────────────┐
│ 1. User in LessonViewer clicks "Mark Complete" button           │
└────────────────┬────────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│ 2. handleMarkComplete() executes                                │
│    if (!lesson.isCompleted && user && profile) { ... }         │
└────────────────┬────────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│ 3. Update local state (OPTIMISTIC UI UPDATE)                   │
│    completeLesson(courseId, lessonId)                          │
│    → setState: lesson.isCompleted = true                        │
│    → Button changes to "Completed" immediately (fast UX)       │
└────────────────┬────────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│ 4. Find module ID that contains the lesson                      │
│    for (module of course.modules) {                             │
│      if (module.lessons.some(l => l.id === lessonId)) {        │
│        moduleId = module.id;                                    │
│        break;                                                   │
│      }                                                          │
│    }                                                            │
└────────────────┬────────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│ 5. INSERT to Supabase progress table                            │
│    await recordLessonCompletion(                                │
│      user.id,          ◄── e.g., "user-123"                   │
│      courseId,         ◄── e.g., "1"                          │
│      moduleId,         ◄── e.g., "1-1"                        │
│      lessonId,         ◄── e.g., "1-1-1"   KEY!               │
│      points            ◄── 10                                 │
│    )                                                            │
│                                                                 │
│    INSERT INTO progress VALUES (                                │
│      user_id: "user-123",                                       │
│      course_id: "1",                                            │
│      module_id: "1-1",                                          │
│      lesson_id: "1-1-1",                                        │
│      points_earned: 10,                                         │
│      completed_at: "2024-01-15T10:30:00Z"                       │
│    )                                                            │
└────────────────┬────────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│ 6. UPDATE user's total points in Supabase                       │
│    await addPointsToUser(user.id, 10)                          │
│                                                                 │
│    UPDATE users                                                 │
│    SET total_points = total_points + 10                         │
│    WHERE id = "user-123"                                        │
│                                                                 │
│    Result: users.total_points = 145 (if was 135)              │
└────────────────┬────────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│ 7. Both operations complete                                     │
│    Toast/notification shown (if implemented)                   │
│    User can navigate away or complete another lesson            │
└─────────────────────────────────────────────────────────────────┘
```

## 3. Page Reload - Data Persistence

```
┌─────────────────────────────────────────────────────────────────┐
│ User reloads page (F5 or Cmd+R)                                 │
└────────────────┬────────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│ App remounts → UserContext loads user again                    │
│ → CourseContext useEffect([user]) runs again                   │
│                                                                 │
│ CRITICAL: This time, progress table HAS the record             │
└────────────────┬────────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│ courseService.getCourseProgress(user.id, courseId)             │
│ Queries: SELECT * FROM progress                                 │
│ WHERE user_id = 'USER_ID' AND course_id = 'COURSE_ID'         │
│                                                                 │
│ Returns:                                                        │
│ {                                                               │
│   success: true,                                                │
│   progress: [                                                   │
│     { lesson_id: "1-1-1", points_earned: 10, ... }  ◄── FOUND!│
│   ]                                                             │
│ }                                                               │
└────────────────┬────────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│ Create Set and mark lessons again:                              │
│ completedLessonIds.has("1-1-1") = true                         │
│ → lesson.isCompleted = true ✅                                  │
│                                                                 │
│ Lesson still shows as completed after reload!                  │
└─────────────────────────────────────────────────────────────────┘
```

## 4. Code Reference - Key Functions

### CourseContext.jsx - useEffect (Lines 20-90)

```javascript
useEffect(() => {
  const loadCourses = async () => {
    try {
      const loadedCourses = await loadAllCourses();

      if (loadedCourses && loadedCourses.length > 0) {
        let finalCourses = loadedCourses;

        if (user) {
          const { enrollments } = await getUserEnrollments(user.id);
          const enrolledCourseIds = new Set(
            enrollments?.map((e) => e.course_id) || []
          );

          finalCourses = await Promise.all(
            loadedCourses.map(async (course) => {
              const courseWithEnrollment = {
                ...course,
                isEnrolled: enrolledCourseIds.has(course.id),
              };

              if (courseWithEnrollment.isEnrolled) {
                const { success, progress: progressData } =
                  await getCourseProgress(user.id, course.id);

                if (success && progressData && progressData.length > 0) {
                  const completedLessonIds = new Set(
                    progressData.map((p) => p.lesson_id)
                  );

                  if (courseWithEnrollment.modules) {
                    return {
                      ...courseWithEnrollment,
                      modules: courseWithEnrollment.modules.map((module) => ({
                        ...module,
                        lessons: (module.lessons || []).map((lesson) => ({
                          ...lesson,
                          isCompleted: completedLessonIds.has(lesson.id),
                        })),
                      })),
                    };
                  }
                }
              }

              return courseWithEnrollment;
            })
          );
        } else {
          finalCourses = loadedCourses.map((c) => ({
            ...c,
            isEnrolled: false,
          }));
        }

        setCourses(finalCourses);
      }
    } catch (err) {
      console.error("Error loading courses:", err);
    }
  };

  loadCourses();
}, [user]);
```

### courseService.js - getCourseProgress

```javascript
export const getCourseProgress = async (userId, courseId) => {
  try {
    const { data, error } = await supabase
      .from("progress")
      .select("*")
      .eq("user_id", userId)
      .eq("course_id", courseId);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, progress: data || [] };
  } catch (err) {
    return { success: false, error: err.message };
  }
};
```

### LessonViewer.jsx - handleMarkComplete

```javascript
const handleMarkComplete = async () => {
  if (!lesson.isCompleted && user && profile) {
    // Optimistic UI update
    completeLesson(courseId, lessonId);
    unlockNextLesson(courseId, lessonId);

    try {
      const points = 10;
      let moduleId = null;

      if (course && course.modules) {
        for (const module of course.modules) {
          if (module.lessons?.some((l) => l.id === lessonId)) {
            moduleId = module.id;
            break;
          }
        }
      }

      if (moduleId) {
        // Record to Supabase
        await recordLessonCompletion(
          user.id,
          courseId,
          moduleId,
          lessonId,
          points
        );

        // Add points
        await addPointsToUser(user.id, points);
      }
    } catch (error) {
      console.error("Error recording lesson completion:", error);
    }
  }
};
```

## 5. Critical Data Matching Points

```
Local Course JSON (courses.json)        Progress Table (Supabase)
─────────────────────────────          ─────────────────────────
lesson.id = "1-1-1"     ◄─────────────▶  progress.lesson_id = "1-1-1"
                        MUST MATCH!

course.id = "1"         ◄─────────────▶  progress.course_id = "1"
                        MUST MATCH!

user.id = "user-123"    ◄─────────────▶  progress.user_id = "user-123"
                        MUST MATCH!

module.id = "1-1"       ◄─────────────▶  progress.module_id = "1-1"
                        (For context)
```

If any of these don't match, the completedLessonIds Set won't find the lesson!

## 6. Debugging Checklist

```
Issue: Lesson not showing as completed after reload

✅ Check 1: Is user authenticated?
   console.log("User:", user);
   If undefined → need to login first

✅ Check 2: Did recordLessonCompletion succeed?
   Check Supabase progress table:
   SELECT * FROM progress WHERE user_id = 'USER_ID';
   Should have row with lesson_id = "1-1-1"

✅ Check 3: Is getCourseProgress returning data?
   Add log: console.log("Progress from DB:", progressData);
   Should have array with progress records

✅ Check 4: Do lesson IDs match?
   Log completedLessonIds Set
   Log lesson.id from DOM
   Compare formats (string? number? extra spaces?)

✅ Check 5: Are we in enrolled course?
   enrolledCourseIds.has(course.id) must be true
   Otherwise getCourseProgress won't be called

✅ Check 6: Did useEffect run after user loaded?
   Add log at top of loadCourses function
   Check [user] dependency is correct
```

---

**Last Updated**: After implementing lesson completion persistence
**Status**: ✅ Complete and ready for testing
