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
import React, { useEffect, useState, useTransition } from "react";
import { SignUpSchema } from "@/lib/schemas/signup-schema";
import {
  EyeIcon,
  EyeOff,
  KeyRound,
  Mail,
  Phone,
  UserRound,
} from "lucide-react";
import { signUpUser } from "@/actions/auth";
import { useToast } from "../../../../../components/ui/use-toast";
import { Textarea } from "../../../../../components/ui/textarea";

export type FormFields = z.infer<typeof SignUpSchema>;

export function SignUpForm() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [consentChecked, setConsentChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [endIconPassword, setEndIconPassword] = useState("EyeOff");
  const [endIconConfirmPassword, setEndIconConfirmPassword] = useState("EyeOff")

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  }
    
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(prev => !prev);
  }

  useEffect(() => {
    if (showPassword) {
      setEndIconPassword("EyeOff");
    } else {
      setEndIconPassword("EyeIcon");
    }
  }, [showPassword]);

  useEffect(() => {
    if (showConfirmPassword) {
      setEndIconConfirmPassword("EyeOff");
    } else {
      setEndIconConfirmPassword("EyeIcon");
    }
  }, [showConfirmPassword]);

  const form = useForm<z.output<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      username: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      industry: "",
      description: "",
    },
  });

  const onSubmit = (values: FormFields) => {
    startTransition(async () => {
      try {
        const res = await signUpUser(values, "business");
        toast({
          title: "Success",
          description: res.message,
          variant: "success",
        });
      } catch (error) {
        if (error instanceof Error) {
          toast({
            title: "Error",
            description: error.message,
            variant: "error",
          });
        }
      }
    });
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => onSubmit(values))}
        className="space-y-4 min-w-[320px] w-full"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input {...field} startIcon={UserRound} />
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
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input {...field} startIcon={Phone} />
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
          {React.cloneElement(endIconPassword === "EyeOff" ? <EyeOff /> : <EyeIcon />, {
            size: "18",
            onClick: togglePasswordVisibility,
            className: "absolute right-2 bottom-2.5 cursor-pointer",
          })}
        </div>
        <div className="relative">
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password again</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type={showConfirmPassword ? "text" : "password"}
                    startIcon={KeyRound}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {React.cloneElement(endIconConfirmPassword === "EyeOff" ? <EyeOff /> : <EyeIcon />, {
            size: "18",
            onClick: toggleConfirmPasswordVisibility,
            className: "absolute right-2 bottom-2.5 cursor-pointer",
          })}
        </div>
        <FormField
          control={form.control}
          name="industry"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Industry</FormLabel>
              <FormControl>
                <Input {...field} placeholder="IT, Finance, etc" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormItem>
          <div className="flex items-center gap-1 justify-center">
            <Input
              type="checkbox"
              onChange={() => setConsentChecked(!consentChecked)}
              checked={consentChecked}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
            />
            <FormLabel className="text-gray-600">
              I agree to <span className="text-blue-500">Terms </span> and{" "}
              <span className="text-blue-500">Privacy Policy</span>
            </FormLabel>
          </div>
        </FormItem>
        <div className="flex justify-center">
          <Button disabled={!consentChecked || isPending} className="w-1/2">
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
