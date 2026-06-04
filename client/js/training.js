/**
 * VITALIS - Training Module
 * Geração de planos de treino personalizados
 */

const training = {
  /**
   * Gera um plano de treino completo
   * @param {object} data - Dados da avaliação
   * @returns {array} Array de dias de treino
   */
  generateWorkoutPlan(data) {
    const trainingDays = parseInt(data.trainingHistoryData.trainingDays) || 3;
    const experience = data.trainingHistoryData.experience;
    const goal = data.goalData.mainGoal;
    const location = data.availabilityData.trainingLocation;
    const equipment = data.availabilityData.equipment;
    const availableDays = data.availabilityData.availableDays;
    const injuries = data.healthData.injuries;

    // Selecionar dias da semana
    const selectedDays = availableDays.slice(0, trainingDays);
    if (selectedDays.length === 0) {
      selectedDays.push('monday', 'wednesday', 'friday');
    }

    // Gerar plano baseado em dias disponíveis
    let workoutPlan = [];

    if (trainingDays <= 3) {
      workoutPlan = this.generateFullBodyPlan(selectedDays, experience, goal, equipment, injuries);
    } else if (trainingDays <= 4) {
      workoutPlan = this.generateUpperLowerPlan(selectedDays, experience, goal, equipment, injuries);
    } else {
      workoutPlan = this.generatePPLPlan(selectedDays, experience, goal, equipment, injuries);
    }

    return workoutPlan;
  },

  /**
   * Gera plano Full Body (3 dias)
   */
  generateFullBodyPlan(days, experience, goal, equipment, injuries) {
    const dayNames = {
      'monday': 'Segunda-feira',
      'tuesday': 'Terça-feira',
      'wednesday': 'Quarta-feira',
      'thursday': 'Quinta-feira',
      'friday': 'Sexta-feira',
      'saturday': 'Sábado',
      'sunday': 'Domingo'
    };

    const fullBodyExercises = [
      // Perna
      { name: 'Agachamento', sets: 4, reps: '8-10', rest: 90, equipment: 'barbell' },
      { name: 'Leg Press', sets: 3, reps: '10-12', rest: 60, equipment: 'machine' },
      { name: 'Rosca Direta', sets: 3, reps: '8-10', rest: 60, equipment: 'barbell' },
      { name: 'Supino Reto', sets: 4, reps: '8-10', rest: 90, equipment: 'barbell' },
      { name: 'Rosca Inversa', sets: 3, reps: '10-12', rest: 60, equipment: 'barbell' },
      { name: 'Puxada na Lat', sets: 3, reps: '10-12', rest: 60, equipment: 'machine' },
      { name: 'Agachamento Livre', sets: 3, reps: '12-15', rest: 45, equipment: 'bodyweight' },
      { name: 'Flexão de Braço', sets: 3, reps: '10-15', rest: 45, equipment: 'bodyweight' },
    ];

    const plan = [];
    for (let i = 0; i < days.length; i++) {
      const dayKey = days[i];
      const dayName = dayNames[dayKey] || 'Dia ' + (i + 1);

      // Selecionar exercícios variados
      const dayExercises = this.selectExercises(fullBodyExercises, 5, experience, goal, injuries);

      plan.push({
        day: dayName,
        dayKey: dayKey,
        exercises: dayExercises,
        focus: 'Full Body',
        notes: this.getTrainingNotes(experience, goal)
      });
    }

    return plan;
  },

  /**
   * Gera plano Upper/Lower (4 dias)
   */
  generateUpperLowerPlan(days, experience, goal, equipment, injuries) {
    const dayNames = {
      'monday': 'Segunda-feira',
      'tuesday': 'Terça-feira',
      'wednesday': 'Quarta-feira',
      'thursday': 'Quinta-feira',
      'friday': 'Sexta-feira',
      'saturday': 'Sábado',
      'sunday': 'Domingo'
    };

    const upperExercises = [
      { name: 'Supino Reto', sets: 4, reps: '8-10', rest: 90, equipment: 'barbell' },
      { name: 'Rosca Direta', sets: 3, reps: '8-10', rest: 60, equipment: 'barbell' },
      { name: 'Puxada na Lat', sets: 3, reps: '10-12', rest: 60, equipment: 'machine' },
      { name: 'Rosca Inversa', sets: 3, reps: '10-12', rest: 60, equipment: 'barbell' },
      { name: 'Desenvolvimento de Ombro', sets: 3, reps: '8-10', rest: 60, equipment: 'dumbbell' },
    ];

    const lowerExercises = [
      { name: 'Agachamento', sets: 4, reps: '8-10', rest: 90, equipment: 'barbell' },
      { name: 'Leg Press', sets: 3, reps: '10-12', rest: 60, equipment: 'machine' },
      { name: 'Leg Curl', sets: 3, reps: '10-12', rest: 60, equipment: 'machine' },
      { name: 'Extensão de Perna', sets: 3, reps: '12-15', rest: 45, equipment: 'machine' },
      { name: 'Rosca Direta em Pé', sets: 3, reps: '12-15', rest: 45, equipment: 'barbell' },
    ];

    const plan = [];
    let isUpper = true;

    for (let i = 0; i < days.length; i++) {
      const dayKey = days[i];
      const dayName = dayNames[dayKey] || 'Dia ' + (i + 1);
      const exercises = isUpper 
        ? this.selectExercises(upperExercises, 5, experience, goal, injuries)
        : this.selectExercises(lowerExercises, 5, experience, goal, injuries);

      plan.push({
        day: dayName,
        dayKey: dayKey,
        exercises: exercises,
        focus: isUpper ? 'Trem Superior' : 'Trem Inferior',
        notes: this.getTrainingNotes(experience, goal)
      });

      isUpper = !isUpper;
    }

    return plan;
  },

  /**
   * Gera plano Push/Pull/Legs (6 dias)
   */
  generatePPLPlan(days, experience, goal, equipment, injuries) {
    const dayNames = {
      'monday': 'Segunda-feira',
      'tuesday': 'Terça-feira',
      'wednesday': 'Quarta-feira',
      'thursday': 'Quinta-feira',
      'friday': 'Sexta-feira',
      'saturday': 'Sábado',
      'sunday': 'Domingo'
    };

    const pushExercises = [
      { name: 'Supino Reto', sets: 4, reps: '8-10', rest: 90, equipment: 'barbell' },
      { name: 'Desenvolvimento de Ombro', sets: 3, reps: '8-10', rest: 60, equipment: 'dumbbell' },
      { name: 'Rosca Direta', sets: 3, reps: '8-10', rest: 60, equipment: 'barbell' },
      { name: 'Supino Inclinado', sets: 3, reps: '10-12', rest: 60, equipment: 'dumbbell' },
    ];

    const pullExercises = [
      { name: 'Puxada na Lat', sets: 4, reps: '8-10', rest: 90, equipment: 'machine' },
      { name: 'Rosca Inversa', sets: 3, reps: '10-12', rest: 60, equipment: 'barbell' },
      { name: 'Remada Curvada', sets: 3, reps: '8-10', rest: 60, equipment: 'barbell' },
      { name: 'Face Pull', sets: 3, reps: '12-15', rest: 45, equipment: 'rope' },
    ];

    const legExercises = [
      { name: 'Agachamento', sets: 4, reps: '8-10', rest: 90, equipment: 'barbell' },
      { name: 'Leg Press', sets: 3, reps: '10-12', rest: 60, equipment: 'machine' },
      { name: 'Leg Curl', sets: 3, reps: '10-12', rest: 60, equipment: 'machine' },
      { name: 'Extensão de Perna', sets: 3, reps: '12-15', rest: 45, equipment: 'machine' },
    ];

    const plan = [];
    const sequence = ['push', 'pull', 'legs'];
    let sequenceIndex = 0;

    for (let i = 0; i < Math.min(days.length, 6); i++) {
      const dayKey = days[i];
      const dayName = dayNames[dayKey] || 'Dia ' + (i + 1);
      const focus = sequence[sequenceIndex % 3];

      let exercises = [];
      if (focus === 'push') {
        exercises = this.selectExercises(pushExercises, 4, experience, goal, injuries);
      } else if (focus === 'pull') {
        exercises = this.selectExercises(pullExercises, 4, experience, goal, injuries);
      } else {
        exercises = this.selectExercises(legExercises, 4, experience, goal, injuries);
      }

      plan.push({
        day: dayName,
        dayKey: dayKey,
        exercises: exercises,
        focus: focus === 'push' ? 'Push (Peito/Ombro/Tríceps)' : 
               focus === 'pull' ? 'Pull (Costas/Bíceps)' : 'Legs (Pernas)',
        notes: this.getTrainingNotes(experience, goal)
      });

      sequenceIndex++;
    }

    return plan;
  },

  /**
   * Seleciona exercícios de forma aleatória
   */
  selectExercises(exercises, count, experience, goal, injuries) {
    const selected = [];
    const shuffled = [...exercises].sort(() => Math.random() - 0.5);

    for (let i = 0; i < Math.min(count, shuffled.length); i++) {
      const exercise = shuffled[i];

      // Ajustar repetições baseado na experiência
      if (experience === 'beginner') {
        exercise.reps = '12-15';
        exercise.sets = Math.max(2, exercise.sets - 1);
      } else if (experience === 'advanced') {
        exercise.sets = Math.min(5, exercise.sets + 1);
      }

      // Ajustar baseado no objetivo
      if (goal === 'muscle_gain') {
        exercise.reps = '8-12';
      } else if (goal === 'weight_loss') {
        exercise.reps = '12-15';
        exercise.rest = Math.max(30, exercise.rest - 15);
      }

      selected.push(exercise);
    }

    return selected;
  },

  /**
   * Gera notas de treino personalizadas
   */
  getTrainingNotes(experience, goal) {
    let notes = [];

    if (experience === 'beginner') {
      notes.push('Foque em aprender a forma correta dos exercícios');
      notes.push('Não se preocupe com carga pesada no início');
    } else if (experience === 'advanced') {
      notes.push('Trabalhe com progressão de carga constante');
      notes.push('Considere técnicas avançadas como drop sets');
    }

    if (goal === 'muscle_gain') {
      notes.push('Mantenha um superávit calórico');
      notes.push('Durma bem para otimizar recuperação');
    } else if (goal === 'weight_loss') {
      notes.push('Mantenha um déficit calórico moderado');
      notes.push('Combine com cardio 2-3x por semana');
    }

    return notes;
  }
};
