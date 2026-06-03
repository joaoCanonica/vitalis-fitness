import {
  PersonalData,
  GoalData,
  TrainingHistoryData,
  HealthData,
  HabitsData,
  NutritionData,
  AvailabilityData,
  AssessmentResult,
  WorkoutDay,
  Exercise,
} from '@/contexts/AssessmentContext';

export function calculateBMI(weight: number, height: number): number {
  // height in cm, weight in kg
  const heightInMeters = height / 100;
  return weight / (heightInMeters * heightInMeters);
}

export function getBMICategory(bmi: number): string {
  if (bmi < 18.5) return 'Abaixo do peso';
  if (bmi < 25) return 'Peso normal';
  if (bmi < 30) return 'Sobrepeso';
  return 'Obeso';
}

export function calculateBMR(weight: number, height: number, age: number, gender: string): number {
  // Mifflin-St Jeor equation
  if (gender === 'male') {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    return 10 * weight + 6.25 * height - 5 * age - 161;
  }
}

export function calculateTDEE(bmr: number, activityLevel: number): number {
  return Math.round(bmr * activityLevel);
}

export function getSomatotype(weight: number, height: number, bmi: number): string {
  // Simplified somatotype classification
  if (bmi < 20) return 'Ectomorfo';
  if (bmi > 28) return 'Endomorfo';
  return 'Mesomorfo';
}

export function generateAssessmentResult(
  personal: PersonalData,
  goal: GoalData,
  training: TrainingHistoryData,
  health: HealthData,
  habits: HabitsData,
  nutrition: NutritionData,
  availability: AvailabilityData
): AssessmentResult {
  const weight = typeof personal.weight === 'number' ? personal.weight : 70;
  const height = typeof personal.height === 'number' ? personal.height : 170;
  const age = typeof personal.age === 'number' ? personal.age : 30;

  const bmi = calculateBMI(weight, height);
  const bmiCategory = getBMICategory(bmi);
  const bmr = calculateBMR(weight, height, age, personal.gender || 'male');
  
  // Activity level based on training days
  const trainingDays = typeof training.trainingDays === 'number' ? training.trainingDays : 3;
  let activityMultiplier = 1.375; // Moderate activity
  if (trainingDays <= 2) activityMultiplier = 1.2;
  else if (trainingDays >= 5) activityMultiplier = 1.55;
  
  const tdee = calculateTDEE(bmr, activityMultiplier);
  const somatotype = getSomatotype(weight, height, bmi);

  // Generate strengths and focus areas
  const strengths: string[] = [];
  const focusAreas: string[] = [];
  const recommendations: string[] = [];

  if (trainingDays >= 4) {
    strengths.push('Excelente frequência de treino');
  } else if (trainingDays >= 3) {
    strengths.push('Boa frequência de treino');
  } else {
    focusAreas.push('Aumentar frequência de treino');
  }

  if (availability.trainingLocation === 'gym') {
    strengths.push('Acesso a equipamentos completos');
  }

  if (habits.sleepQuality === 'good' || habits.sleepQuality === 'excellent') {
    strengths.push('Qualidade de sono adequada');
  } else {
    focusAreas.push('Melhorar qualidade do sono');
  }

  if (nutrition.fruitsConsumption === 'daily' && nutrition.vegetablesConsumption === 'daily') {
    strengths.push('Alimentação equilibrada');
  } else {
    focusAreas.push('Aumentar consumo de frutas e vegetais');
  }

  if (health.restrictions.length > 0) {
    focusAreas.push(`Atenção especial às restrições: ${health.restrictions.join(', ')}`);
  }

  if (habits.stressLevel === 'high' || habits.stressLevel === 'very_high') {
    focusAreas.push('Implementar técnicas de redução de estresse');
  }

  // Generate recommendations
  if (goal.mainGoal === 'muscle_gain') {
    recommendations.push(`Ingestão de proteína: ${Math.round(weight * 1.8)}g diários`);
    recommendations.push('Foco em exercícios compostos com sobrecarga progressiva');
    recommendations.push('Superávit calórico moderado de 300-500 kcal');
  } else if (goal.mainGoal === 'weight_loss') {
    recommendations.push(`Ingestão de proteína: ${Math.round(weight * 1.6)}g diários`);
    recommendations.push('Déficit calórico de 300-500 kcal');
    recommendations.push('Priorizar treino de força com intensidade moderada');
  } else {
    recommendations.push(`Ingestão de proteína: ${Math.round(weight * 1.6)}g diários`);
    recommendations.push('Manutenção calórica com foco em composição corporal');
  }

  recommendations.push(`Consumo de água: ${Math.round(weight * 35)}ml diários`);

  // Generate identified goals
  const identifiedGoals: string[] = [];
  if (goal.mainGoal === 'muscle_gain') {
    identifiedGoals.push('Ganho de massa magra');
  } else if (goal.mainGoal === 'weight_loss') {
    identifiedGoals.push('Redução de peso corporal');
  } else if (goal.mainGoal === 'endurance') {
    identifiedGoals.push('Melhora de resistência cardiovascular');
  }
  identifiedGoals.push('Melhora da composição corporal');
  identifiedGoals.push('Aumento de força e funcionalidade');

  // Generate workout plan
  const workoutPlan = generateWorkoutPlan(
    trainingDays,
    goal.mainGoal as string,
    training.experience as string,
    availability.equipment,
    health.restrictions
  );

  const waterIntakeRecommendation = Math.round(weight * 35);

  return {
    profile: {
      classification: `${somatotype} - Nível ${training.experience === 'beginner' ? 'I' : training.experience === 'intermediate' ? 'II' : 'III'}`,
      bmi: Math.round(bmi * 10) / 10,
      bmiCategory,
      bmr: Math.round(bmr),
      tdee,
      somatotype,
    },
    diagnosis: {
      summary: generateDiagnosisSummary(personal, goal, training, health, habits, bmi, somatotype),
      strengths,
      focusAreas,
      recommendations,
    },
    workoutPlan,
    waterIntakeRecommendation,
    identifiedGoals,
  };
}

