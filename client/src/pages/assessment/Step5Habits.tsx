import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { useAssessment } from '@/contexts/AssessmentContext';
import { ChevronRight, ChevronLeft } from 'lucide-react';

export default function Step5Habits() {
  const { habitsData, setHabitsData, nextStep, prevStep } = useAssessment();

  const handleInputChange = (field: string, value: any) => {
    setHabitsData({
      ...habitsData,
      [field]: value,
    });
  };

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

  const sleepQualityOptions = [
    { value: 'poor', label: 'Ruim', emoji: '😴' },
    { value: 'fair', label: 'Razoável', emoji: '😐' },
    { value: 'good', label: 'Boa', emoji: '😊' },
    { value: 'excellent', label: 'Excelente', emoji: '😴✨' },
  ];

  const alcoholOptions = [
    { value: 'never', label: 'Nunca' },
    { value: 'rarely', label: 'Raramente' },
    { value: 'sometimes', label: 'Às vezes' },
    { value: 'frequently', label: 'Frequentemente' },
  ];

  const smokingOptions = [
    { value: 'never', label: 'Nunca fumei' },
    { value: 'quit', label: 'Parei de fumar' },
    { value: 'occasional', label: 'Ocasionalmente' },
    { value: 'daily', label: 'Diariamente' },
  ];

  const stressOptions = [
    { value: 'low', label: 'Baixo', emoji: '😌' },
    { value: 'moderate', label: 'Moderado', emoji: '😐' },
    { value: 'high', label: 'Alto', emoji: '😰' },
    { value: 'very_high', label: 'Muito Alto', emoji: '😩' },
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
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">
              Etapa 5 de 8
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
              Seus Hábitos
            </h1>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-border rounded-full h-1.5 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-blue-400"
            initial={{ width: '0%' }}
            animate={{ width: '62.5%' }}
            transition={{ duration: 0.6, delay: 0.2 }}
          />
        </div>
      </motion.div>

      {/* Form Container */}
      <div className="flex-1 max-w-2xl mx-auto w-full overflow-y-auto">
        <motion.div
          className="space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Qualidade do Sono */}
          <motion.div className="space-y-3" variants={itemVariants}>
            <Label className="text-sm font-semibold text-foreground">Qualidade do seu sono?</Label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {sleepQualityOptions.map((option) => (
                <motion.button
                  key={option.value}
                  onClick={() => handleInputChange('sleepQuality', option.value)}
                  className={`p-3 rounded-lg border-2 transition-all text-center ${
                    habitsData.sleepQuality === option.value
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-muted-foreground'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-xl block mb-1">{option.emoji}</span>
                  <span className="text-xs font-medium">{option.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Horas de Sono */}
          <motion.div className="space-y-3" variants={itemVariants}>
            <Label htmlFor="sleepHours" className="text-sm font-semibold text-foreground">
              Quantas horas você dorme por noite?
            </Label>
            <div className="flex items-center gap-4">
              <Slider
                value={[habitsData.sleepHours || 7]}
                onValueChange={(value) => handleInputChange('sleepHours', value[0])}
                min={3}
                max={12}
                step={0.5}
                className="flex-1"
              />
              <span className="text-lg font-semibold text-primary min-w-12">
                {habitsData.sleepHours || 7}h
              </span>
            </div>
          </motion.div>

          {/* Álcool */}
          <motion.div className="space-y-3" variants={itemVariants}>
            <Label className="text-sm font-semibold text-foreground">Consumo de álcool?</Label>
            <RadioGroup value={habitsData.alcoholConsumption} onValueChange={(value) => handleInputChange('alcoholConsumption', value)}>
              <div className="space-y-2">
                {alcoholOptions.map((option) => (
                  <div
                    key={option.value}
                    className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer"
                  >
                    <RadioGroupItem value={option.value} id={`alcohol-${option.value}`} />
                    <Label htmlFor={`alcohol-${option.value}`} className="cursor-pointer font-normal flex-1">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </motion.div>

          {/* Fumo */}
          <motion.div className="space-y-3" variants={itemVariants}>
            <Label className="text-sm font-semibold text-foreground">Você fuma?</Label>
            <RadioGroup value={habitsData.smoking} onValueChange={(value) => handleInputChange('smoking', value)}>
              <div className="space-y-2">
                {smokingOptions.map((option) => (
                  <div
                    key={option.value}
                    className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer"
                  >
                    <RadioGroupItem value={option.value} id={`smoking-${option.value}`} />
                    <Label htmlFor={`smoking-${option.value}`} className="cursor-pointer font-normal flex-1">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </motion.div>

          {/* Nível de Estresse */}
          <motion.div className="space-y-3" variants={itemVariants}>
            <Label className="text-sm font-semibold text-foreground">Seu nível de estresse?</Label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {stressOptions.map((option) => (
                <motion.button
                  key={option.value}
                  onClick={() => handleInputChange('stressLevel', option.value)}
                  className={`p-3 rounded-lg border-2 transition-all text-center ${
                    habitsData.stressLevel === option.value
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-muted-foreground'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-xl block mb-1">{option.emoji}</span>
                  <span className="text-xs font-medium">{option.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Consumo de Água */}
          <motion.div className="space-y-3" variants={itemVariants}>
            <Label htmlFor="waterIntake" className="text-sm font-semibold text-foreground">
              Quantos litros de água você bebe por dia?
            </Label>
            <div className="flex items-center gap-4">
              <Slider
                value={[habitsData.waterIntake || 2]}
                onValueChange={(value) => handleInputChange('waterIntake', value[0])}
                min={0.5}
                max={5}
                step={0.25}
                className="flex-1"
              />
              <span className="text-lg font-semibold text-primary min-w-16">
                {habitsData.waterIntake || 2}L
              </span>
            </div>
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
          className="flex-1 h-11"
        >
          Próximo
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </motion.div>
    </motion.div>
  );
}
