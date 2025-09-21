import React from "react";
import styles from "./WelcomeSection.module.css";

const WelcomeSection = ({ userName }) => {
  return (
    <div className={styles.welcomeSection}>
      <h1 className={styles.welcomeTitle}>Welcome back, {userName}! 👋</h1>
      <p className={styles.welcomeSubtitle}>
        Ready to continue your learning journey?
      </p>
    </div>
  );
};

export default WelcomeSection;
