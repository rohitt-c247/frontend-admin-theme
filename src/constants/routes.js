export const COMMON_ROUTES = {
  DASHBOARD: "/dashboard",
  LOGIN: "/login",
  SIGNUP: "/signup",
  FORGOT_PASSWORD: "/forgot-password",
};

export const LOGIN_PAGES = [COMMON_ROUTES.LOGIN, COMMON_ROUTES.SIGNUP];

export const PUBLIC_PAGES = [
  ...LOGIN_PAGES, // Allow login & signup as public
  "/page/[slug]", // Dynamic route
];
