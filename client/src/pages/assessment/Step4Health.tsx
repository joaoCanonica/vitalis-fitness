import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAssessment } from '@/contexts/AssessmentContext';
import { ChevronRight, ChevronLeft, X } from 'lucide-react';
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

  const sections = [
    { key: 'diseases', label: 'Doenças', placeholder: 'Ex: Diabetes, Hipertensão' },
    { key: 'injuries', label: 'Lesões', placeholder: 'Ex: Lesão no ombro' },
    { key: 'pains', label: 'Dores', placeholder: 'Ex: Dor nas costas' },
    { key: 'medications', label: 'Medicamentos', placeholder: 'Ex: Omeprazol' },
    { key: 'surgeries', label: 'Cirurgias', placeholder: 'Ex: Cirurgia de menisco' },
    { key: 'restrictions', label: 'Restrições', placeholder: 'Ex: Não posso fazer agachamento' },
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
            Sua Saúde
          </h1>
          <span className="text-sm font-medium text-muted-foreground">
            Etapa 4 de 8
          </span>
        </div>
        <div className="w-full bg-border rounded-full h-1">
          <div className="bg-primary h-1 rounded-full" style={{ width: '50%' }} />
        </div>
      </div>

      {/* Form Container */}
      <div className="flex-1 max-w-2xl mx-auto w-full overflow-y-auto">
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <p className="text-muted-foreground text-sm">
            Adicione informações sobre sua saúde. Todos os campos são opcionais.
          </p>

          {sections.map((section) => (
            <div key={section.key} className="space-y-3">
              <Label className="text-base font-medium">{section.label}</Label>
              
              {/* Input para adicionar novo item */}
              <div className="flex gap-2">
                <Input
                  placeholder={section.placeholder}
                  value={newItem[section.key] || ''}
                  onChange={(e) => setNewItem({ ...newItem, [section.key]: e.target.value })}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleAddItem(section.key);
                    }
                  }}
                  className="h-10 text-base"
                />
                <Button
                  size="sm"
                  onClick={() => handleAddItem(section.key)}
                  className="px-4"
                >
                  +
                </Button>
              </div>

              {/* Lista de itens adicionados */}
              {(healthData[section.key as keyof typeof healthData] as string[])?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {(healthData[section.key as keyof typeof healthData] as string[]).map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
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
            </div>
          ))}
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
          onClick={nextStep}
          className="flex-1 h-12"
        >
          Próximo
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </motion.div>
    </motion.div>
  );
}
