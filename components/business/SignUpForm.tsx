"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
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
import { BACKEND_URL } from "@/lib/constants";
import { useState } from "react";

const formSchema = z
  .object({
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters." }),
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Please enter a valid email address." }),
    password: z
      .string()
      .min(3, { message: "Password must be at least 8 characters." }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export function SignUpForm() {
  const [consentChecked, setConsentChecked] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const isValidForm = form.formState.isValid;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch(BACKEND_URL + "/users/business", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          userType: "business",
        }),
      });
      if (response.ok) {
        router.push("/sign-in");
      }
    } catch (error) {
      setError("Sign-up failed. try again");
    } finally {
      form.reset();
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
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
        {error && (
          <p className="text-red-500 text-xs bg-red-200 p-2 rounded-sm mb-2">
            {error}
          </p>
        )}

        <div className="flex justify-center">
          <Button
            type="submit"
            disabled={!isValidForm || loading || !consentChecked}
          >
            Sign Up
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
