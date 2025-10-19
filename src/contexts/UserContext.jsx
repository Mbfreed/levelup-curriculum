import React, { useEffect, useState } from "react";
import { supabase } from "../config/supabaseConfig";
import { UserContext } from "./UserContextFile";

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize auth state when app loads
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session?.user) {
          // Fetch user profile from users table
          const { data: userData, error } = await supabase
            .from("users")
            .select("*")
            .eq("id", session.user.id)
            .single();

          if (userData) {
            setUser(userData);
            setIsAuthenticated(true);
          } else if (error?.code !== "PGRST116") {
            // PGRST116 = not found, which is ok for new users
            console.error("Error fetching user:", error);
          }
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
      }
    };

    initializeAuth();

    // Subscribe to auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        // Fetch or verify user profile
        const { data: userData } = await supabase
          .from("users")
          .select("*")
          .eq("id", session.user.id)
          .single();

        if (userData) {
          setUser(userData);
          setIsAuthenticated(true);
        }
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    });

    return () => subscription?.unsubscribe();
  }, []);

  const register = async (fullName, username, email, password) => {
    setIsLoading(true);
    try {
      // Sign up with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            username: username,
          },
        },
      });

      if (authError) {
        return { success: false, error: authError.message };
      }

      if (!authData.user) {
        return {
          success: false,
          error: "Registration failed. Please try again.",
        };
      }

      // Create user profile in users table
      const { error: profileError } = await supabase.from("users").insert([
        {
          id: authData.user.id,
          email: email,
          full_name: fullName,
          username: username,
          total_points: 0,
          current_level: 1,
        },
      ]);

      if (profileError) {
        console.error("Error creating user profile:", profileError);
        return {
          success: false,
          error: "Failed to create user profile. Please try again.",
        };
      }

      // Fetch and set user data
      const { data: userData } = await supabase
        .from("users")
        .select("*")
        .eq("id", authData.user.id)
        .single();

      if (userData) {
        setUser(userData);
        setIsAuthenticated(true);
      }

      return { success: true };
    } catch (error) {
      console.error("Register error:", error);
      return { success: false, error: error.message || "Registration failed" };
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const { data: authData, error: authError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (authError) {
        return { success: false, error: authError.message };
      }

      if (!authData.user) {
        return { success: false, error: "Login failed. Please try again." };
      }

      // Fetch user profile
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("*")
        .eq("id", authData.user.id)
        .single();

      if (userError) {
        console.error("Error fetching user:", userError);
        return {
          success: false,
          error: "Failed to load user profile. Please try again.",
        };
      }

      setUser(userData);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, error: error.message || "Login failed" };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("Logout error:", error);
      }

      setUser(null);
      setIsAuthenticated(false);
      return { success: true };
    } catch (error) {
      console.error("Logout error:", error);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = async (updates) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from("users")
        .update(updates)
        .eq("id", user.id);

      if (error) {
        console.error("Error updating user:", error);
        return { success: false, error: error.message };
      }

      setUser((prev) => (prev ? { ...prev, ...updates } : null));
      return { success: true };
    } catch (error) {
      console.error("Update user error:", error);
      return { success: false, error: error.message };
    }
  };

  const addPoints = async (points) => {
    if (!user) return;

    const newTotalPoints = user.total_points + points;
    const newLevel = Math.floor(newTotalPoints / 500) + 1;

    try {
      const { error } = await supabase
        .from("users")
        .update({
          total_points: newTotalPoints,
          current_level: newLevel,
        })
        .eq("id", user.id);

      if (error) {
        console.error("Error adding points:", error);
        return { success: false, error: error.message };
      }

      setUser((prev) =>
        prev
          ? { ...prev, total_points: newTotalPoints, current_level: newLevel }
          : null
      );

      return { success: true, newLevel, newTotalPoints };
    } catch (error) {
      console.error("Add points error:", error);
      return { success: false, error: error.message };
    }
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    updateUser,
    addPoints,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
