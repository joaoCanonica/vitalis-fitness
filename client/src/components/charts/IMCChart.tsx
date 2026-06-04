import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { motion } from 'framer-motion';

interface IMCChartProps {
  imc: number;
  category: string;
}

export function IMCChart({ imc, category }: IMCChartProps) {
  const data = [
    { name: 'Seu IMC', value: Math.min(imc, 40) },
    { name: 'Restante', value: Math.max(0, 40 - imc) },
  ];

  const getCategoryColor = () => {
    if (imc < 18.5) return '#3b82f6'; // Azul - Abaixo do peso
    if (imc < 25) return '#10b981'; // Verde - Peso normal
    if (imc < 30) return '#f59e0b'; // Amarelo - Sobrepeso
    return '#ef4444'; // Vermelho - Obesidade
  };

  return (
    <motion.div
      className="w-full h-64 flex flex-col items-center justify-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={2}
            dataKey="value"
          >
            <Cell fill={getCategoryColor()} />
            <Cell fill="#e5e7eb" />
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              border: 'none',
              borderRadius: '8px',
              color: '#fff',
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="text-center mt-4">
        <p className="text-3xl font-bold text-foreground">{imc.toFixed(1)}</p>
        <p className="text-sm text-muted-foreground">{category}</p>
      </div>
    </motion.div>
  );
}
