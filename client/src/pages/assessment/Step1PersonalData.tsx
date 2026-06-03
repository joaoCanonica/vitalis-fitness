import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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

  const handleGenderSelect = (gender: 'male' | 'female' | 'other') => {
    handleInputChange('gender', gender);
  };

  const isValid =
    personalData.fullName &&
    personalData.age &&
    personalData.height &&
    personalData.weight &&
    personalData.gender;

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

  const genderOptions = [
    { value: 'male', label: 'Masculino', emoji: '👨' },
    { value: 'female', label: 'Feminino', emoji: '👩' },
    { value: 'other', label: 'Outro', emoji: '🧑' },
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
              Etapa 1 de 8
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
              Seus Dados Básicos
            </h1>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-border rounded-full h-1.5 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-blue-400"
            initial={{ width: '0%' }}
            animate={{ width: '12.5%' }}
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
          {/* Nome Completo */}
          <motion.div className="space-y-2.5" variants={itemVariants}>
            <Label htmlFor="fullName" className="text-sm font-semibold text-foreground">
              Nome Completo
            </Label>
            <Input
              id="fullName"
              placeholder="João Silva"
              value={personalData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              className="h-11 text-base"
            />
          </motion.div>

          {/* Idade e Sexo - lado a lado */}
          <div className="grid grid-cols-2 gap-4">
            <motion.div className="space-y-2.5" variants={itemVariants}>
              <Label htmlFor="age" className="text-sm font-semibold text-foreground">
                Idade
              </Label>
              <Input
                id="age"
                type="number"
                placeholder="28"
                value={personalData.age}
                onChange={(e) => handleInputChange('age', parseInt(e.target.value) || '')}
                className="h-11 text-base"
              />
            </motion.div>

            <motion.div className="space-y-2.5" variants={itemVariants}>
              <Label htmlFor="weight" className="text-sm font-semibold text-foreground">
                Peso (kg)
              </Label>
              <Input
                id="weight"
                type="number"
                placeholder="75"
                value={personalData.weight}
                onChange={(e) => handleInputChange('weight', parseInt(e.target.value) || '')}
                className="h-11 text-base"
              />
            </motion.div>
          </div>

          {/* Altura */}
          <motion.div className="space-y-2.5" variants={itemVariants}>
            <Label htmlFor="height" className="text-sm font-semibold text-foreground">
              Altura (cm)
            </Label>
            <Input
              id="height"
              type="number"
              placeholder="180"
              value={personalData.height}
              onChange={(e) => handleInputChange('height', parseInt(e.target.value) || '')}
              className="h-11 text-base"
            />
          </motion.div>

          {/* Sexo */}
          <motion.div className="space-y-3" variants={itemVariants}>
            <Label className="text-sm font-semibold text-foreground">
              Sexo
            </Label>
            <div className="grid grid-cols-3 gap-3">
              {genderOptions.map((option) => (
                <motion.button
                  key={option.value}
                  onClick={() => handleGenderSelect(option.value as 'male' | 'female' | 'other')}
                  className={`p-4 rounded-lg border-2 transition-all text-center font-medium ${
                    personalData.gender === option.value
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-muted-foreground'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-2xl block mb-1">{option.emoji}</span>
                  <span className="text-sm">{option.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Info Box */}
          <motion.div
            className="mt-8 p-4 rounded-lg bg-primary/5 border border-primary/20"
            variants={itemVariants}
          >
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">💡 Dica:</span> Esses dados serão usados para calcular suas métricas personalizadas (IMC, TMB, TDEE).
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
