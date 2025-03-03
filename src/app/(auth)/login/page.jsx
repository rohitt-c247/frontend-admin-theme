"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LoginPage = dynamic(() => import("../../../components/Auth/Login"), {
  ssr: false,
});

export default function Login() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/dashboard");
    }
  }, [router]);

  return (
    <>
      <LoginPage />
    </>
  );
}
