import React from 'react'
import { BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, } from "recharts";

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
    <div className='flex flex-row gap-10'>
    <div className="w-1/2 h-96 flex flex-col items-center justify-center">
        <h2 className="text-lg font-semibold mb-4">Prescription Adherence</h2>
        <ResponsiveContainer width="100%" height="80%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    <div className="w-full rounded-xl p-4">
        <h2 className="text-lg font-semibold mb-4">Adherence Data</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={adherenceData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="taken" fill="#22b73a" name="Taken" />
            <Bar dataKey="missed" fill="#F44336" name="Missed" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      </div>

  )
}

export default AdherenceChart