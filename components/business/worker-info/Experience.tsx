import { formatDateTimeRange } from "@/lib/functions.ts/formatDateTimeRange";

export default function Experience({
  experiences,
}: {
  experiences: Experience[];
}) {
    experiences = experiences.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
  return (
    <div className="space-y-2">
      <h2 className="text-2xl font-bold bg-sky-200 p-2">Work Experiences</h2>
      <ol className="space-y-2">
        {experiences.length > 0 &&
          experiences.map((experience, index) => (
            <li
              key={experience.id}
              className="flex flex-col justify-between px-5 md:flex-row md:gap-2"
            >
              <h2 className=" font-semibold">
                {index + 1}. {experience.position}
                <span className="text-sm text-gray-500 ml-3 font-normal">
                  at {experience.company}
                </span>
              </h2>
              <p className="text-sm text-gray-600 pl-5 md:pl-0">
                {formatDateTimeRange(experience.startDate, experience.endDate)
                  .split(",")
                  .slice(0, 2)
                  .map((part) => part.trim())
                  .join(", ")})
                
              </p>
            </li>
          ))}
      </ol>
    </div>
  );
}
