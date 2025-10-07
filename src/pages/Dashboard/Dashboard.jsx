import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import { useCourse } from "../../contexts/CourseContext";
import {
  Trophy,
  Coins,
  Flame,
  BookOpen,
  Clock,
  Star,
  TrendingUp,
  Award,
} from "lucide-react";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import StatCard from "../../components/StatCard/StatCard";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const { user } = useUser();
  const { courses, enrollInCourse } = useCourse();
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
        {/* Continue Learning */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Continue Learning</h2>
            <Link to="/courses" className={styles.sectionLink}>
              View All
            </Link>
          </div>

          {enrolledCourses.length > 0 ? (
            <div className={styles.courseList}>
              {enrolledCourses.map((course) => (
                <Card
                  key={course.id}
                  className={styles.courseCard}
                  clickable
                  onClick={() => handleContinueCourse(course.id)}
                >
                  <div className={styles.courseContent}>
                    <div className={styles.courseInfo}>
                      <h3 className={styles.courseTitle}>{course.title}</h3>
                      <p className={styles.courseDescription}>
                        {course.description}
                      </p>
                      <div className={styles.courseMeta}>
                        <span className={styles.courseLevel}>
                          {course.level}
                        </span>
                        <span className={styles.courseDuration}>
                          <Clock size={16} />
                          {course.duration}
                        </span>
                      </div>
                    </div>
                    <div className={styles.courseProgress}>
                      <ProgressBar
                        progress={course.progress}
                        max={100}
                        height="8px"
                        showLabel={false}
                        color={course.progress === 100 ? "#10b981" : "#ffd700"}
                      />
                      <span className={styles.progressText}>
                        {course.progress}% Complete
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className={styles.emptyState}>
              <div className={styles.emptyContent}>
                <BookOpen size={48} className={styles.emptyIcon} />
                <h3 className={styles.emptyTitle}>No courses enrolled yet</h3>
                <p className={styles.emptyDescription}>
                  Start your learning journey by enrolling in a course
                </p>
                <Button as={Link} to="/courses">
                  Browse Courses
                </Button>
              </div>
            </Card>
          )}
        </div>

        {/* Recommended Courses */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Recommended for You</h2>
            <Link to="/courses" className={styles.sectionLink}>
              View All
            </Link>
          </div>

          <div className={styles.courseList}>
            {recentCourses.map((course) => (
              <Card key={course.id} className={styles.courseCard} clickable>
                <div className={styles.courseContent}>
                  <div className={styles.courseInfo}>
                    <h3 className={styles.courseTitle}>{course.title}</h3>
                    <p className={styles.courseDescription}>
                      {course.description}
                    </p>
                    <div className={styles.courseMeta}>
                      <span className={styles.courseLevel}>{course.level}</span>
                      <span className={styles.courseRating}>
                        <Star size={16} />
                        {course.rating}
                      </span>
                      <span className={styles.courseStudents}>
                        {course.students} students
                      </span>
                    </div>
                  </div>
                  <div className={styles.courseActions}>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        if (course.isEnrolled) {
                          handleContinueCourse(course.id);
                        } else {
                          handleEnrollCourse(course.id);
                        }
                      }}
                    >
                      {course.isEnrolled ? "Continue" : "Enroll"}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Quick Actions</h2>
          </div>

          <div className={styles.quickActionsGrid}>
            <Card
              className={styles.quickActionCard}
              clickable
              onClick={() => navigate("/courses")}
            >
              <div className={styles.quickActionIcon}>
                <BookOpen size={24} />
              </div>
              <h3 className={styles.quickActionTitle}>Browse Courses</h3>
              <p className={styles.quickActionDescription}>
                Discover new courses to enhance your skills
              </p>
            </Card>

            <Card
              className={styles.quickActionCard}
              clickable
              onClick={() => navigate("/rewards")}
            >
              <div className={styles.quickActionIcon}>
                <Award size={24} />
              </div>
              <h3 className={styles.quickActionTitle}>Claim Rewards</h3>
              <p className={styles.quickActionDescription}>
                Collect your earned EXP and certificates
              </p>
            </Card>

            <Card
              className={styles.quickActionCard}
              clickable
              onClick={() => navigate("/certificates")}
            >
              <div className={styles.quickActionIcon}>
                <Trophy size={24} />
              </div>
              <h3 className={styles.quickActionTitle}>View Certificates</h3>
              <p className={styles.quickActionDescription}>
                Showcase your completed achievements
              </p>
            </Card>

            <Card
              className={styles.quickActionCard}
              clickable
              onClick={() => navigate("/discussion")}
            >
              <div className={styles.quickActionIcon}>
                <TrendingUp size={24} />
              </div>
              <h3 className={styles.quickActionTitle}>Community</h3>
              <p className={styles.quickActionDescription}>
                Connect with fellow learners
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
