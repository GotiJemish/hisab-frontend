"use client";

import { useAuth } from "@/context/AuthContext";
import { useSidebar } from "@/context/SidebarContext";
import React, { useEffect, useState } from "react";
import AppSidebar from "./AppSidebar";
import Backdrop from "./Backdrop";
import AppHeader from "./AppHeader";
import { notFound, useRouter } from "next/navigation";
import ProtectedRoute from "@/utilities/ProtectedRoute";

export default function AdminLayout({children,id}) {
    const router = useRouter();
      const [allowed, setAllowed] = useState(false);
        const { user, isAuthenticated, isLoading } = useAuth();
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  // Dynamic class for main content margin based on sidebar state
  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
    ? "lg:ml-[290px]"
    : "lg:ml-[90px]";
  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.replace("/login");
      } else if (user?.user_id !== id) {
        // 🚫 not your page → show 404
       notFound();
      } else {
        setAllowed(true);
      }
    }
  }, [isAuthenticated, isLoading, user, id, router]);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-gray-500 text-sm">Checking authentication...</p>
      </div>
    );
  }
  return allowed ? (
    <ProtectedRoute>
    <div className="min-h-screen xl:flex">
      {/* Sidebar and Backdrop */}
      <AppSidebar />
      <Backdrop />
      {/* Main Content Area */}
      <div
        className={`flex-1 transition-all  duration-300 ease-in-out ${mainContentMargin}`}
      >
        {/* Header */}
        <AppHeader />
        {/* Page Content */}
        <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">{children}</div>
      </div>
    </div>
    </ProtectedRoute>
  ) : null;
}
