import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useAssessment } from '@/contexts/AssessmentContext';
import { ChevronRight, Download, Share2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { IMCChart } from '@/components/charts/IMCChart';
import { MacrosChart } from '@/components/charts/MacrosChart';
import { CaloriesChart } from '@/components/charts/CaloriesChart';
import { FitnessProfileChart } from '@/components/charts/FitnessProfileChart';
import { HabitsAnalysisChart } from '@/components/charts/HabitsAnalysisChart';
import { HealthRiskChart } from '@/components/charts/HealthRiskChart';

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
        staggerChildren: 0.08,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const getBMIColor = (bmi: number) => {
    if (bmi < 18.5) return 'text-blue-500';
    if (bmi < 25) return 'text-emerald-500';
    if (bmi < 30) return 'text-amber-500';
    return 'text-red-500';
  };

  const getBMIBgColor = (bmi: number) => {
    if (bmi < 18.5) return 'bg-blue-500/10 border-blue-500/20';
    if (bmi < 25) return 'bg-emerald-500/10 border-emerald-500/20';
    if (bmi < 30) return 'bg-amber-500/10 border-amber-500/20';
    return 'bg-red-500/10 border-red-500/20';
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
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">
          Seu Diagnóstico
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
          Olá, {personalData.fullName}
        </h1>
        <p className="text-muted-foreground">
          Aqui está sua avaliação fitness completa e personalizada
        </p>
      </motion.div>

      {/* Main Content */}
      <motion.div
        className="flex-1 max-w-4xl mx-auto w-full overflow-y-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Profile Summary Card */}
        <motion.div
          className="mb-6 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20"
          variants={itemVariants}
        >
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
            Seu Perfil
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
            {result.profile.classification}
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {result.diagnosis.summary}
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          variants={containerVariants}
        >
          {/* IMC */}
          <motion.div
            className={`p-6 rounded-xl border ${getBMIBgColor(result.profile.bmi)}`}
            variants={itemVariants}
          >
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              IMC
            </p>
            <p className={`text-3xl font-bold ${getBMIColor(result.profile.bmi)} mb-1`}>
              {result.profile.bmi}
            </p>
            <p className="text-xs text-muted-foreground">
              {result.profile.bmiCategory}
            </p>
          </motion.div>

          {/* TMB */}
          <motion.div
            className="p-6 rounded-xl bg-amber-500/10 border border-amber-500/20"
            variants={itemVariants}
          >
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              TMB
            </p>
            <p className="text-3xl font-bold text-amber-500 mb-1">
              {result.profile.bmr}
            </p>
            <p className="text-xs text-muted-foreground">
              kcal/dia
            </p>
          </motion.div>

          {/* TDEE */}
          <motion.div
            className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/20"
            variants={itemVariants}
          >
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              TDEE
            </p>
            <p className="text-3xl font-bold text-emerald-500 mb-1">
              {result.profile.tdee}
            </p>
            <p className="text-xs text-muted-foreground">
              kcal/dia
            </p>
          </motion.div>

          {/* Água */}
          <motion.div
            className="p-6 rounded-xl bg-blue-500/10 border border-blue-500/20"
            variants={itemVariants}
          >
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Água Diária
            </p>
            <p className="text-3xl font-bold text-blue-500 mb-1">
              {result.waterIntakeRecommendation}
            </p>
            <p className="text-xs text-muted-foreground">
              ml
            </p>
          </motion.div>
        </motion.div>

        {/* Charts Section */}
        <motion.div
          className="mb-8 space-y-6"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold text-foreground mb-4">Seu Índice de Massa Corporal</h3>
            <Card className="p-6">
              <IMCChart imc={result.profile.bmi} category={result.profile.bmiCategory} />
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold text-foreground mb-4">Distribuição de Calorias</h3>
            <Card className="p-6">
              <CaloriesChart
                tdee={result.profile.tdee}
                bmr={result.profile.bmr}
                activityLevel={result.profile.activityLevel || 'moderate'}
              />
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold text-foreground mb-4">Macronutrientes Recomendados</h3>
            <Card className="p-6">
              <MacrosChart
                protein={result.profile.macros?.protein || 100}
                carbs={result.profile.macros?.carbs || 200}
                fats={result.profile.macros?.fats || 60}
              />
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold text-foreground mb-4">Seu Perfil Fitness</h3>
            <Card className="p-6">
              <FitnessProfileChart
                strength={75}
                endurance={65}
                flexibility={60}
                balance={70}
                recovery={80}
              />
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold text-foreground mb-4">Analise de Habitos</h3>
            <Card className="p-6">
              <HabitsAnalysisChart
                sleepScore={result.profile.bmi < 25 ? 85 : 65}
                hydrationScore={80}
                stressScore={result.profile.bmi < 25 ? 70 : 50}
                nutritionScore={75}
              />
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold text-foreground mb-4">Avaliacao de Risco de Saude</h3>
            <Card className="p-6">
              <HealthRiskChart
                cardiovascularRisk={result.profile.bmi < 25 ? 25 : 55}
                metabolicRisk={result.profile.bmi < 25 ? 30 : 60}
                musculoskeletalRisk={40}
              />
            </Card>
          </motion.div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          variants={itemVariants}
          className="mb-8"
        >
          <Tabs defaultValue="analysis" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="analysis">Análise</TabsTrigger>
              <TabsTrigger value="recommendations">Recomendações</TabsTrigger>
            </TabsList>

            {/* Analysis Tab */}
            <TabsContent value="analysis" className="space-y-6 mt-6">
              {/* Strengths */}
              <div>
                <h3 className="text-lg font-semibold text-emerald-500 mb-3 flex items-center gap-2">
                  ✓ Pontos Fortes
                </h3>
                <div className="space-y-2">
                  {result.diagnosis.strengths.map((strength, index) => (
                    <motion.div
                      key={index}
                      className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-foreground text-sm"
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
                <h3 className="text-lg font-semibold text-amber-500 mb-3 flex items-center gap-2">
                  ⚠ Pontos de Atenção
                </h3>
                <div className="space-y-2">
                  {result.diagnosis.focusAreas.map((area, index) => (
                    <motion.div
                      key={index}
                      className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-foreground text-sm"
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
            <TabsContent value="recommendations" className="space-y-3 mt-6">
              {result.diagnosis.recommendations.map((rec, index) => (
                <motion.div
                  key={index}
                  className="p-4 rounded-lg bg-primary/10 border border-primary/20 text-foreground text-sm"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {rec}
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
        className="flex gap-3 pt-6 border-t border-border"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Button
          variant="outline"
          size="lg"
          className="flex-1 h-11"
          disabled
        >
          <Download className="w-4 h-4 mr-2" />
          Exportar
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="flex-1 h-11"
          disabled
        >
          <Share2 className="w-4 h-4 mr-2" />
          Compartilhar
        </Button>
      </motion.div>
    </motion.div>
  );
}
