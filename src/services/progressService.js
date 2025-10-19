import { supabase } from "./authService";

/**
 * Level thresholds for the platform
 * Returns tokens earned when reaching that level
 */
const LEVEL_CONFIG = {
  1: 10,
  2: 50,
  3: 70,
  4: 100,
  5: 150,
  6: 200,
  7: 250,
  8: 300,
  9: 350,
  10: 400,
};

/**
 * Calculate total points needed to reach a level
 * @param {number} level - Target level
 * @returns {number} Total points needed
 */
export const calculatePointsForLevel = (level) => {
  let total = 0;
  for (let i = 1; i < level; i++) {
    total += 500 * i; // Each level requires 500 * level points
  }
  return total;
};

/**
 * Calculate current level based on total points
 * @param {number} totalPoints - Total points earned
 * @returns {number} Current level
 */
export const calculateLevel = (totalPoints) => {
  let level = 1;
  while (calculatePointsForLevel(level + 1) <= totalPoints) {
    level++;
  }
  return level;
};

/**
 * Get tokens for reaching a specific level
 * @param {number} level - Level reached
 * @returns {number} Tokens earned
 */
export const getTokensForLevel = (level) => {
  return LEVEL_CONFIG[level] || 10; // Default to 10 if level not in config
};

/**
 * Add points to user and check for level up
 * @param {string} userId - User ID
 * @param {number} pointsToAdd - Points to add
 * @returns {Promise<{success: boolean, user?: object, leveledUp?: boolean, newLevel?: number, error?: string}>}
 */
export const addPointsToUser = async (userId, pointsToAdd) => {
  try {
    // Get current user profile
    const { data: user, error: fetchError } = await supabase
      .from("users")
      .select("total_points, current_level")
      .eq("id", userId)
      .single();

    if (fetchError) {
      return { success: false, error: fetchError.message };
    }

    const currentPoints = user.total_points || 0;
    const oldLevel = user.current_level || 1;
    const newTotalPoints = currentPoints + pointsToAdd;
    const newLevel = calculateLevel(newTotalPoints);
    const leveledUp = newLevel > oldLevel;

    // Update user profile
    const { data: updated, error: updateError } = await supabase
      .from("users")
      .update({
        total_points: newTotalPoints,
        current_level: newLevel,
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId)
      .select()
      .single();

    if (updateError) {
      return { success: false, error: updateError.message };
    }

    return {
      success: true,
      user: updated,
      leveledUp,
      newLevel,
      oldLevel,
    };
  } catch (err) {
    console.error("Add points error:", err);
    return { success: false, error: err.message };
  }
};

/**
 * Claim tokens for reaching a level
 * @param {string} userId - User ID
 * @param {number} level - Level reached
 * @returns {Promise<{success: boolean, claim?: object, tokensAwarded?: number, error?: string}>}
 */
export const claimTokens = async (userId, level) => {
  try {
    const tokens = getTokensForLevel(level);

    // Check if already claimed
    const { data: existing } = await supabase
      .from("token_claims")
      .select("id")
      .eq("user_id", userId)
      .eq("level", level)
      .single();

    if (existing) {
      return {
        success: false,
        error: "Tokens already claimed for this level",
      };
    }

    // Create token claim record
    const { data: claim, error } = await supabase
      .from("token_claims")
      .insert([
        {
          user_id: userId,
          level: level,
          tokens_claimed: tokens,
          status: "pending", // Will be 'confirmed' after blockchain tx
        },
      ])
      .select()
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    return {
      success: true,
      claim,
      tokensAwarded: tokens,
    };
  } catch (err) {
    console.error("Claim tokens error:", err);
    return { success: false, error: err.message };
  }
};

/**
 * Get user's available token claims
 * @param {string} userId - User ID
 * @returns {Promise<{success: boolean, claims?: array, totalTokens?: number, error?: string}>}
 */
export const getUserTokenClaims = async (userId) => {
  try {
    const { data, error } = await supabase
      .from("token_claims")
      .select("*")
      .eq("user_id", userId)
      .order("level", { ascending: false });

    if (error) {
      return { success: false, error: error.message };
    }

    const totalTokens = (data || []).reduce(
      (sum, claim) => sum + claim.tokens_claimed,
      0
    );

    return {
      success: true,
      claims: data || [],
      totalTokens,
    };
  } catch (err) {
    console.error("Get user token claims error:", err);
    return { success: false, error: err.message };
  }
};

/**
 * Check if user can claim tokens for a level
 * @param {string} userId - User ID
 * @param {number} level - Level to check
 * @returns {Promise<{success: boolean, canClaim: boolean, error?: string}>}
 */
export const canClaimTokens = async (userId, level) => {
  try {
    // Get user's current level
    const { data: user, error: userError } = await supabase
      .from("users")
      .select("current_level")
      .eq("id", userId)
      .single();

    if (userError) {
      return { success: false, error: userError.message };
    }

    // Check if already claimed
    const { data: claimed } = await supabase
      .from("token_claims")
      .select("id")
      .eq("user_id", userId)
      .eq("level", level)
      .single();

    const canClaim = user.current_level >= level && !claimed;

    return { success: true, canClaim };
  } catch (err) {
    console.error("Can claim tokens error:", err);
    return { success: false, error: err.message };
  }
};

/**
 * Get user's progress stats
 * @param {string} userId - User ID
 * @returns {Promise<{success: boolean, stats?: object, error?: string}>}
 */
export const getUserProgressStats = async (userId) => {
  try {
    // Get user profile
    const { data: user, error: userError } = await supabase
      .from("users")
      .select("total_points, current_level")
      .eq("id", userId)
      .single();

    if (userError) {
      return { success: false, error: userError.message };
    }

    // Get progress count
    const { count: lessonsCompleted, error: progressError } = await supabase
      .from("progress")
      .select("id", { count: "exact", head: true })
      .eq("user_id", userId);

    // Get enrollments count
    const { count: coursesEnrolled, error: enrollError } = await supabase
      .from("enrollments")
      .select("id", { count: "exact", head: true })
      .eq("user_id", userId);

    // Get completions count
    const { count: coursesCompleted, error: completeError } = await supabase
      .from("completions")
      .select("id", { count: "exact", head: true })
      .eq("user_id", userId);

    if (progressError || enrollError || completeError) {
      return {
        success: false,
        error:
          progressError?.message ||
          enrollError?.message ||
          completeError?.message,
      };
    }

    const pointsForNextLevel = calculatePointsForLevel(user.current_level + 1);
    const pointsProgress =
      user.total_points - calculatePointsForLevel(user.current_level);
    const pointsNeeded =
      pointsForNextLevel - calculatePointsForLevel(user.current_level);

    return {
      success: true,
      stats: {
        totalPoints: user.total_points,
        currentLevel: user.current_level,
        lessonsCompleted: lessonsCompleted || 0,
        coursesEnrolled: coursesEnrolled || 0,
        coursesCompleted: coursesCompleted || 0,
        pointsProgress,
        pointsNeeded,
        progressPercentage:
          pointsNeeded > 0 ? (pointsProgress / pointsNeeded) * 100 : 0,
      },
    };
  } catch (err) {
    console.error("Get user progress stats error:", err);
    return { success: false, error: err.message };
  }
};
