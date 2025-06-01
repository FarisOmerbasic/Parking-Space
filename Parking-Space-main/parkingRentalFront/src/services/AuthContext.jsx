import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get('http://localhost:5164/api/auth/auth-check', { withCredentials: true });
        // --- IMPORTANT CHANGE HERE ---
        // If the backend returns { user: { ... } }, then set user to res.data.user
        setUser(res.data.user); // <--- CHANGE THIS LINE
        // You might want to add a console.log(res.data) here to confirm the structure
      } catch (error) {
        console.error("Auth check failed:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await axios.post('http://localhost:5164/api/auth/login', { email, password }, { withCredentials: true });
      // --- IMPORTANT CHANGE HERE ---
      // If login returns { user: { ... } } then set user to res.data.user
      // If login returns { id: ..., email: ..., etc. } then it should be setUser(res.data)
      // YOU NEED TO VERIFY THE EXACT LOGIN RESPONSE FROM NETWORK TAB!
      // Based on your last code, login returns a flat object, so this would be res.data
      setUser(res.data); // Keep this as is for login if it's flat
      console.log("Login response data:", res.data); // Add this to confirm
      return res.data;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await axios.post('http://localhost:5164/api/auth/logout', {}, { withCredentials: true });
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // isAdmin will re-evaluate whenever the 'user' state changes
  const isAdmin = Boolean(user && user.role === "Admin"); // This line remains the same if user is now the inner object

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}