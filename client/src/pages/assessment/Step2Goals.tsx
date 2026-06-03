import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
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

  const goalOptions = [
    { value: 'weight_loss', label: 'Perder Peso', emoji: '📉' },
    { value: 'muscle_gain', label: 'Ganhar Massa Magra', emoji: '💪' },
    { value: 'endurance', label: 'Melhorar Resistência', emoji: '🏃' },
    { value: 'general_fitness', label: 'Fitness Geral', emoji: '⚡' },
    { value: 'other', label: 'Outro', emoji: '🎯' },
  ];

  const timeframeOptions = [
    { value: '1_month', label: '1 Mês' },
    { value: '3_months', label: '3 Meses' },
    { value: '6_months', label: '6 Meses' },
    { value: '1_year', label: '1 Ano' },
    { value: 'other', label: 'Outro' },
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
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            Seus Objetivos
          </h1>
          <span className="text-sm font-medium text-muted-foreground">
            Etapa 2 de 8
          </span>
        </div>
        <div className="w-full bg-border rounded-full h-1">
          <div className="bg-primary h-1 rounded-full" style={{ width: '25%' }} />
        </div>
      </div>

      {/* Form Container */}
      <div className="flex-1 max-w-2xl mx-auto w-full overflow-y-auto">
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {/* Objetivo Principal */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Qual é seu objetivo principal?</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {goalOptions.map((option) => (
                <motion.button
                  key={option.value}
                  onClick={() => handleInputChange('mainGoal', option.value)}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    goalData.mainGoal === option.value
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-muted-foreground'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-2xl mb-2 block">{option.emoji}</span>
                  <span className="font-medium text-foreground">{option.label}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Peso Desejado */}
          <div className="space-y-2">
            <Label htmlFor="desiredWeight" className="text-base font-medium">
              Peso Desejado (kg)
            </Label>
            <Input
              id="desiredWeight"
              type="number"
              placeholder="Ex: 70"
              value={goalData.desiredWeight}
              onChange={(e) => handleInputChange('desiredWeight', e.target.value ? parseFloat(e.target.value) : '')}
              className="h-12 text-base"
              step="0.1"
              min="30"
              max="300"
            />
          </div>

          {/* Prazo */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Em quanto tempo?</Label>
            <RadioGroup value={goalData.timeframe} onValueChange={(value) => handleInputChange('timeframe', value)}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {timeframeOptions.map((option) => (
                  <div
                    key={option.value}
                    className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer"
                  >
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label htmlFor={option.value} className="cursor-pointer font-normal flex-1">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          {/* Motivação */}
          <div className="space-y-2">
            <Label htmlFor="motivation" className="text-base font-medium">
              O que te motiva? (Opcional)
            </Label>
            <textarea
              id="motivation"
              placeholder="Ex: Quero me sentir mais confiante, melhorar minha saúde..."
              value={goalData.motivation}
              onChange={(e) => handleInputChange('motivation', e.target.value)}
              className="w-full p-3 rounded-lg border border-border bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary min-h-24 text-base"
            />
          </div>
        </motion.div>
      </div>

      {/* Navigation Buttons */}
      <motion.div
        className="flex gap-4 mt-8 pt-6 border-t border-border"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Button
          variant="outline"
          size="lg"
          onClick={prevStep}
          className="flex-1 h-12"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>
        <Button
          size="lg"
          onClick={nextStep}
          disabled={!isValid}
          className="flex-1 h-12"
        >
          Próximo
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </motion.div>
    </motion.div>
  );
}
