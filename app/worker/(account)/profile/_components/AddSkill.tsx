'use client'
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/useModalStore";
import React from "react";
import { AddSkillForm } from "./AddSkillForm";

export default function AddSkill() {
    const { onOpen } = useModal();
    const handleOpenModal = () => {
      onOpen('update', {
          update: {
            jsx: <AddSkillForm/>
          }
      });
    };
  return <Button onClick={handleOpenModal}>Add Skill</Button>;
}