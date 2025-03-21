"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { studentService } from "@/services/student-service";

export function useStudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [paginationParams, setPaginationParams] = useState({
    page: 1,
    limit: 10,
    total: 0
  });
  const router = useRouter();

  // Fetch students on initial load and when pagination changes
  useEffect(() => {
    fetchStudents();
  }, [paginationParams.page, paginationParams.limit]);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const { page, limit } = paginationParams;
      const res = await studentService.getAllStudents({ page, limit });
      
      if (res && res.success) {
        setStudents(res.data.users || []);
        setPaginationParams(prev => ({
          ...prev,
          total: res.data.total || 0
        }));
      } else {
        toast.error(res?.message || "Failed to fetch students");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "An error occurred while fetching students");
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    setPaginationParams(prev => ({
      ...prev,
      page: newPage
    }));
  };

  const handleLimitChange = (newLimit) => {
    setPaginationParams(prev => ({
      ...prev,
      limit: newLimit,
      page: 1 // Reset to first page when changing limit
    }));
  };

  const handleEdit = (studentId) => {
    router.push(`/student/${studentId}/edit`);
  };

  const handleView = (studentId) => {
    router.push(`/student/${studentId}`);
  };

  const handleDelete = async (studentId) => {
    setDeleteLoading(true);
    setDeletingId(studentId);
    
    try {
      const res = await studentService.deleteStudent(studentId);
      
      if (res && res.success) {
        toast.success(res.message || "Student deleted successfully");
        // Refresh student list
        fetchStudents();
      } else {
        toast.error(res?.message || "Failed to delete student");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "An error occurred while deleting student");
    } finally {
      setDeleteLoading(false);
      setDeletingId(null);
    }
  };

  const handleAddNew = () => {
    router.push("/student/register");
  };

  return {
    students,
    loading,
    deleteLoading,
    deletingId,
    paginationParams,
    handlePageChange,
    handleLimitChange,
    handleEdit,
    handleView,
    handleDelete,
    handleAddNew
  };
}