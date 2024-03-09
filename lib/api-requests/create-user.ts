'use server'

import { redirect } from "next/navigation"
import { BACKEND_URL } from "../constants"
import { FormFields } from "@/components/worker/SignUpForm"


export const signUpWorkerAction = async (data: FormFields) => {
    const res = await fetch(`${BACKEND_URL}/users/worker`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })

    if (res.status !== 201) {
        throw Error('Failed to create user')
    }
    await res.json()
    redirect('/sign-in')
}



