import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useAssessment } from '@/contexts/AssessmentContext';
import { ChevronLeft, Zap } from 'lucide-react';
import { generateAssessmentResult } from '@/lib/assessmentProcessor';

export default function Step8Summary() {
  const {
    personalData,
    goalData,
    trainingHistoryData,
    healthData,
    habitsData,
    nutritionData,
    availabilityData,
    setResult,
    setCurrentStep,
    setIsProcessing,
    prevStep,
  } = useAssessment();

  const handleStartProcessing = () => {
    // Generate the result
    const result = generateAssessmentResult(
      personalData,
      goalData,
      trainingHistoryData,
      healthData,
      habitsData,
      nutritionData,
      availabilityData
    );

    setResult(result);
    setIsProcessing(true);
    setCurrentStep(9); // Go to processing screen
  };

  const summaryItems = [
    { label: 'Nome', value: personalData.fullName },
    { label: 'Idade', value: `${personalData.age} anos` },
    { label: 'Altura/Peso', value: `${personalData.height}cm / ${personalData.weight}kg` },
    { label: 'Objetivo', value: goalData.mainGoal?.replace(/_/g, ' ') },
    { label: 'Experiência', value: trainingHistoryData.experience?.replace(/_/g, ' ') },
    { label: 'Dias de treino', value: `${trainingHistoryData.trainingDays}x/semana` },
    { label: 'Local de treino', value: availabilityData.trainingLocation?.replace(/_/g, ' ') },
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
            Resumo da Avaliação
          </h1>
          <span className="text-sm font-medium text-muted-foreground">
            Etapa 8 de 8
          </span>
        </div>
        <div className="w-full bg-border rounded-full h-1">
          <div className="bg-primary h-1 rounded-full" style={{ width: '100%' }} />
        </div>
      </div>

      {/* Form Container */}
      <div className="flex-1 max-w-2xl mx-auto w-full overflow-y-auto">
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <p className="text-muted-foreground mb-6">
            Verifique suas informações antes de gerar seu relatório personalizado.
          </p>

          {summaryItems.map((item, index) => (
            <motion.div
              key={index}
              className="flex justify-between items-center p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * index }}
            >
              <span className="text-muted-foreground font-medium">{item.label}</span>
              <span className="text-foreground font-semibold capitalize">{item.value}</span>
            </motion.div>
          ))}

          {/* Additional info sections */}
          <motion.div
            className="mt-8 p-4 rounded-lg bg-primary/5 border border-primary/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="font-semibold text-foreground mb-2">O que você receberá:</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full" />
                Diagnóstico inicial personalizado
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full" />
                Cálculo de IMC, TMB e TDEE
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full" />
                Plano de treino adaptado
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full" />
                Recomendações nutricionais
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full" />
                Exportação em PDF
              </li>
            </ul>
          </motion.div>

          <motion.div
            className="mt-8 p-4 rounded-lg bg-muted/50 border border-border"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-sm text-muted-foreground">
              ✓ Seus dados são processados localmente no seu navegador e nunca são armazenados ou compartilhados.
            </p>
          </motion.div>
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
          onClick={handleStartProcessing}
          className="flex-1 h-12"
        >
          <Zap className="w-4 h-4 mr-2" />
          Gerar Relatório
        </Button>
      </motion.div>
    </motion.div>
  );
}
