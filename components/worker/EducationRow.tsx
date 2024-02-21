"use client";
import { BACKEND_URL } from "@/lib/constants";
import { X } from "lucide-react";
import React, { useState} from "react";
import ButtonLoading from "../ButtonLoading";
import { useEducation } from "@/hooks/useEducation";

type Props = {
  index: number;
  education: Education
  accessToken: string | undefined;
  userId: number | undefined;
};

export default function EducationRow({
  index,
  education,
  accessToken,
  userId,
}: Props) {
  const [isFetching, setIsFetching] = useState(false);
  const {deleteEducation} = useEducation()
  const handleDelete = async () => {
    console.log(education);
    if (!accessToken || !userId || !education.id) {
      console.error('Access token, user ID, or education ID is missing.');
      return;
    }

    setIsFetching(true);
    try {
      await fetch(`${BACKEND_URL}/education/${education.id}/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      deleteEducation(education.id)
      setIsFetching(false);
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
        {isFetching ? (
          <ButtonLoading />
        ) : (
          <button
            onClick={handleDelete}
            disabled={isFetching}
            className="bg-red-500 rounded-full p-[3px]"
          >
            <X size={15} color="white" />
          </button>
        )}
      </td>
    </tr>
  );
}
