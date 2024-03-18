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
import React, { useEffect, useState, useTransition } from "react";
import { signIn } from "next-auth/react";
import ButtonLoading from "../ButtonLoading";
import { signInSchema } from "@/lib/schemas/sigin-schema";
import Link from "next/link";
import { EyeIcon, EyeOff, KeyRound, Mail } from "lucide-react";

export type FormFields = z.infer<typeof signInSchema>;


export function SignInForm() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [error, setError] = useState("");
  const form = useForm<FormFields>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const [endIcon, setEndIcon] = useState('EyeOff');

  useEffect(() => {
    if (showPassword) {
      setEndIcon('EyeOff');
    } else {
      setEndIcon('EyeIcon');
    }
  }, [showPassword]);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

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
                <Input
                  placeholder="mail@example.com"
                  {...field}
                  startIcon={Mail}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="relative">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type={showPassword ? "text" : "password"}
                    startIcon={KeyRound}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {React.cloneElement(
            endIcon === 'EyeOff' ? <EyeOff/> : <EyeIcon/> , {
            size: '18',
            onClick: togglePasswordVisibility,
            className: 'absolute right-2 bottom-2.5 cursor-pointer',
          }
            
          )}
        </div>

        <div className="text-center text-sm">
          Forgot password?
          <Link href="/forgot-password" className="text-blue-600 ml-2">
            Get a new password
          </Link>
        </div>

        <div className="flex justify-center">
          {isPending ? (
            <ButtonLoading />
          ) : (
            <Button type="submit" disabled={isPending} className="w-1/2">
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
          <p className="text-sm">Don't have an account yet? </p>
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
