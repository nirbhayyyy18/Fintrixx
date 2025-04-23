"use client";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { formatCurrency } from "@/utils/currency";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border rounded-lg shadow-lg">
        <p className="font-bold">{label}</p>
        <p className="text-[#8884d8]">Budget: {formatCurrency(payload[0].value)}</p>
        <p className="text-[#82ca9d]">Spent: {formatCurrency(payload[1].value)}</p>
        <p className="text-[#ffc658]">Remaining: {formatCurrency(payload[2].value)}</p>
      </div>
    );
  }
  return null;
};

export default function BarChartDashboard({ budgetList }) {
  // Transform the data to match the chart requirements
  const chartData = React.useMemo(() => {
    if (!budgetList || budgetList.length === 0) return [];
    
    return budgetList.map(budget => ({
      name: budget.name || 'Unnamed Budget',
      Budget: Number(budget.amount || 0),
      Spent: Number(budget.totalSpend || 0),
      Remaining: Math.max(0, Number(budget.amount || 0) - Number(budget.totalSpend || 0))
    }));
  }, [budgetList]);

  if (!budgetList || budgetList.length === 0) {
    return (
      <div className="border rounded-lg p-5">
        <h2 className="font-bold text-lg">Activity</h2>
        <div className="h-[300px] mt-5 flex items-center justify-center">
          <p className="text-gray-500">No budget data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="border rounded-lg p-5">
      <h2 className="font-bold text-lg">Activity</h2>
      <div className="h-[300px] mt-5">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12 }}
              interval={0}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis 
              tickFormatter={(value) => formatCurrency(value)}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar 
              dataKey="Budget" 
              fill="#8884d8" 
              name="Budget" 
              stackId="a"
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              dataKey="Spent" 
              fill="#82ca9d" 
              name="Spent" 
              stackId="a"
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              dataKey="Remaining" 
              fill="#ffc658" 
              name="Remaining" 
              stackId="a"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
