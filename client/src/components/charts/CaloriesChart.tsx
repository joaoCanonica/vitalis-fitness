import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { motion } from 'framer-motion';

interface CaloriesChartProps {
  tdee: number;
  bmr: number;
  activityLevel: string;
}

export function CaloriesChart({ tdee, bmr, activityLevel }: CaloriesChartProps) {
  const data = [
    { name: 'Repouso', calorias: bmr },
    { name: 'Leve', calorias: Math.round(bmr * 1.375) },
    { name: 'Moderado', calorias: Math.round(bmr * 1.55) },
    { name: 'Intenso', calorias: Math.round(bmr * 1.725) },
    { name: 'Muito Intenso', calorias: Math.round(bmr * 1.9) },
  ];

  const getActivityColor = () => {
    switch (activityLevel) {
      case 'sedentary':
        return '#3b82f6';
      case 'light':
        return '#10b981';
      case 'moderate':
        return '#f59e0b';
      case 'active':
        return '#ef4444';
      case 'very_active':
        return '#8b5cf6';
      default:
        return '#3b82f6';
    }
  };

  return (
    <motion.div
      className="w-full h-64"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
          <defs>
            <linearGradient id="colorCalorias" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={getActivityColor()} stopOpacity={0.8} />
              <stop offset="95%" stopColor={getActivityColor()} stopOpacity={0} />
            </linearGradient>
          </defs>
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
          <Area
            type="monotone"
            dataKey="calorias"
            stroke={getActivityColor()}
            fillOpacity={1}
            fill="url(#colorCalorias)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
