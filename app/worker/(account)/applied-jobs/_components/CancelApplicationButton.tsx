'use client'

import { cancelApplication } from "@/actions/application"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

export default function CancelApplicationButton({applicationId}: {applicationId: number}) {
    const {toast} = useToast()
    const handleCancelApplication = async () => {
    try {
      await cancelApplication(applicationId)
      toast({
        title: "Application Canceled",
        description: "Your application has been canceled.",
        variant: "success",
      })
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    }
  }
    return (
    <Button onClick={handleCancelApplication} variant='destructive'>Cancel Application</Button>
  )
}