function generateDiagnosisSummary(
  personal: PersonalData,
  goal: GoalData,
  training: TrainingHistoryData,
  health: HealthData,
  habits: HabitsData,
  bmi: number,
  somatotype: string
): string {
  const age = typeof personal.age === 'number' ? personal.age : 30;
  const experience = training.experience === 'beginner' ? 'iniciante' : training.experience === 'intermediate' ? 'intermediário' : 'avançado';
  
  let summary = `Você é um aluno ${experience}, com ${age} anos, biotipo ${somatotype.toLowerCase()} e IMC ${Math.round(bmi * 10) / 10}. `;
  
  if (goal.mainGoal === 'muscle_gain') {
    summary += 'Seu objetivo é ganho de massa magra, o que requer treino de força consistente e alimentação estratégica. ';
  } else if (goal.mainGoal === 'weight_loss') {
    summary += 'Seu objetivo é redução de peso, o que demanda déficit calórico moderado e treino combinado. ';
  } else if (goal.mainGoal === 'endurance') {
    summary += 'Seu objetivo é melhora de resistência, o que exige trabalho cardiovascular progressivo. ';
  }

  if (health.restrictions.length > 0) {
    summary += `Você possui restrições importantes (${health.restrictions.join(', ')}) que devem ser consideradas. `;
  }

  if (habits.sleepQuality === 'poor' || habits.sleepQuality === 'fair') {
    summary += 'A qualidade do seu sono precisa melhorar para otimizar resultados. ';
  }

  summary += 'Este plano foi personalizado para suas necessidades específicas.';

  return summary;
}

function generateWorkoutPlan(
  trainingDays: number,
  goal: string,
  experience: string,
  equipment: string[],
  restrictions: string[]
): WorkoutDay[] {
  const plan: WorkoutDay[] = [];

  if (trainingDays === 3) {
    plan.push(
      generateWorkoutDay('Segunda-feira', 'Trem Superior', goal, experience, equipment, restrictions),
      generateWorkoutDay('Quarta-feira', 'Trem Inferior', goal, experience, equipment, restrictions),
      generateWorkoutDay('Sexta-feira', 'Corpo Inteiro', goal, experience, equipment, restrictions)
    );
  } else if (trainingDays === 4) {
    plan.push(
      generateWorkoutDay('Segunda-feira', 'Peito e Tríceps', goal, experience, equipment, restrictions),
      generateWorkoutDay('Terça-feira', 'Costas e Bíceps', goal, experience, equipment, restrictions),
      generateWorkoutDay('Quinta-feira', 'Pernas', goal, experience, equipment, restrictions),
      generateWorkoutDay('Sexta-feira', 'Ombros e Core', goal, experience, equipment, restrictions)
    );
  } else if (trainingDays === 5) {
    plan.push(
      generateWorkoutDay('Segunda-feira', 'Peito', goal, experience, equipment, restrictions),
      generateWorkoutDay('Terça-feira', 'Costas', goal, experience, equipment, restrictions),
      generateWorkoutDay('Quarta-feira', 'Pernas', goal, experience, equipment, restrictions),
      generateWorkoutDay('Quinta-feira', 'Ombros', goal, experience, equipment, restrictions),
      generateWorkoutDay('Sexta-feira', 'Membros Inferiores e Core', goal, experience, equipment, restrictions)
    );
  } else {
    // 2 dias ou outro
    plan.push(
      generateWorkoutDay('Segunda-feira', 'Trem Superior', goal, experience, equipment, restrictions),
      generateWorkoutDay('Quinta-feira', 'Trem Inferior', goal, experience, equipment, restrictions)
    );
  }

  return plan;
}

