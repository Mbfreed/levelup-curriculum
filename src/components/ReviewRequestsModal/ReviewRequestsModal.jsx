import React, { useState } from "react";
import { Star, ExternalLink, Github, FileText, ChevronDown, ChevronUp} from "lucide-react";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import styles from "./ReviewRequestsModal.module.css";

const ReviewRequestsModal = ({
  isOpen,
  onClose,
  reviewRequests,
  onSubmitReviewFeedback,
}) => {
  const [expandedRequest, setExpandedRequest] = useState(null);

  const handleSubmitFeedback = (requestId) => {
    const feedback = prompt("Provide your feedback:");
    if (feedback) {
      const rating = prompt("Rate 1-5 stars:");
      if (rating) {
        onSubmitReviewFeedback(requestId, {
          userId: "current-user",
          userName: "You",
          feedback,
          rating: parseInt(rating),
          submittedAt: new Date().toISOString(),
        });
      }
    }
  };

  const toggleExpanded = (requestId, event) => {
    event.preventDefault();
    event.stopPropagation();
    setExpandedRequest(expandedRequest === requestId ? null : requestId);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Review Requests"
      size="large"
      className={styles.reviewRequestsModal}
    >
      <div className={styles.requestsList}>
        {reviewRequests.map((request) => (
          <div key={request.id} className={styles.requestCard}>
            <div className={styles.requestHeader}>
              <div className={styles.requestInfo}>
                <h4 className={styles.userName}>{request.userName}</h4>
                <span className={styles.requestDate}>
                  {new Date(request.submittedAt).toLocaleDateString()}
                </span>
              </div>
              <div className={styles.requestActions}>
                <span className={`${styles.status} ${styles[request.status]}`}>
                  {request.status}
                </span>
                <button
                  className={styles.expandButton}
                  onClick={(e) => toggleExpanded(request.id, e)}
                  title={expandedRequest === request.id ? "Collapse" : "Expand"}
                >
                  {expandedRequest === request.id ? <ChevronUp size={16}/> : <ChevronDown size={16}/> }
                </Button>
              </div>
            </div>

            <div className={styles.requestContent}>
              <p className={styles.question}>
                <strong>Question:</strong> {request.question}
              </p>

              {expandedRequest === request.id && (
                <div className={styles.expandedContent}>
                  {request.files && request.files.length > 0 && (
                    <div className={styles.filesSection}>
                      <h5>
                        <FileText size={16} />
                        Files
                      </h5>
                      <ul className={styles.filesList}>
                        {request.files.map((file, index) => (
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

                  {request.url && (
                    <div className={styles.urlSection}>
                      <h5>
                        <ExternalLink size={16} />
                        Live URL
                      </h5>
                      <a
                        href={request.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.urlLink}
                      >
                        {request.url}
                      </a>
                    </div>
                  )}

                  {request.githubUrl && (
                    <div className={styles.githubSection}>
                      <h5>
                        <Github size={16} />
                        GitHub Repository
                      </h5>
                      <a
                        href={request.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.githubLink}
                      >
                        {request.githubUrl}
                      </a>
                    </div>
                  )}

                  {request.reviews && request.reviews.length > 0 && (
                    <div className={styles.reviewsSection}>
                      <h5>
                        <Star size={16} />
                        Existing Reviews
                      </h5>
                      {request.reviews.map((review) => (
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

              <div className={styles.requestActions}>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleSubmitFeedback(request.id)}
                  icon={<Star size={16} />}
                >
                  Provide Feedback
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default ReviewRequestsModal;
