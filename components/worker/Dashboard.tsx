"use client";

import React, { useMemo } from "react";
import { CalendarCheck, CircleDollarSign, Clock3, Star } from "lucide-react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  Line,
} from "recharts";

interface DashboardProps {
  data: { monthYear: string; earning: number; completed: boolean }[];
}
function Dashboard({ data }: DashboardProps) {
  const monthlyEarningsMap: { [key: string]: number } = {};

  data.forEach((item) => {
      const monthYearKey = item.monthYear

      if (!monthlyEarningsMap[monthYearKey]) {
        monthlyEarningsMap[monthYearKey] = 0;
      }

      monthlyEarningsMap[monthYearKey] += +item.earning;
    
  });

  const mappedEarnings = Object.entries(monthlyEarningsMap).map(
    ([key, value]) => ({
      monthYear: key,
      earnings: value,
    })
  )

  const jobCompletionRate =
    (data.map((item) => item.completed).filter(Boolean).length / data.length) *
    100;
  // const totalHoursWorked = "120 hours";
  const averageRating = "4.5";

  const memoizedTotalEarnings = useMemo(() => {
    const earningsData = Object.values(data).map((item) => item.earning);

    const totalEarnings = earningsData.reduce(
      (sum, earnings) => sum + +earnings,
      0
    );

    return totalEarnings;
  }, [data]);

  const performanceIndexes = [
    // {
    //   title: "Total Hours Worked",
    //   value: totalHoursWorked,
    //   icon: <Clock3 color="orange" size={30} />,
    // },
    {
      title: "Job Completion",
      value: jobCompletionRate,
      icon: <CalendarCheck color="green" size={30} />,
    },
    {
      title: "Average Rating",
      value: averageRating,
      icon: <Star color="yellow" size={30} />,
    },
  ];

  return (
    <>
      <h1 className="font-bold text-2xl">Dashboard</h1>
      <div className="mt-14">
        <div className="p-6 m-5 mx-auto flex gap-4 items-start flex-col md:flex-row">
          <div className="p-4 bg-white rounded-md shadow-sm">
            <div className="min-w-[200px] mb-4 flex gap-2 justify-between">
              <h2 className="text-lg font-semibold mb-2">Total Earnings</h2>
              <CircleDollarSign color="red" size="30" />
            </div>
            <p className="text-gray-700">${memoizedTotalEarnings}</p>
          </div>
          <div className="flex justify-center items-center grow bg-slate-200 rounded-sm shadow-sm">
            {/* <ResponsiveContainer width="100%" height="100%"> */}
            <ComposedChart
              width={500}
              height={300}
              data={mappedEarnings}
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
              }}
            >
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis dataKey="monthYear" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip />
              <Bar dataKey="earnings" barSize={20} fill="#be123c" />
              <Line type="monotone" dataKey="earnings" stroke="#facc15" />
            </ComposedChart>
            {/* </ResponsiveContainer> */}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {performanceIndexes.map((item) => (
            <div
              className="p-4 bg-teal-900 rounded-md shadow-md"
              key={item.title}
            >
              <div className="min-w-[200px] mb-4 flex gap-2 items-start justify-between">
                <h2 className="text-lg font-semibold text-white mb-2">
                  {item.title}
                </h2>
                {item.icon}
              </div>
              <p className="text-gray-200 font-semibold">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
