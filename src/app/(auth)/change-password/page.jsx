"use client";

import dynamic from "next/dynamic";

const ChangePasswordPage = dynamic(
  () => import("../../../components/Auth/ChangePassword"),
  {
    ssr: false,
  }
);

export default function Login() {
  return (
    <>
      <ChangePasswordPage />
    </>
  );
}
