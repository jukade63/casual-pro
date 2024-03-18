"use client";
import { X } from "lucide-react";
import { useEducation } from "@/hooks/useEducation";
import { deleteProfileInfo } from "./delete-profile-info";
import { useModal } from "@/hooks/useModalStore";

type Props = {
  index: number;
  education: Education;
  accessToken: string | undefined;
  userId: number;
};

export default function EducationRow({ index, education, userId }: Props) {
  const { onOpen } = useModal();
  const { deleteEducation } = useEducation();

  const handleDelete = () => {

    if (!userId || !education.id) {
      console.error("Access token, user ID, or education ID is missing.");
      return;
    }
    onOpen("confirm", {
      confirm: {
        onConfirm: () => deleteEducation(education.id as number),
        action: deleteProfileInfo(education.id as number, userId, "education"),
        message: "Are you sure you want to delete this education?",
      },
    });
  };
  return (
    <tr className={`border-b ${index % 2 === 0 ? "bg-gray-200" : ""}`}>
      <td className="p-2 border">{education.institution}</td>
      <td className="p-2 border">{education.degree}</td>
      <td className="p-2 border">{education.major}</td>
      <td className="p-2 border">{education.gradDate}</td>
      <td className="p-2 border">
        <button
          onClick={handleDelete}
          className="bg-red-500 rounded-full p-[3px]"
        >
          <X size={15} color="white" />
        </button>
      </td>
    </tr>
  );
}
