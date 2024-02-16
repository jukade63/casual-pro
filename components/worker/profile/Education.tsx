import { AddNewEducationModal } from "./AddNewEducationModal";
import { getAllEducation, getSession } from "@/lib/apiCalls/fetchers";
import { revalidateTag } from "next/cache";
import EducationRow from "../EducationRow";

const Education = async () => {
  revalidateTag('education')
  let education;
  const session = await getSession();
  if (session) {
    education = await getAllEducation(session?.user?.id);
  }
  return (
    <div className="mb-4">
      <h2 className="mb-2 font-semibold text-xl">
        <span role="img" aria-label="graduation cap" className="mr-2">
          🎓
        </span>
        Education
      </h2>
      {education.length > 0 ? (
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
                {education.map((edu: any, index: number) => (
                 <EducationRow key={index} index={index} 
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
