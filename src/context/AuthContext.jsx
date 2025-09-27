"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import apiClient from "@/utilities/apiClients";
import { useRouter } from "next/navigation";

// Create context
const AuthContext = createContext();

// Helper: Decode token safely
const decodeToken = (token) => {
  try {
    const decode=jwtDecode(token) || "";
    return decode
  } catch (err) {
    console.error("Token decode failed:", err);
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  // 🔄 Attempt to refresh token
  const refreshAccessToken = useCallback(async () => {
    const refreshToken = localStorage.getItem("refresh_token");
    if (!refreshToken) {
      logout();
      return;
    }

    try {
      const response = await apiClient.post("/api/token/refresh/", {
        refresh: refreshToken,
      });

      const newToken = response.data.access;
      localStorage.setItem("auth_token", newToken);
      Cookies.set("auth_token", newToken, { expires: 2, secure: true, sameSite: "Lax" });
      setAccessToken(newToken);
      const decoded = decodeToken(newToken);
      setUser(decoded);
      setIsAuthenticated(true);
    } catch (error) {
      console.warn("Refresh token expired or invalid:", error);
      logout();
    }
  }, []);

  // 🔐 Login
  const login = ({ access, refresh }) => {
    localStorage.setItem("auth_token", access);
    localStorage.setItem("refresh_token", refresh);
    Cookies.set("auth_token", access, { expires: 2, secure: true, sameSite: "Lax" });

    const decoded = decodeToken(access);
    setAccessToken(access);
    setUser(decoded);
    setIsAuthenticated(true);
  };

  // 🚪 Logout
  const logout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("refresh_token");
    Cookies.remove("auth_token");

    setAccessToken(null);
    setUser(null);
    setIsAuthenticated(false);
    router.push("/login");
  };

  // ⏱️ Auto-check token on mount
  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const decoded = decodeToken(token);

    if (decoded) {
      const isExpired = decoded.exp * 1000 < Date.now();
      if (isExpired) {
        refreshAccessToken(); // Try to refresh
      } else {
        setAccessToken(token);
        setUser(decoded);
        setIsAuthenticated(true);

        // ⏱️ Auto-refresh a few seconds before expiry
        const timeUntilExpiry = decoded.exp * 1000 - Date.now() - 5000; // refresh 5s before
        const timer = setTimeout(() => {
          refreshAccessToken();
        }, timeUntilExpiry);

        return () => clearTimeout(timer);
      }
    } else {
      logout();
    }
  }, [refreshAccessToken]);

  return (
    <AuthContext.Provider value={{ accessToken, user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ useAuth hook
export const useAuth = () => {
  return useContext(AuthContext);
};
