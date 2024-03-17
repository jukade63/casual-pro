"use server"

import { BACKEND_URL } from "@/lib/constants";

export const resetPassword = async (password: string, token: string | null) => {
    const res = await fetch(`${BACKEND_URL}/auth/reset-password`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({password, token}),
    });

    if (res.status === 400) {
        throw Error('Failed to reset password');
    }

}