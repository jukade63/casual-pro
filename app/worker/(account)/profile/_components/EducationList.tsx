
import { getProfileData } from "@/actions/worker-profile";
import EducationRow from "@/components/worker/EducationRow";

export const EducationList = async () => {
const education: Education[] = await getProfileData('education')

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
                {education.length > 0 && education.map((edu: Education, index: number) => (
                  <EducationRow
                    key={index}
                    index={index}
                    education={edu}
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
    </>
  );
};
