import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import { useCourse } from "../../contexts/CourseContext";
import { Trophy, Coins, Flame, Star } from "lucide-react";
import WelcomeSection from "../../components/Dashboard/WelcomeSection";
import StatsGrid from "../../components/Dashboard/StatsGrid";
import ContinueLearningSection from "../../components/Dashboard/ContinueLearningSection";
import RecommendedCoursesSection from "../../components/Dashboard/RecommendedCoursesSection";
import QuickActionsSection from "../../components/Dashboard/QuickActionsSection";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const { user } = useUser();
  const { courses, enrollInCourse, userStats } = useCourse();
  const navigate = useNavigate();

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
      value: userStats.level,
      icon: Trophy,
      color: "#ffd700",
    },
    {
      title: "Total EXP",
      value: userStats.exp.toLocaleString(),
      icon: Star,
      color: "#4a154b",
    },
    {
      title: "Platform Coins",
      value: userStats.coins,
      icon: Coins,
      color: "#ffd700",
    },
    {
      title: "Learning Streak",
      value: `${userStats.streak} days`,
      icon: Flame,
      color: "#ef4444",
    },
  ];

  return (
    <div className={styles.dashboard}>
      <WelcomeSection userName={user.name} />

      <StatsGrid stats={stats} />

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
