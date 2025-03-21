"use client";

import dynamic from "next/dynamic";

const StudentRegister = dynamic(() => import("@/components/Student/StudentRegister"), {
  ssr: false,
});

export default function CreateStudentPage() {
  return (
    <>
      <StudentRegister />
    </>
  );
}
