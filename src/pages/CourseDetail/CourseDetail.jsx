import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCourse } from "../../contexts/CourseContext";
import {
  Clock,
  Users,
  Star,
  BookOpen,
  Play,
  ArrowLeft,
  CheckCircle,
  Lock,
  Code,
  FileText,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import ModuleList from "../../components/ModuleList/ModuleList";
import styles from "./CourseDetail.module.css";
import courses from "../../courses.json";

const CourseDetail = () => {
  const { courseId } = useParams();
  const { getCourseById, enrollInCourse, getAllLessons } = useCourse();
  const navigate = useNavigate();
  const [expandedModules, setExpandedModules] = useState({});

  // const course = getCourseById(courseId);
  const coursesData = courses.courses;
  const course = coursesData.find((c) => c.id === courseId);

  if (!course) {
    return (
      <div className={styles.container}>
        <div className={styles.notFound}>
          <h1>Course not found</h1>
          <p>The course you're looking for doesn't exist.</p>
          <Button
            variant="primary"
            onClick={() => navigate("/courses")}
            icon={<ArrowLeft size={20} />}
          >
            Back to Courses
          </Button>
        </div>
      </div>
    );
  }

  const handleEnroll = () => {
    enrollInCourse(courseId);
  };

  const handleStartLesson = (lessonId) => {
    navigate(`/courses/${courseId}/lessons/${lessonId}`);
  };

  const toggleModule = (moduleId) => {
    setExpandedModules((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }));
  };

  const handleContinueCourse = () => {
    // Find the first incomplete, unlocked lesson
    const allLessons = getAllLessons(course);
    const nextLesson = allLessons.find(
      (lesson) => !lesson.isCompleted && !lesson.isLocked
    );

    if (nextLesson) {
      navigate(`/courses/${courseId}/lessons/${nextLesson.id}`);
    } else {
      // If all lessons are completed, go to the last lesson
      const lastLesson = allLessons[allLessons.length - 1];
      navigate(`/courses/${courseId}/lessons/${lastLesson.id}`);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.courseInfo}>
          <h1 className={styles.title}>{course.title}</h1>
          <p className={styles.description}>{course.description}</p>

          <div className={styles.meta}>
            <div className={styles.metaItem}>
              <Clock size={20} />
              <span>{course.duration}</span>
            </div>
            <div className={styles.metaItem}>
              <BookOpen size={20} />
              <span>{10} lessons</span>
            </div>
            <div className={styles.metaItem}>
              <Users size={20} />
              <span>{10} students</span>
            </div>
            <div className={styles.metaItem}>
              <Star size={20} />
              <span>{course.rating}</span>
            </div>
          </div>

          <div className={styles.actions}>
            <Button
              variant="primary"
              size="lg"
              onClick={course.isEnrolled ? handleContinueCourse : handleEnroll}
              icon={<Play size={20} />}
            >
              {course.isEnrolled ? "Continue Course" : "Enroll Now"}
            </Button>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.lessons}>
          <h2 className={styles.sectionTitle}>Course Modules</h2>
          <ModuleList
            modules={course.modules}
            expandedModules={expandedModules}
            onToggleModule={toggleModule}
            onLessonClick={handleStartLesson}
            showProgress={true}
            className={styles.moduleList}
          />
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
