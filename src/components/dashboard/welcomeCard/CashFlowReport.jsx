// ... existing code ...
import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import Dropdown from "../../common/Dropdown";

const data = [
  { name: "Jan", value: 200 },
  { name: "Feb", value: 150 },
  { name: "Mar", value: 350 },
  { name: "Apr", value: 130 },
  { name: "May", value: 200 },
  { name: "Jun", value: 400 },
  { name: "Jul", value: 200 },
  { name: "Aug", value: 150 },
  { name: "Sep", value: 250 },
  { name: "Oct", value: 200 },
  { name: "Nov", value: 150 },
  { name: "Dec", value: 400 },
];

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 rounded shadow text-xs">
        <p className="font-semibold">{label}</p>
        <p>${payload[0].value}</p>
      </div>
    );
  }
  return null;
}

export default function CashFlowReport() {
  return (
    <div className="bg-white rounded-xl p-6 shadow flex flex-col gap-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-semibold text-lg">Cash Flow Report</h2>
        <Dropdown options={['Monthly']} value="Monthly" />
        
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} barSize={32}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" axisLine={false} tickLine={false} />
          <YAxis
            axisLine={false}
            tickLine={false}
            tickFormatter={v => `$${v}`}
            domain={[0, 500]}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(0,0,0,0.04)" }} />
          <Bar
            dataKey="value"
            radius={[8, 8, 0, 0]}
            fill="url(#colorUv)"
          />
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#93c5fd" stopOpacity={0.5} />
              <stop offset="100%" stopColor="#2563eb" stopOpacity={1} />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}