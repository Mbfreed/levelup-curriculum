import React from "react";
import { X } from "lucide-react";
import Card from "../Card/Card";
import Button from "../Button/Button";
import styles from "./Modal.module.css";

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  actions = null,
  size = "medium",
  className = "",
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <Card
        className={`${styles.modal} ${styles[size]} ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className={styles.modalHeader}>
            <h2>{title}</h2>
            <Button
              variant="ghost"
              size="sm"
              icon={<X size={20} />}
              onClick={onClose}
            />
          </div>
        )}

        <div className={styles.modalContent}>{children}</div>

        {actions && <div className={styles.modalActions}>{actions}</div>}
      </Card>
    </div>
  );
};

export default Modal;
