"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm, yupResolver } from '@mantine/form';
import { toast } from "react-toastify";

import { studentService } from "@/services/student-service";
import { userCreateValidationSchema, userEditValidationSchema } from "@/constants/validationSchema/user";
import { messageHandler } from "@/constants/messageHandler"; // Add this or define it

export function useStudentRegister() {
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const router = useRouter();
  const params = useParams();
  const studentId = params?.id;

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      gender: "",
      dob: "",
      status: "0"
    },
    validate: yupResolver(isEditMode ?  userEditValidationSchema : userCreateValidationSchema),
    transformValues: (values) => ({
      ...values,
      phoneNumber: values.phoneNumber.toString(),
    }),
  });

  // Fetch student data if ID is present
  useEffect(() => {
    if (studentId) {
      setIsEditMode(true);
      fetchStudentData(studentId);
    }
  }, [studentId]);

  const fetchStudentData = async (id) => {
    setFetchLoading(true);
    try {
      const res = await studentService.getStudentById(id);
      if (res && res.success && res.data) {
        // Format the data for the form
        const studentData = res.data;
        console.log(studentData,"studentData");
        form.setValues({
          name: studentData.name || "",
          email: studentData.email || "",
          phoneNumber: studentData.phoneNumber || "",
          gender: studentData.gender || "",
          dob: studentData.dob ? new Date(studentData.dob) : null,
          status: studentData.status.toString() || "0",
          // Skip password fields for edit mode
          password: "",
          confirmPassword: ""
        });
        setFetchLoading(false);
      } else {
        setFetchLoading(false);
        toast.error(res?.message || "Failed to fetch student data");
        router.push("/student");
      }
    } catch (error) {
      setFetchLoading(false);
      console.error(error);
      toast.error(error.message || "An error occurred while fetching student data");
      router.push("/student");
    }
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    const { confirmPassword, ...payload } = values;
    
    // Convert status to integer
    payload.status = parseInt(payload.status, 10);
    
    // Remove password if it's empty in edit mode
    if (isEditMode && !payload.password) {
      delete payload.password;
    }

    try {
      let res;
      
      if (isEditMode) {
        res = await studentService.updateStudent(studentId, payload);
      } else {
        res = await studentService.studentRegister(payload);
      }

      if (res && res.success) {
        setLoading(false);
        const successMessage = isEditMode 
          ? (res.message || "Student updated successfully") 
          : (res.message || messageHandler.SIGNUP_SUCCESS);
        
        toast.success(successMessage);
        router.push("/student");
        form.reset();
      } else {
        setLoading(false);
        const errorMessage = isEditMode
          ? (res?.message || "Failed to update student")
          : (res?.message || messageHandler.SIGNUP_FAILED);
        
        toast.error(errorMessage);
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      const errorMessage = isEditMode
        ? (error.message || "An error occurred while updating student")
        : (error.message || messageHandler.SIGNUP_FAILED);
      
      toast.error(errorMessage);
    }
  };

  return {
    form,
    loading,
    fetchLoading,
    isEditMode,
    handleSubmit,
  };
}