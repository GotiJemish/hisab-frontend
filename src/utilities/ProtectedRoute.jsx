"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const ProtectedRoute = ({ children, fallback = null }) => {
  const { isAuthenticated, accessToken } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If not authenticated, redirect to login
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    // Optional fallback: could be a spinner or null
    return fallback || (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-gray-500 text-sm">Checking authentication...</p>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
