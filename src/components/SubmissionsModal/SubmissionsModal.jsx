import React, { useState } from "react";
import {
  ExternalLink,
  Github,
  FileText,
  Star,
  Eye,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import styles from "./SubmissionsModal.module.css";

const SubmissionsModal = ({ isOpen, onClose, submissions }) => {
  const [expandedSubmission, setExpandedSubmission] = useState(null);

  const handleViewSubmission = (submission) => {
    if (submission.url) {
      window.open(submission.url, "_blank", "noopener,noreferrer");
    }
  };

  const toggleExpanded = (submissionId, event) => {
    event.preventDefault();
    event.stopPropagation();
    setExpandedSubmission(
      expandedSubmission === submissionId ? null : submissionId
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Submissions"
      size="large"
      className={styles.submissionsModal}
    >
      <div className={styles.submissionsList}>
        {submissions.map((submission) => (
          <div key={submission.id} className={styles.submissionCard}>
            <div className={styles.submissionHeader}>
              <div className={styles.submissionInfo}>
                <h4 className={styles.submissionTitle}>
                  Submission #{submission.id.slice(-4)}
                </h4>
                <span className={styles.submissionDate}>
                  {new Date(submission.submittedAt).toLocaleDateString()}
                </span>
              </div>
              <div className={styles.submissionStatus}>
                <span
                  className={`${styles.status} ${styles[submission.status]}`}
                >
                  {submission.status}
                </span>
                <button
                  className={styles.expandButton}
                  onClick={(e) => toggleExpanded(submission.id, e)}
                  title={
                    expandedSubmission === submission.id ? "Collapse" : "Expand"
                  }
                >
                  {expandedSubmission === submission.id ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </button>
              </div>
            </div>

            {expandedSubmission === submission.id && (
              <div className={styles.submissionContent}>
                {submission.notes && (
                  <div className={styles.notesSection}>
                    <h5>
                      <FileText size={16} />
                      Notes
                    </h5>
                    <p className={styles.notes}>{submission.notes}</p>
                  </div>
                )}

                {submission.files && submission.files.length > 0 && (
                  <div className={styles.filesSection}>
                    <h5>
                      <FileText size={16} />
                      Files
                    </h5>
                    <ul className={styles.filesList}>
                      {submission.files.map((file, index) => (
                        <li key={index} className={styles.fileItem}>
                          <span className={styles.fileName}>{file.name}</span>
                          <span className={styles.fileSize}>
                            {(file.size / 1024).toFixed(1)} KB
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {submission.url && (
                  <div className={styles.urlSection}>
                    <h5>
                      <ExternalLink size={16} />
                      Live URL
                    </h5>
                    <a
                      href={submission.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.urlLink}
                    >
                      {submission.url}
                    </a>
                  </div>
                )}

                {submission.githubUrl && (
                  <div className={styles.githubSection}>
                    <h5>
                      <Github size={16} />
                      GitHub Repository
                    </h5>
                    <a
                      href={submission.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.githubLink}
                    >
                      {submission.githubUrl}
                    </a>
                  </div>
                )}

                {submission.peerReviews &&
                  submission.peerReviews.length > 0 && (
                    <div className={styles.reviewsSection}>
                      <h5>
                        <Star size={16} />
                        Peer Reviews
                      </h5>
                      {submission.peerReviews.map((review) => (
                        <div key={review.id} className={styles.reviewItem}>
                          <div className={styles.reviewHeader}>
                            <span className={styles.reviewerName}>
                              {review.userName}
                            </span>
                            <span className={styles.reviewRating}>
                              ★ {review.rating}/5
                            </span>
                          </div>
                          <p className={styles.reviewFeedback}>
                            {review.feedback}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
              </div>
            )}

            <div className={styles.submissionActions}>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleViewSubmission(submission)}
                icon={<Eye size={16} />}
              >
                View Submission
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default SubmissionsModal;
