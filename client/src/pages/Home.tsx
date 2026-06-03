import { useAssessment } from '@/contexts/AssessmentContext';
import Landing from './Landing';
import Step1PersonalData from './assessment/Step1PersonalData';
import Step2Goals from './assessment/Step2Goals';
import Step3TrainingHistory from './assessment/Step3TrainingHistory';
import Step4Health from './assessment/Step4Health';
import Step5Habits from './assessment/Step5Habits';
import Step6Nutrition from './assessment/Step6Nutrition';
import Step7Availability from './assessment/Step7Availability';
import Step8Summary from './assessment/Step8Summary';
import Step9Processing from './assessment/Step9Processing';
import Step10Results from './assessment/Step10Results';
import Step11WorkoutPlan from './assessment/Step11WorkoutPlan';
import Step12Export from './assessment/Step12Export';
import Step13Share from './assessment/Step13Share';
import { AnimatePresence } from 'framer-motion';

export default function Home() {
  const { currentStep } = useAssessment();

  const steps = [
    { component: Landing, key: 'landing' },
    { component: Step1PersonalData, key: 'step1' },
    { component: Step2Goals, key: 'step2' },
    { component: Step3TrainingHistory, key: 'step3' },
    { component: Step4Health, key: 'step4' },
    { component: Step5Habits, key: 'step5' },
    { component: Step6Nutrition, key: 'step6' },
    { component: Step7Availability, key: 'step7' },
    { component: Step8Summary, key: 'step8' },
    { component: Step9Processing, key: 'step9' },
    { component: Step10Results, key: 'step10' },
    { component: Step11WorkoutPlan, key: 'step11' },
    { component: Step12Export, key: 'step12' },
    { component: Step13Share, key: 'step13' },
  ];

  const CurrentStep = steps[currentStep]?.component || Landing;

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        <CurrentStep key={steps[currentStep]?.key} />
      </AnimatePresence>
    </div>
  );
}
