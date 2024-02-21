"use client";
import { AddNewEducationModal } from "@/components/worker/profile/AddNewEducationModal";
import ModalOne from "@/components/worker/profile/ModalOne";
import ModalTwo from "@/components/worker/profile/EditProfileModal";
import React, { useEffect, useState } from "react";
import EditProfileModal from "@/components/worker/profile/EditProfileModal";

export default function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <AddNewEducationModal />
      <EditProfileModal />
      <ModalOne />
      <ModalTwo />
    </>
  );
}
