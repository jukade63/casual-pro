"use server";
import { revalidateTag } from "next/cache";
import { BACKEND_URL } from "../constants";
import { getSession } from "./fetchers";

export async function createApplication(jobPostId: number) {
  const session = await getSession()
  if (session?.user.userType !== 'worker') {
    throw Error('Only workers can apply for jobs')
  }
  try {
    console.log(`${BACKEND_URL}/applications/${jobPostId}`);
    
    await fetch(`${BACKEND_URL}/applications/${jobPostId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.accessToken}`,
      },
    });
    revalidateTag('applications')
  } catch (error) {
    console.log(error);
    throw Error('Failed to create post')
  }
}