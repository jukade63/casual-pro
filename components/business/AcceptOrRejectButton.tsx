import { acceptApplication, rejectApplication } from "@/actions/accept-application";
import React, { useCallback, useTransition } from "react";

type Props = {
  applicationId: number;
  jobPostId: number | undefined;
};

export default function AcceptOrRejectButton({
  applicationId,
  jobPostId,
}: Props) {
  const [isPending, startTransition] = useTransition();

  const handleAction = useCallback(async (action: 'accept' | 'reject') => {
    if(jobPostId)
    try {
      startTransition(async () => {
        if (action === 'accept') {
          await acceptApplication(applicationId, jobPostId);
        } else if (action === 'reject') {
          await rejectApplication(applicationId, jobPostId);
        }
      });
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  }, [applicationId, jobPostId, startTransition]);

  return (
    <>
      <button
        className="px-2 rounded-sm py-1 text-sm bg-sky-700 text-white"
        onClick={() => handleAction('accept')}
        disabled={isPending}
      >
        Accept
      </button>
      <button
        className="px-2 rounded-sm py-1 text-sm bg-rose-700 text-white"
        onClick={() => handleAction('reject')}
        disabled={isPending}
      >
        Decline
      </button>
    </>
  );
}
