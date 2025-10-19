import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Filter,
  Star,
  Clock,
  Users,
  BookOpen,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import styles from "./CourseCatalog.module.css";
import { useCourse } from "../../contexts/CourseContextSupabase";
import { useUser } from "../../contexts/UserContext";
import { enrollCourse } from "../../utils/courseUtils";

const CourseCatalogNew = () => {
  const { courses, isLoading, isEnrolled, userEnrollments } = useCourse();
  const { user } = useUser();
  const navigate = useNavigate();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [showFilters, setShowFilters] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);
  const [enrollingCourseId, setEnrollingCourseId] = useState(null);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth > 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const levels = ["all", "Beginner", "Intermediate", "Advanced"];
  const sortOptions = [
    { value: "popular", label: "Most Popular" },
    { value: "rating", label: "Highest Rated" },
    { value: "newest", label: "Newest" },
  ];

  const filteredCourses = courses
    .filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesLevel =
        selectedLevel === "all" || course.level === selectedLevel;

      return matchesSearch && matchesLevel;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "popular":
          return (b.students || 0) - (a.students || 0);
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        case "newest":
          return (
            new Date(b.created_at || 0).getTime() -
            new Date(a.created_at || 0).getTime()
          );
        default:
          return 0;
      }
    });

  const handleEnroll = async (courseId) => {
    if (!user) {
      navigate("/login");
      return;
    }

    setEnrollingCourseId(courseId);
    try {
      const result = await enrollCourse(user.id, courseId);
      if (result.success) {
        // Update enrollments in context
        navigate(`/courses/${courseId}`);
      } else {
        alert(result.error || "Failed to enroll in course");
      }
    } catch (error) {
      alert("Error enrolling in course");
      console.error("Enroll error:", error);
    } finally {
      setEnrollingCourseId(null);
    }
  };

  const handleViewCourse = (courseId) => {
    navigate(`/courses/${courseId}`);
  };

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}>Loading courses...</div>
      </div>
    );
  }

  return (
    <div className={styles.courseCatalogPage}>
      <div className={styles.headerSection}>
        <h1>Course Catalog</h1>
        <p>
          Explore our collection of courses and start learning today. Free to
          all members.
        </p>
      </div>

      <div className={styles.container}>
        {/* Filters Section */}
        <div className={styles.filterSection}>
          <div className={styles.filterHeader}>
            <h3>
              <Filter size={20} />
              Filters
            </h3>
            {!isDesktop && (
              <button
                className={styles.filterToggle}
                onClick={() => setShowFilters(!showFilters)}
              >
                {showFilters ? <ChevronUp /> : <ChevronDown />}
              </button>
            )}
          </div>

          {(isDesktop || showFilters) && (
            <div className={styles.filterContent}>
              <div className={styles.filterGroup}>
                <label>Level</label>
                <div className={styles.levelButtons}>
                  {levels.map((level) => (
                    <button
                      key={level}
                      className={`${styles.levelButton} ${
                        selectedLevel === level ? styles.active : ""
                      }`}
                      onClick={() => setSelectedLevel(level)}
                    >
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.filterGroup}>
                <label>Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className={styles.sortSelect}
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.filterGroup}>
                <label>Search</label>
                <Input
                  type="text"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  icon={<Search size={18} />}
                />
              </div>
            </div>
          )}
        </div>

        {/* Courses Grid */}
        <div className={styles.coursesSection}>
          <div className={styles.coursesHeader}>
            <h2>{filteredCourses.length} Courses Found</h2>
          </div>

          {filteredCourses.length === 0 ? (
            <div className={styles.noCoursesMessage}>
              <BookOpen size={48} />
              <p>No courses found matching your filters</p>
            </div>
          ) : (
            <div className={styles.coursesGrid}>
              {filteredCourses.map((course) => (
                <Card key={course.id} className={styles.courseCard}>
                  <div className={styles.courseHeader}>
                    <div className={styles.courseTitle}>
                      <h3>{course.title}</h3>
                      <p className={styles.level}>{course.level}</p>
                    </div>
                  </div>

                  <p className={styles.courseDescription}>
                    {course.description}
                  </p>

                  <div className={styles.courseMetadata}>
                    <div className={styles.metaItem}>
                      <Clock size={16} />
                      <span>{course.duration}</span>
                    </div>
                    <div className={styles.metaItem}>
                      <BookOpen size={16} />
                      <span>
                        {course.modules?.length || 0} modules
                      </span>
                    </div>
                    {course.rating && (
                      <div className={styles.metaItem}>
                        <Star size={16} fill="currentColor" />
                        <span>{course.rating}</span>
                      </div>
                    )}
                  </div>

                  <div className={styles.courseActions}>
                    {isEnrolled(course.id) ? (
                      <>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleViewCourse(course.id)}
                        >
                          Continue Learning
                        </Button>
                      </>
                    ) : (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleEnroll(course.id)}
                        loading={enrollingCourseId === course.id}
                        disabled={enrollingCourseId === course.id}
                      >
                        Enroll Now
                      </Button>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCatalogNew;
