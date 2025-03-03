"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation"; // Updated import
import useAuth from "@/hooks/useAuth";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return <p>Loading...</p>; // ✅ Show a loading indicator instead of returning null
  }

  return isAuthenticated ? children : null;
};

export default ProtectedRoute;
