import React from "react";
import Card from "../Card/Card";
import styles from "./StatCard.module.css";

const StatCard = ({ title, value, icon: Icon, color = "#4a154b" }) => {
  return (
    <Card className={styles.statCard}>
      <div className={styles.statContent}>
        <div className={styles.statIcon} style={{ color }}>
          <Icon size={24} />
        </div>
        <div className={styles.statInfo}>
          <h3 className={styles.statValue}>{value}</h3>
          <p className={styles.statTitle}>{title}</p>
        </div>
      </div>
    </Card>
  );
};

export default StatCard;
