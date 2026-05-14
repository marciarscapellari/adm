'use client';

import {
  RadarChart as RechartsRadar,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

interface RadarDataPoint {
  subject: string;
  score: number;
  fullMark: number;
}

interface Props {
  data: RadarDataPoint[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-lg px-3 py-2 shadow-lg text-xs">
        <p className="font-semibold text-slate-700">{payload[0].payload.subject}</p>
        <p className="text-violet-600 font-bold">{payload[0].value}%</p>
      </div>
    );
  }
  return null;
}

export default function RadarChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={360}>
      <RechartsRadar
        data={data}
        margin={{ top: 20, right: 30, bottom: 20, left: 30 }}
      >
        <PolarGrid stroke="#e2e8f0" />
        <PolarAngleAxis
          dataKey="subject"
          tick={{ fontSize: 11, fontWeight: 600, fill: '#475569' }}
        />
        <PolarRadiusAxis
          angle={90}
          domain={[0, 100]}
          tickCount={6}
          tick={{ fontSize: 9, fill: '#94a3b8' }}
          axisLine={false}
        />
        <Radar
          name="Score"
          dataKey="score"
          stroke="#7c3aed"
          fill="#7c3aed"
          fillOpacity={0.2}
          strokeWidth={2}
          dot={{ fill: '#7c3aed', r: 4, strokeWidth: 0 }}
        />
        <Tooltip content={<CustomTooltip />} />
      </RechartsRadar>
    </ResponsiveContainer>
  );
}
