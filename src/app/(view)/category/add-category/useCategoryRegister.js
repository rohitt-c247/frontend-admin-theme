"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm, yupResolver } from '@mantine/form';
import { toast } from "react-toastify";

// You'll need to create a category service similar to studentService
import { categoryService } from "@/services/category-service";

import { categoryValidationSchema } from "@constants/categoryValidationSchema";


export function useCategoryRegister() {
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const router = useRouter();
  const params = useParams();
  const categoryId = params?.id;

  const form = useForm({
    initialValues: {
      categoryName: "",
      categoryType: "",
      status: "1"
    },
    validate: yupResolver(categoryValidationSchema),
  });

  // Fetch category data if ID is present
  useEffect(() => {
    if (categoryId) {
      setIsEditMode(true);
      fetchCategoryData(categoryId);
    }
  }, [categoryId]);

  const fetchCategoryData = async (id) => {
    setFetchLoading(true);
    try {
      const res = await categoryService.getCategoryById(id);
      if (res && res.success && res.data) {
        // Format the data for the form
        const categoryData = res.data;
        form.setValues({
          categoryName: categoryData.categoryName || "",
          categoryType: categoryData.categoryType || "",
          status: categoryData.status.toString() || "1",
        });
        setFetchLoading(false);
      } else {
        setFetchLoading(false);
        toast.error(res?.message || "Failed to fetch category data");
        router.push("/category");
      }
    } catch (error) {
      setFetchLoading(false);
      console.error(error);
      toast.error(error.message || "An error occurred while fetching category data");
      router.push("/category");
    }
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    
    // Convert status to integer
    const payload = {
      ...values,
      status: parseInt(values.status, 10)
    };
    
    try {
      let res;
      
      if (isEditMode) {
        res = await categoryService.updateCategory(categoryId, payload);
      } else {
        res = await categoryService.createCategory(payload);
      }

      if (res && res.success) {
        setLoading(false);
        const successMessage = isEditMode 
          ? (res.message || "Category updated successfully") 
          : (res.message || "Category created successfully");
        
        toast.success(successMessage);
        router.push("/category");
        form.reset();
      } else {
        setLoading(false);
        const errorMessage = isEditMode
          ? (res?.message || "Failed to update category")
          : (res?.message || "Failed to create category");
        
        toast.error(errorMessage);
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      const errorMessage = isEditMode
        ? (error.message || "An error occurred while updating category")
        : (error.message || "An error occurred while creating category");
      
      toast.error(errorMessage);
    }
  };

  const handleBack = () => {
    router.push("/category");
  };

  return {
    form,
    loading,
    fetchLoading,
    isEditMode,
    handleSubmit,
    handleBack
  };
}