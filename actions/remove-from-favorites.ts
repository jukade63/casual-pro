"use server"

import { getSession } from "@/lib/api-requests/fetchers"
import { BACKEND_URL } from "@/lib/constants"
import { revalidatePath } from "next/cache"

export default async function removeFromFavorites(jobId: number) {
    
    const session = await getSession()
    await fetch(`${BACKEND_URL}/jobs/${jobId}`, {
        method: 'PATCH',
        body: JSON.stringify({isFavorite: false}),
        headers: {
            'Authorization': `Bearer ${session?.accessToken}`,
            'Content-Type': 'application/json'
        }
    })
    revalidatePath("/worker/favorites")
    
}