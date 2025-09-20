import React from "react";
import { X } from "lucide-react";
import CertificateGenerator from "../CertificateGenerator/CertificateGenerator";
import styles from "./CertificateModal.module.css";

const CertificateModal = ({ certificate, isOpen, onClose }) => {
  if (!isOpen || !certificate) return null;

  return (
    <div className={styles.modal} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          <X size={24} />
        </button>

        <div className={styles.certificateContainer}>
          <CertificateGenerator
            courseName={certificate.courseName}
            userName="John Doe"
            completionDate={
              certificate.claimedAt
                ? new Date(certificate.claimedAt).toLocaleDateString()
                : new Date().toLocaleDateString()
            }
            certificateId={certificate.tokenId || certificate.id}
            platformName="Level Up"
            level={
              certificate.nftMetadata?.attributes?.find(
                (attr) => attr.trait_type === "Skill Level"
              )?.value || "Intermediate"
            }
          />
        </div>
      </div>
    </div>
  );
};

export default CertificateModal;
