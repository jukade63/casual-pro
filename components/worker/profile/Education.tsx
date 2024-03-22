
import AddEducation from "@/app/worker/(account)/profile/_components/AddEducation";
import { EducationList } from "@/app/worker/(account)/profile/_components/EducationList";

export const Education = async () => {
  
  return (
    <>
      <div className="mb-4">
        <h2 className="mb-2 font-semibold text-xl">
          <span role="img" aria-label="graduation cap" className="mr-2">
            🎓
          </span>
          Education
        </h2>
        <div className="mt-2 w-full text-center">
          <EducationList/>
          <AddEducation/>
        </div>
      </div>
    </>
  );
};
