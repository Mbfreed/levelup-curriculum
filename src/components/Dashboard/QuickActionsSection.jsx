import React from "react";
import { BookOpen, Award, Trophy, TrendingUp } from "lucide-react";
import Card from "../Card/Card";
import styles from "./QuickActionsSection.module.css";

const QuickActionsSection = ({ onNavigate }) => {
  const quickActions = [
    {
      title: "Browse Courses",
      description: "Discover new courses to enhance your skills",
      icon: BookOpen,
      onClick: () => onNavigate("/courses"),
    },
    {
      title: "Claim Rewards",
      description: "Collect your earned EXP and certificates",
      icon: Award,
      onClick: () => onNavigate("/rewards"),
    },
    {
      title: "View Certificates",
      description: "Showcase your completed achievements",
      icon: Trophy,
      onClick: () => onNavigate("/certificates"),
    },
    {
      title: "Community",
      description: "Connect with fellow learners",
      icon: TrendingUp,
      onClick: () => onNavigate("/discussion"),
    },
  ];

  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Quick Actions</h2>
      </div>

      <div className={styles.quickActionsGrid}>
        {quickActions.map((action, index) => (
          <Card
            key={index}
            className={styles.quickActionCard}
            clickable
            onClick={action.onClick}
          >
            <div className={styles.quickActionIcon}>
              <action.icon size={24} />
            </div>
            <h3 className={styles.quickActionTitle}>{action.title}</h3>
            <p className={styles.quickActionDescription}>
              {action.description}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default QuickActionsSection;
