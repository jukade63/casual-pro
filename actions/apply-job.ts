"use server"

import { getSession } from "@/lib/api-requests/fetchers";
import { BACKEND_URL } from "@/lib/constants";
import { redirect } from "next/navigation";

export default async function applyJob(jobPostId: number) {
    const session = await getSession()
    const res = await fetch(`${BACKEND_URL}/applications/${jobPostId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.accessToken}`,
        },
    });
    if (res.ok) {
        redirect("/worker/applied-jobs");
    } else {
        if(res.status === 403) {
            throw Error("Please login as a worker to apply for a job");
        }else if(res.status === 409) {
            throw Error("You have already applied for this job");
        }else{
            throw Error("Failed to apply for job");
        }
    }
}
