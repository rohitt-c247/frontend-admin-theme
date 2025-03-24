"use client";

import { useParams } from "next/navigation";

// import CategoryRegisterView from "../add-category/CategoryRegisterView";
// import { useStudentDetail } from "./useStudentDetail";
// import "react-toastify/dist/ReactToastify.css";

export default function StudentDetail() {

  const params = useParams();
  const cartegoryId = params?.id;
  return (
    <>
      {cartegoryId}
    </>
  );
}