import React, { createContext, useContext, useEffect, useState } from "react";
import {
  fetchAllCourses,
  fetchCourseById,
  fetchLessonMarkdown,
  fetchUserEnrollments,
  getCourseProgress,
} from "../utils/courseUtils";
import { useUser } from "./UserContext";

const CourseContextNew = createContext();

export const CourseProvider = ({ children }) => {
  const { user } = useUser();
  const [courses, setCourses] = useState([]);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [lessonMarkdown, setLessonMarkdown] = useState(null);
  const [userEnrollments, setUserEnrollments] = useState([]);
  const [courseProgress, setCourseProgress] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load all courses on mount
  useEffect(() => {
    const loadCourses = async () => {
      setIsLoading(true);
      try {
        const data = await fetchAllCourses();
        setCourses(data);
      } catch (err) {
        setError("Failed to load courses");
        console.error("Error loading courses:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadCourses();
  }, []);

  // Load user enrollments when user changes
  useEffect(() => {
    if (user?.id) {
      const loadEnrollments = async () => {
        const enrollments = await fetchUserEnrollments(user.id);
        setUserEnrollments(enrollments);
      };

      loadEnrollments();
    }
  }, [user?.id]);

  // Load course progress
  useEffect(() => {
    if (user?.id && currentCourse?.id) {
      const loadProgress = async () => {
        const progress = await getCourseProgress(user.id, currentCourse.id);
        setCourseProgress(progress);
      };

      loadProgress();
    }
  }, [user?.id, currentCourse?.id]);

  // Load lesson markdown
  useEffect(() => {
    if (currentCourse?.id && currentLesson?.filePath) {
      const loadMarkdown = async () => {
        setIsLoading(true);
        try {
          const content = await fetchLessonMarkdown(
            currentCourse.id,
            currentLesson.filePath
          );
          setLessonMarkdown(content);
        } catch (err) {
          setError("Failed to load lesson content");
          console.error("Error loading lesson markdown:", err);
        } finally {
          setIsLoading(false);
        }
      };

      loadMarkdown();
    }
  }, [currentCourse?.id, currentLesson?.filePath]);

  const selectCourse = async (courseId) => {
    try {
      const course = await fetchCourseById(courseId);
      if (course) {
        setCurrentCourse(course);
        setCurrentLesson(null);
        setLessonMarkdown(null);
        setError(null);
      }
    } catch (err) {
      setError("Failed to load course");
      console.error("Error selecting course:", err);
    }
  };

  const selectLesson = (lesson) => {
    if (lesson) {
      setCurrentLesson({
        id: lesson.id,
        title: lesson.title,
        type: lesson.type,
        filePath: lesson.filePath,
        points: lesson.points,
      });
      setLessonMarkdown(null); // Will be loaded by useEffect
    }
  };

  const isEnrolled = (courseId) => {
    return userEnrollments.includes(courseId);
  };

  const value = {
    courses,
    currentCourse,
    currentLesson,
    lessonMarkdown,
    userEnrollments,
    courseProgress,
    isLoading,
    error,
    selectCourse,
    selectLesson,
    isEnrolled,
    setUserEnrollments,
  };

  return (
    <CourseContextNew.Provider value={value}>
      {children}
    </CourseContextNew.Provider>
  );
};

export const useCourse = () => {
  const context = useContext(CourseContextNew);
  if (!context) {
    throw new Error("useCourse must be used within a CourseProvider");
  }
  return context;
};
