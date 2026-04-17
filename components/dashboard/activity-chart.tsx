"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

export function ActivityChart({
  data
}: {
  data: Array<{ day: string; created: number; manual: number; sold: number }>;
}) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ left: 0, right: 12, top: 8, bottom: 0 }}>
          <defs>
            <linearGradient id="createdFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0f9f7a" stopOpacity={0.35} />
              <stop offset="95%" stopColor="#0f9f7a" stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="manualFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.22} />
              <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#d8dee8" />
          <XAxis dataKey="day" tickLine={false} axisLine={false} fontSize={12} />
          <YAxis tickLine={false} axisLine={false} fontSize={12} width={28} />
          <Tooltip
            contentStyle={{
              borderRadius: 8,
              border: "1px solid #d8dee8",
              boxShadow: "0 12px 30px rgb(15 23 42 / 0.12)"
            }}
          />
          <Area
            type="monotone"
            dataKey="created"
            stroke="#0f9f7a"
            fill="url(#createdFill)"
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="manual"
            stroke="#f43f5e"
            fill="url(#manualFill)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
