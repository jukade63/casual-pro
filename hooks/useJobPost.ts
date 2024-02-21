import {create } from 'zustand'

interface EducationState {
    jobPosts: JobPost[]
    setJobPosts: (jobPosts: JobPost[]) => void
    addJobPost: (jobPost: JobPost) => void
    deleteJobPost: (id: number) => void
}

export const useJobPost = create<EducationState>((set) => ({
    jobPosts: [],
    setJobPosts: (jobPosts) => set({ jobPosts }),
    addJobPost: (jobPost) => set((state) => ({ jobPosts: [...state.jobPosts, jobPost] })),
    deleteJobPost: (id) => set((state) => ({ jobPosts: state.jobPosts.filter((jobPost) => jobPost.id !== id) })),
}))
    