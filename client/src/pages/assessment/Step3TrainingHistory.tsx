import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { useAssessment } from '@/contexts/AssessmentContext';
import { ChevronRight, ChevronLeft } from 'lucide-react';

export default function Step3TrainingHistory() {
  const { trainingHistoryData, setTrainingHistoryData, nextStep, prevStep } = useAssessment();

  const handleInputChange = (field: string, value: any) => {
    setTrainingHistoryData({
      ...trainingHistoryData,
      [field]: value,
    });
  };

  const isValid =
    trainingHistoryData.experience &&
    trainingHistoryData.trainingDays;

  const experienceOptions = [
    { value: 'beginner', label: 'Iniciante (0-6 meses)', emoji: '🌱' },
    { value: 'intermediate', label: 'Intermediário (6 meses - 2 anos)', emoji: '💪' },
    { value: 'advanced', label: 'Avançado (2+ anos)', emoji: '🏆' },
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
            Histórico de Treino
          </h1>
          <span className="text-sm font-medium text-muted-foreground">
            Etapa 3 de 8
          </span>
        </div>
        <div className="w-full bg-border rounded-full h-1">
          <div className="bg-primary h-1 rounded-full" style={{ width: '37.5%' }} />
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
          {/* Experiência */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Qual é seu nível de experiência?</Label>
            <div className="space-y-3">
              {experienceOptions.map((option) => (
                <motion.button
                  key={option.value}
                  onClick={() => handleInputChange('experience', option.value)}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                    trainingHistoryData.experience === option.value
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

          {/* Dias de Treino */}
          <div className="space-y-2">
            <Label htmlFor="trainingDays" className="text-base font-medium">
              Quantos dias por semana você treina?
            </Label>
            <div className="flex gap-2 flex-wrap">
              {[2, 3, 4, 5, 6].map((days) => (
                <motion.button
                  key={days}
                  onClick={() => handleInputChange('trainingDays', days)}
                  className={`px-4 py-2 rounded-lg border-2 font-medium transition-all ${
                    trainingHistoryData.trainingDays === days
                      ? 'border-primary bg-primary text-white'
                      : 'border-border hover:border-muted-foreground'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {days}x/semana
                </motion.button>
              ))}
            </div>
          </div>

          {/* Personal Trainer */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Você tem ou já teve personal trainer?</Label>
            <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer">
              <Checkbox
                id="hasPersonalTrainer"
                checked={trainingHistoryData.hasPersonalTrainer}
                onCheckedChange={(checked) => handleInputChange('hasPersonalTrainer', checked)}
              />
              <Label htmlFor="hasPersonalTrainer" className="cursor-pointer font-normal flex-1">
                Sim, tenho/tive personal trainer
              </Label>
            </div>
          </div>

          {/* Nutricionista */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Você tem ou já teve nutricionista?</Label>
            <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer">
              <Checkbox
                id="hasNutritionist"
                checked={trainingHistoryData.hasNutritionist}
                onCheckedChange={(checked) => handleInputChange('hasNutritionist', checked)}
              />
              <Label htmlFor="hasNutritionist" className="cursor-pointer font-normal flex-1">
                Sim, tenho/tive nutricionista
              </Label>
            </div>
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
