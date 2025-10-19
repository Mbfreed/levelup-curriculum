import { supabase } from "../config/supabaseConfig";

const GITHUB_RAW_URL =
  "https://raw.githubusercontent.com/levelupdevs1/levelup-curriculum/main";

/**
 * Fetch all courses from Supabase
 * @returns {Promise<Array>} Array of courses
 */
export const fetchAllCourses = async () => {
  try {
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching courses:", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Fetch courses error:", error);
    return [];
  }
};

/**
 * Fetch a single course by ID
 * @param {string} courseId - Course ID
 * @returns {Promise<Object>} Course data
 */
export const fetchCourseById = async (courseId) => {
  try {
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .eq("id", courseId)
      .single();

    if (error) {
      console.error(`Error fetching course ${courseId}:`, error);
      return null;
    }

    return data;
  } catch (error) {
    console.error(`Fetch course error for ${courseId}:`, error);
    return null;
  }
};

/**
 * Fetch lesson markdown content from GitHub
 * @param {string} courseId - Course ID
 * @param {string} filePath - File path from course.json (e.g., "module-1/lesson-1.md")
 * @returns {Promise<string>} Markdown content
 */
export const fetchLessonMarkdown = async (courseId, filePath) => {
  try {
    const url = `${GITHUB_RAW_URL}/src/courses/${courseId}/${filePath}`;
    const response = await fetch(url);

    if (!response.ok) {
      console.error(
        `Failed to fetch markdown from ${url}: ${response.status}`
      );
      return null;
    }

    const content = await response.text();
    return content;
  } catch (error) {
    console.error(`Error fetching lesson markdown for ${courseId}/${filePath}:`, error);
    return null;
  }
};

/**
 * Get user's enrollments
 * @param {string} userId - User ID
 * @returns {Promise<Array>} Array of enrolled course IDs
 */
export const fetchUserEnrollments = async (userId) => {
  try {
    const { data, error } = await supabase
      .from("enrollments")
      .select("course_id")
      .eq("user_id", userId);

    if (error) {
      console.error("Error fetching enrollments:", error);
      return [];
    }

    return data?.map((e) => e.course_id) || [];
  } catch (error) {
    console.error("Fetch enrollments error:", error);
    return [];
  }
};

/**
 * Enroll user in a course
 * @param {string} userId - User ID
 * @param {string} courseId - Course ID
 * @returns {Promise<Object>} { success: boolean, error?: string }
 */
