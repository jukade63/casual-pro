"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useState, useTransition } from "react";
import { signIn } from "next-auth/react";
import ButtonLoading from "../ButtonLoading";
import { signInSchema } from "@/lib/schemas/sigin-schema";

export type FormFields = z.infer<typeof signInSchema>;

export function SignInForm() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const form = useForm<FormFields>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  function onSubmit(values: FormFields) {
    startTransition(async () => {
      try {
        const result = await signIn("email-password", {
          ...values,
          redirect: false,
        });
        if (result?.error === "CredentialsSignin") {
          setError("Invalid email or password. Please try again.");
        } else {
          router.push("/");
        }
      } catch (error) {
        setError("An unexpected error occurred.");
      }
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 min-w-[320px]"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="mail@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="********" {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-center">
          {isPending ? (
            <ButtonLoading />
          ) : (
            <Button type="submit" disabled={isPending}>
              Submit
            </Button>
          )}
        </div>
        {error && (
          <p className="text-red-500 text-xs bg-red-200 p-2 rounded-sm mb-2">
            {error}
          </p>
        )}
        <div className="text-center">
          <p className="text-sm">Haven't signed up yet? </p>
          <p
            onClick={() => router.push("/worker/sign-up")}
            className="text-blue-600 text-sm hover:underline hover:underline-offset-4 cursor-pointer mt-2"
          >
            Sign up as a worker
          </p>
          <p className="text-sm">or</p>
          <p
            onClick={() => router.push("/business/sign-up")}
            className="text-blue-600 text-sm hover:underline hover:underline-offset-4 cursor-pointer "
          >
            Sign up as a business
          </p>
        </div>
      </form>
    </Form>
  );
}
