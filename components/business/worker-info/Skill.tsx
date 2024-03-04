import Link from "next/link";
import React from "react";

export default function Skill({ skills }: { skills: Skill[] }) {
  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-bold bg-sky-200 p-2">Skills</h1>
      {skills.map((skill) => (
        <div key={skill.id} className="mb-4">
          <h1>{skill.skillName}</h1>
          <p>{skill.skillLevel}</p>
          <Link href={skill.certLink}>
            <p>{skill.certification}</p>
          </Link>
        </div>
      ))}
    </div>
  );
}
