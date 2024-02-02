"use client";

import React, { useMemo } from "react";
import { CalendarCheck, CircleDollarSign, Clock3, Star } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function Dashboard() {
  const jobCompletionRate = "85%";
  const totalHoursWorked = "120 hours";
  const averageRating = "4.5";

  const data = [
    { month: "January", earnings: 2000 },
    { month: "February", earnings: 3000 },
    { month: "March", earnings: 1500 },
    { month: "April", earnings: 4000 },
    { month: "May", earnings: 2500 },
    { month: "June", earnings: 3500 },
  ];
  const memoizedTotalEarnings = useMemo(() => {
    const earningsData = Object.values(data).map((item) => item.earnings);

    const totalEarnings = earningsData.reduce(
      (sum, earnings) => sum + earnings,
      0
    );

    return totalEarnings;
  }, [data]);

  const performanceIndexes = [
    {
      title: "Total Hours Worked",
      value: totalHoursWorked,
      icon: <Clock3 color="orange" size={30}/>,
    },
    {
      title: "Job Completion Rate",
      value: jobCompletionRate,
      icon: <CalendarCheck color="green" size={30}/>,
    },
    {
      title: "Average Rating",
      value: averageRating,
      icon: <Star color="yellow" size={30}/>,
    },
    
  ];

  const darkModeOptions = {
    background: "#333",
    text: "#fff",
    gridLines: "#555",
    lineColor: "rgba(75,192,192,1)",
  };

  return (
    <>
      <h1>Dashboard</h1>
      <div className="mt-14">
        <div className="p-6 m-5 mx-auto flex gap-4 items-start justify-between flex-col md:flex-row">
          <div className="p-4 bg-white rounded-md shadow-md">
            <div className="min-w-[200px] mb-4 flex gap-2 justify-between">
              <h2 className="text-lg font-semibold mb-2">Total Earnings</h2>
              <CircleDollarSign color="red" size="30" />
            </div>
            <p className="text-gray-700">${memoizedTotalEarnings}</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={data}
              style={{
                background: darkModeOptions.background,
                padding: "10px",
                borderRadius: "10px",
              }}
            >
              <CartesianGrid stroke={darkModeOptions.gridLines} />
              <XAxis
                dataKey="month"
                tick={{ fill: darkModeOptions.text }}
                style={{ fontSize: "12px" }}
              />
              <YAxis
                tick={{ fill: darkModeOptions.text }}
                style={{ fontSize: "12px" }}
              />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="earnings"
                stroke={darkModeOptions.lineColor}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {performanceIndexes.map((item) => (
            <div className="p-4 bg-teal-900 rounded-md shadow-md">
              <div className="min-w-[200px] mb-4 flex gap-2 items-start justify-between">
                <h2 className="text-lg font-semibold text-white mb-2">{item.title}</h2>
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
