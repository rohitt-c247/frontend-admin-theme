"use client";

import StudentDetailView from "./StudentDetailView";
import { useStudentDetail } from "./useStudentDetail";
import "react-toastify/dist/ReactToastify.css";

export default function StudentDetail() {
  const { student, loading, handleEdit, handleBack } = useStudentDetail();

  return (
    <StudentDetailView
      student={student}
      loading={loading}
      handleEdit={handleEdit}
      handleBack={handleBack}
    />
  );
}