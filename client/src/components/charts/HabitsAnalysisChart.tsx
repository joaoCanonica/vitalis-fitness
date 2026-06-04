import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

interface HabitsAnalysisChartProps {
  sleepScore: number;
  hydrationScore: number;
  stressScore: number;
  nutritionScore: number;
}

export function HabitsAnalysisChart({
  sleepScore,
  hydrationScore,
  stressScore,
  nutritionScore,
}: HabitsAnalysisChartProps) {
  const data = [
    { name: 'Sono', score: sleepScore },
    { name: 'Hidratação', score: hydrationScore },
    { name: 'Estresse', score: 100 - stressScore }, // Invertido porque menor é melhor
    { name: 'Nutrição', score: nutritionScore },
  ];

  return (
    <motion.div
      className="w-full h-64"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="name" stroke="#6b7280" />
          <YAxis domain={[0, 100]} stroke="#6b7280" />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              border: 'none',
              borderRadius: '8px',
              color: '#fff',
            }}
            formatter={(value) => `${value}%`}
          />
          <Bar
            dataKey="score"
            fill="#3b82f6"
            radius={[8, 8, 0, 0]}
            animationDuration={1000}
          />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
