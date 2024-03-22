"use server"

import { getSession } from "@/lib/api-requests/fetchers"
import { BACKEND_URL } from "@/lib/constants"
import { revalidatePath } from "next/cache"

export async function cancelApplication(id: number) {
    const session = await getSession()
    const res = await fetch(`${BACKEND_URL}/applications/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${session?.accessToken}`,
        }
    })
    if (!res.ok) {
        const error = await res.json()
        throw new Error(error.message)
    }
    revalidatePath("/worker/applied-jobs")

    return {
        message: "Application cancelled successfully",
    }
}