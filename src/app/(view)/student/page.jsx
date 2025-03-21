"use client";

import StudentListView from "./StudentListView";
import { useStudentList } from "./useStudentList";
import "react-toastify/dist/ReactToastify.css";

export default function StudentList() {
  const {
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
  } = useStudentList();

  return (
    <StudentListView
      students={students}
      loading={loading}
      deleteLoading={deleteLoading}
      deletingId={deletingId}
      paginationParams={paginationParams}
      handlePageChange={handlePageChange}
      handleLimitChange={handleLimitChange}
      handleEdit={handleEdit}
      handleView={handleView}
      handleDelete={handleDelete}
      handleAddNew={handleAddNew}
    />
  );
}