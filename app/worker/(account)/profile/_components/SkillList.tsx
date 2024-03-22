import { getProfileData } from "@/actions/worker-profile";
import EditProfile from "./EditProfile";
import DeleteProfile from "./DeleteProfile";
import Link from "next/link";

export default async function SkillList() {
  const skills: Skill[] = await getProfileData("skills");
  
  return (
    <ul className="grid gap-4 lg:grid-cols-2">
      {skills.length > 0 &&
        skills.map((skill) => (
          <li key={skill.id} className="border rounded-lg py-2 px-4 bg-gray-200 space-y-2">
            <div className="font-bold text-lg">{skill.skillName}</div>
            <p className="font-semibold">Skill level</p>
            <div className="text-sm">{skill.skillLevel}</div>
            <p className="font-semibold">Certification</p>
            <div className="text-sm">{skill.certification || "-"}</div>
            <p className="font-semibold">Certification link</p>
            <Link href={skill.certLink} target="_blank" className="text-sm">{skill.certLink || "-"}</Link>
            <div className="flex justify-between">
              <EditProfile section="skills" data={skill} />
              <DeleteProfile section="skills" data={skill}/>
            </div>
          </li>
        ))}
    </ul>
  );
}
