"use client";

import dynamic from "next/dynamic";

const UserListPage = dynamic(() => import("../../../components/Users/UsertList"), {
  ssr: false,
});

export default function UsersList() {
  return (
    <>
      <UserListPage />
    </>
  );
}
