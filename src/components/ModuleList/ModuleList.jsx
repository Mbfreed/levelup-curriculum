import React from "react";
import {
  ChevronDown,
  ChevronRight,
  Play,
  CheckCircle,
  Lock,
  Clock,
} from "lucide-react";
import Button from "../Button/Button";
import ProgressBar from "../ProgressBar/ProgressBar";
import styles from "./ModuleList.module.css";

const ModuleList = ({
  modules,
  expandedModules,
  onToggleModule,
  onLessonClick,
  currentLessonId = null,
  showProgress = true,
  className = "",
}) => {
  const isModuleCompleted = (module) => {
    return (
      module.lessons && module.lessons.every((lesson) => lesson.isCompleted)
    );
  };

  const getModuleProgress = (module) => {
    if (!module.lessons) return 0;
    const completedLessons = module.lessons.filter(
      (lesson) => lesson.isCompleted
    ).length;
    return Math.round((completedLessons / module.lessons.length) * 100);
  };

  const getModuleStats = (module) => {
    if (!module.lessons) return { total: 0, completed: 0, duration: 0 };

    const completed = module.lessons.filter(
      (lesson) => lesson.isCompleted
    ).length;
    const total = module.lessons.length;
    const duration = module.lessons.reduce(
      (sum, lesson) => sum + (lesson.duration || 0),
      0
    );

    return { total, completed, duration };
  };

  return (
    <div className={`${styles.moduleList} ${className}`}>
      {modules.map((module) => {
        const isExpanded = expandedModules[module.id];
        const isCompleted = isModuleCompleted(module);
        const progress = getModuleProgress(module);
        const stats = getModuleStats(module);
        const duration = Math.round(stats.duration / 60); // Convert to minutes

        return (
          <div key={module.id} className={styles.module}>
            <div
              className={`${styles.moduleHeader} ${
                isCompleted ? styles.completed : ""
              }`}
              onClick={() => onToggleModule(module.id)}
            >
              <div className={styles.moduleTitle}>
                <div className={styles.moduleIcon}>
                  {isExpanded ? (
                    <ChevronDown size={20} />
                  ) : (
                    <ChevronRight size={20} />
                  )}
                </div>
                <div className={styles.moduleInfo}>
                  <h3>{module.title}</h3>
                  <div className={styles.moduleMeta}>
                    <span>
                      {stats.completed}/{stats.total} lessons
                    </span>
                    {duration > 0 && (
                      <>
                        <span>•</span>
                        <span>{duration} min</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {showProgress && (
                <div className={styles.moduleProgress}>
                  <ProgressBar
                    progress={progress}
                    max={100}
                    height="6px"
                    showLabel={false}
                    color={isCompleted ? "#10b981" : "#ffd700"}
                  />
                </div>
              )}
            </div>

            {isExpanded && module.lessons && (
              <div className={styles.lessonsList}>
                {module.lessons.map((lesson) => {
                  const isCurrentLesson = currentLessonId === lesson.id;

                  return (
                    <div
                      key={lesson.id}
                      className={`${styles.lesson} ${
                        isCurrentLesson ? styles.current : ""
                      }`}
                      onClick={() => onLessonClick(lesson.id)}
                    >
                      <div className={styles.lessonIcon}>
                        {lesson.isCompleted ? (
                          <CheckCircle
                            size={16}
                            className={styles.completedIcon}
                          />
                        ) : lesson.isLocked ? (
                          <Lock size={16} className={styles.lockedIcon} />
                        ) : (
                          <Play size={16} className={styles.playIcon} />
                        )}
                      </div>

                      <div className={styles.lessonContent}>
                        <div className={styles.lessonTitle}>
                          <h4>{lesson.title}</h4>
                          {lesson.duration && (
                            <span className={styles.lessonDuration}>
                              <Clock size={12} />
                              {lesson.duration} min
                            </span>
                          )}
                        </div>
                        <p className={styles.lessonDescription}>
                          {lesson.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ModuleList;
