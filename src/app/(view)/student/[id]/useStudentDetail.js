"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "react-toastify";

import { studentService } from "@/services/student-service";

export function useStudentDetail() {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const params = useParams();
  const studentId = params?.id;

  useEffect(() => {
    if (studentId) {
      fetchStudentData(studentId);
    }
  }, [studentId]);

  const fetchStudentData = async (id) => {
    setLoading(true);
    try {
      const res = await studentService.getStudentById(id);
      if (res && res.success && res.data) {
        setStudent(res.data);
      } else {
        toast.error(res?.message || "Failed to fetch student data");
        router.push("/student");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "An error occurred while fetching student data");
      router.push("/student");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    router.push(`/student/${studentId}/edit`);
  };

  const handleBack = () => {
    router.push("/student");
  };

  return {
    student,
    loading,
    handleEdit,
    handleBack
  };
}