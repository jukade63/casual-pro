import { EditProfileModal } from "@/components/worker/EditProfileModal";
import React from "react";

const Profile = () => {
  return (
    <>
      <h1>Worker Profile</h1>
      <div className="max-w-2xl mx-auto mt-6 mb-4 p-6 bg-white shadow-md rounded-md">
        <div className="mb-4">
          <img alt="Profile" className="rounded-full w-32 h-32 object-cover" />
        </div>
        <div className="mb-2 font-semibold">Username: username</div>
        <div className="mb-2 font-semibold">Email: email</div>
        <div className="mb-2 font-semibold">Phone Number: phoneNumber</div>
        <div className="mb-2 font-semibold">Address: address</div>
        <div className="mb-2 font-semibold">
          Available date: availableWorkTime
        </div>
      </div>
      <div suppressHydrationWarning={true} className="w-full text-center" >
        <EditProfileModal/>
      </div>
    </>
  );
};

export default Profile;
