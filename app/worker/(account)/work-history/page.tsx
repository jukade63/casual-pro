// pages/workHistory.tsx
import {
  Bitcoin,
  Building2,
  CalendarDays,
  CheckCircle,
  Navigation,
} from "lucide-react";
import React from "react";

const WorkHistory: React.FC = () => {
  const workHistoryData = [
    {
      company: "Tech Innovators",
      dateAndTime: "2023-05-12 10:00 AM - 04:00 PM",
      location: "Tech Park, City",
      jobPosition: "IT Support Specialist",
      wage: "$250",
      completionStatus: "Completed",
    },
    {
      company: "Green Thumb Landscapes",
      dateAndTime: "2023-06-08 08:00 AM - 01:00 PM",
      location: "Local Parks",
      jobPosition: "Landscaping Assistant",
      wage: "$60",
      completionStatus: "Completed",
    },
    {
      company: "Express Delivery Services",
      dateAndTime: "2023-07-20 02:00 PM - 06:00 PM",
      location: "Citywide Deliveries",
      jobPosition: "Delivery Driver",
      wage: "$70",
      completionStatus: "Completed",
    },
    {
      company: "SteelWorks Manufacturing",
      dateAndTime: "2023-08-15 07:00 AM - 03:00 PM",
      location: "Industrial Zone",
      jobPosition: "Production Operator",
      wage: "$80",
      completionStatus: "Completed",
    },
    {
      company: "Harvest Farms",
      dateAndTime: "2023-09-10 09:00 AM - 05:00 PM",
      location: "Farm Fields, Countryside",
      jobPosition: "Farm Hand",
      wage: "$50",
      completionStatus: "Completed",
    },
    {
      company: "Golden Years Aged Care",
      dateAndTime: "2023-10-05 10:00 AM - 06:00 PM",
      location: "Elderly Care Facility",
      jobPosition: "Care Assistant",
      wage: "$90",
      completionStatus: "Completed",
    },
  ];

  return (
    <div>
      <h2 className="mt-5">Latest Work</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
        {workHistoryData.map((work, index) => (
          <div key={index} className="mb-4 bg-sky-100 p-4 rounded shadow-sm">
            <h2 className="text-md font-semibold mb-2">{work.jobPosition}</h2>
            <div className="grid grid-cols-9 items-center">
              <Building2 size={16} className="col-span-1" />
              <p className="text-gray-600 text-sm col-span-8">{work.company}</p>
              <CalendarDays size={16} className="col-span-1" />
              <p className="text-gray-600 text-sm col-span-8">
                {work.dateAndTime}
              </p>
              <Navigation size={16} className="col-span-1" />
              <p className="text-gray-600 text-sm col-span-8">
                {work.location}
              </p>
              <Bitcoin size={16} className="col-span-1" />
              <p className="text-gray-600 text-sm col-span-8">{work.wage}</p>
              <CheckCircle size={16} className="col-span-1" />
              <p className="text-gray-600 text-sm col-span-8">
                {work.completionStatus}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkHistory;
