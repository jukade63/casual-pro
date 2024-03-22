import { getProfileData } from "@/actions/worker-profile";
import { formatDateTimeRange } from "@/lib/functions.ts/formatDateTimeRange";
import EditProfile from "./EditProfile";
import DeleteProfile from "./DeleteProfile";

export default async function ExperienceList() {
  const experiences: Experience[] = await getProfileData("experiences");

  return (
    <ul className="grid gap-4 lg:grid-cols-2">
      {experiences.length > 0 &&
        experiences.map((exp) => (
          <li key={exp.id} className="border rounded-lg py-2 px-4 bg-gray-200 space-y-2">
            <div className="font-bold text-lg">{exp.position}</div>
            <p className="font-semibold">Description</p>
            <div className="text-sm">{exp.description}</div>
            <p className="font-semibold">Employer</p>
            <div className="text-sm">{exp.company}</div>
            <p className="font-semibold">Duration</p>
            <div className="text-sm">
              {formatDateTimeRange(exp.startDate, exp.endDate)}
            </div>
            <div className="flex justify-between">
              <EditProfile section="experiences" data={exp} />
              <DeleteProfile section="experiences" data={exp}/>
            </div>
          </li>
        ))}
    </ul>
  );
}
