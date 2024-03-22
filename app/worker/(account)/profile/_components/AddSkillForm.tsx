"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { addProfileData, updateProfileData } from "@/actions/worker-profile";
import { skillSchema } from "@/lib/schemas/sigin-schema";
import { useModal } from "@/hooks/useModalStore";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

type AddSkillFormProps = {
  data?: Skill
  isEdit?: boolean;
};

export function AddSkillForm({ data, isEdit }: AddSkillFormProps) {
  console.log(data);
  
  const { onClose } = useModal();
  const form = useForm<z.infer<typeof skillSchema>>({
    resolver: zodResolver(skillSchema),
    defaultValues: {
      skillName: data?.skillName ?? "",
      skillLevel: data?.skillLevel ?? "",
      certification: data?.certification ?? "",
      certLink: data?.certLink ?? "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: z.infer<typeof skillSchema>) => {
    try {
      isEdit
        ? await updateProfileData({ section: "skills", values: { ...values, id: data?.id} as Skill })
        : await addProfileData({
            section: "skills",
            values: values,
          });

      form.reset();
      onClose();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="space-y-4 py-2 pb-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="skillName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skill</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="skillLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Level </FormLabel>
                  <RadioGroup
                    className="flex gap-2 mt-2"
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Basic" id="basic" />
                      <Label htmlFor="basic">Basic</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Intermediate" id="intermediate" />
                      <Label htmlFor="intermediate">Intermediate</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Advanced" id="advanced" />
                      <Label htmlFor="advanced">Advanced</Label>
                    </div>
                  </RadioGroup>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="certification"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Certification (optional)</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="certLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Certification link (optional)</FormLabel>
                  <FormControl>
                    <Input {...field}  />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="pt-6 space-x-2 flex items-center justify-end w-full">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving.." : "Save"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
