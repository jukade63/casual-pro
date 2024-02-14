import { BACKEND_URL } from "./constants"

export const getAllJobs = async () => {
    const res = await fetch(`${BACKEND_URL}/job-posts`, { next: {tags: ['job-posts']} })
    const data = await res.json()
    return data
}