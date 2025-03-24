"use client";

import CategoryRegisterView from "../../add-category/CategoryRegisterView";
import { useCategoryRegister } from "../../add-category/useCategoryRegister";

// This component reuses the same view and hook for editing
export default function EditStudent() {
  const { form, loading, fetchLoading, isEditMode, handleSubmit } = useCategoryRegister();

  return (
    <CategoryRegisterView 
      form={form}
      loading={loading}
      fetchLoading={fetchLoading}
      isEditMode={isEditMode}
      handleSubmit={handleSubmit}
    />
  );
}