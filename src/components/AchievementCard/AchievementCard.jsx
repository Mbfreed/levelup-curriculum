import React from "react";
import { Trophy } from "lucide-react";
import styles from "./AchievementCard.module.css";

const AchievementCard = ({ 
  title, 
  description, 
  date, 
  points,
  className = ""
}) => {
  return (
    <div className={`${styles.achievementCard} ${className}`}>
      <div className={styles.achievementIcon}>
        <Trophy size={20} />
      </div>
      <div className={styles.achievementInfo}>
        <h4 className={styles.achievementTitle}>{title}</h4>
        <p className={styles.achievementDescription}>{description}</p>
        <div className={styles.achievementMeta}>
          <span className={styles.achievementDate}>
            {new Date(date).toLocaleDateString()}
          </span>
          <span className={styles.achievementPoints}>
            +{points} EXP
          </span>
        </div>
      </div>
    </div>
  );
};

export default AchievementCard;
