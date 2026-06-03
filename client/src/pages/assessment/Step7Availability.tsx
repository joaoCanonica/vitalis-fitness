import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useAssessment } from '@/contexts/AssessmentContext';
import { ChevronRight, ChevronLeft } from 'lucide-react';

export default function Step7Availability() {
  const { availabilityData, setAvailabilityData, nextStep, prevStep } = useAssessment();

  const handleInputChange = (field: string, value: any) => {
    setAvailabilityData({
      ...availabilityData,
      [field]: value,
    });
  };

  const handleToggleDay = (day: string) => {
    const newDays = availabilityData.availableDays.includes(day)
      ? availabilityData.availableDays.filter(d => d !== day)
      : [...availabilityData.availableDays, day];
    handleInputChange('availableDays', newDays);
  };

  const handleToggleEquipment = (equipment: string) => {
    const newEquipment = availabilityData.equipment.includes(equipment)
      ? availabilityData.equipment.filter(e => e !== equipment)
      : [...availabilityData.equipment, equipment];
    handleInputChange('equipment', newEquipment);
  };

  const isValid =
    availabilityData.availableDays.length > 0 &&
    availabilityData.timeAvailable &&
    availabilityData.trainingLocation &&
    availabilityData.equipment.length > 0;

  const days = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];

  const timeOptions = [
    { value: '30_min', label: '30 minutos' },
    { value: '45_min', label: '45 minutos' },
    { value: '60_min', label: '1 hora' },
    { value: '90_min', label: '1h 30min' },
  ];

  const locationOptions = [
    { value: 'home', label: 'Em casa', emoji: '🏠' },
    { value: 'gym', label: 'Academia', emoji: '🏋️' },
    { value: 'outdoor', label: 'Ao ar livre', emoji: '🏞️' },
    { value: 'mixed', label: 'Variado', emoji: '🔄' },
  ];

  const equipmentOptions = [
    { value: 'bodyweight', label: 'Peso corporal', emoji: '💪' },
    { value: 'dumbbells', label: 'Halteres', emoji: '🏋️' },
    { value: 'barbell', label: 'Barra', emoji: '⚙️' },
    { value: 'machines', label: 'Máquinas', emoji: '🤖' },
    { value: 'full_gym', label: 'Academia completa', emoji: '🏢' },
    { value: 'bands', label: 'Fitas elásticas', emoji: '🔗' },
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
            Sua Disponibilidade
          </h1>
          <span className="text-sm font-medium text-muted-foreground">
            Etapa 7 de 8
          </span>
        </div>
        <div className="w-full bg-border rounded-full h-1">
          <div className="bg-primary h-1 rounded-full" style={{ width: '87.5%' }} />
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
          {/* Dias Disponíveis */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Quais dias você pode treinar?</Label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {days.map((day) => (
                <motion.button
                  key={day}
                  onClick={() => handleToggleDay(day)}
                  className={`p-3 rounded-lg border-2 transition-all text-center font-medium ${
                    availabilityData.availableDays.includes(day)
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-muted-foreground'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {day.slice(0, 3)}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Tempo Disponível */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Quanto tempo você pode dedicar por sessão?</Label>
            <RadioGroup value={availabilityData.timeAvailable} onValueChange={(value) => handleInputChange('timeAvailable', value)}>
              <div className="space-y-2">
                {timeOptions.map((option) => (
                  <div
                    key={option.value}
                    className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer"
                  >
                    <RadioGroupItem value={option.value} id={`time-${option.value}`} />
                    <Label htmlFor={`time-${option.value}`} className="cursor-pointer font-normal flex-1">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          {/* Local de Treino */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Onde você prefere treinar?</Label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {locationOptions.map((option) => (
                <motion.button
                  key={option.value}
                  onClick={() => handleInputChange('trainingLocation', option.value)}
                  className={`p-3 rounded-lg border-2 transition-all text-center ${
                    availabilityData.trainingLocation === option.value
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-muted-foreground'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-2xl block mb-1">{option.emoji}</span>
                  <span className="text-xs font-medium">{option.label}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Equipamentos */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Quais equipamentos você tem acesso?</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {equipmentOptions.map((option) => (
                <motion.div
                  key={option.value}
                  className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                >
                  <Checkbox
                    id={`equipment-${option.value}`}
                    checked={availabilityData.equipment.includes(option.value)}
                    onCheckedChange={() => handleToggleEquipment(option.value)}
                  />
                  <Label htmlFor={`equipment-${option.value}`} className="cursor-pointer font-normal flex-1 flex items-center gap-2">
                    <span>{option.emoji}</span>
                    {option.label}
                  </Label>
                </motion.div>
              ))}
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
