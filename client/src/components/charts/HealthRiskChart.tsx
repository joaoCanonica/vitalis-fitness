import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { motion } from 'framer-motion';

interface HealthRiskChartProps {
  cardiovascularRisk: number;
  metabolicRisk: number;
  musculoskeletalRisk: number;
}

export function HealthRiskChart({
  cardiovascularRisk,
  metabolicRisk,
  musculoskeletalRisk,
}: HealthRiskChartProps) {
  const data = [
    { x: cardiovascularRisk, y: metabolicRisk, z: 400, name: 'Seu Perfil' },
    { x: 50, y: 50, z: 200, name: 'Ideal' },
  ];

  const getRiskColor = (value: number) => {
    if (value < 30) return '#10b981'; // Verde
    if (value < 60) return '#f59e0b'; // Amarelo
    return '#ef4444'; // Vermelho
  };

  return (
    <motion.div
      className="w-full h-64"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="x" name="Risco Cardiovascular" stroke="#6b7280" />
          <YAxis dataKey="y" name="Risco Metabólico" stroke="#6b7280" />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              border: 'none',
              borderRadius: '8px',
              color: '#fff',
            }}
            cursor={{ strokeDasharray: '3 3' }}
          />
          <Scatter name="Seu Perfil" data={[data[0]]} fill="#3b82f6" />
          <Scatter name="Ideal" data={[data[1]]} fill="#10b981" />
        </ScatterChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
