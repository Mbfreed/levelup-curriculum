import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const updateUser = (userData) => {
    setUser((prev) => ({ ...prev, ...userData }));
  };

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data - in real app, this would come from API
      const userData = {
        id: "1",
        name: "John Doe",
        email: email,
        avatar: null,
        level: "Beginner",
        exp: 1250,
        coins: 45,
        streak: 7,
        joinDate: "2024-01-15",
      };
      
      setUser(userData);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name, email, password) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data - in real app, this would come from API
      const userData = {
        id: "1",
        name: name,
        email: email,
        avatar: null,
        level: "Beginner",
        exp: 0,
        coins: 0,
        streak: 0,
        joinDate: new Date().toISOString().split('T')[0],
      };
      
      setUser(userData);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const addExp = (amount) => {
    setUser((prev) => prev ? ({ ...prev, exp: prev.exp + amount }) : null);
  };

  const addCoins = (amount) => {
    setUser((prev) => prev ? ({ ...prev, coins: prev.coins + amount }) : null);
  };

  const levelUp = (newLevel, newExp) => {
    setUser((prev) => prev ? ({ ...prev, level: newLevel, exp: newExp }) : null);
  };

  const updateStreak = (streak) => {
    setUser((prev) => prev ? ({ ...prev, streak }) : null);
  };

  const setLoading = (loading) => {
    setIsLoading(loading);
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    updateUser,
    addExp,
    addCoins,
    levelUp,
    updateStreak,
    setLoading,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
