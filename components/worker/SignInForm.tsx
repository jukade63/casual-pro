"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
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
import { useState } from "react";
import { signIn } from "next-auth/react";
import ButtonLoading from "../ButtonLoading";

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(1, { message: "Password must be at least 8 characters." }),
});

export function SignInForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      const result = await signIn("email-password", {
        email: values.email,
        password: values.password,
        redirect: false,
      });
      if (result?.error === "CredentialsSignin") {
        setError("Invalid email or password. Please try again.");
      } else {
        setLoading(false);
        router.push("/worker/dashboard");
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again later.");
      console.error("Sign-in error:", error);
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
                <Input placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-center">
          {loading ? (
            <ButtonLoading />
          ) : (
            <Button type="submit" disabled={loading}>
              Submit
            </Button>
          )}
        </div>
        <div className="text-center">
          {error && (
            <p className="text-red-500 text-xs bg-red-200 p-2 rounded-sm mb-2">
              {error}
            </p>
          )}
          <p className="text-sm">Haven't signed up yet? </p>
          <p
            onClick={() => router.push("/worker/sign-up")}
            className="text-blue-600 text-sm hover:underline cursor-pointer mt-2"
          >
            Sign up as a worker
          </p>
          <p className="text-sm">or</p>
          <p
            onClick={() => router.push("/business/sign-up")}
            className="text-blue-600 text-sm hover:underline cursor-pointer "
          >
            Sign up as a business
          </p>
        </div>
      </form>
    </Form>
  );
}
