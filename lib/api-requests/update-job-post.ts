"use server";
import { revalidateTag } from "next/cache";
import { BACKEND_URL } from "../constants";
import { getSession } from "./fetchers";
import { FormFields } from "@/components/business/EditJobPost";

export async function updateJobPost(id: number, data: JobPost) {
    console.log(`${BACKEND_URL}/job-posts/${id}`);
    
    const session = await getSession()
    try {
        const res = await fetch(`${BACKEND_URL}/job-posts/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.accessToken}`,
          },
          body: JSON.stringify(data),
        });
        revalidateTag('business-job-posts')
        return await res.json();
    } catch(error) {
        console.log(error);
        
        throw Error('Failed to update post')
    }
}