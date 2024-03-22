import { Session } from 'next-auth';
import { ReactElement } from 'react';
import {create } from 'zustand'

export type ModalType = 'editProfile' | 'addEducation' | 'confirm' | 'update'


interface ConfirmModalData {
    message: string;
    onConfirm?: () => void
    action: () => Promise<any>
  }
interface UpdateData {
    jsx: ReactElement
  }

interface ModalData {
    session?: Session | null
    education?: Education
    confirm?: ConfirmModalData
    update?: UpdateData
}

interface ModalStore {
    type: ModalType | null;
    data: ModalData;
    isOpen: boolean;
    onOpen: (type: ModalType, data?: ModalData) => void;
    onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
    type: null,
    data: {},
    isOpen: false,
    onOpen: (type, data) => set({ type, data, isOpen: true }),
    onClose: () => set({ type: null, data: {}, isOpen: false }),
}))