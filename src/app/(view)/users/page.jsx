"use client";

import dynamic from "next/dynamic";

const UserListPage = dynamic(() => import("../../../components/Users/UsersList"), {
  ssr: false,
});

export default function UsersList() {
  return (
    <>
      <UserListPage />
    </>
  );
}
