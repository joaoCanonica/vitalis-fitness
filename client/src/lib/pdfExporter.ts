import { AssessmentResult, PersonalData } from '@/contexts/AssessmentContext';

export async function exportToPDF(
  personal: PersonalData,
  result: AssessmentResult
) {
  // Dynamic import to avoid issues with SSR
  const { jsPDF } = await import('jspdf');
  const { default: html2canvas } = await import('html2canvas');

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;
  let yPosition = margin;

  // Helper function to add text
  const addText = (text: string, size: number, weight: 'normal' | 'bold' = 'normal', color = '#1a1a1a') => {
    doc.setFontSize(size);
    doc.setFont('helvetica', weight);
    doc.setTextColor(color);
    const lines = doc.splitTextToSize(text, contentWidth);
    doc.text(lines, margin, yPosition);
    yPosition += (lines.length * size * 0.35) + 5;
  };

  // Helper function to check page break
  const checkPageBreak = (height: number) => {
    if (yPosition + height > pageHeight - margin) {
      doc.addPage();
      yPosition = margin;
    }
  };

  // Header
  doc.setFillColor(0, 122, 255);
  doc.rect(0, 0, pageWidth, 40, 'F');
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('VITALIS', margin, 25);

  yPosition = 50;

  // Title
  addText('Seu Relatório de Avaliação Fitness', 20, 'bold', '#007AFF');
  yPosition += 5;

  // Personal Info
  addText(`Nome: ${personal.fullName}`, 11);
  addText(`Data da Avaliação: ${new Date().toLocaleDateString('pt-BR')}`, 11);
  yPosition += 10;

  // Profile Section
  checkPageBreak(40);
  addText('Seu Perfil', 16, 'bold', '#007AFF');
  yPosition += 3;
  addText(`Classificação: ${result.profile.classification}`, 11);
  addText(`IMC: ${result.profile.bmi} (${result.profile.bmiCategory})`, 11);
  addText(`Taxa Metabólica Basal (TMB): ${result.profile.bmr} kcal`, 11);
  addText(`Gasto Calórico Diário (TDEE): ${result.profile.tdee} kcal`, 11);
  yPosition += 10;

  // Diagnosis Section
  checkPageBreak(60);
  addText('Diagnóstico Inicial', 16, 'bold', '#007AFF');
  yPosition += 3;
  addText(result.diagnosis.summary, 10);
  yPosition += 8;

  // Strengths
  checkPageBreak(30);
  addText('Pontos Fortes', 12, 'bold', '#34C759');
  result.diagnosis.strengths.forEach(strength => {
    addText(`• ${strength}`, 10);
  });
  yPosition += 5;

  // Focus Areas
  checkPageBreak(30);
  addText('Pontos de Atenção', 12, 'bold', '#FF9500');
  result.diagnosis.focusAreas.forEach(area => {
    addText(`• ${area}`, 10);
  });
  yPosition += 5;

  // Recommendations
  checkPageBreak(40);
  addText('Recomendações', 12, 'bold', '#007AFF');
  result.diagnosis.recommendations.forEach(rec => {
    addText(`• ${rec}`, 10);
  });
  yPosition += 8;

  // Water Intake
  checkPageBreak(20);
  addText(`Consumo de Água Recomendado: ${result.waterIntakeRecommendation}ml diários`, 11, 'bold');
  yPosition += 10;

  // Workout Plan
  checkPageBreak(30);
  addText('Seu Plano de Treino', 16, 'bold', '#007AFF');
  yPosition += 8;

  result.workoutPlan.forEach((day, index) => {
    checkPageBreak(50);
    addText(`${day.day} - ${day.focus}`, 12, 'bold');
    addText(`Aquecimento: ${day.warmup}`, 10);
    yPosition += 3;

    day.exercises.forEach(exercise => {
      addText(`${exercise.name}`, 11, 'bold');
      addText(`${exercise.sets} séries x ${exercise.reps} repetições | Descanso: ${exercise.rest}`, 10);
      addText(`Nota: ${exercise.notes}`, 9);
      yPosition += 2;
    });

    addText(`Resfriamento: ${day.cooldown}`, 10);
    yPosition += 8;
  });

  // Footer
  checkPageBreak(20);
  doc.setFontSize(9);
  doc.setTextColor(150, 150, 150);
  doc.text('Relatório gerado pelo Vitalis - Seu assistente de fitness pessoal', margin, pageHeight - 10);
  doc.text(`${new Date().toLocaleString('pt-BR')}`, margin, pageHeight - 5);

  // Save PDF
  doc.save(`Vitalis_Relatorio_${personal.fullName.replace(/\s+/g, '_')}.pdf`);
}
