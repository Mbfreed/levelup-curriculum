import { useContext } from "react";
import { CourseContext } from "../contexts/createCourseContext";

/**
 * Custom hook to use the Course context
 * @returns {Object} Course context value with courses, progress, and course management functions
 * @throws {Error} If used outside CourseProvider
 */
export const useCourse = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error("useCourse must be used within a CourseProvider");
  }
  return context;
};
