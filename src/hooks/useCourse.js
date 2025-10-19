import { useContext } from "react";
import { CourseContext } from "./CourseContextSupabase";

export function useCourse() {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error("useCourse must be used within a CourseProvider");
  }
  return context;
}
