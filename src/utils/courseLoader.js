// Course loader utility to fetch course content from the courses directory

export const loadCourse = async (courseId) => {
  try {
    // Import course metadata
    const courseModule = await import(`../courses/${courseId}/course.json`);
    const course = courseModule.default || courseModule;

    // Just return the course structure - markdown content will be loaded separately
    return course;
  } catch (error) {
    console.error(`Error loading course ${courseId}:`, error);
    throw new Error(`Course ${courseId} not found`);
  }
};

export const loadAllCourses = async () => {
  // For now, we'll return the course IDs we know exist
  const courseIds = [
    "web-development-basics",
    "react-fundamentals",
    "javascript-advanced",
  ];

  const courses = await Promise.all(
    courseIds.map(async (courseId) => {
      try {
        const courseModule = await import(`../courses/${courseId}/course.json`);
        return courseModule.default || courseModule;
      } catch (error) {
        console.error(`Error loading course ${courseId}:`, error);
        return null;
      }
    })
  );

  return courses.filter((course) => course !== null);
};

export const loadLesson = async (courseId, moduleId, lessonId) => {
  try {
    const response = await fetch(
      `/src/courses/${courseId}/${moduleId}/${lessonId}.md`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch ${lessonId}`);
    }
    return await response.text();
  } catch (error) {
    console.error(`Error loading lesson ${lessonId}:`, error);
    throw new Error(`Lesson ${lessonId} not found`);
  }
};
