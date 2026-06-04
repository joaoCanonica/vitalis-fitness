/**
 * VITALIS - Calculations Module
 * Cálculos de métricas fitness: IMC, TMB, TDEE, Macros
 */

const calculations = {
  /**
   * Calcula o Índice de Massa Corporal (IMC)
   * @param {number} weight - Peso em kg
   * @param {number} height - Altura em cm
   * @returns {object} { bmi, category }
   */
  calculateBMI(weight, height) {
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);

    let category = '';
    if (bmi < 18.5) category = 'Abaixo do peso';
    else if (bmi < 25) category = 'Peso normal';
    else if (bmi < 30) category = 'Sobrepeso';
    else if (bmi < 35) category = 'Obesidade Grau I';
    else if (bmi < 40) category = 'Obesidade Grau II';
    else category = 'Obesidade Grau III';

    return {
      bmi: Math.round(bmi * 10) / 10,
      category: category
    };
  },

  /**
   * Calcula a Taxa Metabólica Basal (TMB) usando Mifflin-St Jeor
   * @param {number} weight - Peso em kg
   * @param {number} height - Altura em cm
   * @param {number} age - Idade em anos
   * @param {string} gender - 'male' ou 'female'
   * @returns {number} TMB em kcal/dia
   */
  calculateBMR(weight, height, age, gender) {
    let bmr;

    if (gender === 'male') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    return Math.round(bmr);
  },

  /**
   * Calcula o Gasto Energético Diário Total (TDEE)
   * @param {number} bmr - Taxa Metabólica Basal
   * @param {string} activityLevel - 'sedentary', 'light', 'moderate', 'active', 'very_active'
   * @returns {number} TDEE em kcal/dia
   */
  calculateTDEE(bmr, activityLevel = 'moderate') {
    const activityFactors = {
      'sedentary': 1.2,        // Pouco ou nenhum exercício
      'light': 1.375,          // Exercício leve (1-3 dias/semana)
      'moderate': 1.55,        // Exercício moderado (3-5 dias/semana)
      'active': 1.725,         // Exercício intenso (6-7 dias/semana)
      'very_active': 1.9       // Exercício muito intenso (2x por dia)
    };

    const factor = activityFactors[activityLevel] || 1.55;
    return Math.round(bmr * factor);
  },

  /**
   * Calcula macronutrientes recomendados
   * @param {number} tdee - Gasto energético diário total
   * @param {string} goal - 'weight_loss', 'muscle_gain', 'general_fitness'
   * @returns {object} { protein, carbs, fats }
   */
  calculateMacros(tdee, goal = 'general_fitness') {
    let proteinPercentage = 0.3;
    let carbPercentage = 0.4;
    let fatPercentage = 0.3;

    if (goal === 'muscle_gain') {
      proteinPercentage = 0.35;
      carbPercentage = 0.45;
      fatPercentage = 0.2;
    } else if (goal === 'weight_loss') {
      proteinPercentage = 0.35;
      carbPercentage = 0.35;
      fatPercentage = 0.3;
    }

    return {
      protein: Math.round((tdee * proteinPercentage) / 4),  // 4 kcal/g
      carbs: Math.round((tdee * carbPercentage) / 4),       // 4 kcal/g
      fats: Math.round((tdee * fatPercentage) / 9)          // 9 kcal/g
    };
  },

  /**
   * Calcula ingestão diária de água recomendada
   * @param {number} weight - Peso em kg
   * @param {string} activityLevel - Nível de atividade
   * @returns {number} Mililitros por dia
   */
  calculateWaterIntake(weight, activityLevel = 'moderate') {
    // Fórmula base: 35ml por kg de peso
    let baseWater = weight * 35;

    // Ajuste por atividade
    const activityBonus = {
      'sedentary': 0,
      'light': 200,
      'moderate': 400,
      'active': 600,
      'very_active': 800
    };

    return Math.round(baseWater + (activityBonus[activityLevel] || 400));
  },

  /**
   * Determina o somatotipo (biotipo)
   * @param {number} bmi - Índice de Massa Corporal
   * @param {string} gender - 'male' ou 'female'
   * @returns {string} Somatotipo
   */
  determineSomatotype(bmi, gender) {
    if (bmi < 18.5) return 'Ectomorfo';
    if (bmi < 25) return 'Mesomorfo';
    return 'Endomorfo';
  },

  /**
   * Gera classificação de perfil fitness
   * @param {number} bmi - Índice de Massa Corporal
   * @param {string} experience - Nível de experiência
   * @param {number} trainingDays - Dias de treino por semana
   * @returns {string} Classificação
   */
  getProfileClassification(bmi, experience, trainingDays) {
    if (experience === 'beginner') {
      return 'Iniciante em Transformação';
    } else if (experience === 'intermediate') {
      if (trainingDays >= 4) return 'Intermediário Consistente';
      return 'Intermediário em Desenvolvimento';
    } else {
      if (trainingDays >= 5) return 'Atleta Avançado';
      return 'Avançado em Manutenção';
    }
  },

  /**
   * Gera pontos fortes baseado no perfil
   * @param {object} data - Dados da avaliação
   * @returns {array} Lista de pontos fortes
   */
  getStrengths(data) {
    const strengths = [];

    if (data.personalData.age < 30) {
      strengths.push('Juventude a seu favor - recuperação mais rápida');
    }

    if (data.trainingHistoryData.experience !== 'beginner') {
      strengths.push('Experiência prévia com treino');
    }

    if (data.trainingHistoryData.trainingDays >= 4) {
      strengths.push('Consistência no treino - ' + data.trainingHistoryData.trainingDays + ' dias por semana');
    }

    if (data.habitsData.sleepQuality === 'good' || data.habitsData.sleepQuality === 'excellent') {
      strengths.push('Qualidade de sono adequada para recuperação');
    }

    if (data.habitsData.alcoholConsumption === 'never' || data.habitsData.alcoholConsumption === 'rarely') {
      strengths.push('Consumo moderado de álcool');
    }

    if (data.habitsData.smoking === 'never' || data.habitsData.smoking === 'quit') {
      strengths.push('Não fuma - melhor capacidade cardiovascular');
    }

    if (data.nutritionData.fruitsConsumption === 'daily' && data.nutritionData.vegetablesConsumption === 'daily') {
      strengths.push('Alimentação rica em frutas e verduras');
    }

    if (strengths.length === 0) {
      strengths.push('Disposição para começar uma transformação');
    }

    return strengths;
  },

  /**
   * Gera pontos de atenção baseado no perfil
   * @param {object} data - Dados da avaliação
   * @param {number} bmi - Índice de Massa Corporal
   * @returns {array} Lista de pontos de atenção
   */
  getFocusAreas(data, bmi) {
    const focusAreas = [];

    if (bmi >= 25) {
      focusAreas.push('Necessário trabalhar composição corporal');
    }

    if (data.trainingHistoryData.trainingDays < 3) {
      focusAreas.push('Aumentar frequência de treino para melhores resultados');
    }

    if (data.habitsData.sleepQuality === 'poor' || data.habitsData.sleepQuality === 'fair') {
      focusAreas.push('Melhorar qualidade do sono - fundamental para ganhos');
    }

    if (data.habitsData.stressLevel === 'high' || data.habitsData.stressLevel === 'very_high') {
      focusAreas.push('Gerenciar níveis de estresse');
    }

    if (data.habitsData.waterIntake < 1.5) {
      focusAreas.push('Aumentar ingestão de água diária');
    }

    if (data.nutritionData.sodaConsumption === 'frequently' || data.nutritionData.sodaConsumption === 'daily') {
      focusAreas.push('Reduzir consumo de bebidas açucaradas');
    }

    if (data.nutritionData.sweetsConsumption === 'frequently' || data.nutritionData.sweetsConsumption === 'daily') {
      focusAreas.push('Controlar ingestão de doces e alimentos ultraprocessados');
    }

    if (data.healthData.injuries.length > 0) {
      focusAreas.push('Adaptar treino às lesões: ' + data.healthData.injuries.join(', '));
    }

    if (focusAreas.length === 0) {
      focusAreas.push('Manter consistência e progressão gradual');
    }

    return focusAreas;
  },

  /**
   * Gera recomendações personalizadas
   * @param {object} data - Dados da avaliação
   * @param {number} bmi - Índice de Massa Corporal
   * @returns {array} Lista de recomendações
   */
  getRecommendations(data, bmi) {
    const recommendations = [];

    if (data.goalData.mainGoal === 'weight_loss') {
      recommendations.push('Criar déficit calórico de 300-500 kcal/dia');
      recommendations.push('Aumentar ingestão de proteína para preservar massa muscular');
      recommendations.push('Combinar treino de força com cardio moderado');
    } else if (data.goalData.mainGoal === 'muscle_gain') {
      recommendations.push('Criar superávit calórico de 300-500 kcal/dia');
      recommendations.push('Focar em progressão de carga nos exercícios');
      recommendations.push('Priorizar treino de força com 3-4 sessões/semana');
    } else if (data.goalData.mainGoal === 'endurance') {
      recommendations.push('Incluir treinos de cardio 3-4x por semana');
      recommendations.push('Trabalhar resistência aeróbica progressivamente');
      recommendations.push('Manter ingestão adequada de carboidratos');
    }

    recommendations.push('Acompanhar progresso com fotos e medidas a cada 4 semanas');
    recommendations.push('Consultar nutricionista para plano alimentar personalizado');
    recommendations.push('Priorizar sono de 7-9 horas por noite');
    recommendations.push('Fazer aquecimento adequado antes de treinar');

    if (data.trainingHistoryData.hasPersonalTrainer === false) {
      recommendations.push('Considerar acompanhamento com personal trainer');
    }

    return recommendations;
  }
};
