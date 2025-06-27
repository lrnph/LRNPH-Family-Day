import type { BoothClaim } from '@types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { legends } from '@constants';
import { getChart } from '@services';
import { useQuery } from '@tanstack/react-query';
import { UserIcon } from "@icons";
import { useState } from "react";
import { departments } from "@constants";
import Combobox from "@components/combobox";

const DashboardBarChart = () => {
  const [selectedDepartment, setSelectedDepartment] = useState<string>("All");

  const { data, isLoading } = useQuery<BoothClaim[]>({
    queryKey: ['chart', selectedDepartment],
    queryFn: () => getChart(selectedDepartment),
  });


  if (isLoading || !data || data.length === 0) {
    return (
      <section className="w-full flex flex-col items-center justify-center ring-2 ring-neutral-950 border-1 border-neutral-700 rounded-2xl h-full bg-gradient-to-b from-neutral-400/10 to-neutral-900">
        <p className="text-neutral-400 text-lg">
          {isLoading ? "Loading..." : "No Data"}
        </p>
      </section>
    );
  }

  return (
    <section className="w-full flex flex-col items-center justify-center ring-2 ring-neutral-950 border-1 border-neutral-700 rounded-2xl h-full bg-gradient-to-b from-neutral-400/10 to-neutral-900">
      <div className="p-4 w-full flex items-center justify-between border-b-2 border-neutral-950">
        <div className="flex items-center justify-start">
          <figure className="w-10 h-10 flex items-center justify-center">
            <UserIcon className="w-6 h-6 stroke-2 stroke-neutral-500" />
          </figure>
          <h1 className="text-xl font-normal tracking-tight text-neutral-200">Booth Claims</h1>
        </div>
        <Combobox 
          placeholder="Select a department" 
          onChange={setSelectedDepartment} 
          value={selectedDepartment} 
          items={departments} 
        />
      </div>

      <div className="p-4 w-full h-full flex flex-col items-center justify-start border-t border-neutral-700">
        <div className="w-full h-fit flex items-center justify-start gap-4 pb-6 pt-4 px-2">
          {legends.map((legend, index) => (
            <div className="flex items-center justify-center gap-2" key={index}>
              <span className={legend.className + " w-4 h-4 rounded-md"} />
              <label className="text-lg text-neutral-400">{legend.name}</label>
            </div>
          ))}
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={data} 
            margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
            barGap={2}
          >
            <CartesianGrid 
              vertical={false} 
              strokeDasharray="4 5" 
              strokeLinejoin='round'
              strokeWidth={1}
              stroke="#404040"
            />
            <XAxis 
              dataKey="name" 
              className="tracking-wider uppercase"
              tickLine={false}
              axisLine={false}
              tick={{ 
                transform: "translate(-3, 0)", 
                fontSize: 12,
                fontWeight: 400,
                fill: "#a3a3a3",
              }}
              tickMargin={15}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false}
            />
            <Tooltip 
              cursor={{ fill: 'none' }}
            />
            <Bar 
              dataKey="claimed" 
              fill="#22c55e" 
              radius={[4, 4, 0, 0]} 
              barSize={30}
              label={{ position: 'insideTop', fill: '#fff', fontSize: 16 }}

            />
            <Bar 
              dataKey="unclaimed" 
              fill="#84cc16" 
              radius={[4, 4, 0, 0]} 
              barSize={30}
              label={{ position: 'insideTop', fill: '#fffb ', fontSize: 16 }}

            />
          </BarChart>
        </ResponsiveContainer>
      
      </div>
    </section>
  );
};

export default DashboardBarChart;
