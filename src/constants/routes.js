export const COMMON_ROUTES = {
  LOGIN: "/login",
  SIGNUP: "/signup",
  FORGOT_PASSWORD: "/forgot-password",
};

export const APP_ROUTES ={
  DASHBOARD: "/dashboard",
  PAGE: "/page",
  POST: "/post",
  CATEGORY: "/category",
  TAG: "/tag",
  USER: "/user",
  SETTINGS: "/settings",
  MEDIA: "/media",
  COMMENT: "/comment",
  PROFILE: "/profile",
}

export const LOGIN_PAGES = [COMMON_ROUTES.LOGIN, COMMON_ROUTES.SIGNUP];

export const PUBLIC_PAGES = [
  ...LOGIN_PAGES, // Allow login & signup as public
  "/page/[slug]", // Dynamic route
];
