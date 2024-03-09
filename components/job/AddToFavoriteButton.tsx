'use client'

import { useTransition } from "react";
import { Button } from "../ui/button";
import addToFavorites from "@/actions/add-to-favorites";

export default function AddToFavoriteButton({
    jobPostId,
  }: {
    jobPostId: number | undefined;
  }) {
    const [isPending, startTransition] = useTransition();
    const handleAddToFavorite = async () => {
      console.log({jobPostId});
      
      if (jobPostId) {
        try {
          await addToFavorites(jobPostId);
        } catch (error) {
          if (error instanceof Error) {
            alert(error.message);
          }
        }
      }
    };
    return (
      <form action={()=> startTransition(handleAddToFavorite)}>
        <Button className="max-w-[200px] mt-auto mb-2" disabled={isPending}>{isPending ? "PROCESSING..." : "ADD TO FAVORITES"}</Button>
      </form>
    );
  }
