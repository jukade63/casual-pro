"use server"
import { getServerSession } from "next-auth"
import { BACKEND_URL } from "../constants"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export const getSession = async () => {
    return await getServerSession(authOptions)
}

export const getAllJobs = async () => {
    const res = await fetch(`${BACKEND_URL}/job-posts`, { next: { tags: ['all-jobs'] } })
    const data = await res.json()
    return data
}

export const getJob = async (id: number) => {
    const res = await fetch(`${BACKEND_URL}/job-posts/${id}`)
    const data = await res.json()
    return data
}

export const getAllEducation = async (userId: number) => {
    const res = await fetch(`${BACKEND_URL}/education/${userId}`, {next: {tags: ['education']}})
    return await res.json()
}
