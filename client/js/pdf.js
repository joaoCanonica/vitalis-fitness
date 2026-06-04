/**
 * VITALIS - PDF Export Module
 * Exportação de relatório completo em PDF
 */

const pdf = {
  /**
   * Exporta o relatório completo em PDF
   * @param {object} data - Dados da avaliação
   * @param {object} result - Resultados calculados
   */
  async exportReport(data, result) {
    // Verificar se jsPDF está disponível
    if (typeof jsPDF === 'undefined') {
      alert('Erro ao carregar biblioteca PDF. Tente novamente.');
      return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    let yPosition = 20;

    // Cores
    const primaryColor = [59, 130, 246];  // Azul
    const textColor = [26, 26, 26];       // Preto
    const lightColor = [240, 242, 245];   // Cinza claro

    // ===== CABEÇALHO =====
    doc.setFillColor(...primaryColor);
    doc.rect(0, 0, 210, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.text('VITALIS', 15, 20);
    doc.setFontSize(10);
    doc.text('Avaliação Fitness Completa', 15, 28);
    doc.setTextColor(...textColor);

    yPosition = 50;

    // ===== SEÇÃO: DADOS PESSOAIS =====
    this.addSection(doc, 'DADOS PESSOAIS', yPosition, primaryColor);
    yPosition += 8;

    const personalInfo = [
      ['Nome:', data.personalData.fullName || '--'],
      ['Idade:', data.personalData.age + ' anos'],
      ['Altura:', data.personalData.height + ' cm'],
      ['Peso:', data.personalData.weight + ' kg'],
      ['Gênero:', data.personalData.gender === 'male' ? 'Masculino' : 
                 data.personalData.gender === 'female' ? 'Feminino' : 'Outro'],
    ];

    yPosition = this.addTable(doc, personalInfo, yPosition);

    // ===== SEÇÃO: MÉTRICAS CALCULADAS =====
    this.addSection(doc, 'MÉTRICAS CALCULADAS', yPosition, primaryColor);
    yPosition += 8;

    const metrics = [
      ['IMC', result.profile.bmi.toString(), result.profile.bmiCategory],
      ['TMB', result.profile.bmr + ' kcal/dia', 'Taxa Metabólica Basal'],
      ['TDEE', result.profile.tdee + ' kcal/dia', 'Gasto Energético Diário'],
      ['Água Diária', result.waterIntakeRecommendation + ' ml', 'Recomendado'],
      ['Somatotipo', result.profile.somatotype, 'Biotipo'],
    ];

    yPosition = this.addTable(doc, metrics, yPosition);

    // ===== SEÇÃO: PERFIL FITNESS =====
    this.addSection(doc, 'PERFIL FITNESS', yPosition, primaryColor);
    yPosition += 8;

    doc.setFontSize(10);
    doc.setTextColor(...textColor);
    doc.text('Classificação: ' + result.profile.classification, 15, yPosition);
    yPosition += 6;

    // ===== SEÇÃO: ANÁLISE =====
    this.addSection(doc, 'ANÁLISE DETALHADA', yPosition, primaryColor);
    yPosition += 8;

    // Pontos Fortes
    doc.setFontSize(11);
    doc.setTextColor(...primaryColor);
    doc.text('✓ Pontos Fortes:', 15, yPosition);
    yPosition += 6;

    doc.setFontSize(9);
    doc.setTextColor(...textColor);
    result.diagnosis.strengths.forEach((strength, index) => {
      doc.text('• ' + strength, 20, yPosition);
      yPosition += 5;
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }
    });

    yPosition += 3;

    // Pontos de Atenção
    doc.setFontSize(11);
    doc.setTextColor([245, 158, 11]);  // Amarelo
    doc.text('⚠ Pontos de Atenção:', 15, yPosition);
    yPosition += 6;

    doc.setFontSize(9);
    doc.setTextColor(...textColor);
    result.diagnosis.focusAreas.forEach((area, index) => {
      doc.text('• ' + area, 20, yPosition);
      yPosition += 5;
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }
    });

    yPosition += 3;

    // Recomendações
    doc.setFontSize(11);
    doc.setTextColor([16, 185, 129]);  // Verde
    doc.text('💡 Recomendações:', 15, yPosition);
    yPosition += 6;

    doc.setFontSize(9);
    doc.setTextColor(...textColor);
    result.diagnosis.recommendations.forEach((rec, index) => {
      doc.text('• ' + rec, 20, yPosition);
      yPosition += 5;
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }
    });

    // ===== PÁGINA 2: PLANO DE TREINO =====
    doc.addPage();
    yPosition = 20;

    doc.setFillColor(...primaryColor);
    doc.rect(0, 0, 210, 30, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.text('PLANO DE TREINO PERSONALIZADO', 15, 18);
    doc.setTextColor(...textColor);

    yPosition = 40;

    // Adicionar dias de treino
    if (result.workoutPlan && result.workoutPlan.length > 0) {
      result.workoutPlan.forEach((day, dayIndex) => {
        if (yPosition > 250) {
          doc.addPage();
          yPosition = 20;
        }

        // Cabeçalho do dia
        doc.setFillColor(...lightColor);
        doc.rect(15, yPosition - 5, 180, 8, 'F');
        doc.setFontSize(11);
        doc.setTextColor(...primaryColor);
        doc.text(day.day + ' - ' + day.focus, 20, yPosition + 1);
        yPosition += 12;

        // Exercícios
        doc.setFontSize(9);
        doc.setTextColor(...textColor);

        day.exercises.forEach((exercise, exIndex) => {
          if (yPosition > 270) {
            doc.addPage();
            yPosition = 20;
          }

          const exerciseText = `${exIndex + 1}. ${exercise.name}`;
          doc.text(exerciseText, 20, yPosition);
          yPosition += 4;

          const detailsText = `${exercise.sets} séries × ${exercise.reps} reps | Descanso: ${exercise.rest}s`;
          doc.setFontSize(8);
          doc.setTextColor([102, 102, 102]);
          doc.text(detailsText, 25, yPosition);
          doc.setFontSize(9);
          doc.setTextColor(...textColor);
          yPosition += 5;
        });

        yPosition += 5;
      });
    }

    // ===== RODAPÉ =====
    const pageCount = doc.internal.pages.length - 1;
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor([153, 153, 153]);
      doc.text(
        'Vitalis © 2024 | Avaliação Gerada em ' + new Date().toLocaleDateString('pt-BR'),
        15,
        doc.internal.pageSize.height - 10
      );
    }

    // Salvar PDF
    const fileName = `Vitalis_Avaliacao_${data.personalData.fullName || 'Usuario'}_${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(fileName);
  },

  /**
   * Adiciona uma seção com título
   */
  addSection(doc, title, yPosition, color) {
    doc.setFillColor(...color);
    doc.rect(15, yPosition - 5, 180, 7, 'F');
    doc.setFontSize(11);
    doc.setTextColor(255, 255, 255);
    doc.text(title, 20, yPosition + 1);
    return yPosition + 10;
  },

  /**
   * Adiciona uma tabela ao PDF
   */
  addTable(doc, data, yPosition) {
    const colWidth = 60;
    const rowHeight = 6;
    const startX = 15;

    doc.setFontSize(9);
    doc.setTextColor(26, 26, 26);

    data.forEach((row, rowIndex) => {
      let xPosition = startX;
      row.forEach((cell, colIndex) => {
        doc.text(cell.toString(), xPosition, yPosition);
        xPosition += colWidth;
      });
      yPosition += rowHeight;
    });

    return yPosition + 5;
  }
};
