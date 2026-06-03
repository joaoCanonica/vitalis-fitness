import { motion } from 'framer-motion';
import { useAssessment } from '@/contexts/AssessmentContext';
import { useEffect, useState } from 'react';

export default function Step9Processing() {
  const { setIsProcessing, setCurrentStep } = useAssessment();
  const [currentMessage, setCurrentMessage] = useState(0);

  const messages = [
    'Analisando composição corporal...',
    'Calculando métricas de performance...',
    'Identificando seu perfil fitness...',
    'Montando plano de treino personalizado...',
    'Preparando seu relatório...',
  ];

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentMessage(prev => (prev + 1) % messages.length);
    }, 1500);

    // Simulate processing time (3 seconds)
    const processingTimer = setTimeout(() => {
      setIsProcessing(false);
      setCurrentStep(10); // Go to results screen
    }, 5000);

    return () => {
      clearInterval(messageInterval);
      clearTimeout(processingTimer);
    };
  }, [setIsProcessing, setCurrentStep]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
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

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-background via-background to-slate-950 dark:from-slate-950 dark:via-background dark:to-slate-900 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Animated background */}
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

      <motion.div
        className="relative z-10 text-center max-w-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Animated circle */}
        <motion.div
          className="mb-12 flex justify-center"
          variants={itemVariants}
        >
          <div className="relative w-32 h-32">
            {/* Outer rotating circle */}
            <motion.div
              className="absolute inset-0 border-4 border-transparent border-t-primary border-r-primary rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity as any, ease: 'linear' }}
            />
            {/* Middle rotating circle */}
            <motion.div
              className="absolute inset-2 border-4 border-transparent border-b-primary border-l-primary rounded-full"
              animate={{ rotate: -360 }}
              transition={{ duration: 3, repeat: Infinity as any, ease: 'linear' }}
            />
            {/* Inner pulse */}
            <motion.div
              className="absolute inset-4 bg-primary/20 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity as any }}
            />
            {/* Center icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-3xl">⚡</div>
            </div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
          variants={itemVariants}
        >
          Gerando seu relatório
        </motion.h1>

        {/* Animated message */}
        <motion.div
          className="h-12 flex items-center justify-center mb-8"
          variants={itemVariants}
        >
          <motion.p
            className="text-lg text-muted-foreground"
            key={currentMessage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {messages[currentMessage]}
          </motion.p>
        </motion.div>

        {/* Progress bar */}
        <motion.div
          className="w-full bg-border rounded-full h-2 overflow-hidden"
          variants={itemVariants}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-blue-400"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 5, ease: 'easeInOut' }}
          />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="text-sm text-muted-foreground mt-8"
          variants={itemVariants}
        >
          Isso levará apenas alguns segundos...
        </motion.p>

        {/* Processing steps indicator */}
        <motion.div
          className="flex gap-2 justify-center mt-8"
          variants={itemVariants}
        >
          {messages.map((_, index) => (
            <motion.div
              key={index}
              className={`h-2 rounded-full transition-all ${
                index <= currentMessage ? 'bg-primary w-6' : 'bg-border w-2'
              }`}
              animate={{
                width: index === currentMessage ? 24 : 8,
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
