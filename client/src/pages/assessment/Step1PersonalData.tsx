import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useAssessment } from '@/contexts/AssessmentContext';
import { ChevronRight, ChevronLeft } from 'lucide-react';

export default function Step1PersonalData() {
  const { personalData, setPersonalData, nextStep, prevStep } = useAssessment();

  const handleInputChange = (field: string, value: any) => {
    setPersonalData({
      ...personalData,
      [field]: value,
    });
  };

  const isValid =
    personalData.fullName &&
    personalData.age &&
    personalData.height &&
    personalData.weight &&
    personalData.gender;

  return (
    <motion.div
      className="min-h-screen bg-background p-4 sm:p-6 flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header com progresso */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            Dados Básicos
          </h1>
          <span className="text-sm font-medium text-muted-foreground">
            Etapa 1 de 8
          </span>
        </div>
        <div className="w-full bg-border rounded-full h-1">
          <div className="bg-primary h-1 rounded-full" style={{ width: '12.5%' }} />
        </div>
      </div>

      {/* Form Container */}
      <div className="flex-1 max-w-2xl mx-auto w-full">
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {/* Nome Completo */}
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-base font-medium">
              Nome Completo
            </Label>
            <Input
              id="fullName"
              placeholder="Digite seu nome completo"
              value={personalData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              className="h-12 text-base"
            />
          </div>

          {/* Idade */}
          <div className="space-y-2">
            <Label htmlFor="age" className="text-base font-medium">
              Idade (anos)
            </Label>
            <Input
              id="age"
              type="number"
              placeholder="Ex: 28"
              value={personalData.age}
              onChange={(e) => handleInputChange('age', e.target.value ? parseInt(e.target.value) : '')}
              className="h-12 text-base"
              min="13"
              max="120"
            />
          </div>

          {/* Altura */}
          <div className="space-y-2">
            <Label htmlFor="height" className="text-base font-medium">
              Altura (cm)
            </Label>
            <Input
              id="height"
              type="number"
              placeholder="Ex: 178"
              value={personalData.height}
              onChange={(e) => handleInputChange('height', e.target.value ? parseInt(e.target.value) : '')}
              className="h-12 text-base"
              min="100"
              max="250"
            />
          </div>

          {/* Peso */}
          <div className="space-y-2">
            <Label htmlFor="weight" className="text-base font-medium">
              Peso (kg)
            </Label>
            <Input
              id="weight"
              type="number"
              placeholder="Ex: 75.5"
              value={personalData.weight}
              onChange={(e) => handleInputChange('weight', e.target.value ? parseFloat(e.target.value) : '')}
              className="h-12 text-base"
              step="0.1"
              min="30"
              max="300"
            />
          </div>

          {/* Sexo */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Sexo</Label>
            <RadioGroup value={personalData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
              <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer">
                <RadioGroupItem value="male" id="male" />
                <Label htmlFor="male" className="cursor-pointer font-normal flex-1">
                  Masculino
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer">
                <RadioGroupItem value="female" id="female" />
                <Label htmlFor="female" className="cursor-pointer font-normal flex-1">
                  Feminino
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer">
                <RadioGroupItem value="other" id="other" />
                <Label htmlFor="other" className="cursor-pointer font-normal flex-1">
                  Outro
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Campo adicional se "Outro" */}
          {personalData.gender === 'other' && (
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <Label htmlFor="genderOther" className="text-base font-medium">
                Especifique
              </Label>
              <Input
                id="genderOther"
                placeholder="Como você se identifica?"
                value={personalData.genderOther || ''}
                onChange={(e) => handleInputChange('genderOther', e.target.value)}
                className="h-12 text-base"
              />
            </motion.div>
          )}
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
