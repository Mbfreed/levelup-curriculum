import React from "react";
import styles from "./LoadingSpinner.module.css";

const LoadingSpinner = ({ size = "md", message = "Loading..." }) => {
  return (
    <div className={`${styles.container} ${styles[size]}`}>
      <div className={styles.spinner} />
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
};

export default LoadingSpinner;
