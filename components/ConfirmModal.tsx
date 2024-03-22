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
import { Loader2 } from "lucide-react";


export default function ConfirmModal() {
  const { toast } = useToast();
  const { data: { confirm } = {}, onClose, isOpen, type } = useModal();
  const isModalOpen = isOpen && type === "confirm";
  const [submitting, setSubmitting] = React.useState(false);
  const handleConfirm = async () => {
    if (confirm && confirm.action) {
      try {
        setSubmitting(true); 
        await confirm.action();
        toast({
          title: "Success",
          description: "Deletion successful",
          variant: "success",
        });
        onClose();
      } catch (error) {
        toast({
          title: "Error",
          description: "Deletion failed",
          variant: "error",
        });
      } finally {
        setSubmitting(false); 
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
          <Button type="submit" variant="destructive" onClick={handleConfirm} disabled={submitting}>
            {submitting ? <Loader2 /> : "Delete"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
