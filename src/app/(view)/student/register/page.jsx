"use client";

import StudentRegisterView from "./StudentRegisterView";
import { useStudentRegister } from "./useStudentRegister";
import "react-toastify/dist/ReactToastify.css";

export default function StudentRegister() {
  const { form, loading, handleSubmit } = useStudentRegister();

  return (
    <StudentRegisterView 
      form={form}
      loading={loading}
      handleSubmit={handleSubmit}
    />
  );
}