"use client";

import Cookies from "js-cookie";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";




const MainLayout = ({ children }) => {

  useEffect(() => {
     const cookieToken = Cookies.get("auth_token");
    const localToken = localStorage.getItem("auth_token");


    // Only proceed if there's a token in cookies and not in localStorage
    if (cookieToken && !localToken) {
      try {
        const decoded = jwtDecode(cookieToken);

        const isExpired = decoded?.exp ? Date.now() >= decoded.exp * 1000 : false;

        if (!isExpired) {
          localStorage.setItem("auth_token", cookieToken);
          console.log("Valid token restored to localStorage from cookie.");
        } else {
          Cookies.remove("auth_token");
          console.log("Expired token removed from cookies.");
        }
      } catch (err) {
        console.error("Invalid token found in cookie:", err);
        Cookies.remove("auth_token");
      }
    }
  }, []);

  return <>{children}</>;
};

export default MainLayout;
