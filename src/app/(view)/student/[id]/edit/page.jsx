"use client";

import StudentRegisterView from "../../register/StudentRegisterView";
import { useStudentRegister } from "../../register/useStudentRegister";
import "react-toastify/dist/ReactToastify.css";

// This component reuses the same view and hook for editing
export default function EditStudent() {
  const { form, loading, fetchLoading, isEditMode, handleSubmit } = useStudentRegister();

  return (
    <StudentRegisterView 
      form={form}
      loading={loading}
      fetchLoading={fetchLoading}
      isEditMode={isEditMode}
      handleSubmit={handleSubmit}
    />
  );
}