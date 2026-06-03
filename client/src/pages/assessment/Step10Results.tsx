import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useAssessment } from '@/contexts/AssessmentContext';
import { ChevronRight, Download, Share2, ArrowDown } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Step10Results() {
  const { result, personalData, nextStep } = useAssessment();

  if (!result) {
    return null;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const getBMIColor = (bmi: number) => {
    if (bmi < 18.5) return 'text-blue-500';
    if (bmi < 25) return 'text-green-500';
    if (bmi < 30) return 'text-yellow-500';
    return 'text-red-500';
  };

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
        variants={itemVariants}
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
          Seu Diagnóstico, {personalData.fullName}
        </h1>
        <p className="text-muted-foreground">
          Aqui está sua avaliação completa e personalizada
        </p>
      </motion.div>

      {/* Main Content */}
      <motion.div
        className="flex-1 max-w-4xl mx-auto w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Profile Card */}
        <motion.div
          className="mb-6"
          variants={itemVariants}
        >
          <Card className="p-6 sm:p-8 bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              {result.profile.classification}
            </h2>
            <p className="text-muted-foreground mb-6">
              {result.diagnosis.summary}
            </p>
          </Card>
        </motion.div>

        {/* Tabs */}
        <motion.div
          variants={itemVariants}
          className="mb-8"
        >
          <Tabs defaultValue="metrics" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="metrics">Métricas</TabsTrigger>
              <TabsTrigger value="analysis">Análise</TabsTrigger>
              <TabsTrigger value="recommendations">Recomendações</TabsTrigger>
            </TabsList>

            {/* Metrics Tab */}
            <TabsContent value="metrics" className="space-y-4 mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card className="p-6">
                  <p className="text-muted-foreground text-sm mb-2">IMC</p>
                  <p className={`text-3xl font-bold ${getBMIColor(result.profile.bmi)}`}>
                    {result.profile.bmi}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    {result.profile.bmiCategory}
                  </p>
                </Card>

                <Card className="p-6">
                  <p className="text-muted-foreground text-sm mb-2">TMB (kcal)</p>
                  <p className="text-3xl font-bold text-primary">
                    {result.profile.bmr}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Taxa Metabólica Basal
                  </p>
                </Card>

                <Card className="p-6">
                  <p className="text-muted-foreground text-sm mb-2">TDEE (kcal)</p>
                  <p className="text-3xl font-bold text-primary">
                    {result.profile.tdee}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Gasto Calórico Diário
                  </p>
                </Card>

                <Card className="p-6">
                  <p className="text-muted-foreground text-sm mb-2">Água Diária</p>
                  <p className="text-3xl font-bold text-blue-500">
                    {result.waterIntakeRecommendation}ml
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Consumo recomendado
                  </p>
                </Card>
              </div>
            </TabsContent>

            {/* Analysis Tab */}
            <TabsContent value="analysis" className="space-y-6 mt-6">
              {/* Strengths */}
              <div>
                <h3 className="text-lg font-semibold text-green-500 mb-3">
                  ✓ Pontos Fortes
                </h3>
                <div className="space-y-2">
                  {result.diagnosis.strengths.map((strength, index) => (
                    <motion.div
                      key={index}
                      className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-foreground"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {strength}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Focus Areas */}
              <div>
                <h3 className="text-lg font-semibold text-orange-500 mb-3">
                  ⚠ Pontos de Atenção
                </h3>
                <div className="space-y-2">
                  {result.diagnosis.focusAreas.map((area, index) => (
                    <motion.div
                      key={index}
                      className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/20 text-foreground"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {area}
                    </motion.div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Recommendations Tab */}
            <TabsContent value="recommendations" className="space-y-4 mt-6">
              {result.diagnosis.recommendations.map((rec, index) => (
                <motion.div
                  key={index}
                  className="p-4 rounded-lg bg-primary/10 border border-primary/20 text-foreground"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <p className="font-medium">{rec}</p>
                </motion.div>
              ))}
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Identified Goals */}
        <motion.div
          className="mb-8"
          variants={itemVariants}
        >
          <h3 className="text-lg font-semibold text-foreground mb-3">
            Seus Objetivos Identificados
          </h3>
          <div className="flex flex-wrap gap-2">
            {result.identifiedGoals.map((goal, index) => (
              <motion.div
                key={index}
                className="px-4 py-2 rounded-full bg-primary/20 text-primary font-medium text-sm"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                {goal}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="bg-gradient-to-r from-primary/10 to-transparent border border-primary/20 rounded-xl p-6 sm:p-8 text-center mb-8"
          variants={itemVariants}
        >
          <h3 className="text-xl font-bold text-foreground mb-2">
            Próximo Passo: Seu Plano de Treino
          </h3>
          <p className="text-muted-foreground mb-6">
            Veja o treino personalizado criado especialmente para você
          </p>
          <Button
            size="lg"
            onClick={nextStep}
            className="w-full sm:w-auto"
          >
            Ver Plano de Treino
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      </motion.div>

      {/* Bottom Actions */}
      <motion.div
        className="flex gap-4 pt-6 border-t border-border"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Button
          variant="outline"
          size="lg"
          className="flex-1 h-12"
          disabled
        >
          <Download className="w-4 h-4 mr-2" />
          Exportar PDF
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="flex-1 h-12"
          disabled
        >
          <Share2 className="w-4 h-4 mr-2" />
          Compartilhar
        </Button>
      </motion.div>
    </motion.div>
  );
}
