"use client";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/useModalStore";
import EditForm from "./EditForm";

interface EditBusinessFieldProps {
    field: "industry" | "description";
    data: string | null
    businessId: number
  }


export default function EditBusinessField({
  field,
  data,
  businessId
}: EditBusinessFieldProps) {
    const {onOpen} = useModal()

    const handleModalOpen = () => {
        onOpen('update', {
            update: {
                jsx: <EditForm field={field} data={data as string} businessId={businessId}/>,
            }
        })
    }
  return (
    <div>
        <Button onClick={handleModalOpen}>Edit</Button>
    </div>
  )
}
