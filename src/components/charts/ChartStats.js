import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const data = [
  { name: 'Sun', task: 42 },
  { name: 'Mon', task: 90 },
  { name: 'Tue', task: 12 },
  { name: 'Wed', task: 67 },
  { name: 'Thu', task: 88 },
  { name: 'Fri', task: 23 },
  { name: 'Sat', task: 56 }
];

// console.log(data);

export default function ChartStats() {
  return (
    <AreaChart className="chartStats"
      width={600}
      fontSize={12}
      height={250}
      data={data}
      margin={{
        top: 10,
        right: 30,
        left: 0,
        bottom: 0,
      }}
    >
      <CartesianGrid strokeDasharray="1 5" />
      <XAxis
        dataKey="name"
        tick={{ dx: 10, dy:10, fill: '#999', fontSize: 12, angle: 0, textAnchor: "end" }}
        padding={{ left: 0, right: 0 }}
        axisLine={false} tickLine={false}
      />
      <YAxis tick={{ dx: -10, fontSize: 12 }} scale="auto" axisLine={false} tickLine={false} />
      <Tooltip contentStyle={{
        border: 'none',
        borderRadius: '8px',
        padding: '4px 8px', // Smaller padding
        fontSize: '12px', // Smaller font size
      }} content={<CustomTooltip/>}/>


      <defs>
        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="rgba(255, 115, 0, 0.6)" stopOpacity={0.8} />
          <stop offset="95%" stopColor="rgba(255, 115, 0, 0)" stopOpacity={0} />
        </linearGradient>
      </defs>

      <Area
        type="monotone"
        dataKey="task"
        stroke="#FF7300"
        strokeWidth={2}
        fillOpacity={0} // Start with no fill
        animationDuration={1000}
        animationEasing="ease-in-out"
        margin={{ top: 10, right: 30, left: 50, bottom: 0 }}
      />

      {/* After Stroke Animation Completes, Fill Appears */}
      <Area
        type="monotone"
        dataKey="task"
        stroke="none"
        fill="url(#colorUv)"
        animationBegin={1000} // Delays fill animation until stroke completes
        animationDuration={1500}
        animationEasing="ease-in-out"
      />


    </AreaChart>
  );
}



const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: "#fff",
        padding: "5px 10px",
        borderRadius: "5px",
        fontSize: "12px",
        boxShadow: "0px 0px 5px rgba(0,0,0,0.2)"
      }}>
        <p>
          <span>Day : </span> {payload[0].payload.name} <br />
          <span style={{color:"rgba(255, 115, 0, 0.6)", fontWeight:"500"}}>Task : </span> <span style={{color:"rgba(255, 115, 0, 0.6)", fontWeight:"500"}}>{payload[0].value}</span> 
        </p>
      </div>
    );
  }
  return null;
};
