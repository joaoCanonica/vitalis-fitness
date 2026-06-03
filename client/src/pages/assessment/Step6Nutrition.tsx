import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup } from '@/components/ui/radio-group';
import { useAssessment } from '@/contexts/AssessmentContext';
import { ChevronRight, ChevronLeft, X } from 'lucide-react';
import { useState } from 'react';

export default function Step6Nutrition() {
  const { nutritionData, setNutritionData, nextStep, prevStep } = useAssessment();
  const [newItem, setNewItem] = useState<{ [key: string]: string }>({
    allergies: '',
    intolerances: '',
    diets: '',
  });

  const handleInputChange = (field: string, value: any) => {
    setNutritionData({
      ...nutritionData,
      [field]: value,
    });
  };

  const handleAddItem = (field: string) => {
    if (newItem[field]?.trim()) {
      setNutritionData({
        ...nutritionData,
        [field]: [...(nutritionData[field as keyof typeof nutritionData] as string[]), newItem[field]],
      });
      setNewItem({ ...newItem, [field]: '' });
    }
  };

  const handleRemoveItem = (field: string, index: number) => {
    setNutritionData({
      ...nutritionData,
      [field]: (nutritionData[field as keyof typeof nutritionData] as string[]).filter((_, i) => i !== index),
    });
  };

  const consumptionOptions = [
    { value: 'never', label: 'Nunca', emoji: '❌' },
    { value: 'rarely', label: 'Raramente', emoji: '😐' },
    { value: 'sometimes', label: 'Às vezes', emoji: '👍' },
    { value: 'daily', label: 'Diariamente', emoji: '✅' },
  ];

  const consumptionSections = [
    { key: 'fruitsConsumption', label: 'Frutas', emoji: '🍎' },
    { key: 'vegetablesConsumption', label: 'Verduras e Legumes', emoji: '🥗' },
    { key: 'sodaConsumption', label: 'Refrigerante', emoji: '🥤' },
    { key: 'sweetsConsumption', label: 'Doces e Açúcares', emoji: '🍰' },
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
            Sua Alimentação
          </h1>
          <span className="text-sm font-medium text-muted-foreground">
            Etapa 6 de 8
          </span>
        </div>
        <div className="w-full bg-border rounded-full h-1">
          <div className="bg-primary h-1 rounded-full" style={{ width: '75%' }} />
        </div>
      </div>

      {/* Form Container */}
      <div className="flex-1 max-w-2xl mx-auto w-full overflow-y-auto">
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {/* Consumo de Alimentos */}
          {consumptionSections.map((section) => (
            <div key={section.key} className="space-y-3">
              <Label className="text-base font-medium flex items-center gap-2">
                <span>{section.emoji}</span>
                {section.label}
              </Label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {consumptionOptions.map((option) => (
                  <motion.button
                    key={option.value}
                    onClick={() => handleInputChange(section.key, option.value)}
                    className={`p-3 rounded-lg border-2 transition-all text-center ${
                      nutritionData[section.key as keyof typeof nutritionData] === option.value
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-muted-foreground'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-xl block mb-1">{option.emoji}</span>
                    <span className="text-xs font-medium">{option.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          ))}

          {/* Alergias */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Alergias Alimentares</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Ex: Amendoim, Leite"
                value={newItem.allergies || ''}
                onChange={(e) => setNewItem({ ...newItem, allergies: e.target.value })}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleAddItem('allergies');
                  }
                }}
                className="h-10 text-base"
              />
              <Button
                size="sm"
                onClick={() => handleAddItem('allergies')}
                className="px-4"
              >
                +
              </Button>
            </div>
            {nutritionData.allergies?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {nutritionData.allergies.map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-2 bg-error/10 text-error px-3 py-1 rounded-full text-sm"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    {item}
                    <button
                      onClick={() => handleRemoveItem('allergies', index)}
                      className="hover:opacity-70 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Intolerâncias */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Intolerâncias Alimentares</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Ex: Glúten, Lactose"
                value={newItem.intolerances || ''}
                onChange={(e) => setNewItem({ ...newItem, intolerances: e.target.value })}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleAddItem('intolerances');
                  }
                }}
                className="h-10 text-base"
              />
              <Button
                size="sm"
                onClick={() => handleAddItem('intolerances')}
                className="px-4"
              >
                +
              </Button>
            </div>
            {nutritionData.intolerances?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {nutritionData.intolerances.map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-2 bg-warning/10 text-warning px-3 py-1 rounded-full text-sm"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    {item}
                    <button
                      onClick={() => handleRemoveItem('intolerances', index)}
                      className="hover:opacity-70 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Dietas */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Segue alguma dieta?</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Ex: Vegetariana, Vegana, Cetogênica"
                value={newItem.diets || ''}
                onChange={(e) => setNewItem({ ...newItem, diets: e.target.value })}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleAddItem('diets');
                  }
                }}
                className="h-10 text-base"
              />
              <Button
                size="sm"
                onClick={() => handleAddItem('diets')}
                className="px-4"
              >
                +
              </Button>
            </div>
            {nutritionData.diets?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {nutritionData.diets.map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    {item}
                    <button
                      onClick={() => handleRemoveItem('diets', index)}
                      className="hover:opacity-70 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Estratégia Alimentar */}
          <div className="space-y-2">
            <Label htmlFor="foodStrategy" className="text-base font-medium">
              Qual é sua estratégia alimentar? (Opcional)
            </Label>
            <textarea
              id="foodStrategy"
              placeholder="Ex: Prefiro refeições simples, gosto de cozinhar em casa..."
              value={nutritionData.foodStrategy}
              onChange={(e) => handleInputChange('foodStrategy', e.target.value)}
              className="w-full p-3 rounded-lg border border-border bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary min-h-24 text-base"
            />
          </div>
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
