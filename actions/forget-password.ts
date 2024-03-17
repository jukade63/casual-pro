"use server"

import { BACKEND_URL } from "@/lib/constants";

export const sendForgetPasswordEmail = async (email: string) => {
    const res = await fetch(`${BACKEND_URL}/auth/forgot-password`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
    });

    if (res.status === 400) {
        throw Error('Incorrect email address');
    }

}