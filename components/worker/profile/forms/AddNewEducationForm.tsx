"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Dispatch, SetStateAction, useState, useTransition } from "react";

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
import { useRouter } from "next/navigation";

const formSchema = z.object({
  institution: z.string().min(1),
  degree: z.string().min(1),
  major: z.string().min(1),
  gradDate: z.string().min(1),
});

interface AddNewEducationFormProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export function AddNewEducationForm({ setIsOpen }: AddNewEducationFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

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
        setIsOpen(false);
        startTransition(() => {
          // Refresh the current route and fetch new data
          // from the server without losing
          // client-side browser or React state.
          router.refresh();
        });
      } else {
        setSubmitError("An unexpected error occurred.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
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
                    onClick={() => setIsOpen(false)}
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
  );
}
