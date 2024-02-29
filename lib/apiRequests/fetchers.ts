"use server"
import { getServerSession } from "next-auth"
import { BACKEND_URL } from "../constants"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"

export const getSession = async () => {
    const session = await getServerSession(authOptions)
    return session
}

export const getAllJobs = async () => {
    const res = await fetch(`${BACKEND_URL}/job-posts`, { next: { tags: ['all-jobs'] } })
    const data = await res.json()
    return data
}

export const getJobPostsByBusiness = async () => {
    const session = await getSession()
    if (!session) return redirect('/sign-in')
    const { accessToken } = session
    const res = await fetch(`${BACKEND_URL}/job-posts/business`,
        {
            headers: { Authorization: `Bearer ${accessToken}` },
            next: { tags: ['business-job-posts'] }
        },

    )
    return await res.json()

}

export const getJob = async (id: number) => {
    const res = await fetch(`${BACKEND_URL}/job-posts/${id}`)
    const data = await res.json()
    return data
}

export const getSingleJobPostForBusiness = async (id: number) => {
    const session = await getSession()
    const res = await fetch(`${BACKEND_URL}/job-posts/${id}`, {
        headers: {
            Authorization: `Bearer ${session?.accessToken}`
        }
    })
    return await res.json()
}

export const getAllEducation = async (userId: number) => {
    const res = await fetch(`${BACKEND_URL}/education/${userId}`, { next: { tags: ['education'] } })
    return await res.json()
}
