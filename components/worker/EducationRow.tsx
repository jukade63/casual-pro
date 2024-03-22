"use client";
import { X } from "lucide-react";
import { useEducation } from "@/hooks/useEducation";
import { useModal } from "@/hooks/useModalStore";
import { deleteProfileData} from "@/actions/worker-profile";

type Props = {
  index: number;
  education: Education;
};

export default function EducationRow({ index, education }: Props) {
  const { onOpen } = useModal();

  const handleDelete = () => {
    onOpen("confirm", {
      confirm: {
        action: () => deleteProfileData({section: "education", id: education.id as number}),
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
