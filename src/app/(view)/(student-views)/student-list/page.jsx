"use client";

import dynamic from "next/dynamic";

const StudentList = dynamic(() => import("@/components/Student/StudentList"), {
  ssr: false,
});

export default function StudentListPage() {
  return (
    <>
      <StudentList />
    </>
  );
}
