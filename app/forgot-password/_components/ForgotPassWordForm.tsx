"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTransition } from "react";
import ButtonLoading from "@/components/ButtonLoading";
import { Mail } from "lucide-react";
import { sendForgetPasswordEmail } from "@/actions/forget-password";
import { useToast } from "@/components/ui/use-toast";

const FormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Please enter your email" })
    .email({ message: "Invalid email address" }),
});

type FormFields = z.infer<typeof FormSchema>;

export function ForgotPasswordForm() {
    const {toast} = useToast()
  const [isPending, startTransition] = useTransition();
  const form = useForm<FormFields>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });
  function onSubmit(values: FormFields) {
    startTransition(async () => {
      try {
        await sendForgetPasswordEmail(values.email);
        toast({
          title: "Email sent",
          description: "Please check your email for the password reset link",
          variant: "success",
        })
      } catch (error) {
        if (error instanceof Error) {
            toast({
                title: "Failed to send reset password link",
                description: error.message,
                variant: "error",
              })
        }
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 ">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  startIcon={Mail}
                  placeholder="email@example.com"
                />
              </FormControl>
              <FormMessage className="text-red-700 text-md" />
            </FormItem>
          )}
        />
        <div className="flex justify-center">
          {isPending ? (
            <ButtonLoading />
          ) : (
            <Button type="submit" disabled={isPending} className="w-1/2">
              Submit
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}






