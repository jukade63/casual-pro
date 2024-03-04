"use client";
import React from "react";
import { Button } from "../ui/button";
import { createApplication } from "@/lib/api-requests/create-application";
import { useRouter } from "next/navigation";
import { BACKEND_URL } from "@/lib/constants";
import { useSession } from "next-auth/react";

export default function ApplyButton({
  jobPostId,
}: {
  jobPostId: number | undefined;
}) {
  const router = useRouter();
  const {data: session} = useSession()
  const handleApplyJob = async () => {
    if (jobPostId) {
      try {
       const res  = await fetch(`${BACKEND_URL}/applications/${jobPostId}`, {
           method: "POST",
           headers: {
             "Content-Type": "application/json",
             Authorization: `Bearer ${session?.accessToken}`,   
           }
       })
       if(res.ok){
         router.push("/worker/dashboard")
       }
      } catch (error) {
        console.log(error);
        if (
          error instanceof Error &&
          error.message === "Only workers can apply for jobs"
        ) {
          alert("Only workers can apply for jobs");
        } else {
          alert("An unexpected error occurred. Please try again later.");
        }
      }
    }
  };
  return (
    <Button className="max-w-[200px] mt-auto mb-2" onClick={handleApplyJob}>
      APPLY FOR THIS JOB
    </Button>
  );
}
