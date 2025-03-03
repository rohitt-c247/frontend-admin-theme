"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import "./page.module.css"

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log("token",token)
      router.push("/dashboard");
    }
    else{
      router.push("/login");
    }
  }, [router]);

  return (
    <>
      Redirecting....
    </>
  );
}
