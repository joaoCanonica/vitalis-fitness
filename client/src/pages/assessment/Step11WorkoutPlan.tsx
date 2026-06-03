import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useAssessment } from '@/contexts/AssessmentContext';
import { ChevronRight, ChevronDown, Download, Share2 } from 'lucide-react';
import { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

export default function Step11WorkoutPlan() {
  const { result, nextStep } = useAssessment();
  const [expandedDay, setExpandedDay] = useState<number | null>(0);

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
          Seu Plano Personalizado
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
          Plano de Treino
        </h1>
        <p className="text-muted-foreground">
          Treino adaptado ao seu perfil, objetivos e disponibilidade
        </p>
      </motion.div>

      {/* Main Content */}
      <motion.div
        className="flex-1 max-w-4xl mx-auto w-full overflow-y-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Info Card */}
        <motion.div
          className="mb-8 p-4 rounded-lg bg-primary/10 border border-primary/20"
          variants={itemVariants}
        >
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">💡 Dica:</span> Comece com pesos leves para aprender a técnica. Aumente progressivamente a cada semana.
          </p>
        </motion.div>

        {/* Workout Days */}
        <motion.div
          className="space-y-4"
          variants={containerVariants}
        >
          {result.workoutPlan.map((day, dayIndex) => (
            <motion.div
              key={dayIndex}
              variants={itemVariants}
            >
              <Collapsible
                open={expandedDay === dayIndex}
                onOpenChange={() => setExpandedDay(expandedDay === dayIndex ? null : dayIndex)}
              >
                <CollapsibleTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between h-auto p-4 hover:bg-muted/50"
                  >
                    <div className="text-left">
                      <p className="font-semibold text-foreground">{day.day}</p>
                      <p className="text-xs text-muted-foreground mt-1">{day.focus}</p>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 transition-transform flex-shrink-0 ${
                        expandedDay === dayIndex ? 'rotate-180' : ''
                      }`}
                    />
                  </Button>
                </CollapsibleTrigger>

                <CollapsibleContent className="mt-4 space-y-4 ml-4">
                  {/* Warmup */}
                  <Card className="p-4 bg-blue-500/10 border-blue-500/20">
                    <p className="text-xs font-semibold text-blue-500 uppercase tracking-wider mb-2">
                      🔥 Aquecimento
                    </p>
                    <p className="text-sm text-foreground">{day.warmup}</p>
                  </Card>

                  {/* Exercises */}
                  <div className="space-y-3">
                    {day.exercises.map((exercise, exIndex) => (
                      <motion.div
                        key={exIndex}
                        className="p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: exIndex * 0.08 }}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="font-semibold text-foreground">
                            {exIndex + 1}. {exercise.name}
                          </h4>
                        </div>
                        <div className="grid grid-cols-3 gap-3 mb-3 text-sm">
                          <div className="p-2 rounded bg-muted/50">
                            <p className="text-xs text-muted-foreground font-medium">Séries</p>
                            <p className="font-bold text-primary">{exercise.sets}</p>
                          </div>
                          <div className="p-2 rounded bg-muted/50">
                            <p className="text-xs text-muted-foreground font-medium">Reps</p>
                            <p className="font-bold text-primary">{exercise.reps}</p>
                          </div>
                          <div className="p-2 rounded bg-muted/50">
                            <p className="text-xs text-muted-foreground font-medium">Descanso</p>
                            <p className="font-bold text-primary">{exercise.rest}</p>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground italic">
                          💡 {exercise.notes}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Cooldown */}
                  <Card className="p-4 bg-blue-500/10 border-blue-500/20">
                    <p className="text-xs font-semibold text-blue-500 uppercase tracking-wider mb-2">
                      ❄️ Resfriamento
                    </p>
                    <p className="text-sm text-foreground">{day.cooldown}</p>
                  </Card>
                </CollapsibleContent>
              </Collapsible>
            </motion.div>
          ))}
        </motion.div>

        {/* Important Notes */}
        <motion.div
          className="mt-12 p-6 rounded-lg bg-gradient-to-br from-primary/5 to-transparent border border-primary/20"
          variants={itemVariants}
        >
          <h3 className="font-semibold text-foreground mb-4">📋 Pontos Importantes</h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-3">
              <span className="text-primary font-bold flex-shrink-0">•</span>
              <span>Respeite o tempo de descanso entre séries para recuperação</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold flex-shrink-0">•</span>
              <span>Mantenha a forma correta em todos os exercícios</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold flex-shrink-0">•</span>
              <span>Aumente a carga quando conseguir fazer todas as reps com facilidade</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold flex-shrink-0">•</span>
              <span>Descanse adequadamente entre os dias de treino</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold flex-shrink-0">•</span>
              <span>Mantenha uma alimentação adequada ao seu objetivo</span>
            </li>
          </ul>
        </motion.div>
      </motion.div>

      {/* Bottom Actions */}
      <motion.div
        className="flex flex-col sm:flex-row gap-3 mt-8 pt-6 border-t border-border"
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
