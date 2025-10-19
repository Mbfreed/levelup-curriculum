import React, { createContext, useContext, useState, useEffect } from "react";
import { loadCourse, loadAllCourses } from "../utils/courseLoader";

const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userProgress, setUserProgress] = useState({});
  const [submissions, setSubmissions] = useState({});
  const [reviewRequests, setReviewRequests] = useState({});

  // Load courses on component mount
  useEffect(() => {
    const loadCourses = async () => {
      try {
        const loadedCourses = await loadAllCourses();
        // Add mock data for enrollment, progress, etc.
        const coursesWithMockData = loadedCourses.map((course) => ({
          ...course,
          progress: Math.floor(Math.random() * 100),
          isEnrolled: Math.random() > 0.5,
          instructor: "Community",
          price: 0,
          thumbnail: "/api/placeholder/300/200",
          tags: ["Web Development", "Programming"],
        }));
        setCourses(coursesWithMockData);
      } catch (error) {
        console.error("Error loading courses:", error);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  // Helper function to get course by ID
  const getCourseById = async (courseId) => {
    try {
      return await loadCourse(courseId);
    } catch (error) {
      console.error("Error loading course:", error);
      return null;
    }
  };

  // Helper function to get lesson by ID
  const getLessonById = (courseId, lessonId) => {
    const course = courses.find((c) => c.id === courseId);
    if (!course || !course.modules) return null;

    for (const module of course.modules) {
      const lesson = module.lessons.find((l) => l.id === lessonId);
      if (lesson) return lesson;
    }
    return null;
  };

  // Helper function to get all lessons from a course
  const getAllLessons = (course) => {
    if (!course || !course.modules) return [];
    return course.modules.flatMap((module) => module.lessons || []);
  };

  // Helper function to get previous lesson
  const getPreviousLesson = (courseId, currentLessonId) => {
    const course = courses.find((c) => c.id === courseId);
    if (!course) return null;

    const allLessons = getAllLessons(course);
    const currentIndex = allLessons.findIndex((l) => l.id === currentLessonId);
    return currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  };

  // Helper function to get next lesson
  const getNextLesson = (courseId, currentLessonId) => {
    const course = courses.find((c) => c.id === courseId);
    if (!course) return null;

    const allLessons = getAllLessons(course);
    const currentIndex = allLessons.findIndex((l) => l.id === currentLessonId);
    return currentIndex < allLessons.length - 1
      ? allLessons[currentIndex + 1]
      : null;
  };

  // Helper function to get current lesson index
  const getCurrentLessonIndex = (courseId, currentLessonId) => {
    const course = courses.find((c) => c.id === courseId);
    if (!course) return 0;

    const allLessons = getAllLessons(course);
    return allLessons.findIndex((l) => l.id === currentLessonId);
  };

  // Enroll in course
  const enrollInCourse = (courseId) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course.id === courseId ? { ...course, isEnrolled: true } : course
      )
    );
  };

  // Mark lesson as complete
  const markLessonComplete = (courseId, lessonId) => {
    setUserProgress((prev) => ({
      ...prev,
      [`${courseId}-${lessonId}`]: {
        completed: true,
        completedAt: new Date().toISOString(),
      },
    }));
  };

  // Get lesson progress
  const getLessonProgress = (courseId, lessonId) => {
    return userProgress[`${courseId}-${lessonId}`] || { completed: false };
  };

  // Check if lesson is completed
  const isLessonCompleted = (courseId, lessonId) => {
    return getLessonProgress(courseId, lessonId).completed;
  };

  // Get module progress
  const getModuleProgress = (courseId, moduleId) => {
    const course = courses.find((c) => c.id === courseId);
    if (!course) return 0;

    const module = course.modules.find((m) => m.id === moduleId);
    if (!module) return 0;

    const completedLessons = module.lessons.filter((lesson) =>
      isLessonCompleted(courseId, lesson.id)
    );

    return (completedLessons.length / module.lessons.length) * 100;
  };

  // Check if module is completed
  const isModuleCompleted = (courseId, moduleId) => {
    return getModuleProgress(courseId, moduleId) === 100;
  };

  // Submit assignment
  const submitAssignment = (courseId, lessonId, submission) => {
    const submissionId = `sub-${Date.now()}`;
    const newSubmission = {
      id: submissionId,
      courseId,
      lessonId,
      ...submission,
      submittedAt: new Date().toISOString(),
      status: "submitted",
    };

    setSubmissions((prev) => ({
      ...prev,
      [submissionId]: newSubmission,
    }));

    return submissionId;
  };

  // Get submissions for a lesson
  const getSubmissions = (courseId, lessonId) => {
    return Object.values(submissions).filter(
      (sub) => sub.courseId === courseId && sub.lessonId === lessonId
    );
  };

  // Submit review request
  const submitReviewRequest = (courseId, lessonId, request) => {
    const requestId = `req-${Date.now()}`;
    const newRequest = {
      id: requestId,
      courseId,
      lessonId,
      ...request,
      submittedAt: new Date().toISOString(),
      status: "open",
    };

    setReviewRequests((prev) => ({
      ...prev,
      [lessonId]: [...(prev[lessonId] || []), newRequest],
    }));

    return requestId;
  };

  // Get review requests for a lesson
  const getReviewRequests = (lessonId) => {
    return reviewRequests[lessonId] || [];
  };

  // Submit review feedback
  const submitReviewFeedback = (requestId, feedback) => {
    setReviewRequests((prev) => {
      const newRequests = { ...prev };
      Object.keys(newRequests).forEach((lessonId) => {
        newRequests[lessonId] = newRequests[lessonId].map((request) => {
          if (request.id === requestId) {
            return {
              ...request,
              reviews: [...(request.reviews || []), feedback],
            };
          }
          return request;
        });
      });
      return newRequests;
    });
  };

  // Mock user stats
  const userStats = {
    level: 3,
    exp: 1250,
    coins: 45,
    streak: 7,
  };

  const value = {
    courses,
    loading,
    userProgress,
    submissions,
    reviewRequests,
    userStats,
    getCourseById,
    getLessonById,
    getAllLessons,
    getPreviousLesson,
    getNextLesson,
    getCurrentLessonIndex,
    enrollInCourse,
    markLessonComplete,
    getLessonProgress,
    isLessonCompleted,
    getModuleProgress,
    isModuleCompleted,
    submitAssignment,
    getSubmissions,
    submitReviewRequest,
    getReviewRequests,
    submitReviewFeedback,
  };

  return (
    <CourseContext.Provider value={value}>{children}</CourseContext.Provider>
  );
};

export const useCourse = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error("useCourse must be used within a CourseProvider");
  }
  return context;
};

