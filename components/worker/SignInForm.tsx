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
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await signIn("email-password", {
        email: values.email,
        password: values.password,
        redirect: false,
      })
      router.push("/worker/profile");
    } catch (error) {
      console.log(error);
      
    }
   
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
          <Button type="submit">Submit</Button>
        </div>
        <div className="text-center">
          <p>
            Haven't signed up yet?{" "}
            <span
              onClick={() => router.push("/worker/sign-up")}
              className="text-blue-500 hover:underline cursor-pointer"
            >
              Sign up
            </span>
          </p>
        </div>
      </form>
    </Form>
  );
}
