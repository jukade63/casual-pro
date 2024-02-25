import General from "@/components/BasicInfo";
import { ProfileTabs } from "@/components/worker/profile/ProfileTabs";
import React, { Suspense } from "react";

const Profile = () => {
  return (
    <>
      <h1>Profile</h1>
      <div className="p-6 bg-[#f7c657] rounded-md mt-12">
          <General />
      </div>
      <div className="mt-2"><ProfileTabs /></div> 
    </>
  );
};

export default Profile;
