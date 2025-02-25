import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { PUBLIC_PAGES, COMMON_ROUTES } from "../constants/routes"; // Import routes

export default function useAuth() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const isPublicPage = PUBLIC_PAGES.includes(pathname);

    if (!token && !isPublicPage) {
      // Redirect unauthenticated users to login
      router.push(COMMON_ROUTES.LOGIN);
    } else if (token && isPublicPage) {
      // Redirect authenticated users away from login/signup to dashboard
      router.push(COMMON_ROUTES.DASHBOARD);
    }
  }, [router, pathname]);

  return {
    isPublicPage: PUBLIC_PAGES.includes(pathname),
  };
}
