"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useModal } from "@/hooks/useModalStore";


export default function ModalOne() {
  const { isOpen, onClose, type, data } = useModal();
  const isModalOpen = isOpen && type === "modalOne";
  const handleClose = () => {
      onClose();
    }
  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>  
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="bg-red-500">Modal One</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 
