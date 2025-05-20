import { useState, useEffect, useCallback } from "react";
import { AuthContext } from "./AuthContext";
import PropTypes from "prop-types";
import axios from "axios";

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5164/api/Auth/auth-check", {
        withCredentials: true
      });
      
      if (response.data?.user) {
        setUser(response.data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (userData) => {
    setUser(userData);
    await checkAuth(); // Verify the auth status after login
  }, [checkAuth]);

  const logout = useCallback(async () => {
    try {
      await axios.post("http://localhost:5164/api/Auth/logout", {}, {
        withCredentials: true
      });
      
      // Clear all auth cookies
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }, []);

  useEffect(() => {
    checkAuth();

    // Set up periodic auth checks (every 5 minutes)
    const interval = setInterval(checkAuth, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [checkAuth]);

  const value = {
    user,
    setUser,
    login,
    logout,
    checkAuth,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthProvider };