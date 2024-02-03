import React from "react";

const Experience = () => {
  // Mock experience data
  const experienceData = [
    {
      position: "Software Engineer",
      company: "TechCorp",
      duration: "2018 - 2021",
    },
    {
      position: "Project Manager",
      company: "Innovate Solutions",
      duration: "2022 - Present",
    },
  ];

  return (
    <div className="mb-4">
      <div className="mb-2 font-semibold">Experience:</div>
      {experienceData.map((exp, index) => (
        <div key={index} className="mb-2">
          <div className="font-semibold">{exp.position}</div>
          <div>{exp.company}</div>
          <div>Duration: {exp.duration}</div>
        </div>
      ))}
    </div>
  );
};

export default Experience;
