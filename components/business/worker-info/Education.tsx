import React from 'react'

export default function Education({education}: {education: Education[]}) {
    education = education.sort((a, b) => new Date(b.gradDate).getTime() - new Date(a.gradDate).getTime());
    return (
        <div className="space-y-2">
          <h2 className="text-2xl font-bold bg-sky-200 p-2">Education</h2>
          <ol className="space-y-2">
            {education.length > 0 &&
              education.map((education, index) => (
                <li
                  key={education.id}
                  className="flex flex-col justify-between px-5 md:flex-row md:gap-2"
                >
                  <h2 className=" font-semibold">
                    {index + 1}. {education.degree}
                    <span className="text-sm text-gray-500 ml-3 font-normal">
                      at {education.institution}
                    </span>
                  </h2>
                  <p className="text-sm text-gray-600 pl-5 md:pl-0">
                    {new Date(education.gradDate).getFullYear()}
                  </p>
                </li>
              ))}
          </ol>
        </div>
      );
}
