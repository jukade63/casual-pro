import AddSkill from "@/app/worker/(account)/profile/_components/AddSkill";
import SkillList from "@/app/worker/(account)/profile/_components/SkillList";
import React from "react";

const Skills = () => {

  return (
    <section className="space-y-4">

    <SkillList />
    <div className="flex justify-center">
      <AddSkill />
    </div>
  </section>
  );
};

export default Skills;
