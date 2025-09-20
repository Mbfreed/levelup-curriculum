import React from "react";
import { Trophy, Award, Calendar, Star } from "lucide-react";
import styles from "./CertificateCard.module.css";

const CertificateCard = ({
  courseName,
  userName = "John Doe",
  completionDate = new Date().toLocaleDateString(),
  certificateId = "CERT-001",
  platformName = "Level Up",
  level = "Intermediate",
  skillLevel = "Intermediate",
  onClick,
  isClaimed = false,
}) => {
  const getSkillLevelColor = (level) => {
    switch (level.toLowerCase()) {
      case "beginner":
        return "#10b981"; // Green
      case "intermediate":
        return "#f59e0b"; // Amber
      case "advanced":
        return "#ef4444"; // Red
      case "expert":
        return "#8b5cf6"; // Purple
      default:
        return "#f59e0b"; // Amber
    }
  };

  const getSkillLevelBorder = (level) => {
    switch (level.toLowerCase()) {
      case "beginner":
        return "2px solid #10b981";
      case "intermediate":
        return "2px solid #f59e0b";
      case "advanced":
        return "2px solid #ef4444";
      case "expert":
        return "2px solid #8b5cf6";
      default:
        return "2px solid #f59e0b";
    }
  };

  return (
    <div
      className={`${styles.nftCard} ${
        isClaimed ? styles.claimed : styles.unclaimed
      }`}
      onClick={onClick}
      style={{ border: getSkillLevelBorder(skillLevel) }}
    >
      {/* Card Header */}
      <div className={styles.cardHeader}>
        <div className={styles.platformInfo}>
          <Trophy size={20} />
          <span className={styles.platformName}>{platformName}</span>
        </div>
        <div className={styles.tokenId}>#{certificateId}</div>
      </div>

      {/* Card Image/Preview Area */}
      <div className={styles.cardImage}>
        <div className={styles.certificatePreview}>
          <div className={styles.certificateContent}>
            <div className={styles.certificateTitle}>
              <Award size={32} />
              <h3>Certificate of Completion</h3>
            </div>
            <div className={styles.certificateBody}>
              <p className={styles.certifyText}>This certifies that</p>
              <h4 className={styles.userName}>{userName}</h4>
              <p className={styles.courseText}>has completed</p>
              <h5 className={styles.courseName}>{courseName}</h5>
            </div>
            <div className={styles.certificateFooter}>
              <div className={styles.completionDate}>
                <Calendar size={14} />
                <span>{completionDate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Skill Level Badge */}
        <div
          className={styles.skillLevelBadge}
          style={{ backgroundColor: getSkillLevelColor(skillLevel) }}
        >
          {skillLevel}
        </div>

        {/* Status Badge */}
        {isClaimed ? (
          <div className={styles.statusBadge}>
            <Star size={14} />
            <span>Verified NFT</span>
          </div>
        ) : (
          <div className={styles.statusBadge}>
            <Award size={14} />
            <span>NFT Certificate</span>
          </div>
        )}
      </div>

      {/* Card Footer */}
      <div className={styles.cardFooter}>
        <div className={styles.cardTitle}>
          <h3>{courseName} Certificate</h3>
          <p className={styles.level}>Level: {level}</p>
        </div>
        <div className={styles.cardStats}>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Skill Level</span>
            <span className={styles.statValue}>{skillLevel}</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Type</span>
            <span className={styles.statValue}>Certificate</span>
          </div>
        </div>
      </div>

      {/* Hover Effect Overlay */}
      <div className={styles.hoverOverlay}>
        <div className={styles.hoverContent}>
          <div className={styles.hoverActions}>
            <button
              className={styles.hoverButton}
              onClick={(e) => {
                e.stopPropagation();
                onClick();
              }}
            >
              <Award size={20} />
              <span>
                {isClaimed ? "View Certificate" : "Claim Certificate"}
              </span>
            </button>
            {isClaimed && (
              <button
                className={styles.hoverButton}
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(
                    `https://etherscan.io/token/${certificateId}`,
                    "_blank"
                  );
                }}
              >
                <Trophy size={20} />
                <span>View on Explorer</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateCard;
