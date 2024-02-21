import {create } from 'zustand'

interface EducationState {
    education: Education[]
    setEducation: (education: Education[]) => void
    addEducation: (education: Education) => void
    deleteEducation: (id: number) => void
}

export const useEducation = create<EducationState>((set) => ({
    education: [],
    setEducation: (education) => set({ education }),
    addEducation: (education) => set((state) => ({ education: [...state.education, education] })),
    deleteEducation: (id: number) => set((state) => ({ education: state.education.filter((education) => education.id !== id) })),
}))