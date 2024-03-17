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
import { KeyRound, Mail } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { resetPassword } from "@/actions/resetPassword";
import { useSearchParams } from "next/navigation";

const FormSchema = z
  .object({
    password: z.string().min(1, { message: "Please enter your password" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Please confirm your password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

  type FormFields = z.infer<typeof FormSchema>;

export function ResetPasswordForm() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const form = useForm<FormFields>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  function onSubmit(values: FormFields) {
    startTransition(async () => {
      try {
        await resetPassword(values.password, token);
        toast({
          title: "Password reset",
          description: "Try logging in with your new password",
          variant: "success",
        });
      } catch (error) {
        if (error instanceof Error) {
          toast({
            title: "Failed to reset password",
            description: error.message,
            variant: "error",
          });
        }
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 ">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  startIcon={KeyRound}
                  placeholder="email@example.com"
                />
              </FormControl>
              <FormMessage className="text-red-700 text-md" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  startIcon={KeyRound}
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
