"use client";
import React, { useTransition } from "react";
import { Button } from "@/components/ui/button";
import removeFromFavorites from "@/actions/remove-from-favorites";

export default function RemoveFavItemButton({ jobId }: { jobId: number }) {
  const [isPending, startTransition] = useTransition();
  const handleRemove = async () => {
    try {
      await removeFromFavorites(jobId);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };
  return (
    <form action={() => startTransition(handleRemove)}>
      <Button className="text-sm" size="sm" disabled={isPending} variant='destructive' >
        {isPending ? "Removing..." : "Remove From Favorites"}
      </Button>
    </form>
  );
}
