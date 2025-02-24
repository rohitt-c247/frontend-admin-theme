"use client";

import dynamic from "next/dynamic";

const UserListPage = dynamic(() => import("../../components/Auth/Users"), {
  ssr: false,
});

export default function UsersList() {
  return (
    <>
      <UserListPage />
    </>
  );
}
