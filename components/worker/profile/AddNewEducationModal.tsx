"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState} from "react";

import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { BACKEND_URL } from "@/lib/constants";
import { useSession } from "next-auth/react";
import ButtonLoading from "@/components/ButtonLoading";

const formSchema = z.object({
  institution: z.string().min(1),
  degree: z.string().min(1),
  major: z.string().min(1),
  gradDate: z.string().min(1),
});

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/useModalStore";
import { useEducation } from "@/hooks/useEducation";

export const AddNewEducationModal = () => {
  const {addEducation} = useEducation()
  const { isOpen, onClose, type } = useModal();
  const isModalOpen = isOpen && type === "addEducation";

  const { data: session } = useSession();
  const [submitError, setSubmitError] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      institution: "",
      degree: "",
      gradDate: "",
      major: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await fetch(`${BACKEND_URL}/education`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify({ ...values, userId: session?.user?.id }),
      });
      if (res.ok) {
        addEducation(await res.json());
        form.reset()
        onClose();
      
      } else {
        setSubmitError("An unexpected error occurred.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Education</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2 pb-4">
          <div className="space-y-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="institution"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Institute</FormLabel>
                      <FormControl>
                        <Input placeholder="name..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="degree"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Degree </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="major"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Major</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="gradDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Graduate year</FormLabel>
                      <FormControl>
                        <Input {...field} type="date" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {submitError && <p className="text-red-500">{submitError}</p>}
                <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                  {isLoading ? (
                    <ButtonLoading />
                  ) : (
                    <>
                      <Button
                        variant="destructive"
                        className="border-1"
                        onClick={() => onClose()}
                      >
                        Cancel
                      </Button>
                      <Button type="submit" disabled={isLoading}>
                        Save
                      </Button>
                    </>
                  )}
                </div>
              </form>
            </Form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
