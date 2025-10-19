import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Loader,
} from "lucide-react";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import MarkdownRenderer from "../../components/MarkdownRenderer/MarkdownRenderer";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import styles from "./LessonViewer.module.css";
import { useCourse } from "../../hooks/useCourse";
import { useUser } from "../../hooks/useUser";
import {
  recordLessonCompletion,
} from "../../utils/courseUtils";

const LessonViewerNew = () => {
  const { courseId, lessonId } = useParams();
  const { user } = useUser();
  const {
    selectCourse,
    currentCourse,
    currentLesson,
    lessonMarkdown,
    isLoading,
    error,
    selectLesson,
    courseProgress,
  } = useCourse();

  const navigate = useNavigate();
  const [isCompleting, setIsCompleting] = useState(false);
  const [completionMessage, setCompletionMessage] = useState(null);
  const [lessonCompleted, setLessonCompleted] = useState(false);

  // Initialize course and lesson
  useEffect(() => {
    if (courseId && courseId !== currentCourse?.id) {
      selectCourse(courseId);
    }
  }, [courseId, currentCourse?.id, selectCourse]);

  // Select lesson when courseId or lessonId changes
  useEffect(() => {
    if (currentCourse?.modules && lessonId && !currentLesson?.id) {
      // Find the lesson in current course
      for (const module of currentCourse.modules) {
        const lesson = module.lessons.find((l) => l.id === lessonId);
        if (lesson) {
          selectLesson(lesson);
          break;
        }
      }
    }
  }, [currentCourse?.modules, lessonId, currentLesson?.id, selectLesson]);

  const handleMarkComplete = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (lessonCompleted) {
      alert("Lesson already completed!");
      return;
    }

    setIsCompleting(true);
    try {
      const result = await recordLessonCompletion(
        user.id,
        courseId,
        currentLesson.moduleId || "",
        lessonId,
        currentLesson.points || 10
      );

      if (result.success) {
        setLessonCompleted(true);
        const message = `🎉 Lesson completed! +${currentLesson.points || 10} points`;
        if (result.leveledUp) {
          setCompletionMessage(
            `${message}\n⬆️ Level up! You're now level ${result.newLevel}`
          );
        } else {
          setCompletionMessage(message);
        }

        // Show message for 3 seconds then clear
        setTimeout(() => setCompletionMessage(null), 3000);
      } else {
        alert(result.error || "Failed to complete lesson");
      }
    } catch (error) {
      console.error("Error completing lesson:", error);
      alert("Error completing lesson");
    } finally {
      setIsCompleting(false);
    }
  };

  // Find current and next/prev lessons
  const getAllLessons = () => {
    if (!currentCourse?.modules) return [];
    return currentCourse.modules.flatMap((m) =>
      m.lessons.map((l) => ({ ...l, moduleId: m.id }))
    );
  };

  const allLessons = getAllLessons();
  const currentLessonIndex = allLessons.findIndex((l) => l.id === lessonId);
  const previousLesson =
    currentLessonIndex > 0 ? allLessons[currentLessonIndex - 1] : null;
  const nextLesson =
    currentLessonIndex < allLessons.length - 1
      ? allLessons[currentLessonIndex + 1]
      : null;

  const handlePreviousLesson = () => {
    if (previousLesson) {
      navigate(`/lessons/${courseId}/${previousLesson.id}`);
    }
  };

  const handleNextLesson = () => {
    if (nextLesson) {
      navigate(`/lessons/${courseId}/${nextLesson.id}`);
    }
  };

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <Loader className={styles.spinner} />
        <p>Loading lesson...</p>
      </div>
    );
  }

  if (error || !currentLesson || !lessonMarkdown) {
    return (
      <div className={styles.errorContainer}>
        <Card className={styles.errorCard}>
          <AlertCircle size={48} />
          <h2>Unable to load lesson</h2>
          <p>{error || "Lesson content not found"}</p>
          <Button onClick={() => navigate(`/courses/${courseId}`)}>
            Back to Course
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className={styles.lessonViewerPage}>
      <div className={styles.lessonHeader}>
        <div className={styles.headerContent}>
          <Button
            variant="ghost"
            onClick={() => navigate(`/courses/${courseId}`)}
            className={styles.backButton}
          >
            ← Back to Course
          </Button>
          <h1>{currentLesson.title}</h1>
          <div className={styles.headerMeta}>
            <span className={styles.lessonType}>{currentLesson.type}</span>
            <span className={styles.points}>+{currentLesson.points} pts</span>
          </div>
        </div>
      </div>

      {completionMessage && (
        <div className={styles.completionMessage}>
          <CheckCircle size={24} />
          <p>{completionMessage}</p>
        </div>
      )}

      <div className={styles.container}>
        <div className={styles.mainContent}>
          <Card className={styles.lessonCard}>
            <MarkdownRenderer content={lessonMarkdown} />
          </Card>

          <div className={styles.lessonActions}>
            {currentLesson.type === "assignment" ? (
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate(`/assignments/${courseId}/${lessonId}`)}
              >
                Start Assignment
              </Button>
            ) : (
              <Button
                variant="primary"
                size="lg"
                onClick={handleMarkComplete}
                disabled={isCompleting || lessonCompleted}
                loading={isCompleting}
              >
                {lessonCompleted ? "✓ Completed" : "Mark as Complete"}
              </Button>
            )}
          </div>

          <div className={styles.navigationButtons}>
            <Button
              variant="secondary"
              onClick={handlePreviousLesson}
              disabled={!previousLesson}
              className={styles.navButton}
            >
              <ChevronLeft size={20} />
              Previous
            </Button>

            <div className={styles.navigationInfo}>
              <span>
                Lesson {currentLessonIndex + 1} of {allLessons.length}
              </span>
            </div>

            <Button
              variant="secondary"
              onClick={handleNextLesson}
              disabled={!nextLesson}
              className={styles.navButton}
            >
              Next
              <ChevronRight size={20} />
            </Button>
          </div>
        </div>

        {/* Sidebar */}
        <div className={styles.sidebar}>
          <Card className={styles.sidebarCard}>
            <h3>Course Progress</h3>
            {courseProgress && (
              <>
                <ProgressBar
                  completed={courseProgress.completedLessons}
                  total={courseProgress.totalLessons}
                />
                <div className={styles.progressText}>
                  <p>
                    {courseProgress.completedLessons} /{" "}
                    {courseProgress.totalLessons} lessons
                  </p>
                  <p className={styles.percentage}>
                    {courseProgress.percentage}% complete
                  </p>
                </div>
              </>
            )}
          </Card>

          <Card className={styles.sidebarCard}>
            <h3>Lesson Modules</h3>
            <div className={styles.moduleList}>
              {currentCourse?.modules?.map((module) => (
                <div key={module.id} className={styles.module}>
                  <h4>{module.title}</h4>
                  <ul className={styles.lessonList}>
                    {module.lessons.map((lesson) => (
                      <li
                        key={lesson.id}
                        className={`${styles.lessonItem} ${
                          lesson.id === lessonId ? styles.active : ""
                        }`}
                      >
                        <button
                          onClick={() => {
                            navigate(`/lessons/${courseId}/${lesson.id}`);
                            setLessonCompleted(false);
                          }}
                          className={styles.lessonButton}
                        >
                          {lesson.id === lessonId && (
                            <span className={styles.activeDot}>●</span>
                          )}
                          {lesson.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LessonViewerNew;
