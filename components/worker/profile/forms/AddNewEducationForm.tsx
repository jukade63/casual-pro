"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Dispatch, SetStateAction, useState } from "react";

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

const formSchema = z.object({
  institute: z.string().min(1),
  degree: z.string().min(1),
  year: z.string().min(1),
  gpax: z.string().min(1),
});

interface AddNewEducationFormProps {
   setIsOpen: Dispatch<SetStateAction<boolean>>
}

export function AddNewEducationForm({ setIsOpen }: AddNewEducationFormProps) {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      institute: "",
      degree: "",
      year: "",
      gpax: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsOpen(false)
  };

  return (
    <div className="space-y-4 py-2 pb-4">
      <div className="space-y-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="institute"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Institute</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="name..."
                      {...field}
                    />
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
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Graduate year</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gpax"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>GPAX</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
              <Button variant="destructive" className="border-1" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                Save
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
