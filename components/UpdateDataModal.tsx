import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "./ui/dialog";
import { useModal } from "@/hooks/useModalStore";

export default function UpdateDataModal() {
  const { data: { update } = {}, onClose, isOpen, type } = useModal();
  const isModalOpen = isOpen && type === "update";
const handleClose = () => {
  onClose();
}

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogDescription>{update?.jsx}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
