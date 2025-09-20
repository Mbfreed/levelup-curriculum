import React, { createContext, useContext, useState } from "react";

const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState([
    {
      id: "1",
      title: "Web Development Fundamentals",
      description:
        "Learn the basics of HTML, CSS, and JavaScript to build your first website.",
      instructor: "Community",
      level: "Beginner",
      duration: "8 weeks",
      totalLessons: 7,
      students: 1250,
      rating: 4.8,
      price: 0,
      thumbnail: "/api/placeholder/300/200",
      tags: ["HTML", "CSS", "JavaScript", "Web Development"],
      progress: 25,
      isEnrolled: true,
      modules: [
        {
          id: "1",
          title: "HTML Fundamentals",
          description: "Master the building blocks of web pages",
          duration: "3 weeks",
          order: 1,
          lessons: [
            {
              id: "1-1",
              title: "Introduction to HTML",
              description: "Learn the structure and syntax of HTML",
              duration: "45 min",
              type: "lesson",
              content: `
                <h2>What is HTML?</h2>
                <p>HTML (HyperText Markup Language) is the standard markup language for creating web pages. It describes the structure of web pages using markup.</p>
                
                <h3>Basic HTML Structure</h3>
                <pre><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;My First Web Page&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;h1&gt;Hello, World!&lt;/h1&gt;
    &lt;p&gt;This is my first paragraph.&lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
                
                <h3>Key Concepts</h3>
                <ul>
                  <li><strong>Elements:</strong> HTML elements are the building blocks of HTML pages</li>
                  <li><strong>Tags:</strong> HTML tags label pieces of content</li>
                  <li><strong>Attributes:</strong> HTML attributes provide additional information about elements</li>
                </ul>
              `,
              isCompleted: true,
              isLocked: false,
            },
            {
              id: "1-2",
              title: "HTML Elements and Attributes",
              description: "Master common HTML elements and their attributes",
              duration: "60 min",
              type: "lesson",
              content: `
                <h2>Common HTML Elements</h2>
                <h3>Text Elements</h3>
                <ul>
                  <li><code>&lt;h1&gt;</code> to <code>&lt;h6&gt;</code> - Headings</li>
                  <li><code>&lt;p&gt;</code> - Paragraphs</li>
                  <li><code>&lt;strong&gt;</code> - Bold text</li>
                  <li><code>&lt;em&gt;</code> - Italic text</li>
                  <li><code>&lt;br&gt;</code> - Line breaks</li>
                </ul>
                
                <h3>Structure Elements</h3>
                <ul>
                  <li><code>&lt;div&gt;</code> - Generic container</li>
                  <li><code>&lt;span&gt;</code> - Inline container</li>
                  <li><code>&lt;section&gt;</code> - Section of content</li>
                  <li><code>&lt;article&gt;</code> - Independent content</li>
                </ul>
                
                <h3>HTML Attributes</h3>
                <p>Attributes provide additional information about elements:</p>
                <pre><code>&lt;img src="image.jpg" alt="Description"&gt;
&lt;a href="https://example.com" target="_blank"&gt;Link&lt;/a&gt;
&lt;input type="text" placeholder="Enter text"&gt;</code></pre>
              `,
              isCompleted: false,
              isLocked: false,
            },
            {
              id: "1-3",
              title: "HTML Forms Assignment",
              description: "Create interactive forms with HTML",
              duration: "75 min",
              type: "assignment",
              content: `
                <h2>Assignment: Contact Form</h2>
                <p>Create a contact form with the following requirements:</p>
                
                <h3>Requirements</h3>
                <ul>
                  <li>Name field (text input)</li>
                  <li>Email field (email input)</li>
                  <li>Subject field (text input)</li>
                  <li>Message field (textarea)</li>
                  <li>Submit button</li>
                  <li>All fields should be required</li>
                </ul>
                
                <h3>Submission Guidelines</h3>
                <ul>
                  <li>Create an HTML file named <code>contact-form.html</code></li>
                  <li>Use proper form structure and attributes</li>
                  <li>Include proper labels for accessibility</li>
                  <li>Test your form before submitting</li>
                </ul>
              `,
              submissionRequirements: {
                type: "file",
                allowedTypes: ["html", "htm"],
                maxSize: "1MB",
                description: "Upload your HTML contact form file",
              },
              isCompleted: false,
              isLocked: true,
            },
          ],
        },
        {
          id: "2",
          title: "CSS Styling",
          description: "Learn to style and layout web pages",
          duration: "3 weeks",
          order: 2,
          lessons: [
            {
              id: "2-1",
              title: "CSS Basics",
              description: "Introduction to CSS styling",
              duration: "90 min",
              type: "lesson",
              content: `
                <h2>What is CSS?</h2>
                <p>CSS (Cascading Style Sheets) is a stylesheet language used to describe the presentation of HTML documents.</p>
                
                <h3>CSS Syntax</h3>
                <pre><code>selector {
  property: value;
  property: value;
}</code></pre>
                
                <h3>Ways to Add CSS</h3>
                <ol>
                  <li><strong>Inline:</strong> Using the style attribute</li>
                  <li><strong>Internal:</strong> Using &lt;style&gt; element</li>
                  <li><strong>External:</strong> Using external CSS files</li>
                </ol>
                
                <h3>CSS Selectors</h3>
                <ul>
                  <li><strong>Element:</strong> <code>p { }</code></li>
                  <li><strong>Class:</strong> <code>.classname { }</code></li>
                  <li><strong>ID:</strong> <code>#idname { }</code></li>
                </ul>
              `,
              isCompleted: false,
              isLocked: true,
            },
            {
              id: "2-2",
              title: "CSS Layout Project",
              description: "Build a responsive website layout",
              duration: "120 min",
              type: "project",
              content: `
                <h2>Project: Personal Portfolio Layout</h2>
                <p>Create a responsive portfolio website layout using CSS Flexbox and Grid.</p>
                
                <h3>Layout Requirements</h3>
                <ul>
                  <li>Header with navigation</li>
                  <li>Hero section with your name and title</li>
                  <li>About section</li>
                  <li>Skills section (3-column grid)</li>
                  <li>Projects section (2x2 grid)</li>
                  <li>Contact section</li>
                  <li>Footer</li>
                </ul>
                
                <h3>Technical Requirements</h3>
                <ul>
                  <li>Use CSS Grid for main layout</li>
                  <li>Use Flexbox for component layouts</li>
                  <li>Make it responsive (mobile, tablet, desktop)</li>
                  <li>Use modern CSS properties</li>
                </ul>
                
                <h3>Submission</h3>
                <p>Submit both HTML and CSS files, plus a live URL if hosted.</p>
              `,
              submissionRequirements: {
                type: "files",
                allowedTypes: ["html", "css"],
                maxFiles: 3,
                maxSize: "2MB",
                description:
                  "Upload your HTML and CSS files, and provide a live URL if available",
                requiresUrl: true,
              },
              isCompleted: false,
              isLocked: true,
            },
          ],
        },
        {
          id: "3",
          title: "JavaScript Fundamentals",
          description: "Learn programming with JavaScript",
          duration: "2 weeks",
          order: 3,
          lessons: [
            {
              id: "3-1",
              title: "JavaScript Basics",
              description:
                "Variables, functions, and basic programming concepts",
              duration: "150 min",
              type: "lesson",
              content: `
                <h2>JavaScript Fundamentals</h2>
                <p>JavaScript is a programming language that adds interactivity to web pages.</p>
                
                <h3>Variables</h3>
                <pre><code>let name = "John";
const age = 25;
var isStudent = true;</code></pre>
                
                <h3>Functions</h3>
                <pre><code>function greet(name) {
  return "Hello, " + name + "!";
}

const greetArrow = (name) => {
  return \`Hello, \${name}!\`;
};</code></pre>
                
                <h3>Data Types</h3>
                <ul>
                  <li>Numbers</li>
                  <li>Strings</li>
                  <li>Booleans</li>
                  <li>Arrays</li>
                  <li>Objects</li>
                </ul>
              `,
              isCompleted: false,
              isLocked: true,
            },
            {
              id: "3-2",
              title: "DOM Manipulation Challenge",
              description: "Build an interactive web application",
              duration: "180 min",
              type: "assignment",
              content: `
                <h2>Challenge: Interactive Todo App</h2>
                <p>Build a fully functional todo application using HTML, CSS, and JavaScript.</p>
                
                <h3>Features Required</h3>
                <ul>
                  <li>Add new todos</li>
                  <li>Mark todos as complete</li>
                  <li>Delete todos</li>
                  <li>Filter todos (all, active, completed)</li>
                  <li>Clear completed todos</li>
                  <li>Todo counter</li>
                </ul>
                
                <h3>Technical Requirements</h3>
                <ul>
                  <li>Use modern JavaScript (ES6+)</li>
                  <li>Handle user input validation</li>
                  <li>Use event listeners properly</li>
                  <li>Implement local storage for persistence</li>
                  <li>Write clean, readable code</li>
                </ul>
                
                <h3>Bonus Features</h3>
                <ul>
                  <li>Drag and drop reordering</li>
                  <li>Edit todo functionality</li>
                  <li>Keyboard shortcuts</li>
                </ul>
              `,
              submissionRequirements: {
                type: "files",
                allowedTypes: ["html", "css", "js"],
                maxFiles: 5,
                maxSize: "5MB",
                description:
                  "Upload your HTML, CSS, and JavaScript files, plus provide a live demo URL",
                requiresUrl: true,
                requiresGitHub: true,
              },
              isCompleted: false,
              isLocked: true,
            },
          ],
        },
      ],
    },
    {
      id: "2",
      title: "React Development Mastery",
      description:
        "Master React.js and build modern, interactive web applications.",
      instructor: "Community",
      level: "Intermediate",
      duration: "12 weeks",
      totalLessons: 36,
      students: 890,
      rating: 4.9,
      price: 50,
      thumbnail: "/api/placeholder/300/200",
      tags: ["React", "JavaScript", "Frontend", "Components"],
      progress: 0,
      isEnrolled: false,
      modules: [
        {
          id: "1",
          title: "React Fundamentals",
          description: "Learn the core concepts of React",
          duration: "4 weeks",
          order: 1,
          lessons: [
            {
              id: "1-1",
              title: "React Components and JSX",
              description: "Learn the fundamentals of React components",
              duration: "60 min",
              type: "lesson",
              isCompleted: false,
              isLocked: false,
            },
            {
              id: "1-2",
              title: "State and Props",
              description: "Master React state management and props",
              duration: "75 min",
              type: "lesson",
              isCompleted: false,
              isLocked: true,
            },
            {
              id: "1-3",
              title: "Build a Todo App",
              description: "Create a complete todo application with React",
              duration: "120 min",
              type: "project",
              isCompleted: false,
              isLocked: true,
            },
          ],
        },
      ],
    },
  ]);

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
    const id = `notification-${Date.now()}`;
    const notification = {
      id,
      message,
      type,
      timestamp: new Date().toISOString(),
    };

    setNotifications((prev) => [...prev, notification]);

    // Auto remove notification after 3 seconds
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 10000);
  };

  const addExp = (amount, source = "") => {
    setUserStats((prev) => {
      const newExp = prev.exp + amount;
      const newLevel = Math.floor(newExp / 500) + 1; // 500 EXP per level
      const leveledUp = newLevel > prev.level;

      if (leveledUp) {
        addNotification(
          `🎉 Level Up! You're now level ${newLevel}!`,
          "success"
        );
      } else if (amount > 0) {
        addNotification(
          `+${amount} EXP earned${source ? ` for ${source}` : ""}!`,
          "success"
        );
      }

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
