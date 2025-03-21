"use client";

import dynamic from "next/dynamic";

const CreateUser = dynamic(() => import("../../../components/Users/CreateUser"), {
  ssr: false,
});

export default function CreateUserPage() {
  return (
    <>
      <CreateUser />
    </>
  );
}
