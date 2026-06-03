import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useAssessment } from '@/contexts/AssessmentContext';
import { Heart, TrendingUp, Zap, Target } from 'lucide-react';

export default function Landing() {
  const { setCurrentStep } = useAssessment();

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

  const benefits = [
    {
      icon: Heart,
      title: 'Avaliação Completa',
      description: 'Análise profunda do seu estado físico atual',
    },
    {
      icon: TrendingUp,
      title: 'Métricas Precisas',
      description: 'Cálculos de IMC, TMB e TDEE personalizados',
    },
    {
      icon: Zap,
      title: 'Treino Personalizado',
      description: 'Plano de treino adaptado ao seu perfil',
    },
    {
      icon: Target,
      title: '100% Privado',
      description: 'Nenhum dado é salvo ou compartilhado',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-slate-950 dark:from-slate-950 dark:via-background dark:to-slate-900">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"
          animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity as any }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"
          animate={{ y: [0, -30, 0], x: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity as any }}
        />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <motion.header
          className="pt-8 px-4 sm:px-6 lg:px-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Heart className="w-6 h-6 text-white fill-white" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Vitalis</h1>
          </div>
        </motion.header>

        {/* Main Content */}
        <motion.main
          className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Hero Section */}
          <motion.div className="text-center mb-16 sm:mb-24" variants={itemVariants}>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Seu Corpo.{' '}
              <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
                Sua Máquina.
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
              Descubra seu perfil fitness completo e receba um plano de treino personalizado em apenas 2 minutos.
            </p>
            <p className="text-sm text-muted-foreground mb-8 flex items-center justify-center gap-2">
              <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
              100% Privado • Sem Cadastro • Sem Paywalls
            </p>
          </motion.div>

          {/* CTA Button */}
          <motion.div className="flex justify-center mb-20" variants={itemVariants}>
            <Button
              size="lg"
              className="px-8 sm:px-12 py-6 sm:py-7 text-base sm:text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              onClick={() => setCurrentStep(1)}
            >
              Começar Avaliação Gratuita
              <Zap className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>

          {/* Benefits Grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
            variants={containerVariants}
          >
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  className="group relative"
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
                  <div className="relative bg-card border border-border rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Trust Section */}
          <motion.div
            className="mt-20 sm:mt-32 text-center"
            variants={itemVariants}
          >
            <p className="text-sm font-semibold text-primary mb-4 uppercase tracking-wider">
              Confiado por Milhares
            </p>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Vitalis é desenvolvido com os mesmos padrões de qualidade e privacidade das principais aplicações de fitness do mundo.
            </p>
          </motion.div>
        </motion.main>

        {/* Footer */}
        <motion.footer
          className="border-t border-border py-8 px-4 sm:px-6 lg:px-8 text-center text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <p>
            Vitalis © 2026. Todos os direitos reservados. Seu relatório é gerado localmente e nunca é armazenado.
          </p>
        </motion.footer>
      </div>
    </div>
  );
}
