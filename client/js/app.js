/**
 * VITALIS - Main Application
 * Lógica principal, navegação, estado e tema
 */

const app = {
  // Estado global
  currentStep: 0,
  totalSteps: 13,
  assessmentData: {
    personalData: {},
    goalData: {},
    trainingHistoryData: {},
    healthData: { diseases: [], injuries: [], pains: [], medications: [], surgeries: [], restrictions: [] },
    habitsData: {},
    nutritionData: { allergies: [], intolerances: [], diets: [] },
    availabilityData: { availableDays: [], equipment: [] }
  },
  result: null,
  theme: 'light',

  /**
   * Inicializa a aplicação
   */
  init() {
    this.loadTheme();
    this.attachEventListeners();
    this.setupGenderOtherToggle();
    this.showStep(0);
  },

  /**
   * Carrega tema salvo
   */
  loadTheme() {
    const savedTheme = localStorage.getItem('vitalis-theme') || 'light';
    this.theme = savedTheme;
    this.applyTheme();
  },

  /**
   * Aplica tema
   */
  applyTheme() {
    document.documentElement.setAttribute('data-theme', this.theme);
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
      themeToggle.textContent = this.theme === 'light' ? '🌙' : '☀️';
    }
  },

  /**
   * Alterna tema
   */
  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('vitalis-theme', this.theme);
    this.applyTheme();
  },

  /**
   * Anexa event listeners
   */
  attachEventListeners() {
    // Toggle de tema
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    // Botões de opção
    document.querySelectorAll('.btn-option').forEach(btn => {
      btn.addEventListener('click', (e) => this.selectOption(e.target));
    });

    // Checkboxes de dias
    document.querySelectorAll('input[name="availableDays"]').forEach(checkbox => {
      checkbox.addEventListener('change', (e) => this.updateAvailableDays());
    });

    // Enter em inputs de tags
    document.querySelectorAll('.tag-input-group .form-input').forEach(input => {
      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          const fieldName = input.id;
          this.addTag(fieldName);
        }
      });
    });
  },

  /**
   * Configura toggle de gênero "outro"
   */
  setupGenderOtherToggle() {
    const genderSelect = document.getElementById('gender');
    const genderOtherGroup = document.getElementById('genderOtherGroup');

    if (genderSelect) {
      genderSelect.addEventListener('change', (e) => {
        if (e.target.value === 'other') {
          genderOtherGroup.style.display = 'block';
        } else {
          genderOtherGroup.style.display = 'none';
        }
      });
    }
  },

  /**
   * Seleciona opção de botão
   */
  selectOption(button) {
    const fieldName = button.getAttribute('data-field');
    const fieldValue = button.getAttribute('data-value');

    // Remover seleção anterior
    const group = button.parentElement;
    group.querySelectorAll('.btn-option').forEach(btn => {
      btn.classList.remove('active');
    });

    // Adicionar seleção atual
    button.classList.add('active');

    // Atualizar dados
    this.updateAssessmentData(fieldName, fieldValue);
  },

  /**
   * Atualiza dados da avaliação
   */
  updateAssessmentData(fieldName, fieldValue) {
    // Mapear campo para seção correta
    if (['fullName', 'age', 'height', 'weight', 'gender', 'genderOther'].includes(fieldName)) {
      this.assessmentData.personalData[fieldName] = fieldValue;
    } else if (['mainGoal', 'desiredWeight', 'timeframe', 'motivation'].includes(fieldName)) {
      this.assessmentData.goalData[fieldName] = fieldValue;
    } else if (['experience', 'trainingDays', 'hasPersonalTrainer', 'hasNutritionist'].includes(fieldName)) {
      this.assessmentData.trainingHistoryData[fieldName] = fieldValue;
    } else if (['sleepQuality', 'sleepHours', 'alcoholConsumption', 'smoking', 'stressLevel', 'waterIntake'].includes(fieldName)) {
      this.assessmentData.habitsData[fieldName] = fieldValue;
    } else if (['fruitsConsumption', 'vegetablesConsumption', 'sodaConsumption', 'sweetsConsumption'].includes(fieldName)) {
      this.assessmentData.nutritionData[fieldName] = fieldValue;
    } else if (['timeAvailable', 'trainingLocation'].includes(fieldName)) {
      this.assessmentData.availabilityData[fieldName] = fieldValue;
    }
  },

  /**
   * Atualiza dias disponíveis
   */
  updateAvailableDays() {
    const selected = [];
    document.querySelectorAll('input[name="availableDays"]:checked').forEach(checkbox => {
      selected.push(checkbox.value);
    });
    this.assessmentData.availabilityData.availableDays = selected;
  },

  /**
   * Adiciona tag
   */
  addTag(fieldName) {
    const input = document.getElementById(fieldName);
    const value = input.value.trim();

    if (!value) return;

    // Mapear para campo correto
    let arrayField = null;
    if (fieldName === 'diseases') arrayField = 'diseases';
    else if (fieldName === 'injuries') arrayField = 'injuries';
    else if (fieldName === 'pains') arrayField = 'pains';
    else if (fieldName === 'medications') arrayField = 'medications';
    else if (fieldName === 'allergies') arrayField = 'allergies';
    else if (fieldName === 'intolerances') arrayField = 'intolerances';
    else if (fieldName === 'equipment') arrayField = 'equipment';

    if (arrayField) {
      if (arrayField === 'equipment') {
        this.assessmentData.availabilityData[arrayField].push(value);
      } else if (['diseases', 'injuries', 'pains', 'medications'].includes(arrayField)) {
        this.assessmentData.healthData[arrayField].push(value);
      } else {
        this.assessmentData.nutritionData[arrayField].push(value);
      }

      input.value = '';
      this.renderTags(fieldName);
    }
  },

  /**
   * Renderiza tags
   */
  renderTags(fieldName) {
    const container = document.getElementById(fieldName + 'Tags');
    if (!container) return;

    container.innerHTML = '';

    let tags = [];
    if (fieldName === 'diseases') tags = this.assessmentData.healthData.diseases;
    else if (fieldName === 'injuries') tags = this.assessmentData.healthData.injuries;
    else if (fieldName === 'pains') tags = this.assessmentData.healthData.pains;
    else if (fieldName === 'medications') tags = this.assessmentData.healthData.medications;
    else if (fieldName === 'allergies') tags = this.assessmentData.nutritionData.allergies;
    else if (fieldName === 'intolerances') tags = this.assessmentData.nutritionData.intolerances;
    else if (fieldName === 'equipment') tags = this.assessmentData.availabilityData.equipment;

    tags.forEach((tag, index) => {
      const tagEl = document.createElement('div');
      tagEl.className = 'tag';
      tagEl.innerHTML = `
        ${tag}
        <span class="tag-remove" onclick="app.removeTag('${fieldName}', ${index})">✕</span>
      `;
      container.appendChild(tagEl);
    });
  },

  /**
   * Remove tag
   */
  removeTag(fieldName, index) {
    if (fieldName === 'diseases') this.assessmentData.healthData.diseases.splice(index, 1);
    else if (fieldName === 'injuries') this.assessmentData.healthData.injuries.splice(index, 1);
    else if (fieldName === 'pains') this.assessmentData.healthData.pains.splice(index, 1);
    else if (fieldName === 'medications') this.assessmentData.healthData.medications.splice(index, 1);
    else if (fieldName === 'allergies') this.assessmentData.nutritionData.allergies.splice(index, 1);
    else if (fieldName === 'intolerances') this.assessmentData.nutritionData.intolerances.splice(index, 1);
    else if (fieldName === 'equipment') this.assessmentData.availabilityData.equipment.splice(index, 1);

    this.renderTags(fieldName);
  },

  /**
   * Coleta dados do formulário atual
   */
  collectFormData() {
    // Step 1: Dados Básicos
    if (this.currentStep === 1) {
      this.assessmentData.personalData.fullName = document.getElementById('fullName').value;
      this.assessmentData.personalData.age = parseInt(document.getElementById('age').value) || '';
      this.assessmentData.personalData.height = parseInt(document.getElementById('height').value) || '';
      this.assessmentData.personalData.weight = parseFloat(document.getElementById('weight').value) || '';
      this.assessmentData.personalData.gender = document.getElementById('gender').value;
      if (this.assessmentData.personalData.gender === 'other') {
        this.assessmentData.personalData.genderOther = document.getElementById('genderOther').value;
      }
    }
    // Step 2: Objetivos
    else if (this.currentStep === 2) {
      this.assessmentData.goalData.desiredWeight = parseFloat(document.getElementById('desiredWeight').value) || '';
      this.assessmentData.goalData.motivation = document.getElementById('motivation').value;
    }
    // Step 3: Histórico
    else if (this.currentStep === 3) {
      this.assessmentData.trainingHistoryData.trainingDays = parseInt(document.getElementById('trainingDays').value) || '';
      this.assessmentData.trainingHistoryData.hasPersonalTrainer = document.getElementById('hasPersonalTrainer').checked;
      this.assessmentData.trainingHistoryData.hasNutritionist = document.getElementById('hasNutritionist').checked;
    }
    // Step 5: Hábitos
    else if (this.currentStep === 5) {
      this.assessmentData.habitsData.sleepHours = parseFloat(document.getElementById('sleepHours').value) || '';
      this.assessmentData.habitsData.waterIntake = parseFloat(document.getElementById('waterIntake').value) || '';
    }
  },

  /**
   * Valida dados do step atual
   */
  validateStep() {
    if (this.currentStep === 1) {
      const { fullName, age, height, weight, gender } = this.assessmentData.personalData;
      if (!fullName || !age || !height || !weight || !gender) {
        alert('Por favor, preencha todos os campos obrigatórios');
        return false;
      }
    }
    return true;
  },

  /**
   * Próximo step
   */
  nextStep() {
    this.collectFormData();

    if (!this.validateStep()) return;

    if (this.currentStep === 8) {
      // Processar avaliação
      this.processAssessment();
    } else if (this.currentStep < this.totalSteps - 1) {
      this.currentStep++;
      this.showStep(this.currentStep);
    }
  },

  /**
   * Step anterior
   */
  prevStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.showStep(this.currentStep);
    }
  },

  /**
   * Mostra step específico
   */
  showStep(stepNumber) {
    // Ocultar todos os steps
    document.querySelectorAll('.step-section').forEach(section => {
      section.classList.remove('active');
    });

    // Mostrar step atual
    const stepId = stepNumber === 0 ? 'landing' : 'step' + stepNumber;
    const stepElement = document.getElementById(stepId);
    if (stepElement) {
      stepElement.classList.add('active');
    }

    // Scroll para o topo
    window.scrollTo(0, 0);

    // Renderizar resumo no step 8
    if (stepNumber === 8) {
      this.renderSummary();
    }
  },

  /**
   * Renderiza resumo
   */
  renderSummary() {
    const summaryContent = document.getElementById('summaryContent');
    if (!summaryContent) return;

    const items = [
      ['Nome', this.assessmentData.personalData.fullName],
      ['Idade', this.assessmentData.personalData.age + ' anos'],
      ['Altura', this.assessmentData.personalData.height + ' cm'],
      ['Peso', this.assessmentData.personalData.weight + ' kg'],
      ['Objetivo', this.assessmentData.goalData.mainGoal],
      ['Dias de Treino', this.assessmentData.trainingHistoryData.trainingDays],
    ];

    summaryContent.innerHTML = items.map(([label, value]) => `
      <div class="summary-item">
        <span class="summary-label">${label}</span>
        <span class="summary-value">${value || '--'}</span>
      </div>
    `).join('');
  },

  /**
   * Processa avaliação
   */
  async processAssessment() {
    this.currentStep = 9;
    this.showStep(9);

    // Simular processamento
    const messages = [
      'Analisando composição corporal...',
      'Calculando métricas...',
      'Identificando perfil fitness...',
      'Montando plano inicial...',
      'Preparando relatório...'
    ];

    for (let i = 0; i < messages.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 600));
      document.getElementById('processingMessage').textContent = messages[i];
    }

    // Calcular resultados
    this.calculateResults();

    // Mostrar resultados
    this.currentStep = 10;
    this.showStep(10);
    this.displayResults();
  },

  /**
   * Calcula resultados
   */
  calculateResults() {
    const { personalData, goalData, trainingHistoryData, healthData, habitsData, nutritionData, availabilityData } = this.assessmentData;

    // Cálculos básicos
    const bmiData = calculations.calculateBMI(personalData.weight, personalData.height);
    const bmr = calculations.calculateBMR(personalData.weight, personalData.height, personalData.age, personalData.gender);
    const trainingDays = parseInt(trainingHistoryData.trainingDays) || 3;
    const activityLevel = trainingDays <= 2 ? 'light' : trainingDays <= 4 ? 'moderate' : 'active';
    const tdee = calculations.calculateTDEE(bmr, activityLevel);
    const macros = calculations.calculateMacros(tdee, goalData.mainGoal);
    const waterIntake = calculations.calculateWaterIntake(personalData.weight, activityLevel);
    const somatotype = calculations.determineSomatotype(bmiData.bmi, personalData.gender);
    const classification = calculations.getProfileClassification(bmiData.bmi, trainingHistoryData.experience, trainingDays);

    // Gerar diagnóstico
    const strengths = calculations.getStrengths(this.assessmentData);
    const focusAreas = calculations.getFocusAreas(this.assessmentData, bmiData.bmi);
    const recommendations = calculations.getRecommendations(this.assessmentData, bmiData.bmi);

    // Gerar plano de treino
    const workoutPlan = training.generateWorkoutPlan(this.assessmentData);

    // Armazenar resultado
    this.result = {
      profile: {
        classification: classification,
        bmi: bmiData.bmi,
        bmiCategory: bmiData.category,
        bmr: bmr,
        tdee: tdee,
        somatotype: somatotype,
        activityLevel: activityLevel,
        macros: macros
      },
      diagnosis: {
        summary: `Você é um ${classification} com IMC de ${bmiData.bmi}`,
        strengths: strengths,
        focusAreas: focusAreas,
        recommendations: recommendations
      },
      workoutPlan: workoutPlan,
      waterIntakeRecommendation: waterIntake,
      identifiedGoals: [goalData.mainGoal]
    };
  },

  /**
   * Exibe resultados
   */
  displayResults() {
    const result = this.result;
    const personalData = this.assessmentData.personalData;

    // Atualizar nome
    document.getElementById('resultName').textContent = personalData.fullName || 'Usuário';

    // Atualizar métricas
    document.getElementById('resultIMC').textContent = result.profile.bmi;
    document.getElementById('resultIMCCategory').textContent = result.profile.bmiCategory;
    document.getElementById('resultTMB').textContent = result.profile.bmr;
    document.getElementById('resultTDEE').textContent = result.profile.tdee;
    document.getElementById('resultWater').textContent = result.waterIntakeRecommendation;

    // Atualizar perfil
    document.getElementById('profileClassification').textContent = result.profile.classification;
    document.getElementById('profileDescription').textContent = result.diagnosis.summary;

    // Atualizar análise
    document.getElementById('strengthsList').innerHTML = result.diagnosis.strengths
      .map(s => `<li>${s}</li>`).join('');
    document.getElementById('focusAreasList').innerHTML = result.diagnosis.focusAreas
      .map(a => `<li>${a}</li>`).join('');
    document.getElementById('recommendationsList').innerHTML = result.diagnosis.recommendations
      .map(r => `<li>${r}</li>`).join('');

    // Renderizar plano de treino
    this.displayWorkoutPlan();
  },

  /**
   * Exibe plano de treino
   */
  displayWorkoutPlan() {
    const container = document.getElementById('workoutPlanContent');
    if (!container || !this.result.workoutPlan) return;

    container.innerHTML = this.result.workoutPlan.map((day, index) => `
      <div class="workout-day">
        <div class="workout-day-header" onclick="this.nextElementSibling.classList.toggle('active')">
          <span>${day.day} - ${day.focus}</span>
          <span>▼</span>
        </div>
        <div class="workout-day-content ${index === 0 ? 'active' : ''}">
          ${day.exercises.map(ex => `
            <div class="exercise">
              <div class="exercise-name">💪 ${ex.name}</div>
              <div class="exercise-details">
                <div class="exercise-detail">
                  <div class="exercise-detail-label">Séries</div>
                  <div>${ex.sets}</div>
                </div>
                <div class="exercise-detail">
                  <div class="exercise-detail-label">Repetições</div>
                  <div>${ex.reps}</div>
                </div>
                <div class="exercise-detail">
                  <div class="exercise-detail-label">Descanso</div>
                  <div>${ex.rest}s</div>
                </div>
              </div>
            </div>
          `).join('')}
          ${day.notes ? `<div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--border-color); font-size: 0.875rem; color: var(--text-secondary);">
            <strong>Notas:</strong><br>
            ${day.notes.map(n => `• ${n}`).join('<br>')}
          </div>` : ''}
        </div>
      </div>
    `).join('');
  },

  /**
   * Exporta PDF
   */
  async exportPDF() {
    if (!this.result) {
      alert('Nenhum resultado disponível');
      return;
    }

    await pdf.exportReport(this.assessmentData, this.result);
    this.nextStep();
  },

  /**
   * Compartilha no WhatsApp
   */
  shareWhatsApp() {
    const result = this.result;
    const name = this.assessmentData.personalData.fullName || 'Usuário';

    const message = `Olá! Realizei minha avaliação fitness no Vitalis e gostaria de compartilhar meus resultados:

📊 *Meu Perfil Fitness*
• Nome: ${name}
• IMC: ${result.profile.bmi} (${result.profile.bmiCategory})
• TMB: ${result.profile.bmr} kcal/dia
• TDEE: ${result.profile.tdee} kcal/dia
• Classificação: ${result.profile.classification}

💪 *Pontos Fortes*
${result.diagnosis.strengths.map(s => `• ${s}`).join('\n')}

⚠️ *Pontos de Atenção*
${result.diagnosis.focusAreas.map(a => `• ${a}`).join('\n')}

Você pode fazer sua avaliação em: https://vitalis.app`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');

    this.nextStep();
  },

  /**
   * Reinicia avaliação
   */
  restart() {
    this.currentStep = 0;
    this.assessmentData = {
      personalData: {},
      goalData: {},
      trainingHistoryData: {},
      healthData: { diseases: [], injuries: [], pains: [], medications: [], surgeries: [], restrictions: [] },
      habitsData: {},
      nutritionData: { allergies: [], intolerances: [], diets: [] },
      availabilityData: { availableDays: [], equipment: [] }
    };
    this.result = null;
    this.showStep(0);
    window.scrollTo(0, 0);
  }
};

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  app.init();
});