export const enrollCourse = async (userId, courseId) => {
  try {
    const { error } = await supabase.from("enrollments").insert([
      {
        user_id: userId,
        course_id: courseId,
        status: "in-progress",
      },
    ]);

    if (error) {
      console.error("Error enrolling in course:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error("Enroll course error:", error);
    return { success: false, error: error.message };
  }
};

/**
 * Get user's progress for a specific lesson
 * @param {string} userId - User ID
 * @param {string} lessonId - Lesson ID
 * @returns {Promise<Object>} Progress record or null
 */
export const fetchLessonProgress = async (userId, lessonId) => {
  try {
    const { data, error } = await supabase
      .from("progress")
      .select("*")
      .eq("user_id", userId)
      .eq("lesson_id", lessonId)
      .single();

    if (error?.code === "PGRST116") {
      // Not found - lesson not started
      return null;
    }

    if (error) {
      console.error("Error fetching lesson progress:", error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Fetch lesson progress error:", error);
    return null;
  }
};

/**
 * Record lesson completion and award points
 * @param {string} userId - User ID
 * @param {string} courseId - Course ID
 * @param {string} moduleId - Module ID
 * @param {string} lessonId - Lesson ID
 * @param {number} points - Points to award (default 10)
 * @returns {Promise<Object>} { success: boolean, newLevel?: number, totalPoints?: number, error?: string }
 */
export const recordLessonCompletion = async (
  userId,
  courseId,
  moduleId,
  lessonId,
  points = 10
) => {
  try {
    // Check if already completed
    const { data: existingProgress } = await supabase
      .from("progress")
      .select("*")
      .eq("user_id", userId)
      .eq("lesson_id", lessonId)
      .single();

    if (existingProgress?.completed_at) {
      // Already completed, don't award points again
      return {
        success: true,
        message: "Lesson already completed",
      };
    }

    // Record or update progress
    const now = new Date().toISOString();
    const { error: progressError } = await supabase
      .from("progress")
      .upsert(
        [
          {
            user_id: userId,
            course_id: courseId,
            module_id: moduleId,
            lesson_id: lessonId,
            completed_at: now,
            points_earned: points,
          },
        ],
        { onConflict: "user_id,lesson_id" }
      );

    if (progressError) {
      console.error("Error recording progress:", progressError);
      return { success: false, error: progressError.message };
    }

    // Get user's current points
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("total_points")
      .eq("id", userId)
      .single();

    if (userError) {
      console.error("Error fetching user points:", userError);
      return { success: false, error: userError.message };
    }

    // Calculate new points and level
    const newTotalPoints = (userData?.total_points || 0) + points;
    const newLevel = Math.floor(newTotalPoints / 500) + 1;

    // Update user points and level
    const { error: updateError } = await supabase
      .from("users")
      .update({
        total_points: newTotalPoints,
        current_level: newLevel,
      })
      .eq("id", userId);

    if (updateError) {
      console.error("Error updating user points:", updateError);
      return { success: false, error: updateError.message };
    }

    return {
      success: true,
      newLevel,
      totalPoints: newTotalPoints,
      leveledUp: newLevel > Math.floor(((userData?.total_points || 0)) / 500) + 1,
    };
  } catch (error) {
    console.error("Record lesson completion error:", error);
    return { success: false, error: error.message };
  }
};

/**
 * Get user's course progress (percentage of lessons completed)
 * @param {string} userId - User ID
 * @param {string} courseId - Course ID
 * @returns {Promise<Object>} { completedLessons: number, totalLessons: number, percentage: number }
 */
export const getCourseProgress = async (userId, courseId) => {
  try {
    // Get course data to know total lessons
    const course = await fetchCourseById(courseId);
    if (!course) {
      return { completedLessons: 0, totalLessons: 0, percentage: 0 };
    }

    // Count total lessons
    const totalLessons = course.modules.reduce((sum, module) => {
      return sum + module.lessons.length;
    }, 0);

    // Count completed lessons
    const { data: completedData, error } = await supabase
      .from("progress")
      .select("lesson_id")
      .eq("user_id", userId)
      .eq("course_id", courseId)
      .not("completed_at", "is", null);

    if (error) {
      console.error("Error fetching course progress:", error);
      return { completedLessons: 0, totalLessons, percentage: 0 };
    }

    const completedLessons = completedData?.length || 0;
    const percentage = Math.round((completedLessons / totalLessons) * 100);

    return { completedLessons, totalLessons, percentage };
  } catch (error) {
    console.error("Get course progress error:", error);
    return { completedLessons: 0, totalLessons: 0, percentage: 0 };
  }
};

/**
 * Record assignment submission
 * @param {string} userId - User ID
 * @param {string} courseId - Course ID
 * @param {string} assignmentId - Assignment ID
 * @param {string} submissionContent - Submission content/URL/description
 * @returns {Promise<Object>} { success: boolean, submissionId?: string, error?: string }
 */
export const submitAssignment = async (
  userId,
  courseId,
  assignmentId,
  submissionContent
) => {
  try {
    const { data, error } = await supabase
      .from("submissions")
      .insert([
        {
          user_id: userId,
          course_id: courseId,
          assignment_id: assignmentId,
          submission_content: submissionContent,
          status: "pending",
        },
      ])
      .select("id");

    if (error) {
      console.error("Error submitting assignment:", error);
      return { success: false, error: error.message };
    }

    return { success: true, submissionId: data?.[0]?.id };
  } catch (error) {
    console.error("Submit assignment error:", error);
    return { success: false, error: error.message };
  }
};

/**
 * Mark course as completed
 * @param {string} userId - User ID
 * @param {string} courseId - Course ID
 * @returns {Promise<Object>} { success: boolean, error?: string }
 */
export const markCourseCompleted = async (userId, courseId) => {
  try {
    const { error: completionError } = await supabase
      .from("completions")
      .insert([
        {
          user_id: userId,
          course_id: courseId,
          certificate_eligible: true,
        },
      ]);

    if (completionError && completionError.code !== "23505") {
      // 23505 is unique constraint violation - already completed
      console.error("Error marking course completed:", completionError);
      return { success: false, error: completionError.message };
    }

    // Update enrollment status
    const { error: enrollmentError } = await supabase
      .from("enrollments")
      .update({ status: "completed" })
      .eq("user_id", userId)
      .eq("course_id", courseId);

    if (enrollmentError) {
      console.error("Error updating enrollment:", enrollmentError);
      return { success: false, error: enrollmentError.message };
    }

    return { success: true };
  } catch (error) {
    console.error("Mark course completed error:", error);
    return { success: false, error: error.message };
  }
};
