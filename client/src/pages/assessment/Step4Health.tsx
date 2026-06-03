import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAssessment } from '@/contexts/AssessmentContext';
import { ChevronRight, ChevronLeft, X, Plus } from 'lucide-react';
import { useState } from 'react';

export default function Step4Health() {
  const { healthData, setHealthData, nextStep, prevStep } = useAssessment();
  const [newItem, setNewItem] = useState<{ [key: string]: string }>({
    diseases: '',
    injuries: '',
    pains: '',
    medications: '',
    surgeries: '',
    restrictions: '',
  });

  const handleAddItem = (field: string) => {
    if (newItem[field]?.trim()) {
      setHealthData({
        ...healthData,
        [field]: [...(healthData[field as keyof typeof healthData] as string[]), newItem[field]],
      });
      setNewItem({ ...newItem, [field]: '' });
    }
  };

  const handleRemoveItem = (field: string, index: number) => {
    setHealthData({
      ...healthData,
      [field]: (healthData[field as keyof typeof healthData] as string[]).filter((_, i) => i !== index),
    });
  };

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

  const sections = [
    { key: 'diseases', label: 'Doenças', icon: '🏥', placeholder: 'Ex: Diabetes, Hipertensão' },
    { key: 'injuries', label: 'Lesões', icon: '🩹', placeholder: 'Ex: Lesão no ombro' },
    { key: 'pains', label: 'Dores', icon: '😣', placeholder: 'Ex: Dor nas costas' },
    { key: 'medications', label: 'Medicamentos', icon: '💊', placeholder: 'Ex: Omeprazol' },
    { key: 'surgeries', label: 'Cirurgias', icon: '🔪', placeholder: 'Ex: Cirurgia de menisco' },
    { key: 'restrictions', label: 'Restrições', icon: '⛔', placeholder: 'Ex: Não posso fazer agachamento' },
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
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">
              Etapa 4 de 8
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
              Sua Saúde
            </h1>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-border rounded-full h-1.5 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-blue-400"
            initial={{ width: '0%' }}
            animate={{ width: '50%' }}
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
          {/* Info Box */}
          <motion.div
            className="p-4 rounded-lg bg-primary/5 border border-primary/20"
            variants={itemVariants}
          >
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">ℹ️ Informação:</span> Esses dados ajudam a personalizar seu plano de treino de forma segura.
            </p>
          </motion.div>

          {/* Health Sections */}
          {sections.map((section) => (
            <motion.div
              key={section.key}
              className="space-y-3"
              variants={itemVariants}
            >
              <Label className="text-sm font-semibold text-foreground flex items-center gap-2">
                <span>{section.icon}</span>
                {section.label}
              </Label>

              {/* Input Row */}
              <div className="flex gap-2">
                <Input
                  placeholder={section.placeholder}
                  value={newItem[section.key]}
                  onChange={(e) => setNewItem({ ...newItem, [section.key]: e.target.value })}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleAddItem(section.key);
                    }
                  }}
                  className="h-11 text-base"
                />
                <Button
                  type="button"
                  size="icon"
                  onClick={() => handleAddItem(section.key)}
                  className="h-11 w-11 flex-shrink-0"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              {/* Items List */}
              {(healthData[section.key as keyof typeof healthData] as string[]).length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {(healthData[section.key as keyof typeof healthData] as string[]).map((item, index) => (
                    <motion.div
                      key={index}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/20 text-primary text-sm font-medium"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                    >
                      {item}
                      <button
                        onClick={() => handleRemoveItem(section.key, index)}
                        className="hover:opacity-70 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
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
          className="flex-1 h-11"
        >
          Próximo
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </motion.div>
    </motion.div>
  );
}
