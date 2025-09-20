import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCourse } from "../../contexts/CourseContext";
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
import SearchAndFilter from "../../components/SearchAndFilter/SearchAndFilter";
import TagList from "../../components/TagList/TagList";
import styles from "./CourseCatalog.module.css";

const CourseCatalog = () => {
  const { courses, enrollInCourse, getAllLessons } = useCourse();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [showFilters, setShowFilters] = useState(false);

  const levels = ["all", "Beginner", "Intermediate", "Advanced"];
  const sortOptions = [
    { value: "popular", label: "Most Popular" },
    { value: "rating", label: "Highest Rated" },
    { value: "newest", label: "Newest" },
    { value: "price", label: "Price" },
  ];

  const filteredCourses = courses
    .filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesLevel =
        selectedLevel === "all" || course.level === selectedLevel;

      return matchesSearch && matchesLevel;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "popular":
          return b.students - a.students;
        case "rating":
          return b.rating - a.rating;
        case "newest":
          return new Date(b.joinDate || 0) - new Date(a.joinDate || 0);
        case "price":
          return a.price - b.price;
        default:
          return 0;
      }
    });

  const handleEnroll = (courseId) => {
    enrollInCourse(courseId);
    navigate(`/courses/${courseId}`);
  };

  const handleViewCourse = (courseId) => {
    navigate(`/courses/${courseId}`);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className={styles.catalog}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>Course Catalog</h1>
        <p className={styles.subtitle}>
          Discover courses to level up your skills and earn rewards
        </p>
      </div>

      {/* Search and Filters */}
      <SearchAndFilter
        searchTerm={searchTerm}
        onSearchChange={(e) => setSearchTerm(e.target.value)}
        showFilters={showFilters}
        onToggleFilters={toggleFilters}
        placeholder="Search courses, topics, or skills..."
      >
        {showFilters && (
          <div className={styles.filterSection}>
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Level</label>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className={styles.filterSelect}
              >
                {levels.map((level) => (
                  <option key={level} value={level}>
                    {level === "all" ? "All Levels" : level}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Sort by</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={styles.filterSelect}
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </SearchAndFilter>

      {/* Results */}
      <div className={styles.results}>
        <div className={styles.resultsHeader}>
          <h2 className={styles.resultsTitle}>
            {filteredCourses.length} Course
            {filteredCourses.length !== 1 ? "s" : ""} Found
          </h2>
        </div>

        <div className={styles.courseGrid}>
          {filteredCourses.map((course) => (
            <Card
              key={course.id}
              className={styles.courseCard}
              hover
              clickable
              onClick={() => handleViewCourse(course.id)}
            >
              <div className={styles.courseImage}>
                <div className={styles.imagePlaceholder}>
                  <BookOpen size={48} />
                </div>
                <div className={styles.courseBadge}>
                  {course.price === 0 ? "Free" : `${course.price} Coins`}
                </div>
              </div>

              <div className={styles.courseContent}>
                <div className={styles.courseHeader}>
                  <h3 className={styles.courseTitle}>{course.title}</h3>
                  <div className={styles.courseRating}>
                    <Star size={16} className={styles.starIcon} />
                    <span>{course.rating}</span>
                  </div>
                </div>

                <p className={styles.courseDescription}>{course.description}</p>

                <div className={styles.courseMeta}>
                  <div className={styles.metaItem}>
                    <Clock size={16} />
                    <span>{course.duration}</span>
                  </div>
                  <div className={styles.metaItem}>
                    <BookOpen size={16} />
                    <span>{getAllLessons(course).length} lessons</span>
                  </div>
                  <div className={styles.metaItem}>
                    <Users size={16} />
                    <span>{course.students.toLocaleString()}</span>
                  </div>
                </div>

                <div className={styles.courseTags}>
                  {course.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>

                <div className={styles.courseFooter}>
                  <div className={styles.courseLevel}>
                    <span className={styles.levelBadge}>{course.level}</span>
                  </div>
                  <Button
                    variant={course.isEnrolled ? "outline" : "primary"}
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEnroll(course.id);
                    }}
                  >
                    {course.isEnrolled ? "Continue" : "Enroll"}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className={styles.emptyState}>
            <div className={styles.emptyContent}>
              <BookOpen size={64} className={styles.emptyIcon} />
              <h3 className={styles.emptyTitle}>No courses found</h3>
              <p className={styles.emptyDescription}>
                Try adjusting your search or filter criteria
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedLevel("all");
                }}
              >
                Clear Filters
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseCatalog;
