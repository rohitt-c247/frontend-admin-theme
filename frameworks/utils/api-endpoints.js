const BASE_URL = "http://localhost:8000/api/v1";

export const API_ENDPOINTS = {
  BASE_URL,
  LOGIN: `${BASE_URL}/auth/login`,
  REGISTER: `${BASE_URL}/auth/register`,
  PROFILE: `${BASE_URL}/auth/me`,
  UPDATE_PROFILE: `${BASE_URL}/auth/update-profile`,
  LOGOUT: `${BASE_URL}/auth/logout`,
  CHANGE_PASSWORD: `${BASE_URL}/auth/change-password`,
  USER_LIST: `${BASE_URL}/user`,
};
