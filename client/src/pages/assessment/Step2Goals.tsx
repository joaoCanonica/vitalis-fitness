import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAssessment } from '@/contexts/AssessmentContext';
import { ChevronRight, ChevronLeft } from 'lucide-react';

export default function Step2Goals() {
  const { goalData, setGoalData, nextStep, prevStep } = useAssessment();

  const handleInputChange = (field: string, value: any) => {
    setGoalData({
      ...goalData,
      [field]: value,
    });
  };

  const isValid =
    goalData.mainGoal &&
    goalData.desiredWeight &&
    goalData.timeframe &&
    goalData.motivation;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  const goalOptions = [
    { value: 'weight_loss', label: 'Perder Peso', emoji: '⬇️' },
    { value: 'muscle_gain', label: 'Ganhar Massa', emoji: '💪' },
    { value: 'endurance', label: 'Resistência', emoji: '🏃' },
    { value: 'general_fitness', label: 'Fitness Geral', emoji: '⚖️' },
  ];

  const timeframeOptions = [
    { value: '1_month', label: '1 Mês' },
    { value: '3_months', label: '3 Meses' },
    { value: '6_months', label: '6 Meses' },
    { value: '1_year', label: '1 Ano' },
  ];

  return (
    <motion.div
      className="min-h-screen bg-background p-4 sm:p-6 flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <motion.div className="mb-8" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">
              Etapa 2 de 8
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
              Seus Objetivos
            </h1>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-border rounded-full h-1.5 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-blue-400"
            initial={{ width: '0%' }}
            animate={{ width: '25%' }}
            transition={{ duration: 0.6, delay: 0.2 }}
          />
        </div>
      </motion.div>

      {/* Form Container */}
      <div className="flex-1 max-w-2xl mx-auto w-full overflow-y-auto">
        <motion.div
          className="space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Objetivo Principal */}
          <motion.div className="space-y-3" variants={itemVariants}>
            <Label className="text-sm font-semibold text-foreground">
              Qual é seu objetivo principal?
            </Label>
            <div className="grid grid-cols-2 gap-3">
              {goalOptions.map((option) => (
                <motion.button
                  key={option.value}
                  onClick={() => handleInputChange('mainGoal', option.value)}
                  className={`p-4 rounded-lg border-2 transition-all text-center ${
                    goalData.mainGoal === option.value
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-muted-foreground'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-2xl block mb-1">{option.emoji}</span>
                  <span className="text-sm font-medium">{option.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Peso Desejado */}
          <motion.div className="space-y-2.5" variants={itemVariants}>
            <Label htmlFor="desiredWeight" className="text-sm font-semibold text-foreground">
              Peso Desejado (kg)
            </Label>
            <Input
              id="desiredWeight"
              type="number"
              placeholder="70"
              value={goalData.desiredWeight}
              onChange={(e) => handleInputChange('desiredWeight', parseInt(e.target.value) || '')}
              className="h-11 text-base"
            />
          </motion.div>

          {/* Prazo */}
          <motion.div className="space-y-3" variants={itemVariants}>
            <Label className="text-sm font-semibold text-foreground">
              Em quanto tempo?
            </Label>
            <div className="grid grid-cols-2 gap-3">
              {timeframeOptions.map((option) => (
                <motion.button
                  key={option.value}
                  onClick={() => handleInputChange('timeframe', option.value)}
                  className={`p-3 rounded-lg border-2 transition-all font-medium text-sm ${
                    goalData.timeframe === option.value
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-muted-foreground'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {option.label}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Motivação */}
          <motion.div className="space-y-2.5" variants={itemVariants}>
            <Label htmlFor="motivation" className="text-sm font-semibold text-foreground">
              O que te motiva? (Opcional)
            </Label>
            <textarea
              id="motivation"
              placeholder="Ex: Quero me sentir mais confiante, melhorar minha saúde..."
              value={goalData.motivation}
              onChange={(e) => handleInputChange('motivation', e.target.value)}
              className="w-full p-3 rounded-lg border border-border bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary min-h-20 text-base resize-none"
            />
          </motion.div>

          {/* Info Box */}
          <motion.div
            className="mt-8 p-4 rounded-lg bg-primary/5 border border-primary/20"
            variants={itemVariants}
          >
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">💡 Dica:</span> Objetivos realistas e bem definidos aumentam suas chances de sucesso.
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Navigation Buttons */}
      <motion.div
        className="flex gap-3 mt-8 pt-6 border-t border-border"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Button
          variant="outline"
          size="lg"
          onClick={prevStep}
          className="flex-1 h-11"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>
        <Button
          size="lg"
          onClick={nextStep}
          disabled={!isValid}
          className="flex-1 h-11"
        >
          Próximo
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </motion.div>
    </motion.div>
  );
}
