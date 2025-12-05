import React, { useMemo } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Cell,
} from "recharts";
import Dropdown from "../../common/Dropdown";
import { useBankStore } from "../../../store/useBankStore";

const shortMonths = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const fullMonths = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 rounded shadow text-xs border border-gray-100">
        <p className="font-semibold text-gray-700">{label}</p>
        <p className="text-primary font-bold">${payload[0].value.toLocaleString()}</p>
      </div>
    );
  }
  return null;
}

export default function CashFlowReport({ months, selectedMonth, onMonthChange }) {
  const { transactions } = useBankStore();
  
  // Find the selected month index for highlighting
  const selectedIndex = months.indexOf(selectedMonth);

  // Calculate monthly net flow (Income - Expenses) or just Income?
  // Let's show Total Credits (Income) to keep it positive and simple for "Cash Flow" visual
  // Or Net? If net is negative, bar chart needs handling.
  // Let's show Total Volume (absolute value of all transactions) or just Credits.
  // Given "Cash Flow", often implies liquidity coming in.
  // Let's go with Total Credits (Deposits/Income) per month.
  
  const data = useMemo(() => {
    // Initialize data structure
    const monthlyData = shortMonths.map(m => ({ name: m, value: 0 }));

    transactions.forEach(tx => {
      const date = new Date(tx.date);
      const monthIndex = date.getMonth(); // 0-11
      
      // Add amount if Credit, maybe subtract if Debit?
      // For a "Report" usually we want to see activity.
      // Let's show "Net Income" (Credits). 
      // If we want to show Spending, we could make another chart.
      // Let's just sum up Credits for positive cash flow.
      if (tx.type === 'Credit') {
        monthlyData[monthIndex].value += tx.amount;
      }
      // If we want Net:
      // if (tx.type === 'Debit') monthlyData[monthIndex].value -= tx.amount;
    });

    return monthlyData;
  }, [transactions]);


  return (
    <div className="bg-white rounded-xl p-6 shadow flex flex-col gap-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-semibold text-lg">Income Flow</h2>
        <Dropdown
          options={months}
          value={selectedMonth}
          onChange={e => onMonthChange(e.target.value)}
        />
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} barSize={32}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{fill: '#9ca3af', fontSize: 12}}
            dy={10}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tickFormatter={v => `$${v >= 1000 ? (v/1000).toFixed(1) + 'k' : v}`}
            tick={{fill: '#9ca3af', fontSize: 12}}
            width={45}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(0,0,0,0.04)" }} />
          <Bar
            dataKey="value"
            radius={[4, 4, 0, 0]}
            fill="url(#colorUv)"
          >
            {
              data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={index === selectedIndex ? "#2563eb" : "url(#colorUv)"}
                  opacity={index === selectedIndex ? 1 : 0.6}
                />
              ))
            }
          </Bar>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#60a5fa" stopOpacity={1} />
              <stop offset="100%" stopColor="#2563eb" stopOpacity={1} />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}