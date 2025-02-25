"use client";

import dynamic from "next/dynamic";

const UsersListPage = dynamic(
  () => import("../../components/Users/UsersList"),
  {
    ssr: false,
  }
);

export default function UsersList() {
  return (
    <>
      <UsersListPage />
    </>
  );
}
