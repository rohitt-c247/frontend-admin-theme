"use client";

import CategoryRegisterView from "./CategoryRegisterView";
import { useCategoryRegister } from "./useCategoryRegister";
import "react-toastify/dist/ReactToastify.css";

export default function CategoryRegister() {
  const { 
    form, 
    loading, 
    fetchLoading, 
    isEditMode, 
    handleSubmit, 
    handleEdit,
    handleBack 
  } = useCategoryRegister();

  return (
    <CategoryRegisterView 
      form={form}
      loading={loading}
      fetchLoading={fetchLoading}
      isEditMode={isEditMode}
      handleSubmit={handleSubmit}
      handleBack={handleBack}
      handleEdit={handleEdit}
    />
  );
}