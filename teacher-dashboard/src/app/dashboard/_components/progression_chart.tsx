"use client";
import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { timeStamp: "0 min", groupA: 0, groupB: 0, groupC: 0 },
  { timeStamp: "5 min", groupA: 20, groupB: 15, groupC: 30 },
  { timeStamp: "10 min", groupA: 25, groupB: 18, groupC: 35 },
  { timeStamp: "15 min", groupA: 30, groupB: 22, groupC: 40 },
  { timeStamp: "20 min", groupA: 35, groupB: 25, groupC: 45 },
  { timeStamp: "25 min", groupA: 40, groupB: 30, groupC: 50 },
  { timeStamp: "30 min", groupA: 45, groupB: 35, groupC: 55 },
  { timeStamp: "35 min", groupA: 65, groupB: 35, groupC: 70 },
  { timeStamp: "40 min", groupA: 70, groupB: 35, groupC: 75 },
  { timeStamp: "45 min", groupA: 70, groupB: 35, groupC: 80 },
  { timeStamp: "50 min", groupA: 70, groupB: 35, groupC: 82 },
  { timeStamp: "55 min", groupA: 70, groupB: 35, groupC: 81 },
  { timeStamp: "60 min", groupA: 70, groupB: 35, groupC: 100 },
];

const chartConfig = {
  groupA: {
    label: "Group A",
    color: "hsl(var(--chart-1))",
  },
  groupB: {
    label: "Group B",
    color: "hsl(var(--chart-2))",
  },
  groupC: {
    label: "Group C",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export default function ProgressionChart() {
  return (
    <div>
      {/* <h2>Class progression</h2> */}
      <ChartContainer className="min-h-[200px] w-full" config={chartConfig}>
        <LineChart
          accessibilityLayer
          data={chartData}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <YAxis
            tickMargin={8}
            tickLine={false}
            axisLine={false}
            domain={[0, 100]}
            tickFormatter={(value) => `${value}%`} // Format Y-axis values as percentages
          />
          <CartesianGrid vertical={true} />
          <XAxis
            dataKey="timeStamp"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            domain={[0, 60]}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <Line
            dataKey="groupA"
            type="monotone"
            stroke="var(--color-groupA)"
            strokeWidth={2}
            dot={false}
          />
          <Line
            dataKey="groupB"
            type="monotone"
            stroke="var(--color-groupB)"
            strokeWidth={2}
            dot={false}
          />
          <Line
            dataKey="groupC"
            type="monotone"
            stroke="var(--color-groupC)"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
}
