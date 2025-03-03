"use client"; // ✅ Required for hooks using state/context

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import http from "@/frameworks/utils/http";
import { PUBLIC_PAGES, COMMON_ROUTES, APP_ROUTES } from "../constants/routes"; // Import routes
import { API_ENDPOINTS } from "../frameworks/utils/api-endpoints"; // Import API endpoints

export default function useAuth() {
  const router = useRouter();
  const [pathname, setPathname] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setPathname(window.location.pathname);
  }, []);

  // useEffect(() => {
  //   if (!pathname) return;

  //   const token = localStorage.getItem("token");
  //   const isPublicPage = PUBLIC_PAGES.includes(pathname);

  //   if (!token && !isPublicPage) {
  //     // Redirect unauthenticated users to the login page
  //     router.push("/login");
  //   } else if (token && !isPublicPage) {
  //     // Redirect authenticated users away from login/signup to dashboard
  //     router.push(COMMON_ROUTES.DASHBOARD);
  //   }

  //   setIsAuthenticated(!!token);
  //   setLoading(false);
  // }, [router, pathname]);

  const login = async (email, password) => {
    setError("");
    
    try {
      setLoading(true);
      const response = await http.post(API_ENDPOINTS.LOGIN, { email, password });

      if (response.data.success) {
        console.log(response,"response")
        localStorage.setItem("token", response.data.data.token); // Store the token in local storage
        setIsAuthenticated(true);
        router.push(APP_ROUTES.DASHBOARD); // Redirect to dashboard page after successful login
      } else {
        setError("Invalid credentials");
      }
    } catch (error) {
      setError("An error occurred during login");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token"); // Remove the token from local storage
    setIsAuthenticated(false);
    router.push(COMMON_ROUTES.LOGIN); // Redirect to login page after logout
  };

  return {
    isPublicPage: PUBLIC_PAGES.includes(pathname),
    isAuthenticated,
    login,
    logout,
    loading,
    error,
  };
}
