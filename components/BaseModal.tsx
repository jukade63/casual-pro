"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction, useEffect } from "react";

interface ModalProps {
  trigger: string;
  title: string;
  description?: string;
  isOpen: boolean;
  onClose: () => void;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  children?: React.ReactNode;
}

export const BaseModal: React.FC<ModalProps> = ({
  trigger,
  title,
  isOpen,
  onClose,
  setIsOpen,
  children,
}) => {
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };


  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogTrigger asChild>
        <Button className="" onClick={() => setIsOpen(true)}>
          {trigger}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};
