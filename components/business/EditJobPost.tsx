"use client";
import React, { useState } from "react";
import { z } from "zod";
import { JobType } from "./JobPostForm";
import { useFieldArray, useForm } from "react-hook-form";
import { jobPostSchema } from "@/lib/schemas/job-post-schema";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

import { CalendarIcon, MinusCircle, Plus } from "lucide-react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import { generateTimeOptions } from "@/lib/functions.ts/genetateTimeOptions";
import { concatDateTime } from "@/lib/functions.ts/concatDateTime";
import { updateJobPost } from "@/lib/api-requests/update-job-post";
import { useRouter } from "next/navigation";

export default function EditJobPost({ jobPost }: { jobPost: JobPost }) {
  
  const router = useRouter();
  const form = useForm<z.infer<typeof jobPostSchema>>({
    resolver: zodResolver(jobPostSchema),
    defaultValues: {
      title: jobPost.title,
      description: jobPost.description,
      requirements: jobPost.requirements.map((requirement) => ({
        requirement,
      })),
      location: jobPost.location,
      jobType: jobPost.jobType as JobType,
      paymentAmount: jobPost.paymentAmount.toString(),
      category: jobPost.category,
      startDate: new Date(jobPost.startDate),
      endDate: new Date(jobPost.endDate),
      startTime: jobPost.startDate.split("T")[1].slice(0, 5),
      endTime: jobPost.endDate.split("T")[1].slice(0, 5),
    },
  });

  const {
    control,
    formState: { isDirty },
  } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "requirements",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");
  

  const onSubmit = async (values: z.infer<typeof jobPostSchema>) => {
    const startDateWithTime = concatDateTime(values.startDate, values.startTime);
    const endDateWithTime = concatDateTime(values.endDate, values.endTime);

    const sanitizedValues = {
      ...values,
      startDate: startDateWithTime,
      endDate: endDateWithTime,
      requirements: values.requirements.map((item) => item.requirement),
      paymentAmount: +values.paymentAmount,
    };
    
    try {
      await updateJobPost(+jobPost.id!, sanitizedValues);
      
      router.push("/business/job-posts");
    } catch (error) {
      setError("An unexpected error occurred. Please try again later.");
      console.log(error);
    }
  };
  return (
    <section>
      <h1 className="text-xl font-semibold pt-3 text-center">Edit job post</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="min-w-[320px] space-y-4 mt-4"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} disabled={!isEditing}/>
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
                  <Textarea {...field} className="resize-none bg-gray-50" disabled={!isEditing}/>
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
                    <Input {...field} disabled={!isEditing}/>
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
                    <Input {...field} disabled={!isEditing}/>
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
                    <Input {...field} disabled={!isEditing}/>
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
                        <Input {...field} disabled={!isEditing}/>
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
                <RadioGroup
                  className="flex gap-2 mt-2"
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={!isEditing}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="casual" id="casual" />
                    <Label htmlFor="casual">Casual</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="part-time" id="part-time" />
                    <Label htmlFor="part-time">Part-time</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="temporary" id="temporary" />
                    <Label htmlFor="temporary">Temporary</Label>
                  </div>
                </RadioGroup>
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
                  <Input type="number" {...field} disabled={!isEditing}/>
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
                  <Input placeholder="Enter category" {...field} disabled={!isEditing}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col md:flex-row gap-4 md:justify-between">
            <div className="flex gap-4 items-center">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Start date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal mt-2 bg-gray-50",
                              !field.value && "text-muted-foreground"
                            )}
                            disabled={!isEditing}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="self-end">
                <FormField
                  control={form.control}
                  name="startTime"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={!isEditing}
                      >
                        <FormControl>
                          <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Time" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {generateTimeOptions().map((option, index) => (
                            <SelectItem value={option} key={index}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>End date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal mt-2 bg-gray-50",
                              !field.value && "text-muted-foreground"
                            )}
                            disabled={!isEditing}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="self-end">
                <FormField
                  control={form.control}
                  name="endTime"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={!isEditing}
                      >
                        <FormControl>
                          <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Time" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {generateTimeOptions().map((option, index) => (
                            <SelectItem value={option} key={index}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-xs bg-red-200 p-2 rounded-sm mb-2">
              {error}
            </p>
          )}

          <div className="flex gap-2">
            <button
              type="button"
              className={`bg-rose-700 text-white py-2 px-4 rounded-md hover:bg-rose-900 ${
                isEditing ? "hidden" : ""
              }`}
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>

            <button
              type="submit"
              className={`bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-gray-200 disabled:text-gray-400 ${
                isEditing ? "" : "hidden"
              }`}
              disabled={!isEditing || !isDirty}
            >
              Submit
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className={`bg-gray-200 py-2 px-4 rounded-md text-red-500 border-2 border-red-500 ${
                isEditing ? "" : "hidden"
              }`}
            >
              Cancel
            </button>
          </div>
        </form>
      </Form>
    </section>
  );
}
