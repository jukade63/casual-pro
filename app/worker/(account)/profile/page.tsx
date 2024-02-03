import { EditProfileModal } from "@/components/worker/EditProfileModal";
import Education from "@/components/worker/profile/Education";
import Experience from "@/components/worker/profile/Experience";
import General from "@/components/worker/profile/General";
import { ProfileTabs } from "@/components/worker/profile/ProfileTabs";
import Skills from "@/components/worker/profile/Skills";
import React from "react";

const Profile = () => {
  return (
    <>
      <h1>Profile</h1>
      <div className="p-6 bg-[#f7c657] rounded-md mt-12">
        <General />
      </div>
      <div className="mt-2">
        <ProfileTabs />
      </div>
    </>
  );
};

export default Profile;
