"use client";

import dynamic from "next/dynamic";

const LoginPage = dynamic(() => import("../../components/Auth/Login"), {
  ssr: false,
});

export default function Login() {
  return (
    <>
      <LoginPage />
    </>
  );
}
