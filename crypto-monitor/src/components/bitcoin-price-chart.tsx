'use client'

import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export interface DataPoint {
  price: number;
  time: number;
}

interface BitcoinPriceChartProps {
  data: DataPoint[];
}

export function BitcoinPriceChart({ data }: BitcoinPriceChartProps) {
  const [focusBar, setFocusBar] = useState<number | null>(null);

  const formatXAxis = (tickItem: number) => {
    return new Date(tickItem).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const formatYAxis = (tickItem: number) => {
    return `$${(tickItem / 1000).toFixed(0)}k`;
  };

  const formatTooltip = (value: number, name: string, props: { payload: { time: number } }) => {
    const date = new Date(props.payload.time).toLocaleDateString('en-US', { month: 'long', year: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' });
    return [`$${value.toFixed(2)}`, `Date: ${date}`];
  };

  return (
    <Card className="mx-auto w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Bitcoin Price Chart (1 Year)</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            onMouseMove={(state) => {
              if (state.isTooltipActive) {
                setFocusBar(state.activeTooltipIndex ?? null);
              } else {
                setFocusBar(null);
              }
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="time" 
              tickFormatter={formatXAxis} 
              domain={['auto', 'auto']}
            />
            <YAxis 
              tickFormatter={formatYAxis}
              domain={[(dataMin: number) => Math.floor(dataMin * 0.9 / 1000) * 1000, (dataMax: number) => Math.ceil(dataMax * 1.1 / 1000) * 1000]}
            />
            <Tooltip formatter={(value: number, name: string, props: { payload?: { time: number } }) => {
              if (props.payload?.time) {
                return formatTooltip(value, name, { payload: { time: props.payload.time } });
              }
              return [];
            }} />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="price" 
              name="Bitcoin Price"
              stroke="hsl(var(--primary))" 
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
        {/* <div className="flex justify-center mt-4 space-x-2">
          {data.map((entry, index) => (
            <Button
              key={index}
              variant={focusBar === index ? "default" : "outline"}
              size="sm"
              onClick={() => setFocusBar(index)}
            >
              {new Date(entry.time).toLocaleDateString('en-US', { month: 'short' })}
            </Button>
          ))}
        </div> */}
      </CardContent>
    </Card>
  );
}