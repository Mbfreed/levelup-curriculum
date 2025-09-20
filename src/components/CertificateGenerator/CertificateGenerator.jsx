import React from "react";
import { Trophy } from "lucide-react";
import styles from "./CertificateGenerator.module.css";

const CertificateGenerator = ({
  courseName,
  userName = "John Doe",
  completionDate = new Date().toLocaleDateString(),
  certificateId = "CERT-001",
  platformName = "Level Up",
  level = "Intermediate",
}) => {
  return (
    <div className={styles.certificate}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.platformLogo}>
          <Trophy size={32} />
          <span className={styles.platformName}>{platformName}</span>
        </div>
        <div className={styles.certificateId}>Certificate #{certificateId}</div>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        <div className={styles.certificateTitle}>
          <h1>Certificate of Completion</h1>
          <div className={styles.subtitle}>This is to certify that</div>
        </div>

        <div className={styles.userName}>{userName}</div>

        <div className={styles.courseInfo}>
          <span className={styles.courseInfoText}>
            has successfully completed
          </span>
          <div className={styles.courseName}>{courseName}</div>
        </div>

        <div className={styles.details}>
          <div className={styles.detailItem}>
            <span>Completed on {completionDate}</span>
          </div>
          <div className={styles.detailItem}>
            <span>Level: {level}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <div className={styles.signatures}>
          <div className={styles.signatureBlock}>
            <div className={styles.signatureLine}></div>
            <div className={styles.signatureName}>Freed</div>
          </div>
          <div className={styles.signatureBlock}>
            <div className={styles.signatureLine}></div>
            <div className={styles.signatureName}>LevelUp</div>
          </div>
        </div>

        <div className={styles.blockchain}>
          <span>Blockchain Verified NFT</span>
        </div>
      </div>
    </div>
  );
};

export default CertificateGenerator;
