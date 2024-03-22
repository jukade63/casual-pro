'use client'

import { useTransition } from "react";
import { Button } from "../ui/button";
import addToFavorites from "@/actions/add-to-favorites";

export default function AddToFavoriteButton({
    jobId,
  }: {
    jobId: number | undefined;
  }) {
    const [isPending, startTransition] = useTransition();
    const handleAddToFavorite = async () => {
      
      if (jobId) {
        try {
          await addToFavorites(jobId);
          alert("Added to favorites");
        } catch (error) {
          if (error instanceof Error) {
            alert(error.message);
          }
        }
      }
    };
    return (
      <form action={()=> startTransition(handleAddToFavorite)}>
        <Button variant = 'outline' className="max-w-[200px] mt-auto mb-2 text-white border-2 border-white" disabled={isPending}>{isPending ? "PROCESSING..." : "ADD TO FAVORITES"}</Button>
      </form>
    );
  }
