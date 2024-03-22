"use client";
import { AddNewEducationModal } from "@/components/worker/profile/AddNewEducationModal";
import React, { useEffect, useState } from "react";
import EditProfileModal from "@/components/worker/profile/EditProfileModal";
import ConfirmModal from "@/components/ConfirmModal";
import UpdateDataModal from "@/components/UpdateDataModal";

export default function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <EditProfileModal />
      <ConfirmModal/>
      <UpdateDataModal/>
    </>
  );
}
