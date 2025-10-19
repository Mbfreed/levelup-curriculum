import { useContext } from "react";
import { UserContext } from "../contexts/createUserContext";

/**
 * Custom hook to use the User context
 * @returns {Object} User context value with user, profile, refreshProfile, login, register, logout
 * @throws {Error} If used outside UserProvider
 */
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
