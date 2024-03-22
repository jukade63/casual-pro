"use client";
import { updateBusiness } from "@/actions/business";
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
import { Textarea } from "@/components/ui/textarea";
import { useModal } from "@/hooks/useModalStore";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const schema = z.object({
  industry: z.string().min(1, { message: "inductry is required" }).optional(),
  description: z
    .string()
    .min(1, { message: "description is required" })
    .optional(),
});

type FormField = z.infer<typeof schema>;

interface EditBusinessFieldProps {
  field: "industry" | "description";
  data: string;
  businessId: number;
}

export default function EditForm({
  field,
  data,
  businessId,
}: EditBusinessFieldProps) {
  const { onClose } = useModal();
  const form = useForm<FormField>({
    resolver: zodResolver(schema),
    defaultValues: {
      [field]: data,
    },
  });
  const {
    formState: { isDirty, isSubmitting },
  } = form;
  const onSubmit = async (values: z.infer<typeof schema>) => {
    try {
      await updateBusiness(businessId, field, values[field]);
      onClose();
    } catch (error) {
      alert(error);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name={field === "industry" ? "industry" : "description"}
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{field.name}</FormLabel>
              <FormControl>
                {field.name === "description" ? (
                  <Textarea {...field} />
                ) : (
                  <Input {...field} />
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mt-8 flex justify-center gap-2">
          <Button
            type="submit"
            variant="outline"
            onClick={onClose}
            className="md:mr-auto"
          >
            Cancel
          </Button>
          <Button type="submit" disabled={!isDirty || isSubmitting}>
           {isSubmitting ? "Updating..." : "Update"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
