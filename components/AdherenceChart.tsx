import React from 'react'
import { BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const adherenceData = [
  { name: "Jan", taken: 80, missed: 20 },
  { name: "Feb", taken: 85, missed: 15 },
  { name: "Mar", taken: 75, missed: 25 },
  { name: "Apr", taken: 90, missed: 10 },
];

interface AdherenceSummary {
  taken: number;
  missed: number;
}

const COLORS = ["#4CAF50", "#FF5733"];

const AdherenceChart: React.FC<{ adherenceSummary: AdherenceSummary }> = ({ adherenceSummary }) => {
  const data = [
    { name: "Taken", value: adherenceSummary.taken },
    { name: "Missed", value: adherenceSummary.missed },
  ];

  return (
    <div className='flex flex-col lg:flex-row gap-4 md:gap-6 lg:gap-8'>
      {/* Pie Chart */}
      <div className="w-full lg:w-1/2 h-64 sm:h-80 md:h-96 bg-white rounded-lg p-3 md:p-4 shadow">
        <h2 className="text-base md:text-lg font-semibold mb-2 md:mb-4 text-center">Prescription Adherence</h2>
        <ResponsiveContainer width="100%" height="80%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={60}
              innerRadius={30}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`${value} medications`, '']} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart */}
      <div className="w-full lg:w-1/2 bg-white rounded-lg p-3 md:p-4 shadow">
        <h2 className="text-base md:text-lg font-semibold mb-2 md:mb-4 text-center">Monthly Adherence Trend</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={adherenceData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip 
              formatter={(value) => [`${value} medications`, '']}
              labelFormatter={(label) => `Month: ${label}`}
            />
            <Legend />
            <Bar 
              dataKey="taken" 
              fill="#4CAF50" 
              name="Taken" 
              radius={[4, 4, 0, 0]} 
            />
            <Bar 
              dataKey="missed" 
              fill="#FF5733" 
              name="Missed" 
              radius={[4, 4, 0, 0]} 
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default AdherenceChart;