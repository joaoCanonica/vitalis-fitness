import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useAssessment } from '@/contexts/AssessmentContext';
import { Heart, TrendingUp, Zap, Lock } from 'lucide-react';

export default function Landing() {
  const { setCurrentStep } = useAssessment();

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
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const benefits = [
    {
      icon: Heart,
      title: 'Avaliação Profissional',
      description: 'Análise biomecânica e composição corporal em detalhes',
      color: 'from-red-500/20 to-red-500/5',
    },
    {
      icon: TrendingUp,
      title: 'Métricas Inteligentes',
      description: 'IMC, TMB, TDEE e recomendações nutricionais',
      color: 'from-emerald-500/20 to-emerald-500/5',
    },
    {
      icon: Zap,
      title: 'Treino Adaptativo',
      description: 'Plano personalizado baseado em seu perfil único',
      color: 'from-amber-500/20 to-amber-500/5',
    },
    {
      icon: Lock,
      title: 'Privacidade Total',
      description: 'Processamento 100% local, nenhum dado externo',
      color: 'from-blue-500/20 to-blue-500/5',
    },
  ];

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Animated background - subtle and sophisticated */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-gradient-to-br from-primary/8 via-primary/4 to-transparent rounded-full blur-3xl"
          animate={{ y: [0, 40, 0], x: [0, 30, 0] }}
          transition={{ duration: 12, repeat: Infinity as any }}
        />
        <motion.div
          className="absolute -bottom-1/3 -left-1/4 w-80 h-80 bg-gradient-to-tr from-primary/6 via-transparent to-transparent rounded-full blur-3xl"
          animate={{ y: [0, -40, 0], x: [0, -30, 0] }}
          transition={{ duration: 14, repeat: Infinity as any }}
        />
      </div>

      <div className="relative z-10">
        {/* Header - minimal and elegant */}
        <motion.header
          className="pt-6 px-4 sm:px-6"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-gradient-to-br from-primary to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                <Heart className="w-5 h-5 text-white fill-white" />
              </div>
              <span className="text-xl font-semibold text-foreground tracking-tight">Vitalis</span>
            </div>
            <div className="text-xs font-medium text-muted-foreground tracking-wider uppercase">
              Beta
            </div>
          </div>
        </motion.header>

        {/* Main Content */}
        <motion.main
          className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-28"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Hero Section */}
          <motion.div className="text-center mb-16 sm:mb-20" variants={itemVariants}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
              <span className="inline-block w-1.5 h-1.5 bg-primary rounded-full"></span>
              <span className="text-xs font-medium text-primary">Avaliação Fitness em 2 Minutos</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight tracking-tight">
              Seu Corpo.{' '}
              <span className="bg-gradient-to-r from-primary via-blue-400 to-primary bg-clip-text text-transparent">
                Sua Máquina.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed font-light">
              Descubra seu perfil fitness completo, receba um diagnóstico inteligente e um plano de treino personalizado. Tudo processado localmente, nada é salvo.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                <span>100% Privado</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-border"></div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                <span>Sem Cadastro</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-border"></div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                <span>Sem Paywalls</span>
              </div>
            </div>
          </motion.div>

          {/* CTA Button - premium styling */}
          <motion.div className="flex justify-center mb-24 sm:mb-32" variants={itemVariants}>
            <Button
              size="lg"
              onClick={() => setCurrentStep(1)}
              className="px-8 sm:px-10 py-6 text-base font-semibold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              Começar Avaliação
              <Zap className="ml-2 w-4 h-4" />
            </Button>
          </motion.div>

          {/* Benefits Grid - redesigned */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
          >
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  className="group relative"
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                >
                  {/* Gradient background on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${benefit.color} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl`} />

                  {/* Card */}
                  <div className="relative h-full bg-card border border-border rounded-2xl p-6 hover:border-primary/30 transition-all duration-300 backdrop-blur-sm">
                    {/* Icon */}
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 bg-muted group-hover:bg-primary/10 transition-colors duration-300">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>

                    {/* Content */}
                    <h3 className="text-base font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
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

          {/* Social Proof - minimal */}
          <motion.div
            className="mt-24 sm:mt-32 pt-16 sm:pt-20 border-t border-border text-center"
            variants={itemVariants}
          >
            <p className="text-xs font-semibold text-primary mb-3 uppercase tracking-wider">
              Confiado por Profissionais
            </p>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm">
              Desenvolvido com os padrões de privacidade e segurança das principais aplicações de fitness do mundo.
            </p>
          </motion.div>
        </motion.main>

        {/* Footer - minimal */}
        <motion.footer
          className="border-t border-border py-6 px-4 sm:px-6 text-center text-xs text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <p>
            Vitalis © 2026 • Relatório gerado localmente • Nenhum dado é armazenado
          </p>
        </motion.footer>
      </div>
    </div>
  );
}
