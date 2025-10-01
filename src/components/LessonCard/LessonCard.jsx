import React from "react";
import {
  Play,
  CheckCircle,
  Lock,
  Upload,
  MessageSquare,
  Eye,
} from "lucide-react";
import Card from "../Card/Card";
import Button from "../Button/Button";
import styles from "./LessonCard.module.css";
import { MarkdownLoader } from "../MarkdownLoader/MarkdownLoader";

const LessonCard = ({
  lesson,
  // courseId,
  submissions = [],
  reviewRequests = [],
  onMarkComplete,
  onShowSubmissionForm,
  onShowReviewRequestForm,
  onShowSubmissions,
  onShowReviewRequests,
}) => {
  return (
    <Card className={styles.lessonCard}>
      <div className={styles.lessonHeader}>
        <div className={styles.lessonType}>
          {lesson.type === "assignment" ? (
            <Upload size={20} />
          ) : lesson.type === "project" ? (
            <Play size={20} />
          ) : (
            <Play size={20} />
          )}
          <span>{lesson.type}</span>
        </div>
        {lesson.isCompleted && (
          <div className={styles.completed}>
            <CheckCircle size={20} />
            <span>Completed</span>
          </div>
        )}
      </div>

      <div className={styles.lessonContent}>
        {lesson.content ? (
          <MarkdownLoader path={lesson.content} />
        ) : (
          <div>
            <h4>📚 Learning Materials</h4>
            <p>
              This lesson covers the fundamentals of{" "}
              {lesson.title.toLowerCase()}. Here's what you'll learn:
            </p>
            <ul>
              <li>Key concepts and principles</li>
              <li>Practical examples and demonstrations</li>
              <li>Hands-on exercises</li>
              <li>Best practices and tips</li>
            </ul>

            <h4>🎯 Learning Objectives</h4>
            <p>By the end of this lesson, you will be able to:</p>
            <ul>
              <li>Understand the core concepts</li>
              <li>Apply the knowledge in practical scenarios</li>
              <li>Identify common patterns and solutions</li>
            </ul>
          </div>
        )}

        {/* Show completion banner if completed */}
        {lesson.isCompleted && (
          <div className={styles.completedContent}>
            <div className={styles.completedHeader}>
              <CheckCircle size={20} className={styles.completedIcon} />
              <span>Lesson Completed</span>
            </div>
            <p>
              Great job! You've completed this lesson. You can review the
              content above or move on to the next lesson.
            </p>
          </div>
        )}
      </div>

      <div className={styles.lessonActions}>
        {lesson.isCompleted ? (
          <div className={styles.completedActions}>
            {submissions.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={onShowSubmissions}
                icon={<Eye size={16} />}
              >
                View Submissions
              </Button>
            )}
            {reviewRequests.length > 0 && (
              <Button
                variant="primary"
                size="sm"
                onClick={onShowReviewRequests}
              >
                Review Others
              </Button>
            )}
          </div>
        ) : lesson.isLocked ? (
          <div className={styles.locked}>
            <Lock size={20} className={styles.lockedIcon} />
            <span>Locked - Complete previous lesson</span>
          </div>
        ) : lesson.type === "assignment" || lesson.type === "project" ? (
          <div className={styles.submissionActions}>
            <Button
              variant="outline"
              size="lg"
              onClick={onShowReviewRequestForm}
              icon={<MessageSquare size={20} />}
            >
              Request Review
            </Button>
            <Button
              variant="primary"
              size="lg"
              onClick={onShowSubmissionForm}
              icon={<Upload size={20} />}
            >
              Submit Assignment
            </Button>
          </div>
        ) : (
          <Button
            variant="primary"
            size="lg"
            onClick={onMarkComplete}
            icon={<CheckCircle size={20} />}
          >
            Mark as Complete
          </Button>
        )}
      </div>
    </Card>
  );
};

export default LessonCard;
