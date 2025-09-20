import React from "react";
import { Trophy } from "lucide-react";
import styles from "./CertificatePreview.module.css";

const CertificatePreview = ({
  courseName,
  userName = "John Doe",
  completionDate = new Date().toLocaleDateString(),
  certificateId = "CERT-001",
  platformName = "Level Up",
  level = "Intermediate",
  onClick,
}) => {
  return (
    <div className={styles.preview} onClick={onClick}>
      {/* Preview Border */}
      <div className={styles.border}></div>

      {/* Header */}
      <div className={styles.header}>
        <div className={styles.platformLogo}>
          <Trophy size={24} />
          <span className={styles.platformName}>{platformName}</span>
        </div>
        <div className={styles.certificateId}>#{certificateId}</div>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        <div className={styles.certificateTitle}>
          <h1>Certificate of Completion</h1>
          <div className={styles.subtitle}>This is to certify that</div>
        </div>

        <div className={styles.userName}>
          {userName}
        </div>

        <div className={styles.courseInfo}>
          <span>has successfully completed</span>
          <div className={styles.courseName}>{courseName}</div>
        </div>

        <div className={styles.details}>
          <div className={styles.detailItem}>
            <span>{completionDate}</span>
          </div>
          <div className={styles.detailItem}>
            <span>{level}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <div className={styles.blockchain}>
          <span>Blockchain Verified NFT</span>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className={styles.decorative}>
        <div className={styles.star}></div>
        <div className={styles.star}></div>
        <div className={styles.star}></div>
        <div className={styles.star}></div>
      </div>
    </div>
  );
};

export default CertificatePreview;
