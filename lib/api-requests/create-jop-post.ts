"use server";
import { revalidatePath} from "next/cache";
import { BACKEND_URL } from "../constants";
import { getSession } from "./fetchers";

export async function createJobPost(data: any){
    const session = await getSession()
    try {
        await fetch(BACKEND_URL + "/job-posts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.accessToken}`,
          },
          body: JSON.stringify(data),
        })
    } catch(error) {
        console.log(error);
        throw Error('Failed to create post')
    }
    revalidatePath('/business/job-posts')
}