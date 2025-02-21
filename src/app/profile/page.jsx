"use client";

import dynamic from "next/dynamic";

const ProfilePage = dynamic(() => import("../../components/Auth/Profile"), {
  ssr: false,
});

export default function Profile() {
  return (
    <>
      <ProfilePage />
    </>
  );
}
