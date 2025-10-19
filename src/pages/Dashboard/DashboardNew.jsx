import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TrendingUp,
  BookOpen,
  Award,
  Zap,
  ChevronRight,
  Loader,
} from "lucide-react";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import styles from "./Dashboard.module.css";
import { useUser } from "../../hooks/useUser";
import { useCourse } from "../../hooks/useCourse";
import StatCard from "../../components/StatCard/StatCard";

const DashboardNew = () => {
  const { user, isLoading: userLoading } = useUser();
  const { courses, isEnrolled, courseProgress } = useCourse();
  const navigate = useNavigate();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user?.id && courses.length > 0) {
      // Get enrolled courses
      const enrolled = courses.filter((course) => isEnrolled(course.id));
      setEnrolledCourses(enrolled);
      setIsLoading(false);
    }
  }, [user?.id, courses, isEnrolled]);

  if (userLoading || isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <Loader className={styles.spinner} />
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className={styles.notAuthenticatedContainer}>
        <Card className={styles.notAuthCard}>
          <h2>Please log in to view your dashboard</h2>
          <Button onClick={() => navigate("/login")}>Go to Login</Button>
        </Card>
      </div>
    );
  }

  // Calculate stats
  const totalPoints = user.total_points || 0;
  const currentLevel = user.current_level || 1;
  const progressToNextLevel = ((totalPoints % 500) / 500) * 100;

  return (
    <div className={styles.dashboardPage}>
      <div className={styles.header}>
        <div className={styles.greeting}>
          <h1>Welcome back, {user.full_name}! 👋</h1>
          <p>Continue your learning journey</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className={styles.statsGrid}>
        <StatCard
          icon={<TrendingUp size={24} />}
          label="Total Points"
          value={totalPoints.toLocaleString()}
          color="blue"
        />
        <StatCard
          icon={<Award size={24} />}
          label="Current Level"
          value={currentLevel}
          subtitle={`${totalPoints % 500} / 500 to next`}
          color="purple"
        />
        <StatCard
          icon={<BookOpen size={24} />}
          label="Courses Enrolled"
          value={enrolledCourses.length}
          color="green"
        />
        <StatCard
          icon={<Zap size={24} />}
          label="Streak"
          value="Coming soon"
          color="orange"
        />
      </div>

      {/* Progress to Next Level */}
      <Card className={styles.progressCard}>
        <div className={styles.progressHeader}>
          <h2>Progress to Level {currentLevel + 1}</h2>
          <span className={styles.percentage}>
            {Math.round(progressToNextLevel)}%
          </span>
        </div>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${progressToNextLevel}%` }}
          />
        </div>
        <p className={styles.progressText}>{totalPoints % 500} / 500 points</p>
      </Card>

      {/* Continue Learning */}
      {enrolledCourses.length > 0 && (
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>Continue Learning</h2>
            <Button
              variant="ghost"
              onClick={() => navigate("/courses")}
              className={styles.viewAllButton}
            >
              View All <ChevronRight size={18} />
            </Button>
          </div>

          <div className={styles.coursesList}>
            {enrolledCourses.slice(0, 3).map((course) => (
              <Card key={course.id} className={styles.courseCard}>
                <div className={styles.courseContent}>
                  <h3>{course.title}</h3>
                  <p className={styles.courseLevel}>{course.level}</p>
                  <div className={styles.courseProgress}>
                    <div className={styles.progressBar}>
                      <div
                        className={styles.progressFill}
                        style={{
                          width: `${
                            courseProgress[course.id]?.percentage || 0
                          }%`,
                        }}
                      />
                    </div>
                    <span className={styles.progressText}>
                      {courseProgress[course.id]?.percentage || 0}%
                    </span>
                  </div>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => navigate(`/courses/${course.id}`)}
                >
                  Continue
                </Button>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Recommended Courses */}
      {courses.length > 0 && (
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>Recommended for You</h2>
            <Button
              variant="ghost"
              onClick={() => navigate("/courses")}
              className={styles.viewAllButton}
            >
              Browse All <ChevronRight size={18} />
            </Button>
          </div>

          <div className={styles.coursesList}>
            {courses
              .filter((course) => !isEnrolled(course.id))
              .slice(0, 3)
              .map((course) => (
                <Card key={course.id} className={styles.courseCard}>
                  <div className={styles.courseContent}>
                    <h3>{course.title}</h3>
                    <p className={styles.courseDescription}>
                      {course.description}
                    </p>
                    <p className={styles.courseLevel}>{course.level}</p>
                  </div>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => navigate("/courses")}
                  >
                    Explore
                  </Button>
                </Card>
              ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {enrolledCourses.length === 0 && (
        <Card className={styles.emptyStateCard}>
          <BookOpen size={48} />
          <h3>Ready to start learning?</h3>
          <p>Explore our course catalog and enroll in a course today</p>
          <Button variant="primary" onClick={() => navigate("/courses")}>
            Browse Courses
          </Button>
        </Card>
      )}
    </div>
  );
};

export default DashboardNew;
