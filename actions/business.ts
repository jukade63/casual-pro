"use server"

import { getSession } from "@/lib/api-requests/fetchers"
import { BACKEND_URL } from "@/lib/constants"
import { revalidatePath } from "next/cache"

export const getBusiness = async () => {
    const session = await getSession()
    const res = await fetch(`${BACKEND_URL}/business/me`, {
        headers: {
            Authorization: `Bearer ${session?.accessToken}`
        }
    })
    return await res.json()
}

export const updateBusiness = async (id:number, field:string,  data: any) => {
    const session = await getSession()
    
    const res = await fetch(`${BACKEND_URL}/business/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.accessToken}`
        },
        body: JSON.stringify({[field]: data})
    })
    revalidatePath("/business/settings")
    if(!res.ok) {
        const error = await res.json()
        throw new Error(error.message)
    }

    return await res.json()
}