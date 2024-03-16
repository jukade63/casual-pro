"use server"

import { getSession } from "@/lib/api-requests/fetchers"
import { BACKEND_URL } from "@/lib/constants";
import { revalidateTag } from "next/cache";


export const updateNotification = async (id: number) => {
    console.log({id});
    
    const session = await getSession();
    await fetch(`${BACKEND_URL}/notification`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify({ read: true, id }),
    })
    revalidateTag("notifications")

}