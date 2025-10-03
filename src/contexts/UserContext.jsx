import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "../config/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userData = await fetchUserDetails(currentUser.uid);
        setUser(userData);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const updateUser = (userData) => {
    setUser((prev) => ({ ...prev, ...userData }));
  };

  const uploadUserDetails = async (userData) => {
    try {
      await setDoc(doc(db, "users", userData.uid), userData);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUserDetails = async (userId) => {
    try {
      const docSnap = await getDoc(doc(db, "users", userId));

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        return docSnap.data();
      } else {
        console.log("No such document!");
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const userData = await fetchUserDetails(user.uid);
      console.log(userData);

      setUser(userData);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.code };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name, email, password) => {
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const userData = {
        uid: user.uid,
        name: name,
        email: email,
        avatar: null,
        level: "Beginner",
        exp: 0,
        coins: 0,
        streak: 0,
        joinedDate: user.metadata.creationTime,
      };

      console.log("User is Registered successfully");

      await uploadUserDetails(userData);

      console.log("User details uploaded to Firestore");

      return { success: true };
    } catch (error) {
      return { success: false, error: error.code };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(false);
    try {
      await signOut(auth);
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const addExp = (amount) => {
    setUser((prev) => (prev ? { ...prev, exp: prev.exp + amount } : null));
  };

  const addCoins = (amount) => {
    setUser((prev) => (prev ? { ...prev, coins: prev.coins + amount } : null));
  };

  const levelUp = (newLevel, newExp) => {
    setUser((prev) =>
      prev ? { ...prev, level: newLevel, exp: newExp } : null
    );
  };

  const updateStreak = (streak) => {
    setUser((prev) => (prev ? { ...prev, streak } : null));
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
