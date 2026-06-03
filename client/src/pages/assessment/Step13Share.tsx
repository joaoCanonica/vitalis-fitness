import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useAssessment } from '@/contexts/AssessmentContext';
import { MessageCircle, Copy, CheckCircle2, RotateCcw } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Step13Share() {
  const { personalData, result, resetAssessment } = useAssessment();
  const [copied, setCopied] = useState(false);

  if (!result) {
    return null;
  }

  const shareMessage = `Olá! Fiz uma avaliação fitness completa e recebi um plano personalizado. Confira o Vitalis - um app que gera diagnóstico e treino em 2 minutos, 100% privado. Acesse: vitalis.app`;

  const whatsappLink = `https://wa.me/?text=${encodeURIComponent(shareMessage)}`;

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(shareMessage);
    setCopied(true);
    toast.success('Mensagem copiada!');
    setTimeout(() => setCopied(false), 2000);
  };

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
          Compartilhe Sua Experiência
        </h1>
        <p className="text-muted-foreground">
          Divida seus resultados com amigos e profissionais
        </p>
      </motion.div>

      {/* Main Content */}
      <motion.div
        className="flex-1 max-w-4xl mx-auto w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* WhatsApp Share */}
        <motion.div
          className="mb-8"
          variants={itemVariants}
        >
          <Card className="p-8 sm:p-12 bg-gradient-to-br from-green-500/10 to-transparent border-green-500/20">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
                <MessageCircle className="w-8 h-8 text-green-500" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2 text-center">
              Compartilhar no WhatsApp
            </h2>
            <p className="text-muted-foreground text-center mb-8">
              Envie uma mensagem pronta para seus contatos
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                onClick={() => window.open(whatsappLink, '_blank')}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Abrir WhatsApp
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="flex-1"
                onClick={handleCopyMessage}
              >
                {copied ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Copiado!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copiar Mensagem
                  </>
                )}
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Message Preview */}
        <motion.div
          className="mb-8"
          variants={itemVariants}
        >
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Prévia da Mensagem:
          </h3>
          <Card className="p-6 bg-muted/50 border-border">
            <p className="text-foreground leading-relaxed">
              {shareMessage}
            </p>
          </Card>
        </motion.div>

        {/* Share Options */}
        <motion.div
          className="mb-8"
          variants={itemVariants}
        >
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Outras Formas de Compartilhar:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="p-6 hover:bg-muted/50 transition-colors cursor-pointer">
              <p className="text-2xl mb-2">📧</p>
              <h4 className="font-semibold text-foreground mb-1">Email</h4>
              <p className="text-sm text-muted-foreground">
                Envie seu relatório PDF por email
              </p>
            </Card>
            <Card className="p-6 hover:bg-muted/50 transition-colors cursor-pointer">
              <p className="text-2xl mb-2">👥</p>
              <h4 className="font-semibold text-foreground mb-1">Personal Trainer</h4>
              <p className="text-sm text-muted-foreground">
                Compartilhe com seu profissional
              </p>
            </Card>
            <Card className="p-6 hover:bg-muted/50 transition-colors cursor-pointer">
              <p className="text-2xl mb-2">📱</p>
              <h4 className="font-semibold text-foreground mb-1">Redes Sociais</h4>
              <p className="text-sm text-muted-foreground">
                Compartilhe sua jornada fitness
              </p>
            </Card>
            <Card className="p-6 hover:bg-muted/50 transition-colors cursor-pointer">
              <p className="text-2xl mb-2">🔗</p>
              <h4 className="font-semibold text-foreground mb-1">Link</h4>
              <p className="text-sm text-muted-foreground">
                Compartilhe o link do Vitalis
              </p>
            </Card>
          </div>
        </motion.div>

        {/* Results Summary */}
        <motion.div
          className="mb-8 p-6 rounded-lg bg-primary/10 border border-primary/20"
          variants={itemVariants}
        >
          <h3 className="font-semibold text-foreground mb-4">Seu Resumo:</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>
              <span className="font-medium text-foreground">Perfil:</span> {result.profile.classification}
            </p>
            <p>
              <span className="font-medium text-foreground">IMC:</span> {result.profile.bmi} ({result.profile.bmiCategory})
            </p>
            <p>
              <span className="font-medium text-foreground">TDEE:</span> {result.profile.tdee} kcal/dia
            </p>
            <p>
              <span className="font-medium text-foreground">Plano:</span> {result.workoutPlan.length} dias de treino
            </p>
          </div>
        </motion.div>

        {/* Privacy Note */}
        <motion.div
          className="p-6 rounded-lg bg-blue-500/10 border border-blue-500/20"
          variants={itemVariants}
        >
          <div className="flex gap-3">
            <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-500 mb-1">Privacidade Garantida</h3>
              <p className="text-sm text-muted-foreground">
                Compartilhe apenas o que desejar. Seus dados completos nunca deixam seu dispositivo.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom Actions */}
      <motion.div
        className="flex gap-4 mt-8 pt-6 border-t border-border"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Button
          variant="outline"
          size="lg"
          onClick={resetAssessment}
          className="flex-1 h-12"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Fazer Nova Avaliação
        </Button>
        <Button
          size="lg"
          onClick={resetAssessment}
          className="flex-1 h-12"
        >
          Voltar ao Início
        </Button>
      </motion.div>
    </motion.div>
  );
}
