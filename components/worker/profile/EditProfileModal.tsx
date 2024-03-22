"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { useModal } from "@/hooks/useModalStore";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ButtonLoading from "@/components/ButtonLoading";
import { useSession } from "next-auth/react";

export default function EditProfileModal() {
  const { isOpen, onClose, type, data } = useModal();
  const { update } = useSession();
  const router = useRouter();
  const [submitError, setSubmitError] = useState("");
  const session = data?.session

  const isModalOpen = isOpen && type === "editProfile";

  const formSchema = z.object({
    username: z.string().min(1),
    email: z
      .string()
      .min(1)
      .email({ message: "Please enter a valid email address." }),
    phoneNumber: z.string().min(1),
    imgUrl: z.string()
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      phoneNumber: "",
      imgUrl: "",
    },
  });

  useEffect(() => {
    if (session) {
      form.setValue("username", session.user.username);
      form.setValue("email", session.user.email);
      form.setValue("phoneNumber", session.user.phoneNumber);
      form.setValue("imgUrl", session.user.imgUrl);
    }
  }, [session, form.setValue]);

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    
    try {
      const res = await fetch(`${BACKEND_URL}/user`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify({
          ...values,
          id: session?.user.id,
          publicId: session?.user.publicId,
        }),
      });
      const data = await res.json();

      if (res.ok) {
        await update({
          ...session,
          user: data,
        });
        router.refresh();
        onClose();
      } else {
        setSubmitError("An unexpected error occurred.");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleClose = () => {
    onClose();
  };

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          form.setValue("imgUrl", reader.result as string);
          console.log(reader.result);
          
        }
      }
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="imgUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Change Profile Picture</FormLabel>
                  <FormControl>
                    <Input {...field} type="file" onChange={onImageChange} value={undefined} className="cursor-pointer"/>
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
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild></DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
