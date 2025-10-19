import React from "react";
import { useUser } from "../../contexts/UserContext";
import { User, Mail, Calendar, Trophy, Coins, Star, Flame } from "lucide-react";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import StatCard from "../../components/StatCard/StatCard";
import AchievementCard from "../../components/AchievementCard/AchievementCard";
import styles from "./Profile.module.css";

const Profile = () => {
  const { user } = useUser();

  const stats = [
    {
      title: "Current Level",
      value: user.level,
      icon: Trophy,
      color: "#ffd700",
    },
    {
      title: "Total EXP",
      value: user.exp.toLocaleString(),
      icon: Star,
      color: "#4a154b",
    },
    {
      title: "Platform Coins",
      value: user.coins,
      icon: Coins,
      color: "#ffd700",
    },
    {
      title: "Learning Streak",
      value: `${user.streak} days`,
      icon: Flame,
      color: "#ef4444",
    },
  ];

  const recentAchievements = [
    {
      id: "1",
      title: "First Steps",
      description: "Complete your first lesson",
      date: "2024-01-20",
      points: 100,
    },
    {
      id: "2",
      title: "Week Warrior",
      description: "Maintain a 7-day learning streak",
      date: "2024-01-25",
      points: 250,
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Profile</h1>
        <p className={styles.subtitle}>
          Manage your account and view your progress
        </p>
      </div>

      <div className={styles.content}>
        <div className={styles.profileSection}>
          <Card className={styles.profileCard}>
            <div className={styles.profileHeader}>
              <div className={styles.avatar}>
                <User size={48} />
              </div>
              <div className={styles.profileInfo}>
                <h2 className={styles.profileName}>{user.name}</h2>
                <p className={styles.profileEmail}>{user.email}</p>
                <div className={styles.profileMeta}>
                  <div className={styles.metaItem}>
                    <Calendar size={16} />
                    <span>
                      Joined {new Date(user.joinedDate).toDateString()}
                    </span>
                  </div>
                </div>
              </div>
              <div className={styles.profileActions}>
                <Button variant="outline" size="sm">
                  Edit Profile
                </Button>
              </div>
            </div>
          </Card>

          <Card className={styles.statsCard}>
            <h3 className={styles.sectionTitle}>Your Stats</h3>
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
          </Card>
        </div>

        <div className={styles.achievementsSection}>
          <Card className={styles.achievementsCard}>
            <h3 className={styles.sectionTitle}>Recent Achievements</h3>
            <div className={styles.achievementsList}>
              {recentAchievements.map((achievement) => (
                <AchievementCard
                  key={achievement.id}
                  title={achievement.title}
                  description={achievement.description}
                  date={achievement.date}
                  points={achievement.points}
                />
              ))}
            </div>
            <div className={styles.achievementsAction}>
              <Button variant="outline" size="sm">
                View All Achievements
              </Button>
            </div>
          </Card>
        </div>

        <div className={styles.settingsSection}>
          <Card className={styles.settingsCard}>
            <h3 className={styles.sectionTitle}>Account Settings</h3>
            <div className={styles.settingsList}>
              <div className={styles.settingItem}>
                <div className={styles.settingInfo}>
                  <h4 className={styles.settingTitle}>Email Notifications</h4>
                  <p className={styles.settingDescription}>
                    Receive updates about your courses and achievements
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Configure
                </Button>
              </div>
              <div className={styles.settingItem}>
                <div className={styles.settingInfo}>
                  <h4 className={styles.settingTitle}>Privacy Settings</h4>
                  <p className={styles.settingDescription}>
                    Control who can see your progress and achievements
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Configure
                </Button>
              </div>
              <div className={styles.settingItem}>
                <div className={styles.settingInfo}>
                  <h4 className={styles.settingTitle}>Learning Preferences</h4>
                  <p className={styles.settingDescription}>
                    Customize your learning experience
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Configure
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
