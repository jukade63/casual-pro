"use server"

import { FormFields } from "@/app/(root)/business/sign-up/_component.ts/SignUpForm"
import { BACKEND_URL } from "@/lib/constants"

export const signUpUser = async (data: FormFields, userType: "worker" | "business") => {
    const response = await fetch(`${BACKEND_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, userType }),
    })
    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message)
    }
    return {
        message: "User created successfully",
    }
}