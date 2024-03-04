'use server'

import { redirect } from "next/navigation"
import { BACKEND_URL } from "../constants"
import { FormFields } from "@/components/worker/SignUpForm"


export const signUpWorkerAction = async (data: FormFields) => {
    const signupDate = data    
    try {
        const res = await fetch(`${BACKEND_URL}/users/worker`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(signupDate),
        })
        console.log(res.status);
        
        if(res.status !== 201) {
            return {
                hasError: true,
                message: 'Something went wrong'
            }
        }
        await res.json()
     
    } catch (error) {
        console.log(error);
    }
    redirect('/sign-in')
}



