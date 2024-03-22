import AddExperience from "@/app/worker/(account)/profile/_components/AddExperience";
import ExperienceList from "@/app/worker/(account)/profile/_components/ExperienceList";
import React from "react";

const Experience = async () => {
  return (
    <section className="space-y-4">
      <ExperienceList />
      <div className="flex justify-center">
        <AddExperience />
      </div>
    </section>
  );
};

export default Experience;
