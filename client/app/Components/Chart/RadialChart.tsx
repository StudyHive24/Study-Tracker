'use client'
import { TrendingUp } from "lucide-react";
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useTasksContext } from "@/context/taskContext.js";
import { useEffect, useState } from "react";

export const description = "A radial chart with stacked sections";

const chartConfig = {
  desktop: {
    label: "Completed",
    color: "#8BCE89",
  },
  mobile: {
    label: "Pending",
    color: "#EB4E31",
  },
} satisfies ChartConfig;

function RadialChart() {
  const { tasks, completedTasks, activeTasks, pendingTasks } = useTasksContext();
  const tasksTotal = tasks.length;

  const [isClient, setIsClient] = useState(false);

  const chartData = [
    {
      pending: pendingTasks?.length,
      completed: completedTasks?.length,
    },
  ];

  useEffect(() => {
    setIsClient(true); // Ensures component only renders on the client side
  }, []);

  if (!isClient) {
    return null; // Prevents rendering on the server side
  }

  return (
    <Card className="flex flex-col border-none m-1 bg-gray-700 ">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-gray-100 text-[22px] text-center">Completed vs Pending Tasks</CardTitle>
        <CardDescription className="text-gray-200 text-[12px]">Task completion status.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0 text-gray-100">
        <ChartContainer
          config={chartConfig}
          className="aspect-square w-full max-w-[250px] mt-2"
        >
          <RadialBarChart
            data={chartData}
            endAngle={180}
            innerRadius={60}
            outerRadius={130}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label 
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" className="text-white">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className="fill-foreground text-2xl font-bold text-white"
                        >
                          {tasksTotal}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-muted-foreground text-gray-100"
                        >
                          Tasks
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="completed"
              stackId="a"
              cornerRadius={5}
              fill="var(--color-desktop)"
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="pending"
              fill="var(--color-mobile)"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default RadialChart;
