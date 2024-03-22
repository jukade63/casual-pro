import BasicInfo from "@/components/BasicInfo";
import { ProfileTabs } from "@/components/worker/profile/ProfileTabs";
import React, { Suspense } from "react";

const Profile = () => {
  return (
    <>
      <h1 className="font-bold text-2xl">Profile</h1>
      <BasicInfo />
      <div className="mt-2">
        <ProfileTabs />
      </div>
    </>
  );
};

export default Profile;