function generateWorkoutDay(
  day: string,
  focus: string,
  goal: string,
  experience: string,
  equipment: string[],
  restrictions: string[]
): WorkoutDay {
  const hasFullGym = equipment.includes('full_gym');
  const hasBodyweight = equipment.includes('bodyweight');

  let exercises: Exercise[] = [];

  // Generate exercises based on focus and equipment
  if (focus.includes('Peito')) {
    if (hasFullGym) {
      exercises.push(
        { name: 'Supino Reto', sets: 4, reps: '8-10', rest: '90s', notes: 'Controle na descida', muscleGroups: ['peito', 'tríceps'] },
        { name: 'Supino Inclinado', sets: 3, reps: '10-12', rest: '75s', notes: 'Foco na parte superior', muscleGroups: ['peito'] },
        { name: 'Crucifixo na Máquina', sets: 3, reps: '12-15', rest: '60s', notes: 'Alongamento máximo', muscleGroups: ['peito'] },
        { name: 'Flexão de Braço', sets: 3, reps: '10-15', rest: '60s', notes: 'Finalizador', muscleGroups: ['peito', 'tríceps'] }
      );
    } else {
      exercises.push(
        { name: 'Flexão de Braço', sets: 4, reps: '10-15', rest: '60s', notes: 'Variações conforme necessário', muscleGroups: ['peito', 'tríceps'] },
        { name: 'Flexão Declinada', sets: 3, reps: '8-12', rest: '60s', notes: 'Aumenta intensidade', muscleGroups: ['peito'] }
      );
    }
  }

  if (focus.includes('Costas')) {
    if (hasFullGym) {
      exercises.push(
        { name: 'Barra Fixa', sets: 4, reps: '6-10', rest: '90s', notes: 'Movimento fundamental', muscleGroups: ['costas', 'bíceps'] },
        { name: 'Rosca Direta', sets: 3, reps: '8-10', rest: '75s', notes: 'Barra ou halteres', muscleGroups: ['bíceps'] },
        { name: 'Remada Curvada', sets: 3, reps: '10-12', rest: '75s', notes: 'Foco no meio das costas', muscleGroups: ['costas'] },
        { name: 'Puxada Frontal', sets: 3, reps: '10-12', rest: '60s', notes: 'Complementar', muscleGroups: ['costas', 'bíceps'] }
      );
    } else {
      exercises.push(
        { name: 'Barra Fixa', sets: 4, reps: '6-12', rest: '90s', notes: 'Variações conforme capacidade', muscleGroups: ['costas', 'bíceps'] },
        { name: 'Flexão Invertida', sets: 3, reps: '8-12', rest: '60s', notes: 'Se disponível', muscleGroups: ['costas', 'bíceps'] }
      );
    }
  }

  if (focus.includes('Perna') || focus.includes('Inferior')) {
    if (hasFullGym) {
      exercises.push(
        { name: 'Agachamento Livre', sets: 4, reps: '8-10', rest: '2min', notes: 'Movimento fundamental', muscleGroups: ['pernas', 'glúteos'] },
        { name: 'Leg Press', sets: 3, reps: '10-12', rest: '90s', notes: 'Complementar', muscleGroups: ['pernas', 'glúteos'] },
        { name: 'Cadeira Extensora', sets: 3, reps: '12-15', rest: '60s', notes: 'Isolamento de quadríceps', muscleGroups: ['pernas'] },
        { name: 'Cadeira Flexora', sets: 3, reps: '12-15', rest: '60s', notes: 'Isolamento de posteriores', muscleGroups: ['pernas'] }
      );
    } else {
      exercises.push(
        { name: 'Agachamento Livre', sets: 4, reps: '12-15', rest: '90s', notes: 'Movimento fundamental', muscleGroups: ['pernas', 'glúteos'] },
        { name: 'Afundo', sets: 3, reps: '10-12', rest: '60s', notes: 'Cada perna', muscleGroups: ['pernas', 'glúteos'] }
      );
    }
  }

  if (focus.includes('Ombro')) {
    if (hasFullGym) {
      exercises.push(
        { name: 'Desenvolvimento Militar', sets: 4, reps: '8-10', rest: '90s', notes: 'Movimento fundamental', muscleGroups: ['ombros'] },
        { name: 'Elevação Lateral', sets: 3, reps: '12-15', rest: '60s', notes: 'Isolamento', muscleGroups: ['ombros'] },
        { name: 'Elevação Frontal', sets: 3, reps: '12-15', rest: '60s', notes: 'Anterior', muscleGroups: ['ombros'] }
      );
    }
  }

  if (focus.includes('Core') || focus.includes('Corpo Inteiro')) {
    exercises.push(
      { name: 'Prancha', sets: 3, reps: '30-60s', rest: '45s', notes: 'Isométrico', muscleGroups: ['core'] },
      { name: 'Abdominal', sets: 3, reps: '15-20', rest: '45s', notes: 'Controlado', muscleGroups: ['core'] }
    );
  }

  // Ensure minimum exercises
  if (exercises.length === 0) {
    exercises.push(
      { name: 'Exercício Principal', sets: 3, reps: '10-12', rest: '90s', notes: 'Adapte conforme sua capacidade', muscleGroups: ['geral'] }
    );
  }

  return {
    day,
    focus,
    exercises,
    warmup: '5-10 minutos de mobilidade dinâmica e aquecimento específico',
    cooldown: '5-10 minutos de alongamento estático',
  };
}
