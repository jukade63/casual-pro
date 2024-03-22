"use client"

import { deleteProfileData } from "@/actions/worker-profile"
import { Button } from "@/components/ui/button"
import { useModal } from "@/hooks/useModalStore"
import { Trash2 } from "lucide-react"

type DeleteProfileProps = {
  section: "education" | "experiences" | "skills"
  data: Education | Experience | Skill
}

export default function DeleteProfile({ section, data }: DeleteProfileProps) {
  const {onOpen} = useModal()
  const handleConfirm = () => {
    onOpen('confirm', {
      confirm: {
        action: () => deleteProfileData({section, id: data.id as number}),
        message: "Are you sure you want to delete this?",
        
      }
    })
  }
  return (
    <Button onClick={handleConfirm} className="text-sm bg-transparent hover:bg-black/10">
    <Trash2 size={18} color="red"/>
  </Button>
  )
}
