import React from "react";
import { CheckCircle, Star, Coins, Trophy } from "lucide-react";
import styles from "./NotificationSystem.module.css";

const NotificationSystem = ({ notifications }) => {
  if (!notifications || notifications.length === 0) return null;

  const getNotificationIcon = (message) => {
    if (message.includes("Level Up") || message.includes("🎉")) {
      return <Trophy size={20} />;
    }
    if (message.includes("EXP")) {
      return <Star size={20} />;
    }
    if (message.includes("coins")) {
      return <Coins size={20} />;
    }
    return <CheckCircle size={20} />;
  };

  return (
    <div className={styles.notificationContainer}>
      {notifications.map((notification, index) => (
        <div
          key={`notification.id ${index}`}
          className={`${styles.notification} ${styles[notification.type]}`}
        >
          <div className={styles.notificationIcon}>
            {getNotificationIcon(notification.message)}
          </div>
          <div className={styles.notificationContent}>
            <p className={styles.notificationMessage}>{notification.message}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationSystem;
