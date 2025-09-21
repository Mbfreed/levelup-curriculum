import React from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import Card from "../Card/Card";
import Button from "../Button/Button";
import styles from "./RecommendedCoursesSection.module.css";

const RecommendedCoursesSection = ({
  recommendedCourses,
  onContinueCourse,
  onEnrollCourse,
}) => {
  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Recommended for You</h2>
        <Link to="/courses" className={styles.sectionLink}>
          View All
        </Link>
      </div>

      <div className={styles.courseList}>
        {recommendedCourses.map((course) => (
          <Card key={course.id} className={styles.courseCard} clickable>
            <div className={styles.courseContent}>
              <div className={styles.courseInfo}>
                <h3 className={styles.courseTitle}>{course.title}</h3>
                <p className={styles.courseDescription}>{course.description}</p>
                <div className={styles.courseMeta}>
                  <span className={styles.courseLevel}>{course.level}</span>
                  <span className={styles.courseRating}>
                    <Star size={16} />
                    {course.rating}
                  </span>
                  <span className={styles.courseStudents}>
                    {course.students} students
                  </span>
                </div>
              </div>
              <div className={styles.courseActions}>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (course.isEnrolled) {
                      onContinueCourse(course.id);
                    } else {
                      onEnrollCourse(course.id);
                    }
                  }}
                >
                  {course.isEnrolled ? "Continue" : "Enroll"}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RecommendedCoursesSection;
