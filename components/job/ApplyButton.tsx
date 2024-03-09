"use client";
import React, { useTransition } from "react";
import { Button } from "../ui/button";
import applyJob from "@/actions/apply-job";

export default function ApplyButton({
  jobPostId,
}: {
  jobPostId: number | undefined;
}) {
  const [isPending, startTransition] = useTransition();
  const handleApplyJob = async () => {
    if (jobPostId) {
      try {
        await applyJob(jobPostId);
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message);
        }
      }
    }
  };
  return (
    <form action={()=> startTransition(handleApplyJob)}>
      <Button className="max-w-[200px] mt-auto mb-2" disabled={isPending}>{isPending ? "APPLYING..." : "APPLY FOR THIS JOB"}</Button>
    </form>
  );
}
