import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useCourse } from "../../contexts/CourseContext";
import {
  Play,
  CheckCircle,
  Lock,
  Code,
  FileText,
  Upload,
  Eye,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  MessageSquare,
} from "lucide-react";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import SubmissionForm from "../../components/SubmissionForm/SubmissionForm";
import ReviewRequestForm from "../../components/ReviewRequestForm/ReviewRequestForm";
import ModuleList from "../../components/ModuleList/ModuleList";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import LessonCard from "../../components/LessonCard/LessonCard";
import ReviewRequestsModal from "../../components/ReviewRequestsModal/ReviewRequestsModal";
import SubmissionsModal from "../../components/SubmissionsModal/SubmissionsModal";
import Modal from "../../components/Modal/Modal";
import styles from "./LessonViewer.module.css";
import coursesData from "../../courses.json";

const LessonViewer = () => {
  const { courseId, lessonId } = useParams();
  const {
    getCourseById,
    getLessonById,
    completeLesson,
    unlockNextLesson,
    submitAssignment,
    getSubmissionsForLesson,
    getReviewRequestsForLesson,
    submitReviewRequest,
    submitReviewFeedback,
  } = useCourse();
  const navigate = useNavigate();

  const course = getCourseById(courseId);
  const lesson = getLessonById(courseId, lessonId);
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);
  const [showReviewRequestForm, setShowReviewRequestForm] = useState(false);
  const [showReviewRequests, setShowReviewRequests] = useState(false);
  const [showSubmissions, setShowSubmissions] = useState(false);
  const [expandedModules, setExpandedModules] = useState({});

  useEffect(() => {
    console.log("Courses data:", coursesData);
  }, []);

  const handleMarkComplete = () => {
    if (!lesson.isCompleted) {
      completeLesson(courseId, lessonId);
      unlockNextLesson(courseId, lessonId);
    }
  };

  const handleSubmitAssignment = async (submission) => {
    try {
      const submissionId = submitAssignment(courseId, lessonId, submission);
      console.log("Submission created:", submissionId);
      setShowSubmissionForm(false);
      // Mark lesson as completed after submission
      handleMarkComplete();
    } catch (error) {
      console.error("Failed to submit assignment:", error);
    }
  };

  const submissions = getSubmissionsForLesson(courseId, lessonId);
  const reviewRequests = getReviewRequestsForLesson(lessonId);

  const toggleModule = (moduleId) => {
    setExpandedModules((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }));
  };

  const getAllLessons = () => {
    if (!course || !course.modules) return [];
    return course.modules.flatMap((module) => module.lessons || []);
  };

  const getCurrentLessonIndex = () => {
    const allLessons = getAllLessons();
    return allLessons.findIndex((l) => l.id === lessonId);
  };

  const getPreviousLesson = () => {
    const allLessons = getAllLessons();
    const currentIndex = getCurrentLessonIndex();
    return currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  };

  const getNextLesson = () => {
    const allLessons = getAllLessons();
    const currentIndex = getCurrentLessonIndex();
    return currentIndex < allLessons.length - 1
      ? allLessons[currentIndex + 1]
      : null;
  };

  const handlePreviousLesson = () => {
    const previousLesson = getPreviousLesson();
    if (previousLesson && !previousLesson.isLocked) {
      navigate(`/courses/${courseId}/lessons/${previousLesson.id}`);
    }
  };

  const handleNextLesson = () => {
    const nextLesson = getNextLesson();
    if (nextLesson && !nextLesson.isLocked) {
      navigate(`/courses/${courseId}/lessons/${nextLesson.id}`);
    }
  };

  if (!course || !lesson) {
    return (
      <div className={styles.container}>
        <h1>Lesson not found</h1>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.breadcrumb}>
          <span className={styles.breadcrumbSeparator}>←</span>
          <Link to="/courses" className={styles.breadcrumbLink}>
            Back
          </Link>
        </div>
        <h1 className={styles.title}>{lesson.title}</h1>
        <p className={styles.description}>{lesson.description}</p>
      </div>

      <div className={styles.content}>
        <div className={styles.lessonContent}>
          <LessonCard
            lesson={lesson}
            courseId={courseId}
            submissions={submissions}
            reviewRequests={reviewRequests}
            onMarkComplete={handleMarkComplete}
            onShowSubmissionForm={() => setShowSubmissionForm(true)}
            onShowReviewRequestForm={() => setShowReviewRequestForm(true)}
            onShowSubmissions={() => setShowSubmissions(true)}
            onShowReviewRequests={() => setShowReviewRequests(true)}
          />
        </div>

        <div className={styles.sidebar}>
          <Card className={styles.progressCard}>
            <h3>Course Progress</h3>
            <ProgressBar
              progress={course.progress}
              max={100}
              height="8px"
              showLabel={false}
              color={course.progress === 100 ? "#10b981" : "#ffd700"}
            />
            <p>{course.progress}% Complete</p>
          </Card>

          <Card className={styles.lessonsCard}>
            <h3>Course Lessons</h3>
            <ModuleList
              modules={course.modules}
              expandedModules={expandedModules}
              onToggleModule={toggleModule}
              onLessonClick={(lessonId) => {
                const lesson = course.modules
                  .flatMap((m) => m.lessons)
                  .find((l) => l.id === lessonId);
                if (lesson && !lesson.isLocked) {
                  navigate(`/courses/${courseId}/lessons/${lessonId}`);
                }
              }}
              currentLessonId={lessonId}
              showProgress={false}
              className={styles.lessonList}
            />
          </Card>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className={styles.navigation}>
        <Button
          variant="outline"
          size="lg"
          icon={<ChevronLeft size={20} />}
          onClick={handlePreviousLesson}
          disabled={!getPreviousLesson() || getPreviousLesson()?.isLocked}
          className={styles.navButton}
        >
          Previous
        </Button>

        <div className={styles.lessonProgress}>
          <span>
            Lesson {getCurrentLessonIndex() + 1} of {getAllLessons().length}
          </span>
        </div>

        <Button
          variant="primary"
          size="lg"
          icon={<ChevronRight size={20} />}
          iconPosition="right"
          onClick={handleNextLesson}
          disabled={!getNextLesson() || getNextLesson()?.isLocked}
          className={styles.navButton}
        >
          Next
        </Button>
      </div>

      {/* Submission Form Modal */}
      {showSubmissionForm && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <SubmissionForm
              lesson={lesson}
              onSubmit={handleSubmitAssignment}
              onCancel={() => setShowSubmissionForm(false)}
            />
          </div>
        </div>
      )}

      {/* Review Request Form Modal */}
      {showReviewRequestForm && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <ReviewRequestForm
              lesson={lesson}
              onSubmit={(reviewRequest) => {
                submitReviewRequest(courseId, lessonId, reviewRequest);
                setShowReviewRequestForm(false);
              }}
              onCancel={() => setShowReviewRequestForm(false)}
            />
          </div>
        </div>
      )}

      {/* Review Requests Modal */}
      <ReviewRequestsModal
        isOpen={showReviewRequests}
        onClose={() => setShowReviewRequests(false)}
        reviewRequests={reviewRequests}
        onSubmitReviewFeedback={submitReviewFeedback}
      />

      {/* Submissions Modal */}
      <SubmissionsModal
        isOpen={showSubmissions}
        onClose={() => setShowSubmissions(false)}
        submissions={submissions}
      />
    </div>
  );
};

export default LessonViewer;
