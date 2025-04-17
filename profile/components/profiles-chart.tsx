"use client"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { useState, useEffect } from "react"

export function ProfilesChart() {
  const [data, setData] = useState([
    { date: "Jan 1", profiles: 12 },
    { date: "Jan 5", profiles: 18 },
    { date: "Jan 10", profiles: 24 },
    { date: "Jan 15", profiles: 30 },
    { date: "Jan 20", profiles: 22 },
    { date: "Jan 25", profiles: 28 },
    { date: "Jan 30", profiles: 36 },
    { date: "Feb 5", profiles: 42 },
    { date: "Feb 10", profiles: 48 },
    { date: "Feb 15", profiles: 54 },
    { date: "Feb 20", profiles: 60 },
    { date: "Feb 25", profiles: 66 },
    { date: "Mar 1", profiles: 72 },
  ])

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setData((prevData) => {
        // Create a copy of the data
        const newData = [...prevData]

        // Randomly update some values
        for (let i = 0; i < 3; i++) {
          const randomIndex = Math.floor(Math.random() * newData.length)
          const currentValue = newData[randomIndex].profiles
          // Add or subtract a random amount (1-5)
          const change = Math.floor(Math.random() * 5) + 1
          newData[randomIndex] = {
            ...newData[randomIndex],
            profiles: Math.max(10, currentValue + (Math.random() > 0.5 ? change : -change)),
          }
        }

        return newData
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="h-[300px]">
      <ChartContainer
        config={{
          profiles: {
            label: "Profiles",
            color: "hsl(var(--primary))",
          },
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="profileGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted/30" />
            <XAxis dataKey="date" className="text-xs text-muted-foreground" tickLine={false} axisLine={false} />
            <YAxis className="text-xs text-muted-foreground" tickLine={false} axisLine={false} />
            <ChartTooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <ChartTooltipContent
                      className="border-primary animated-border"
                      value={`${payload[0].value} profiles`}
                      label={payload[0].payload.date}
                    />
                  )
                }
                return null
              }}
            />
            <Area
              type="monotone"
              dataKey="profiles"
              stroke="hsl(var(--primary))"
              fill="url(#profileGradient)"
              strokeWidth={2}
              className="data-point"
              activeDot={{ r: 6, className: "pulse-animation" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}
