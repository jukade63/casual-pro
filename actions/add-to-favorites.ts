"use server"

import { getSession } from "@/lib/api-requests/fetchers";
import { BACKEND_URL } from "@/lib/constants";
import { revalidatePath } from "next/cache";

export default async function addToFavorites(jobId: number) {
    
    const session = await getSession()
    try {
        await fetch(`${BACKEND_URL}/jobs/${jobId}`, {
            method: "PATCH",
            body: JSON.stringify({isFavorite: true}),
            headers: {
                Authorization: `Bearer ${session?.accessToken}`,
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        if(error instanceof Error) throw Error(error.message);
    }
    revalidatePath("/worker/favorites");
}


