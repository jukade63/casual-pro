"use client";

import { BaseModal } from "@/components/BaseModal";
import { AddNewEducationForm } from "./forms/AddNewEducationForm";
import { useState } from "react";

export const AddNewEducationModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const onClose = () => setIsOpen(false);
  return (
    <BaseModal
      title="New Education"
      isOpen={isOpen}
      onClose={onClose}
      setIsOpen={setIsOpen}
    >
      <AddNewEducationForm setIsOpen={setIsOpen}/>
    </BaseModal>
  );
};
