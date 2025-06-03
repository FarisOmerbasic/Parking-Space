import React, { useState, useEffect } from "react";
import axios from "axios";
import AuthContext from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5164/api/auth/auth-check", { withCredentials: true })
      .then((res) => setUser(res.data.user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const res = await axios.post(
      "http://localhost:5164/api/auth/login",
      { email, password },
      { withCredentials: true }
    );
    setUser(res.data.user);
    return res.data.user;
  };

  const logout = async () => {
    await axios.post("http://localhost:5164/api/auth/logout", {}, { withCredentials: true });
    setUser(null);
  };

  const isAdmin = Boolean(user && user.role === "Admin");

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;