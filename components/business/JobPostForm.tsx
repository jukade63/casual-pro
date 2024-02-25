"use client";
import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { BACKEND_URL } from "@/lib/constants";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { MinusCircle, Plus } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { jobPostSchema } from "@/lib/schemas/jobPostSchema";
import { useSession } from "next-auth/react";

enum JobType {
  Casual = "casual",
  PartTime = "part-time",
  Temporary = "temporary",
}

export function JobPostForm() {
  const {data:session} = useSession();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof jobPostSchema>>({
    resolver: zodResolver(jobPostSchema),
    defaultValues: {
      title: "",
      description: "",
      requirements: [
        {
          requirement: "",
        },
      ],
      location: ["", "", ""],
      startDate: "",
      endDate: "",
      jobType: JobType.Casual,
      paymentAmount: "",
      category: "",
    },
  });

  const validForm = form.formState.isValid;

  async function onSubmit(values: z.infer<typeof jobPostSchema>) {
    const requirementValues = values.requirements.map(
      (item) => item.requirement
    );

    const sanitizedValues = {
      ...values,
      requirements: requirementValues,
      paymentAmount: +values.paymentAmount,
    }

    console.log(sanitizedValues);
    

    try {
      const response = await fetch(BACKEND_URL + "/job-posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify(sanitizedValues),
      });
      if (response.ok) {
        router.push("/business/job-posts");
      }
    } catch (error) {
      setError("Failed to create job post. Please try again.");
    } finally {
      // form.reset();
      setLoading(false);
    }
  }

  const { fields, append, remove } = useFieldArray({
    name: "requirements",
    control: form.control,
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="min-w-[320px] space-y-4"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} className="resize-none bg-gray-50" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="location.0"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Location - Address</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location.1"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location.2"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormLabel>Requirements</FormLabel>
          <div className="space-y-2">
            {fields.map((field, index) => (
              <FormField
                key={field.id}
                control={form.control}
                name={`requirements.${index}.requirement`}
                render={({ field }) => (
                  <FormItem className="w-full flex justify-center items-center gap-2">
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                    <MinusCircle
                      color="red"
                      size={20}
                      className="cursor-pointer"
                      onClick={() => remove(index)}
                    />
                  </FormItem>
                )}
              />
            ))}
          </div>
        </div>

        <Button
          variant="outline"
          type="button"
          onClick={() => append({ requirement: "" })}
          className="w-1/5 mx-auto flex"
        >
          <Plus size={18} />
        </Button>
        <FormField
          control={form.control}
          name="jobType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="casual">Casual</SelectItem>
                  <SelectItem value="part-time">Part Time</SelectItem>
                  <SelectItem value="temporary">Temporary</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="paymentAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payment Amount</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input placeholder="Enter category" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {error && (
          <p className="text-red-500 text-xs bg-red-200 p-2 rounded-sm mb-2">
            {error}
          </p>
        )}

        <div className="flex justify-center">
          <Button type="submit" disabled={!validForm || loading}>
            Create Job Post
          </Button>
        </div>
      </form>
    </Form>
  );
}
