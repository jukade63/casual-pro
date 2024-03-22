"use client";
import { Button } from "@/components/ui/button";
import { AddEducationForm } from "./AddEducationForm";
import { AddExperienceForm } from "./AddExperienceForm";
import { AddSkillForm } from "./AddSkillForm";
import { useModal } from "@/hooks/useModalStore";
import { PencilLine } from "lucide-react";

type EditProfileProps = {
  section: "education" | "experiences" | "skills";
  data: Education | Experience | Skill | undefined;
};

export default function EditProfile({ section, data }: EditProfileProps) {
  const { onOpen } = useModal();
  let jsx: JSX.Element;
  switch (section) {
    case "education":
      jsx = <AddEducationForm data={data as Education} isEdit />;
      break;
    case "experiences":
      jsx = <AddExperienceForm data={data as Experience } isEdit/>;
      break;
    case "skills":
      jsx = <AddSkillForm data={data as Skill} isEdit/>;
      break;
    default:
      break;
  }

  const handleEditProfile = () => {
    onOpen("update", {
      update: {
        jsx: jsx,
      },
    });
  };
  return (
    <Button onClick={handleEditProfile} className="text-sm bg-transparent hover:bg-black/10">
      <PencilLine  size={18}/>
    </Button>
  );
}
