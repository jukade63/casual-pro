import React from "react";

const Experience = () => {
  // Mock experience data
  const experienceData = [
    {
      id: 1,
      position: "Software Engineer",
      company: "TechCorp",
      duration: "2018 - 2021",
      detail: "Developed and maintained web applications using React and Node.js.",
    },
    {
      id: 2,
      position: "Project Manager",
      company: "Innovate Solutions",
      duration: "2022 - Present",
      detail: "Led project teams, managed timelines and resources, and coordinated with stakeholders.",
    },
  ];

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {experienceData.map((exp) => (
        <div key={exp.id} className="border rounded-lg p-4">
          <div className="font-semibold mb-2">{exp.position}</div>
          <div className="mb-2">{exp.company}</div>
          <div className="mb-2">Duration: {exp.duration}</div>
          <div className="mb-4">{exp.detail}</div>
          <div className="flex justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Edit
            </button>
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Experience;