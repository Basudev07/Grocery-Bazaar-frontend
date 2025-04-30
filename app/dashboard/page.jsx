"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"

const chartData = [
  { date: "2024-06-01", desktop: 178, mobile: 200, orders: 50 },
  { date: "2024-06-02", desktop: 470, mobile: 410, orders: 120 },
  { date: "2024-06-03", desktop: 103, mobile: 160, orders: 30 },
  { date: "2024-06-04", desktop: 439, mobile: 380, orders: 95 },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  desktop: {
    label: "Desktop",
    color: "#228B22", // Forest Green
  },
  mobile: {
    label: "Mobile",
    color: "#90EE90", // Light Green
  },
  orders: {
    label: "Orders",
    color: "#006400", // Dark Green
  }
}

export function Component() {
  const [timeRange, setTimeRange] = React.useState("90d")

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Grocery Bazaar - Statistics</CardTitle>
          <CardDescription>
            Showing total visitors and orders for the selected period
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[160px] rounded-lg sm:ml-auto">
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="90d">Last 3 months</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="7d">Last 7 days</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <AreaChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="date" tickFormatter={(value) => new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric" })} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Area dataKey="mobile" type="monotone" stroke="#90EE90" fillOpacity={0.3} />
            <Area dataKey="desktop" type="monotone" stroke="#228B22" fillOpacity={0.3} />
            <Area dataKey="orders" type="monotone" stroke="#006400" fillOpacity={0.3} />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default Component;