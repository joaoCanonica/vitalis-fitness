import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts';
import { motion } from 'framer-motion';

interface FitnessProfileChartProps {
  strength: number;
  endurance: number;
  flexibility: number;
  balance: number;
  recovery: number;
}

export function FitnessProfileChart({
  strength,
  endurance,
  flexibility,
  balance,
  recovery,
}: FitnessProfileChartProps) {
  const data = [
    { subject: 'Força', A: strength },
    { subject: 'Resistência', A: endurance },
    { subject: 'Flexibilidade', A: flexibility },
    { subject: 'Equilíbrio', A: balance },
    { subject: 'Recuperação', A: recovery },
  ];

  return (
    <motion.div
      className="w-full h-64 flex items-center justify-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data}>
          <PolarGrid stroke="#e5e7eb" />
          <PolarAngleAxis dataKey="subject" stroke="#6b7280" />
          <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#9ca3af" />
          <Radar
            name="Seu Perfil"
            dataKey="A"
            stroke="#3b82f6"
            fill="#3b82f6"
            fillOpacity={0.6}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              border: 'none',
              borderRadius: '8px',
              color: '#fff',
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
