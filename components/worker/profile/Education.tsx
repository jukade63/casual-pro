"use client";
import { Trash2 } from "lucide-react";
import React, { useState } from "react";
import { EditProfileModal } from "../EditProfileModal";
import { AddNewEducationModal } from "./AddNewEducationModal";

const initialeducationData = [
  {
    id: 1,
    institution: "University XYZ",
    degree: "Bachelor of Science in Computer Science",
    graduationYear: 2020,
    gpax: 3.5,
  },
  {
    id: 2,
    institution: "ABC College",
    degree: "Master of Business Administration",
    graduationYear: 2022,
    gpax: 4.0,
  },
  {
    id: 3,
    institution: "XYZ Institute",
    degree: "Bachelor of Arts in English",
    graduationYear: 2019,
    gpax: 3.5,
  },

  {
    id: 6,
    institution: "Tech Institute",
    degree: "Diploma in Electronics Engineering",
    graduationYear: 2016,
    gpax: null,
  },
  {
    id: 7,
    institution: "High School ABC",
    degree: "High School Diploma",
    graduationYear: 2015,
    gpax: null,
  },
];

const Education = () => {
  const [educationData, setEducationData] = useState(initialeducationData);

  const handleRemoveEducation = (id: number) => {
    const updatedEducationData = educationData.filter((edu) => edu.id !== id);
    setEducationData(updatedEducationData);
  };

  const handleAddEducation = () => {
    const newEducationEntry = {
      id: Math.max(...educationData.map((edu) => edu.id), 0) + 1,
      institution: "New University",
      degree: "New Degree",
      graduationYear: 2023,
      gpax: null,
    };

    setEducationData([...educationData, newEducationEntry]);
  };

  return (
    <div className="mb-4">
      <h2 className="mb-2 font-semibold text-xl">
        <span role="img" aria-label="graduation cap" className="mr-2">
          🎓
        </span>
        Education
      </h2>
      {educationData.length > 0 ? (
        <ul className="pl-6">
          {educationData.length > 0 ? (
            <table className="w-full border-collapse text-center">
              <thead>
                <tr>
                  <th className="p-2 border">Institution</th>
                  <th className="p-2 border">Degree</th>
                  <th className="p-2 border">Graduation Year</th>
                  <th className="p-2 border">GPAX</th>
                  <th className="p-2 border"></th>
                </tr>
              </thead>
              <tbody>
                {educationData.map((edu, index) => (
                  <tr
                    key={edu.id}
                    className={`border-b ${
                      index % 2 === 0 ? "bg-gray-200" : ""
                    }`}
                  >
                    <td className="p-2 border">{edu.institution}</td>
                    <td className="p-2 border">{edu.degree}</td>
                    <td className="p-2 border">{edu.graduationYear}</td>
                    <td className="p-2 border">{edu.gpax}</td>
                    <td className="p-2 border">
                      <button onClick={() => handleRemoveEducation(edu.id)}>
                        <Trash2 color="red" size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No education data available.</p>
          )}
        </ul>
      ) : (
        <p>No education data available.</p>
      )}
      <div className="mt-2 w-full text-center">
        <AddNewEducationModal />
      </div>
    </div>
  );
};

export default Education;
