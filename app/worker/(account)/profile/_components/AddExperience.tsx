'use client'
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/useModalStore";
import React from "react";
import { AddExperienceForm } from "./AddExperienceForm";

export default function AddExperience() {
    const { onOpen } = useModal();
    const handleOpenModal = () => {
      onOpen('update', {
          update: {
            jsx: <AddExperienceForm/>
          }
      });
    };
  return <Button onClick={handleOpenModal}>Add Experience</Button>;
}
