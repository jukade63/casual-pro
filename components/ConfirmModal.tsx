import { useModal } from "@/hooks/useModalStore";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

export default function ConfirmModal() {
  const { toast } = useToast();
  const { data: { confirm } = {}, onClose, isOpen, type } = useModal();
  const isModalOpen = isOpen && type === "confirm";
  const handleConfirm = async () => {
    if (confirm) {
      try {
        const res = await confirm.action;
        confirm.onConfirm();
        if (res) {
          toast({
            title: "Success",
            description: res.message,
            variant: "success",
          });
        }
        onClose();
      } catch (error) {
        if (error instanceof Error) {
          toast({
            title: "Error",
            description: error.message,
            variant: "error",
          });
        }
      }
    }
  };
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogDescription>{confirm?.message}</DialogDescription>
        </DialogHeader>
        <div className="mt-8 flex justify-center gap-2">
          <Button
            type="submit"
            variant="outline"
            onClick={onClose}
            className="md:mr-auto"
          >
            Cancel
          </Button>
          <Button type="submit" variant="destructive" onClick={handleConfirm}>
            Yes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
