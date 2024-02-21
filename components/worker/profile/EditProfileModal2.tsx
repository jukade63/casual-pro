"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/useModalStore";

import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { BACKEND_URL } from "@/lib/constants";
import { useSession } from "next-auth/react";
import ButtonLoading from "@/components/ButtonLoading";

export const EditProfileModal2 = () => {
  const router = useRouter();
  const { isOpen, onClose, type } = useModal();
  
  const formSchema = z.object({
    username: z.string().min(1),
    email: z.string().min(1),
    phoneNumber: z.string().min(1),
    imgUrl: z.string().min(1),
  });
  const isModalOpen = isOpen && type === "editProfile";

  const [isPending, startTransition] = useTransition();

  const { data: session } = useSession();
  const [submitError, setSubmitError] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      phoneNumber: "",
      imgUrl: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      form.setValue("imgUrl", URL.createObjectURL(file));
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await fetch(`${BACKEND_URL}/users`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify({ ...values, userId: session?.user?.id }),
      });
      if (res.ok) {
        onClose();
        startTransition(() => {
          router.refresh();
        });
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
          <DialogTitle>Edit profile</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2 pb-4">
          <div className="space-y-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="imgUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          type="file"
                          onChange={onImageChange}
                        />
                        {form.getValues("imgUrl") && (
                          <img
                            src={form.getValues("imgUrl")}
                            alt="Selected image"
                          />
                        )}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="name..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input {...field} />
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
                        onClick={handleClose}
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
