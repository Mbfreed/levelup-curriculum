import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import { useCourse } from "../../hooks/useCourse";
import { Trophy, Coins, Flame, Star } from "lucide-react";
import WelcomeSection from "../../components/Dashboard/WelcomeSection";
import StatsGrid from "../../components/Dashboard/StatsGrid";
import ContinueLearningSection from "../../components/Dashboard/ContinueLearningSection";
import RecommendedCoursesSection from "../../components/Dashboard/RecommendedCoursesSection";
import QuickActionsSection from "../../components/Dashboard/QuickActionsSection";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const { user } = useUser();
  const { courses, enrollInCourse } = useCourse();
  const navigate = useNavigate();

  // Handle loading state
  if (!user) {
    return <div>Loading...</div>;
  }

  const enrolledCourses = courses.filter((course) => course.isEnrolled);
  const recentCourses = courses.slice(0, 3);

  const handleEnrollCourse = (courseId) => {
    enrollInCourse(courseId);
    navigate(`/courses/${courseId}`);
  };

  const handleContinueCourse = (courseId) => {
    const course = courses.find((c) => c.id === courseId);
    if (course && course.modules) {
      // Find the first incomplete, unlocked lesson across all modules
      let nextLesson = null;
      for (const module of course.modules) {
        if (module.lessons) {
          nextLesson = module.lessons.find(
            (lesson) => !lesson.isCompleted && !lesson.isLocked
          );
          if (nextLesson) break;
        }
      }

      if (nextLesson) {
        navigate(`/courses/${courseId}/lessons/${nextLesson.id}`);
      } else {
        // If all lessons are completed, go to course detail
        navigate(`/courses/${courseId}`);
      }
    }
  };

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

  return (
    <div className={styles.dashboard}>
      {/* Welcome Section */}
      <div className={styles.welcomeSection}>
        <h1 className={styles.welcomeTitle}>Welcome back, {user.name}! </h1>
        <p className={styles.welcomeSubtitle}>
          Ready to continue your learning journey?
        </p>
      </div>

      {/* Stats Grid */}
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

      {/* Main Content Grid */}
      <div className={styles.contentGrid}>
        <ContinueLearningSection
          enrolledCourses={enrolledCourses}
          onContinueCourse={handleContinueCourse}
        />

        <RecommendedCoursesSection
          recommendedCourses={recentCourses}
          onContinueCourse={handleContinueCourse}
          onEnrollCourse={handleEnrollCourse}
        />

        <QuickActionsSection onNavigate={navigate} />
      </div>
    </div>
  );
};

export default Dashboard;
