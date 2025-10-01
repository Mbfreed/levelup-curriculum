import React, { createContext, useContext, useEffect, useState } from "react";

const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);

  const [currentCourse, _setCurrentCourse] = useState(null);
  const [currentLesson, _setCurrentLesson] = useState(null);
  const [userProgress, _setUserProgress] = useState({});
  const [userStats, setUserStats] = useState({
    exp: 1250,
    level: 3,
    coins: 500,
    totalCoursesCompleted: 1,
    totalLessonsCompleted: 8,
    streak: 7,
  });
  const [notifications, setNotifications] = useState([]);
  const [submissions, setSubmissions] = useState({
    "sample-1": {
      id: "sample-1",
      courseId: "1",
      lessonId: "1-3",
      files: [{ name: "contact-form.html", size: 2048 }],
      url: "https://example.com/contact-form",
      githubUrl: "https://github.com/user/contact-form",
      notes: "Created a responsive contact form with validation",
      submittedAt: new Date().toISOString(),
      status: "submitted",
      needsPeerReview: true,
      authorId: "2", // Different user
      peerReviews: [],
    },
    "sample-2": {
      id: "sample-2",
      courseId: "1",
      lessonId: "2-2",
      files: [
        { name: "portfolio.html", size: 4096 },
        { name: "portfolio.css", size: 2048 },
      ],
      url: "https://example.com/portfolio",
      githubUrl: "https://github.com/user/portfolio",
      notes: "Built a modern portfolio layout with CSS Grid",
      submittedAt: new Date().toISOString(),
      status: "submitted",
      needsPeerReview: true,
      authorId: "3", // Different user
      peerReviews: [],
    },
    "sample-3": {
      id: "sample-3",
      courseId: "1",
      lessonId: "1-3",
      files: [
        { name: "landing-page.html", size: 5120 },
        { name: "landing-page.css", size: 3072 },
        { name: "script.js", size: 1024 },
      ],
      url: "https://example.com/landing-page",
      githubUrl: "https://github.com/user/landing-page",
      notes:
        "Created a modern landing page with animations and responsive design",
      submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      status: "submitted",
      needsPeerReview: true,
      authorId: "4", // Different user
      peerReviews: [],
    },
  });

  const [reviewRequests, setReviewRequests] = useState({
    "1-3": [
      {
        id: "review-1",
        userId: "user-3",
        userName: "Charlie Brown",
        question:
          "I'm having trouble with the delete functionality. The items are not being removed from the DOM properly. Can someone help me debug this?",
        files: [
          { name: "todo-app.html", size: 15420, type: "text/html" },
          { name: "app.js", size: 8932, type: "application/javascript" },
        ],
        url: "https://charlie-todo.netlify.app",
        githubUrl: "https://github.com/charlie/todo-app",
        submittedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
        status: "open",
        reviews: [
          {
            id: "rev-1",
            userId: "user-4",
            userName: "Diana Prince",
            feedback:
              "I see the issue! You're using `removeChild()` but the element reference might be stale. Try using `element.remove()` instead.",
            rating: 4,
            submittedAt: new Date(
              Date.now() - 2 * 60 * 60 * 1000
            ).toISOString(),
          },
          {
            id: "rev-2",
            userId: "user-5",
            userName: "Eve Wilson",
            feedback:
              "Also make sure you're updating your todos array after removing from DOM. Here's the corrected code snippet: [code example]",
            rating: 5,
            submittedAt: new Date(
              Date.now() - 1 * 60 * 60 * 1000
            ).toISOString(),
          },
        ],
      },
    ],
    "2-2": [
      {
        id: "review-3",
        userId: "user-8",
        userName: "Henry Ford",
        question:
          "I can't get the calculator to handle decimal numbers properly. The math operations are giving me wrong results.",
        files: [
          { name: "calculator.js", size: 8234, type: "application/javascript" },
        ],
        url: "https://henry-calc.netlify.app",
        githubUrl: "https://github.com/henry/calculator",
        submittedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
        status: "open",
        reviews: [],
      },
      {
        id: "review-4",
        userId: "user-9",
        userName: "Sarah Johnson",
        question:
          "My responsive design is breaking on mobile devices. The grid layout isn't working as expected.",
        files: [
          { name: "responsive-layout.css", size: 4096, type: "text/css" },
          { name: "index.html", size: 2048, type: "text/html" },
        ],
        url: "https://sarah-portfolio.netlify.app",
        githubUrl: "https://github.com/sarah/responsive-layout",
        submittedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        status: "open",
        reviews: [],
      },
    ],
  });

  const [certificates, setCertificates] = useState([]);
  const [availableCertificates, setAvailableCertificates] = useState([
    {
      id: "cert-1",
      courseId: "1",
      courseName: "React Fundamentals",
      title: "React Fundamentals Certificate",
      description: "Certificate of completion for React Fundamentals course",
      imageUrl: "custom-certificate-react",
      nftMetadata: {
        name: "React Fundamentals Certificate",
        description:
          "A blockchain-verified certificate for completing the React Fundamentals course",
        image:
          "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop&crop=center",
        attributes: [
          {
            trait_type: "Course",
            value: "React Fundamentals",
          },
          {
            trait_type: "Completion Date",
            value: new Date().toISOString().split("T")[0],
          },
          {
            trait_type: "Skill Level",
            value: "Intermediate",
          },
          {
            trait_type: "Platform",
            value: "Level Up",
          },
        ],
      },
      requirements: {
        courseCompleted: true,
        allLessonsCompleted: true,
        minimumScore: 80,
      },
      isClaimable: true,
      claimed: false,
      tokenId: null,
    },
    {
      id: "cert-2",
      courseId: "2",
      courseName: "JavaScript Mastery",
      title: "JavaScript Mastery Certificate",
      description: "Certificate of completion for JavaScript Mastery course",
      imageUrl: "custom-certificate-javascript",
      nftMetadata: {
        name: "JavaScript Mastery Certificate",
        description:
          "A blockchain-verified certificate for mastering JavaScript programming",
        image:
          "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=300&fit=crop&crop=center",
        attributes: [
          {
            trait_type: "Course",
            value: "JavaScript Mastery",
          },
          {
            trait_type: "Completion Date",
            value: new Date().toISOString().split("T")[0],
          },
          {
            trait_type: "Skill Level",
            value: "Advanced",
          },
          {
            trait_type: "Platform",
            value: "Level Up",
          },
        ],
      },
      requirements: {
        courseCompleted: true,
        allLessonsCompleted: true,
        minimumScore: 85,
      },
      isClaimable: true,
      claimed: false,
      tokenId: null,
    },
  ]);

  useEffect(() => {
    fetch("/courses.json")
      .then((res) => res.json())
      .then((data) => setCourses(data.courses))
      .catch(console.error);
  }, []);

  // Helper function to get all lessons from a course
  const getAllLessons = (course) => {
    if (!course || !course.modules) return [];
    return course.modules.flatMap((module) => module.lessons || []);
  };

  // Helper function to get lesson by ID
  const getLessonById = (courseId, lessonId) => {
    const course = getCourseById(courseId);
    if (!course || !course.modules) return null;

    for (const module of course.modules) {
      if (module.lessons) {
        const lesson = module.lessons.find((l) => l.id === lessonId);
        if (lesson) return lesson;
      }
    }
    return null;
  };

  const getCourseById = (courseId) => {
    return courses.find((course) => course.id === courseId);
  };

  const enrollInCourse = (courseId) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course.id === courseId
          ? { ...course, isEnrolled: true, progress: 0 }
          : course
      )
    );
  };

  const updateCourseProgress = (courseId, newProgress) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course.id === courseId ? { ...course, progress: newProgress } : course
      )
    );
  };

  const completeLesson = (courseId, lessonId) => {
    const lesson = getLessonById(courseId, lessonId);

    setCourses((prevCourses) =>
      prevCourses.map((course) => {
        if (course.id === courseId) {
          const updatedModules = course.modules.map((module) => {
            if (module.lessons) {
              const updatedLessons = module.lessons.map((lesson) =>
                lesson.id === lessonId
                  ? { ...lesson, isCompleted: true }
                  : lesson
              );
              return { ...module, lessons: updatedLessons };
            }
            return module;
          });

          // Calculate new progress
          const allLessons = getAllLessons({
            ...course,
            modules: updatedModules,
          });
          const completedLessons = allLessons.filter(
            (lesson) => lesson.isCompleted
          );
          const newProgress = Math.round(
            (completedLessons.length / allLessons.length) * 100
          );

          // Check if course is completed
          const isCourseCompleted = newProgress === 100;

          return {
            ...course,
            modules: updatedModules,
            progress: newProgress,
            isCompleted: isCourseCompleted,
          };
        }
        return course;
      })
    );

    // Award EXP based on lesson type
    let expReward = 10; // Base EXP for completing a lesson

    if (lesson) {
      switch (lesson.type) {
        case "lesson":
          expReward = 15;
          break;
        case "assignment":
          expReward = 25;
          break;
        case "project":
          expReward = 50;
          break;
        default:
          expReward = 10;
      }
    }

    addExp(expReward, `completing ${lesson?.title || "lesson"}`);

    // Check if course is now completed and award bonus EXP
    const updatedCourse = getCourseById(courseId);
    if (updatedCourse && updatedCourse.isCompleted) {
      addExp(100, "completing course"); // Bonus EXP for completing entire course
      addCoins(25, "completing course"); // Bonus coins for completing entire course
    }

    // Unlock next lesson
    unlockNextLesson(courseId, lessonId);
  };

  const unlockNextLesson = (courseId, lessonId) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) => {
        if (course.id === courseId) {
          // Get all lessons to find the next one
          const allLessons = getAllLessons(course);
          const currentLessonIndex = allLessons.findIndex(
            (lesson) => lesson.id === lessonId
          );

          if (
            currentLessonIndex !== -1 &&
            currentLessonIndex < allLessons.length - 1
          ) {
            const nextLessonId = allLessons[currentLessonIndex + 1].id;

            // Update the course modules to unlock the next lesson
            const updatedModules = course.modules.map((module) => {
              if (module.lessons) {
                const updatedLessons = module.lessons.map((lesson) => {
                  if (lesson.id === nextLessonId) {
                    return { ...lesson, isLocked: false };
                  }
                  return lesson;
                });
                return { ...module, lessons: updatedLessons };
              }
              return module;
            });

            return { ...course, modules: updatedModules };
          }
        }
        return course;
      })
    );
  };

  const submitAssignment = (courseId, lessonId, submission) => {
    const submissionId = `${courseId}-${lessonId}-${Date.now()}`;
    setSubmissions((prev) => ({
      ...prev,
      [submissionId]: {
        id: submissionId,
        courseId,
        lessonId,
        ...submission,
        submittedAt: new Date().toISOString(),
        status: "submitted",
        botReview: null,
        peerReviews: [],
        needsPeerReview: true,
        authorId: "1", // Current user ID
      },
    }));
    return submissionId;
  };

  const getSubmissionsForLesson = (courseId, lessonId) => {
    return Object.values(submissions).filter(
      (submission) =>
        submission.courseId === courseId && submission.lessonId === lessonId
    );
  };

  const getPeerReviewSubmissions = (courseId, lessonId) => {
    return Object.values(submissions).filter(
      (submission) =>
        submission.courseId === courseId &&
        submission.lessonId === lessonId &&
        submission.authorId !== "1" && // Not current user's submissions
        submission.needsPeerReview
    );
  };

  const submitPeerReview = (submissionId, review) => {
    const reviewId = `review-${Date.now()}`;
    const peerReview = {
      id: reviewId,
      reviewerId: "1", // Current user ID
      rating: review.rating,
      feedback: review.feedback,
      submittedAt: new Date().toISOString(),
    };

    setSubmissions((prev) => ({
      ...prev,
      [submissionId]: {
        ...prev[submissionId],
        peerReviews: [...(prev[submissionId]?.peerReviews || []), peerReview],
      },
    }));

    // Award EXP for peer review
    addExp(10, "peer review");
    addCoins(5, "peer review");

    return reviewId;
  };

  const getReviewRequestsForLesson = (lessonId) => {
    return reviewRequests[lessonId] || [];
  };

  const submitReviewRequest = (courseId, lessonId, request) => {
    const requestId = `req-${Date.now()}`;
    const newRequest = {
      id: requestId,
      userId: "current-user",
      userName: "Current User",
      ...request,
      submittedAt: new Date().toISOString(),
      status: "open",
      reviews: [],
    };

    setReviewRequests((prevRequests) => ({
      ...prevRequests,
      [lessonId]: [...(prevRequests[lessonId] || []), newRequest],
    }));
    return requestId;
  };

  const submitReviewFeedback = (requestId, feedback) => {
    const reviewId = `rev-${Date.now()}`;
    const newReview = {
      id: reviewId,
      userId: "current-user",
      userName: "Current User",
      ...feedback,
      submittedAt: new Date().toISOString(),
    };

    setReviewRequests((prevRequests) => {
      const updatedRequests = { ...prevRequests };
      Object.keys(updatedRequests).forEach((lessonId) => {
        updatedRequests[lessonId] = updatedRequests[lessonId].map((request) => {
          if (request.id === requestId) {
            return {
              ...request,
              reviews: [...request.reviews, newReview],
            };
          }
          return request;
        });
      });
      return updatedRequests;
    });

    // Award EXP for helping others
    addExp(15, "helping peers");
    addCoins(8, "helping peers");

    return reviewId;
  };

  const claimCertificate = (certificateId) => {
    const certificate = availableCertificates.find(
      (cert) => cert.id === certificateId
    );
    if (!certificate || !certificate.isClaimable || certificate.claimed) {
      return false;
    }

    const tokenId = `nft-${Date.now()}`;
    const claimedCertificate = {
      ...certificate,
      claimed: true,
      tokenId,
      claimedAt: new Date().toISOString(),
      transactionHash: `0x${Math.random().toString(16).substr(2, 8)}...`,
    };

    // Add to user's certificates
    setCertificates((prev) => [...prev, claimedCertificate]);

    // Update available certificates
    setAvailableCertificates((prev) =>
      prev.map((cert) =>
        cert.id === certificateId ? { ...cert, claimed: true, tokenId } : cert
      )
    );

    // Award EXP and coins for claiming
    addExp(100, "claiming certificate");
    addCoins(50, "claiming certificate");

    return tokenId;
  };

  const getAvailableCertificates = () => {
    return availableCertificates.filter(
      (cert) => cert.isClaimable && !cert.claimed
    );
  };

  const getUserCertificates = () => {
    return certificates;
  };

  const addNotification = (message, type = "success") => {
    const id = `notification-${Date.now()}-${Math.random()}`;
    const notification = {
      id,
      message,
      type,
      timestamp: new Date().toISOString(),
    };

    setNotifications((prev) => [...prev, notification]);

    // Auto remove notification after 10 seconds
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 10000);
  };

  const addExp = (amount, source = "") => {
    setUserStats((prev) => {
      const newExp = prev.exp + amount;
      const newLevel = Math.floor(newExp / 500) + 1; // 500 EXP per level

      // const leveledUp = newLevel > prev.level;

      // if (leveledUp) {
      //   addNotification(
      //     `🎉 Level Up! You're now level ${newLevel}!`,
      //     "success"
      //   );
      // } else if (amount > 0) {
      //   addNotification(
      //     `+${amount} EXP earned${source ? ` for ${source}` : ""}!`,
      //     "success"
      //   );
      // }

      return {
        ...prev,
        exp: newExp,
        level: newLevel,
      };
    });
  };

  const addCoins = (amount, source = "") => {
    setUserStats((prev) => ({
      ...prev,
      coins: prev.coins + amount,
    }));

    if (amount > 0) {
      addNotification(
        `+${amount} coins earned${source ? ` for ${source}` : ""}!`,
        "success"
      );
    }
  };

  const spendCoins = (amount) => {
    if (userStats.coins < amount) return false;
    setUserStats((prev) => ({
      ...prev,
      coins: prev.coins - amount,
    }));
    return true;
  };

  const value = {
    courses,
    currentCourse,
    currentLesson,
    userProgress,
    userStats,
    submissions,
    certificates,
    getCourseById,
    getAllLessons,
    getLessonById,
    enrollInCourse,
    updateCourseProgress,
    completeLesson,
    unlockNextLesson,
    submitAssignment,
    getSubmissionsForLesson,
    getPeerReviewSubmissions,
    submitPeerReview,
    getReviewRequestsForLesson,
    submitReviewRequest,
    submitReviewFeedback,
    getAvailableCertificates,
    getUserCertificates,
    claimCertificate,
    addExp,
    addCoins,
    spendCoins,
    notifications,
    addNotification,
  };

  return (
    <CourseContext.Provider value={value}>{children}</CourseContext.Provider>
  );
};

export const useCourse = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error("useCourse must be used within a CourseProvider");
  }
  return context;
};
