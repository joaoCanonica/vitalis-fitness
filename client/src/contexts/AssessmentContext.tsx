import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface PersonalData {
  fullName: string;
  age: number | '';
  height: number | '';
  weight: number | '';
  gender: 'male' | 'female' | 'other' | '';
  genderOther?: string;
}

export interface GoalData {
  mainGoal: 'weight_loss' | 'muscle_gain' | 'endurance' | 'general_fitness' | 'other' | '';
  desiredWeight: number | '';
  timeframe: '1_month' | '3_months' | '6_months' | '1_year' | 'other' | '';
  motivation: string;
  motivationOther?: string;
}

export interface TrainingHistoryData {
  experience: 'beginner' | 'intermediate' | 'advanced' | '';
  trainingDays: number | '';
  hasPersonalTrainer: boolean;
  hasNutritionist: boolean;
}

export interface HealthData {
  diseases: string[];
  injuries: string[];
  pains: string[];
  medications: string[];
  surgeries: string[];
  restrictions: string[];
}

export interface HabitsData {
  sleepQuality: 'poor' | 'fair' | 'good' | 'excellent' | '';
  sleepHours: number | '';
  alcoholConsumption: 'never' | 'rarely' | 'sometimes' | 'frequently' | '';
  smoking: 'never' | 'quit' | 'occasional' | 'daily' | '';
  stressLevel: 'low' | 'moderate' | 'high' | 'very_high' | '';
  waterIntake: number | '';
}

export interface NutritionData {
  fruitsConsumption: 'never' | 'rarely' | 'sometimes' | 'daily' | '';
  vegetablesConsumption: 'never' | 'rarely' | 'sometimes' | 'daily' | '';
  sodaConsumption: 'never' | 'rarely' | 'sometimes' | 'daily' | '';
  sweetsConsumption: 'never' | 'rarely' | 'sometimes' | 'daily' | '';
  allergies: string[];
  intolerances: string[];
  diets: string[];
  foodStrategy: string;
}

export interface AvailabilityData {
  availableDays: string[];
  timeAvailable: '30_min' | '45_min' | '60_min' | '90_min' | '';
  trainingLocation: 'home' | 'gym' | 'outdoor' | 'mixed' | '';
  equipment: string[];
}

export interface AssessmentResult {
  profile: {
    classification: string;
    bmi: number;
    bmiCategory: string;
    bmr: number;
    tdee: number;
    somatotype: string;
  };
  diagnosis: {
    summary: string;
    strengths: string[];
    focusAreas: string[];
    recommendations: string[];
  };
  workoutPlan: WorkoutDay[];
  waterIntakeRecommendation: number;
  identifiedGoals: string[];
}

export interface Exercise {
  name: string;
  sets: number;
  reps: string;
  rest: string;
  notes: string;
  muscleGroups: string[];
}

export interface WorkoutDay {
  day: string;
  focus: string;
  exercises: Exercise[];
  warmup: string;
  cooldown: string;
}

export interface AssessmentContextType {
  // Data
  personalData: PersonalData;
  goalData: GoalData;
  trainingHistoryData: TrainingHistoryData;
  healthData: HealthData;
  habitsData: HabitsData;
  nutritionData: NutritionData;
  availabilityData: AvailabilityData;
  result: AssessmentResult | null;

  // Setters
  setPersonalData: (data: PersonalData) => void;
  setGoalData: (data: GoalData) => void;
  setTrainingHistoryData: (data: TrainingHistoryData) => void;
  setHealthData: (data: HealthData) => void;
  setHabitsData: (data: HabitsData) => void;
  setNutritionData: (data: NutritionData) => void;
  setAvailabilityData: (data: AvailabilityData) => void;
  setResult: (result: AssessmentResult) => void;

  // Navigation
  currentStep: number;
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;

  // Processing
  isProcessing: boolean;
  setIsProcessing: (processing: boolean) => void;

  // Reset
  resetAssessment: () => void;
}

const AssessmentContext = createContext<AssessmentContextType | undefined>(undefined);

export const AssessmentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [personalData, setPersonalData] = useState<PersonalData>({
    fullName: '',
    age: '',
    height: '',
    weight: '',
    gender: '',
  });

  const [goalData, setGoalData] = useState<GoalData>({
    mainGoal: '',
    desiredWeight: '',
    timeframe: '',
    motivation: '',
  });

  const [trainingHistoryData, setTrainingHistoryData] = useState<TrainingHistoryData>({
    experience: '',
    trainingDays: '',
    hasPersonalTrainer: false,
    hasNutritionist: false,
  });

  const [healthData, setHealthData] = useState<HealthData>({
    diseases: [],
    injuries: [],
    pains: [],
    medications: [],
    surgeries: [],
    restrictions: [],
  });

  const [habitsData, setHabitsData] = useState<HabitsData>({
    sleepQuality: '',
    sleepHours: '',
    alcoholConsumption: '',
    smoking: '',
    stressLevel: '',
    waterIntake: '',
  });

  const [nutritionData, setNutritionData] = useState<NutritionData>({
    fruitsConsumption: '',
    vegetablesConsumption: '',
    sodaConsumption: '',
    sweetsConsumption: '',
    allergies: [],
    intolerances: [],
    diets: [],
    foodStrategy: '',
  });

  const [availabilityData, setAvailabilityData] = useState<AvailabilityData>({
    availableDays: [],
    timeAvailable: '',
    trainingLocation: '',
    equipment: [],
  });

  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 12));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  const resetAssessment = () => {
    setPersonalData({
      fullName: '',
      age: '',
      height: '',
      weight: '',
      gender: '',
    });
    setGoalData({
      mainGoal: '',
      desiredWeight: '',
      timeframe: '',
      motivation: '',
    });
    setTrainingHistoryData({
      experience: '',
      trainingDays: '',
      hasPersonalTrainer: false,
      hasNutritionist: false,
    });
    setHealthData({
      diseases: [],
      injuries: [],
      pains: [],
      medications: [],
      surgeries: [],
      restrictions: [],
    });
    setHabitsData({
      sleepQuality: '',
      sleepHours: '',
      alcoholConsumption: '',
      smoking: '',
      stressLevel: '',
      waterIntake: '',
    });
    setNutritionData({
      fruitsConsumption: '',
      vegetablesConsumption: '',
      sodaConsumption: '',
      sweetsConsumption: '',
      allergies: [],
      intolerances: [],
      diets: [],
      foodStrategy: '',
    });
    setAvailabilityData({
      availableDays: [],
      timeAvailable: '',
      trainingLocation: '',
      equipment: [],
    });
    setResult(null);
    setCurrentStep(0);
    setIsProcessing(false);
  };

  const value: AssessmentContextType = {
    personalData,
    goalData,
    trainingHistoryData,
    healthData,
    habitsData,
    nutritionData,
    availabilityData,
    result,
    setPersonalData,
    setGoalData,
    setTrainingHistoryData,
    setHealthData,
    setHabitsData,
    setNutritionData,
    setAvailabilityData,
    setResult,
    currentStep,
    setCurrentStep,
    nextStep,
    prevStep,
    isProcessing,
    setIsProcessing,
    resetAssessment,
  };

  return (
    <AssessmentContext.Provider value={value}>
      {children}
    </AssessmentContext.Provider>
  );
};

export const useAssessment = () => {
  const context = useContext(AssessmentContext);
  if (!context) {
    throw new Error('useAssessment must be used within AssessmentProvider');
  }
  return context;
};
