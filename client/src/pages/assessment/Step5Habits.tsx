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
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            Seus Hábitos
          </h1>
          <span className="text-sm font-medium text-muted-foreground">
            Etapa 5 de 8
          </span>
        </div>
        <div className="w-full bg-border rounded-full h-1">
          <div className="bg-primary h-1 rounded-full" style={{ width: '62.5%' }} />
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
          {/* Qualidade do Sono */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Qualidade do seu sono?</Label>
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
          </div>

          {/* Horas de Sono */}
          <div className="space-y-3">
            <Label htmlFor="sleepHours" className="text-base font-medium">
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
          </div>

          {/* Álcool */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Consumo de álcool?</Label>
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
          </div>

          {/* Fumo */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Você fuma?</Label>
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
          </div>

          {/* Nível de Estresse */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Seu nível de estresse?</Label>
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
          </div>

          {/* Consumo de Água */}
          <div className="space-y-3">
            <Label htmlFor="waterIntake" className="text-base font-medium">
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
          className="flex-1 h-12"
        >
          Próximo
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </motion.div>
    </motion.div>
  );
}
