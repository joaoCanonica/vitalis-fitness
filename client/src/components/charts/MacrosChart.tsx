import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { motion } from 'framer-motion';

interface MacrosChartProps {
  protein: number;
  carbs: number;
  fats: number;
}

export function MacrosChart({ protein, carbs, fats }: MacrosChartProps) {
  const data = [
    {
      name: 'Macronutrientes',
      'Proteína (g)': protein,
      'Carbos (g)': carbs,
      'Gordura (g)': fats,
    },
  ];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b'];

  return (
    <motion.div
      className="w-full h-64"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="name" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              border: 'none',
              borderRadius: '8px',
              color: '#fff',
            }}
          />
          <Legend />
          <Bar dataKey="Proteína (g)" fill={COLORS[0]} radius={[8, 8, 0, 0]} />
          <Bar dataKey="Carbos (g)" fill={COLORS[1]} radius={[8, 8, 0, 0]} />
          <Bar dataKey="Gordura (g)" fill={COLORS[2]} radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
