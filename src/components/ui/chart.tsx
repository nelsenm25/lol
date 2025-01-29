import { Bar, BarChart as RechartsBarChart, Line, LineChart as RechartsLineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

interface ChartProps {
  data: any[];
  className?: string;
}

export function BarChart({ data, className }: ChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%" className={className}>
      <RechartsBarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "rgba(0,0,0,0.8)",
            border: "1px solid rgba(0,255,140,0.2)",
            borderRadius: "8px",
          }}
          labelStyle={{ color: "#00ff8c" }}
        />
        <Bar
          dataKey="value"
          fill="#00ff8c"
          radius={[4, 4, 0, 0]}
          className="fill-[#00ff8c] opacity-70"
        />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}

export function LineChart({ data, className }: ChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%" className={className}>
      <RechartsLineChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "rgba(0,0,0,0.8)",
            border: "1px solid rgba(0,255,140,0.2)",
            borderRadius: "8px",
          }}
          labelStyle={{ color: "#00ff8c" }}
        />
        <Line
          type="monotone"
          dataKey="users"
          stroke="#00ff8c"
          strokeWidth={2}
          dot={{ fill: "#00ff8c" }}
          className="stroke-[#00ff8c] opacity-70"
        />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
}
