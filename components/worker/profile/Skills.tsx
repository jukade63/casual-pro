import React from "react";

const Skills = () => {
  // Mock skills data
  const skillsData = ["JavaScript", "React", "Node.js", "Project Management", "UI/UX Design"];

  return (
    <div className="mb-4">
      <div className="mb-2 font-semibold">Skills:</div>
      <ul>
        {skillsData.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
    </div>
  );
};

export default Skills;
