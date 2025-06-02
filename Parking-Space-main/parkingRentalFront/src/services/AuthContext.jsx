import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Added loading state

  // Effect to check authentication status on component mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get('http://localhost:5164/api/auth/auth-check', { withCredentials: true });
        // Assuming backend returns a flat user object like { id, email, name, role }
        setUser(res.data);
      } catch (error) {
        // If auth check fails (e.g., token expired, no token), user is not logged in
        console.error("Auth check failed:", error);
        setUser(null);
      } finally {
        setLoading(false); // Set loading to false once check is complete
      }
    };
    checkAuth();
  }, []); // Empty dependency array means this runs once on mount

  const login = async (email, password) => { // Made async to handle API call
    try {
      const res = await axios.post('http://localhost:5164/api/auth/login', { email, password }, { withCredentials: true });
      // Assuming backend returns a flat user object like { id, email, name, role }
      setUser(res.data);
      return res.data; // Return user data for potential use in login component
    } catch (error) {
      console.error("Login failed:", error);
      throw error; // Re-throw to allow error handling in login component
    }
  };

  const logout = async () => { // Made async to handle API call
    try {
      await axios.post('http://localhost:5164/api/auth/logout', {}, { withCredentials: true });
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Derive isAdmin based on the user's role
  // This will re-evaluate whenever the 'user' state changes
  const isAdmin = Boolean(user && user.role === "Admin");

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}