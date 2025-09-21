import React from "react";
import StatCard from "../StatCard/StatCard";
import styles from "./StatsGrid.module.css";

const StatsGrid = ({ stats }) => {
  return (
    <div className={styles.statsGrid}>
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          color={stat.color}
        />
      ))}
    </div>
  );
};

export default StatsGrid;
