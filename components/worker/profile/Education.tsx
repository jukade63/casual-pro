"use client";
import { useModal } from "@/hooks/useModalStore";
import { getAllEducation } from "@/lib/apiRequests/fetchers";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import EducationRow from "../EducationRow";
import { useEducation } from "@/hooks/useEducation";
import { Button } from "@/components/ui/button";

export const Education = () => {
  const { education, setEducation} = useEducation()
  const { data: session } = useSession();
  const { onOpen } = useModal();

  useEffect(() => {
    async function fetchData() {
      try {
        const educationData = session?.user.id
          ? await getAllEducation(session?.user.id)
          : [];
        setEducation(educationData);
      } catch (error) {
        console.error("Error fetching education data:", error);
      }
    }

    fetchData();
  }, [setEducation]);

  return (
    <>
      <div className="mb-4">
        <h2 className="mb-2 font-semibold text-xl">
          <span role="img" aria-label="graduation cap" className="mr-2">
            🎓
          </span>
          Education
        </h2>
        <ul className="pl-6">
          {education.length > 0 ? (
            <table className="w-full border-collapse text-center">
              <thead>
                <tr>
                  <th className="p-2 border">Institution</th>
                  <th className="p-2 border">Degree</th>
                  <th className="p-2 border">Major</th>
                  <th className="p-2 border">Graduation Year</th>
                  <th className="p-2 border"></th>
                </tr>
              </thead>
              <tbody>
                {education.map((edu: Education, index: number) => (
                  <EducationRow
                    key={index}
                    index={index}
                    education={edu}
                    accessToken={session?.accessToken}
                    userId={session?.user?.id}
                  />
                ))}
              </tbody>
            </table>
          ) : (
            <p>No education data available.</p>
          )}
        </ul>
        <div className="mt-2 w-full text-center"></div>
      </div>
      <Button onClick={() => onOpen("addEducation")} >Add Education</Button>
    </>
  );
};
