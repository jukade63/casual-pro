'use client'
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/useModalStore";
import React from "react";
import { AddEducationForm } from "./AddEducationForm";

export default function AddEducation() {
    const { onOpen } = useModal();
    const handleOpenModal = () => {
      onOpen('update', {
          update: {
            jsx: <AddEducationForm/>
          }
      });
    };
  return <Button onClick={handleOpenModal}>Add Education</Button>;
}