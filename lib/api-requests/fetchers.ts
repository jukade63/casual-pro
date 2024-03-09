"use server"
import { getServerSession } from "next-auth"
import { BACKEND_URL } from "../constants"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

export const getSession = async () => {
    const session = await getServerSession(authOptions)
    return session
}
const fetchWithSessionAndRedirect = async (url: string, options: RequestInit) => {
    const session = await getSession()
    if (!session) {
        redirect('/sign-in')
    }
    const res = await fetch(url, { ...options, headers: { Authorization: `Bearer ${session?.accessToken}` } });
    if (!res.ok) {
        if (res.status === 403) {
            redirect('/sign-in');
        } else {
            throw new Error('Error fetching data');
        }
    }
    return res.json();
}

export const getAllJobs = async (page: number, limit: number, location?: string, category?: string, jobType?: string) => {

    const start = (page - 1) * limit;
    const params = new URLSearchParams();
    if (limit) params.append('limit', limit.toString());
    if (start !== undefined) params.append('start', start.toString());
    if (location) params.append('location', location);
    if (category) params.append('category', category);
    if (jobType) params.append('jobType', jobType);

    await new Promise(resolve => setTimeout(resolve, 1000))

    try {
        const res = await fetch(`${BACKEND_URL}/job-posts?${params.toString()}`, { cache: 'no-store' })
        return await res.json()
    } catch (error) {
        console.log(error)
        return []
    }
}

export const getJobPostsByBusiness = async () => {
    return fetchWithSessionAndRedirect(`${BACKEND_URL}/job-posts/business/all`, {
        next: { tags: ['business-job-posts'] }
    })
}

export const getJobPostById = async (id: number) => {
    const res = await fetch(`${BACKEND_URL}/job-posts/${id}`, {
        next: {
            tags: ['jobById']
        }
    })
    return await res.json()
    
}

export const getJobPostByIdByBusiness = async (id: number) => {
    const session = await getSession()
    const res = await fetch(`${BACKEND_URL}/job-posts/business/${id}`, {
        headers: {
            Authorization: `Bearer ${session?.accessToken}`
        }
    })
    await new Promise(resolve => setTimeout(resolve, 1000))
    return await res.json()
}

export const getAllEducation = async (userId: number) => {
    const res = await fetch(`${BACKEND_URL}/education/${userId}`, { next: { tags: ['education'] } })
    return await res.json()
}


export const getWorkerById = async (id: number) => {
    const session = await getSession()
    const res = await fetch(`${BACKEND_URL}/workers/${id}`, {
        headers: {
            Authorization: `Bearer ${session?.accessToken}`
        }
    })
    return await res.json()
}

export const getApplicationsByWorker = async () => {
    const session = await getSession()
    const res = await fetch(`${BACKEND_URL}/applications/worker/all`, {
        cache: 'no-store',
        headers: {
            Authorization: `Bearer ${session?.accessToken}`
        },
    }, )
    return await res.json()
}

export const getFavoutiteJobs = async () => {
    const session = await getSession()
    const res = await fetch(`${BACKEND_URL}/jobs/favorites`, {
        headers: {
            Authorization: `Bearer ${session?.accessToken}`
        },
    })
    return await res.json()
}

