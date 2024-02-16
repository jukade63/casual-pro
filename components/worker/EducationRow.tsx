"use client";
import { EducationType } from "@/lib/apiCalls/fetchers";
import { BACKEND_URL } from "@/lib/constants";
import { X} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState, useTransition } from "react";
import ButtonLoading from "../ButtonLoading";

type Props = {
  index: number;
  education: EducationType;
  accessToken: string | undefined;
  userId: number | undefined;
};

export default function EducationRow({
  index,
  education,
  accessToken,
  userId,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);
  const handleDelete = async () => {
    setIsFetching(true);
    try {
      await fetch(`${BACKEND_URL}/education/${education.id}/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      startTransition(() => {
        // Refresh the current route and fetch new data
        // from the server without losing
        // client-side browser or React state.
        router.refresh();
        setIsFetching(false);
      });
    } catch (error) {
      console.log(error);
      setIsFetching(false);
    }
  };
  return (
    <tr className={`border-b ${index % 2 === 0 ? "bg-gray-200" : ""}`}>
      <td className="p-2 border">{education.institution}</td>
      <td className="p-2 border">{education.degree}</td>
      <td className="p-2 border">{education.major}</td>
      <td className="p-2 border">{education.gradDate}</td>
      <td className="p-2 border">
        {isFetching ? <ButtonLoading /> : <button
          onClick={handleDelete}
          disabled={isFetching}
          className="bg-red-500 rounded-full p-[3px]"
        >
          <X size={15} color="white"/>
        </button>}
      </td>
    </tr>
  );
}
