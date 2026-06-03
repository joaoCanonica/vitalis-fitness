import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
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

  const experienceOptions = [
    { value: 'beginner', label: 'Iniciante', description: '0-6 meses', emoji: '🌱' },
    { value: 'intermediate', label: 'Intermediário', description: '6 meses - 2 anos', emoji: '💪' },
    { value: 'advanced', label: 'Avançado', description: '2+ anos', emoji: '🏆' },
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
              Etapa 3 de 8
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
              Histórico de Treino
            </h1>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-border rounded-full h-1.5 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-blue-400"
            initial={{ width: '0%' }}
            animate={{ width: '37.5%' }}
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
          {/* Experiência */}
          <motion.div className="space-y-3" variants={itemVariants}>
            <Label className="text-sm font-semibold text-foreground">
              Qual é seu nível de experiência?
            </Label>
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
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{option.emoji}</span>
                    <div>
                      <p className="font-semibold text-foreground">{option.label}</p>
                      <p className="text-xs text-muted-foreground">{option.description}</p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Dias de Treino */}
          <motion.div className="space-y-3" variants={itemVariants}>
            <Label className="text-sm font-semibold text-foreground">
              Quantos dias por semana você treina?
            </Label>
            <div className="flex gap-2 flex-wrap">
              {[2, 3, 4, 5, 6].map((days) => (
                <motion.button
                  key={days}
                  onClick={() => handleInputChange('trainingDays', days)}
                  className={`px-4 py-2.5 rounded-lg border-2 font-semibold transition-all text-sm ${
                    trainingHistoryData.trainingDays === days
                      ? 'border-primary bg-primary text-white'
                      : 'border-border hover:border-muted-foreground'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {days}x
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Personal Trainer */}
          <motion.div className="space-y-3" variants={itemVariants}>
            <Label className="text-sm font-semibold text-foreground">
              Profissionais
            </Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer">
                <Checkbox
                  id="hasPersonalTrainer"
                  checked={trainingHistoryData.hasPersonalTrainer}
                  onCheckedChange={(checked) => handleInputChange('hasPersonalTrainer', checked)}
                />
                <Label htmlFor="hasPersonalTrainer" className="cursor-pointer font-normal flex-1">
                  Tenho/tive personal trainer
                </Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer">
                <Checkbox
                  id="hasNutritionist"
                  checked={trainingHistoryData.hasNutritionist}
                  onCheckedChange={(checked) => handleInputChange('hasNutritionist', checked)}
                />
                <Label htmlFor="hasNutritionist" className="cursor-pointer font-normal flex-1">
                  Tenho/tive nutricionista
                </Label>
              </div>
            </div>
          </motion.div>

          {/* Info Box */}
          <motion.div
            className="mt-8 p-4 rounded-lg bg-primary/5 border border-primary/20"
            variants={itemVariants}
          >
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">💡 Dica:</span> Essas informações ajudam a personalizar seu plano de treino.
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
