// "use client";

// import { createContext, useContext, useEffect, useState, useCallback } from "react";
// import { jwtDecode } from "jwt-decode";
// import Cookies from "js-cookie";
// import apiClient from "@/utilities/apiClients";
// import { useRouter } from "next/navigation";

// // Create context
// const AuthContext = createContext();

// // Helper: Decode token safely
// const decodeToken = (token = "") => {
//   if (!token || typeof token !== "string" || token.split(".").length !== 3) {
//     console.warn("Invalid token format, skipping decode.");
//     return null;
//   }

//   try {
//     return jwtDecode(token);
//   } catch (err) {
//     console.error("Token decode failed:", err);
//     return null;
//   }
// };


// export const AuthProvider = ({ children }) => {
//   const [accessToken, setAccessToken] = useState(null);
//   const [user, setUser] = useState({user_id:"",token:null});
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [isLoading, setIsLoading] = useState(true); // <== Add this

//   const router = useRouter();


//   // 🔐 Login
//   const login = ({ access="", refresh="" }) => {
//     localStorage.setItem("auth_token", access);
//     localStorage.setItem("refresh_token", refresh);
//     Cookies.set("auth_token", access, { expires: 2, secure: true, sameSite: "Lax" });
//     const decoded = decodeToken(access);
//       console.log("decoded",decoded);
//     setAccessToken(access);
//     setUser({user_id:"",token:decoded});
//     setIsAuthenticated(true);
//   };


//   // 🔄 Attempt to refresh token
//   const refreshAccessToken = useCallback(async () => {
//     const refreshToken = localStorage.getItem("refresh_token");
//     if (!refreshToken) {
//       logout();
//       return;
//     }

//     try {
//       const response = await apiClient.post("/api/token/refresh/", {
//         refresh: refreshToken,
//       });

//       const newToken = response.data.access || "";

//       localStorage.setItem("auth_token", newToken);
//       Cookies.set("auth_token", newToken, { expires: 2, secure: true, sameSite: "Lax" });
//       setAccessToken(newToken);
//       const decoded = decodeToken(newToken);


//       setUser({user_id:decoded.user_id,token:decoded});
//       setIsAuthenticated(true);
//     } catch (error) {
//       console.warn("Refresh token expired or invalid:", error);
//       logout();
//     }
//   }, []);



//   // 🚪 Logout
//   const logout = () => {
//     localStorage.removeItem("auth_token");
//     localStorage.removeItem("refresh_token");
//     Cookies.remove("auth_token");

//     setAccessToken(null);
//     setUser(null);
//     setIsAuthenticated(false);
//     router.push("/login");
//   };

//   // ⏱️ Auto-check token on mount
//   useEffect(() => {
//     const token = localStorage.getItem("auth_token") || "";

//     const decoded = decodeToken(token);
//   console.log("decoded2",decoded);
//     if (decoded) {
//       const isExpired = decoded.exp * 1000 < Date.now();
//       if (isExpired) {
//          refreshAccessToken().finally(() => {
//         setIsLoading(false);
//       });
//         refreshAccessToken(); // Try to refresh
//       } else {
//         setAccessToken(token);
//         setUser({user_id:decoded.user_id,token:decoded});
//         setIsAuthenticated(true);

//         // ⏱️ Auto-refresh a few seconds before expiry
//         const timeUntilExpiry = decoded.exp * 1000 - Date.now() - 5000; // refresh 5s before
//         const timer = setTimeout(() => {
//           refreshAccessToken();
//         }, timeUntilExpiry);
// setIsLoading(false); 
//         return () => clearTimeout(timer);
//       }
//     } else {
//       logout();
//       setIsLoading(false); 
//     }
//   }, [refreshAccessToken]);

//   return (
//     <AuthContext.Provider value={{ accessToken, user, isAuthenticated, login, logout,isLoading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // ✅ useAuth hook
// export const useAuth = () => {
//   return useContext(AuthContext);
// };
"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import apiClient from "@/utilities/apiClients";
import { useRouter } from "next/navigation";

// Create context
const AuthContext = createContext();

// Helper: Decode token safely
const decodeToken = (token = "") => {
  if (!token || typeof token !== "string" || token.split(".").length !== 3) {
    console.warn("Invalid token format, skipping decode.");
    return null;
  }

  try {
    return jwtDecode(token);
  } catch (err) {
    console.error("Token decode failed:", err);
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const userId = localStorage.getItem("user_id") || "";
  const router = useRouter();

  // 🔐 Login
  const login = ({ access = "", refresh = "" }) => {
    localStorage.setItem("auth_token", access);
    localStorage.setItem("refresh_token", refresh);

    Cookies.set("auth_token", access, { expires: 2, secure: true, sameSite: "Lax" });

    const decoded = decodeToken(access);
    if (decoded) {
      setAccessToken(access);
      setUser({ user_id: userId, email: decoded.email, token: decoded });
      setIsAuthenticated(true);
    }
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
    const token = localStorage.getItem("auth_token") || "";
    const decoded = decodeToken(token);

    if (decoded) {
      const isExpired = decoded.exp * 1000 < Date.now();
      if (isExpired) {

        logout();
      } else {
        setAccessToken(token);
        setUser({ user_id: userId, email: decoded.email, token: decoded });
        setIsAuthenticated(true);
      }
    } else {
      logout();
    }

    setIsLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        user,
        isAuthenticated,
        login,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ✅ useAuth hook
export const useAuth = () => useContext(AuthContext);
