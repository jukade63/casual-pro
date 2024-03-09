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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React, { useState, useTransition } from "react";
import { SignupSchema } from "@/lib/schemas/signup-schema";
import { useFormState } from "react-dom";
import { signUpWorkerAction } from "@/lib/api-requests/create-user";

export type FormFields = z.infer<typeof SignupSchema>;

export function SignUpForm() {
  // const [state, formAction] = useFormState(signUpWorkerAction, {
  //   message: "",
  // });
  const [isPending, startTransition] = useTransition();

  const [consentChecked, setConsentChecked] = useState(false);

  const form = useForm<z.output<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      userType: "business",
    },
  });

  const onSubmit = (values: FormFields) => {
    startTransition(async () => {
      try {
        await signUpWorkerAction(values);
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message);
        }
      }
    });
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => onSubmit(values))}
        className="space-y-4 min-w-[320px]"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter your username" {...field} />
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
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormItem>
          <div className="flex items-center gap-1">
            <Input
              type="checkbox"
              onChange={() => setConsentChecked(!consentChecked)}
              checked={consentChecked}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
            />
            <label className="text-sm">
              I agree to <span className="text-blue-500">Terms </span>and{" "}
              <span className="text-blue-500">Privacy Policy</span>
            </label>
          </div>
        </FormItem>
        {/* {state.hasError && state.message && (
          <p className="text-red-500 text-xs bg-red-200 p-2 rounded-sm mb-2">
            {state.message}
          </p>
        )} */}

        <div className="flex justify-center">
          <Button disabled={!consentChecked || isPending}>
            {isPending ? "Signing-up..." : "Sign Up"}
          </Button>
        </div>

        <div className="text-center">
          <p className="text-sm">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-blue-500 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </Form>
  );
}
