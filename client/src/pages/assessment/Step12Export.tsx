import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useAssessment } from '@/contexts/AssessmentContext';
import { ChevronRight, Download, CheckCircle2, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { exportToPDF } from '@/lib/pdfExporter';
import { toast } from 'sonner';

export default function Step12Export() {
  const { personalData, result, nextStep } = useAssessment();
  const [isExporting, setIsExporting] = useState(false);

  if (!result) {
    return null;
  }

  const handleExportPDF = async () => {
    try {
      setIsExporting(true);
      await exportToPDF(personalData, result);
      toast.success('PDF exportado com sucesso!');
    } catch (error) {
      console.error('Error exporting PDF:', error);
      toast.error('Erro ao exportar PDF. Tente novamente.');
    } finally {
      setIsExporting(false);
    }
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

  const features = [
    { icon: '📋', title: 'Relatório Completo', description: 'Seu diagnóstico e análise detalhada' },
    { icon: '📊', title: 'Métricas Precisas', description: 'IMC, TMB, TDEE e recomendações' },
    { icon: '🏋️', title: 'Plano de Treino', description: 'Exercícios personalizados com séries e repetições' },
    { icon: '📱', title: 'Formato Profissional', description: 'Documento pronto para compartilhar' },
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
      <motion.div
        className="mb-8"
        variants={itemVariants}
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
          Exportar Seu Relatório
        </h1>
        <p className="text-muted-foreground">
          Baixe seu relatório completo em formato PDF
        </p>
      </motion.div>

      {/* Main Content */}
      <motion.div
        className="flex-1 max-w-4xl mx-auto w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main Export Card */}
        <motion.div
          className="mb-8"
          variants={itemVariants}
        >
          <Card className="p-8 sm:p-12 bg-gradient-to-br from-primary/10 to-transparent border-primary/20 text-center">
            <div className="mb-6 flex justify-center">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center">
                <Download className="w-10 h-10 text-primary" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Seu Relatório Está Pronto
            </h2>
            <p className="text-muted-foreground mb-8">
              Clique abaixo para baixar seu relatório completo em PDF. Você pode compartilhá-lo com seu personal trainer ou nutricionista.
            </p>
            <Button
              size="lg"
              onClick={handleExportPDF}
              disabled={isExporting}
              className="w-full sm:w-auto px-8"
            >
              {isExporting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Gerando PDF...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Exportar PDF
                </>
              )}
            </Button>
          </Card>
        </motion.div>

        {/* What's Included */}
        <motion.div
          className="mb-8"
          variants={itemVariants}
        >
          <h3 className="text-xl font-bold text-foreground mb-4">
            O que está incluído no PDF:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <p className="text-2xl mb-2">{feature.icon}</p>
                <h4 className="font-semibold text-foreground mb-1">{feature.title}</h4>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tips */}
        <motion.div
          className="mb-8 p-6 rounded-lg bg-blue-500/10 border border-blue-500/20"
          variants={itemVariants}
        >
          <h3 className="font-semibold text-blue-500 mb-3">💡 Dicas</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Salve o PDF em um local seguro para referência futura</li>
            <li>• Compartilhe com seu personal trainer para ajustes</li>
            <li>• Imprima para levar à academia</li>
            <li>• Revise o plano a cada 4-6 semanas</li>
          </ul>
        </motion.div>

        {/* Privacy Notice */}
        <motion.div
          className="p-6 rounded-lg bg-green-500/10 border border-green-500/20"
          variants={itemVariants}
        >
          <div className="flex gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-green-500 mb-1">Sua Privacidade Está Protegida</h3>
              <p className="text-sm text-muted-foreground">
                Todos os seus dados foram processados localmente no seu navegador. Nenhuma informação foi armazenada em nossos servidores. Este PDF é apenas seu.
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
          onClick={nextStep}
          className="flex-1 h-12"
        >
          Pular
        </Button>
        <Button
          size="lg"
          onClick={handleExportPDF}
          disabled={isExporting}
          className="flex-1 h-12"
        >
          {isExporting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Exportando...
            </>
          ) : (
            <>
              <Download className="w-4 h-4 mr-2" />
              Exportar PDF
            </>
          )}
        </Button>
      </motion.div>
    </motion.div>
  );
}
