/**
 * Copilot JavaScript - Wizard de Postulación
 * SimuPAES - Simulador de Puntajes PAES
 */

(function() {
  'use strict';

  // ============================================================
  // State
  // ============================================================
  let currentStep = 1;
  const totalSteps = 5;
  
  const userSelections = {
    scores: {},
    locations: [],
    interests: [],
    priorities: []
  };

  // ============================================================
  // DOM Elements
  // ============================================================
  const wizardProgress = document.getElementById('wizard-progress');
  const wizardActions = document.getElementById('wizard-actions');
  const prevBtn = document.getElementById('wizard-prev');
  const nextBtn = document.getElementById('wizard-next');
  const panels = document.querySelectorAll('.wizard-panel');
  const steps = document.querySelectorAll('.wizard-step');

  // ============================================================
  // Career Data (Simulated)
  // ============================================================
  const careerDatabase = [
    // Seguras
    { name: 'Ingeniería Civil Industrial', university: 'U. de Santiago', cutoff: 698, area: 'ingenieria', region: 'rm', category: 'safe' },
    { name: 'Enfermería', university: 'U. de La Frontera', cutoff: 598, area: 'salud', region: 'araucania', category: 'safe' },
    { name: 'Contador Auditor', university: 'U. de Valparaíso', cutoff: 620, area: 'negocios', region: 'valparaiso', category: 'safe' },
    { name: 'Pedagogía en Matemáticas', university: 'U. de Concepción', cutoff: 580, area: 'educacion', region: 'biobio', category: 'safe' },
    { name: 'Ingeniería Comercial', university: 'U. de Talca', cutoff: 650, area: 'negocios', region: 'maule', category: 'safe' },
    { name: 'Kinesiología', university: 'U. de Magallanes', cutoff: 610, area: 'salud', region: 'magallanes', category: 'safe' },
    { name: 'Psicología', university: 'U. de La Serena', cutoff: 640, area: 'humanidades', region: 'coquimbo', category: 'safe' },
    
    // Realistas
    { name: 'Ingeniería Civil', university: 'U. de Concepción', cutoff: 720, area: 'ingenieria', region: 'biobio', category: 'realistic' },
    { name: 'Derecho', university: 'U. de Valparaíso', cutoff: 710, area: 'derecho', region: 'valparaiso', category: 'realistic' },
    { name: 'Arquitectura', university: 'U. del Bío-Bío', cutoff: 680, area: 'arte', region: 'biobio', category: 'realistic' },
    { name: 'Medicina Veterinaria', university: 'U. Austral', cutoff: 678, area: 'salud', region: 'los-lagos', category: 'realistic' },
    { name: 'Ingeniería Informática', university: 'U. de Santiago', cutoff: 705, area: 'tecnologia', region: 'rm', category: 'realistic' },
    { name: 'Bioquímica', university: 'U. de Chile', cutoff: 695, area: 'ciencias', region: 'rm', category: 'realistic' },
    { name: 'Periodismo', university: 'PUC', cutoff: 688, area: 'humanidades', region: 'rm', category: 'realistic' },
    
    // Aspiracionales
    { name: 'Ingeniería Comercial', university: 'PUC', cutoff: 745, area: 'negocios', region: 'rm', category: 'aspirational' },
    { name: 'Ingeniería Civil', university: 'U. de Chile', cutoff: 762, area: 'ingenieria', region: 'rm', category: 'aspirational' },
    { name: 'Derecho', university: 'PUC', cutoff: 780, area: 'derecho', region: 'rm', category: 'aspirational' },
    { name: 'Odontología', university: 'U. de Chile', cutoff: 790, area: 'salud', region: 'rm', category: 'aspirational' },
    { name: 'Medicina', university: 'U. de Concepción', cutoff: 788, area: 'salud', region: 'biobio', category: 'aspirational' },
    { name: 'Arquitectura', university: 'U. de Chile', cutoff: 755, area: 'arte', region: 'rm', category: 'aspirational' },
    { name: 'Medicina', university: 'U. de Chile', cutoff: 825, area: 'salud', region: 'rm', category: 'aspirational' },
    { name: 'Medicina', university: 'PUC', cutoff: 820, area: 'salud', region: 'rm', category: 'aspirational' },
  ];

  // ============================================================
  // Event Listeners
  // ============================================================
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentStep > 1) {
        goToStep(currentStep - 1);
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (validateCurrentStep()) {
        if (currentStep < totalSteps) {
          goToStep(currentStep + 1);
        }
      }
    });
  }

  // Option selection
  document.querySelectorAll('.wizard-option').forEach(option => {
    option.addEventListener('click', () => {
      handleOptionClick(option);
    });
  });

  // ============================================================
  // Navigation Functions
  // ============================================================
  function goToStep(step) {
    // Update current step
    currentStep = step;

    // Update progress bar
    if (wizardProgress) {
      wizardProgress.setAttribute('data-progress', step);
    }

    // Update panels
    panels.forEach(panel => {
      const panelStep = parseInt(panel.dataset.panel);
      panel.classList.toggle('is-active', panelStep === step);
    });

    // Update progress steps
    steps.forEach(stepEl => {
      const stepNum = parseInt(stepEl.dataset.step);
      stepEl.classList.remove('is-active', 'is-completed');
      
      if (stepNum === step) {
        stepEl.classList.add('is-active');
      } else if (stepNum < step) {
        stepEl.classList.add('is-completed');
      }
    });

    // Update buttons
    updateButtons();

    // Generate results on last step
    if (step === totalSteps) {
      generateResults();
    }

    // Scroll to top of wizard
    const wizardContent = document.querySelector('.wizard-content');
    if (wizardContent) {
      wizardContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function updateButtons() {
    if (prevBtn) {
      prevBtn.disabled = currentStep === 1;
    }

    if (nextBtn) {
      if (currentStep === totalSteps) {
        nextBtn.style.display = 'none';
      } else if (currentStep === totalSteps - 1) {
        nextBtn.innerHTML = 'Ver Resultados <i class="fas fa-check"></i>';
        nextBtn.style.display = '';
      } else {
        nextBtn.innerHTML = 'Siguiente <i class="fas fa-arrow-right"></i>';
        nextBtn.style.display = '';
      }
    }

    // Hide actions on results step
    if (wizardActions) {
      wizardActions.style.display = currentStep === totalSteps ? 'none' : '';
    }
  }

  // ============================================================
  // Option Selection
  // ============================================================
  function handleOptionClick(option) {
    const panel = option.closest('.wizard-panel');
    const panelStep = parseInt(panel.dataset.panel);
    const value = option.dataset.value;

    if (panelStep === 2 || panelStep === 3 || panelStep === 4) {
      // Multi-select
      option.classList.toggle('is-selected');
      
      // Update selections
      updateMultiSelection(panelStep, value, option.classList.contains('is-selected'));
    } else {
      // Single select
      panel.querySelectorAll('.wizard-option').forEach(opt => {
        opt.classList.remove('is-selected');
      });
      option.classList.add('is-selected');
    }
  }

  function updateMultiSelection(step, value, isSelected) {
    let targetArray;
    
    switch (step) {
      case 2:
        targetArray = userSelections.locations;
        break;
      case 3:
        targetArray = userSelections.interests;
        break;
      case 4:
        targetArray = userSelections.priorities;
        break;
    }

    if (isSelected) {
      if (!targetArray.includes(value)) {
        targetArray.push(value);
      }
    } else {
      const index = targetArray.indexOf(value);
      if (index > -1) {
        targetArray.splice(index, 1);
      }
    }
  }

  // ============================================================
  // Validation
  // ============================================================
  function validateCurrentStep() {
    switch (currentStep) {
      case 1:
        return validateScores();
      case 2:
        return validateLocations();
      case 3:
        return validateInterests();
      case 4:
        return validatePriorities();
      default:
        return true;
    }
  }

  function validateScores() {
    const nem = parseFloat(document.getElementById('cp-nem')?.value);
    const ranking = parseFloat(document.getElementById('cp-ranking')?.value);
    const clec = parseFloat(document.getElementById('cp-clec')?.value);
    const m1 = parseFloat(document.getElementById('cp-m1')?.value);

    if (!nem || !ranking || !clec || !m1) {
      if (window.Notifications) {
        window.Notifications.show('Por favor completa los puntajes obligatorios.', 'error');
      }
      return false;
    }

    if (nem < 100 || nem > 1000 || ranking < 100 || ranking > 1000 ||
        clec < 100 || clec > 1000 || m1 < 100 || m1 > 1000) {
      if (window.Notifications) {
        window.Notifications.show('Los puntajes deben estar entre 100 y 1000.', 'error');
      }
      return false;
    }

    // Save scores
    userSelections.scores = {
      nem, ranking, clec, m1,
      ciencias: parseFloat(document.getElementById('cp-ciencias')?.value) || 0,
      historia: parseFloat(document.getElementById('cp-historia')?.value) || 0
    };

    return true;
  }

  function validateLocations() {
    if (userSelections.locations.length === 0) {
      if (window.Notifications) {
        window.Notifications.show('Selecciona al menos una ubicación.', 'warning');
      }
      return false;
    }
    return true;
  }

  function validateInterests() {
    if (userSelections.interests.length === 0) {
      if (window.Notifications) {
        window.Notifications.show('Selecciona al menos un área de interés.', 'warning');
      }
      return false;
    }
    return true;
  }

  function validatePriorities() {
    if (userSelections.priorities.length === 0) {
      if (window.Notifications) {
        window.Notifications.show('Selecciona al menos una prioridad.', 'warning');
      }
      return false;
    }
    return true;
  }

  // ============================================================
  // Generate Results
  // ============================================================
  function generateResults() {
    const resultsContainer = document.getElementById('copilot-results');
    if (!resultsContainer) return;

    // Calculate average score
    const scores = userSelections.scores;
    const avgScore = (scores.nem + scores.ranking + scores.clec + scores.m1) / 4;

    // Filter careers based on selections
    let filteredCareers = careerDatabase.filter(career => {
      // Filter by interests
      if (userSelections.interests.length > 0 && 
          !userSelections.interests.includes(career.area)) {
        return false;
      }

      // Filter by location (if not "cualquiera")
      if (!userSelections.locations.includes('cualquiera') &&
          userSelections.locations.length > 0 &&
          !userSelections.locations.includes(career.region)) {
        return false;
      }

      return true;
    });

    // Categorize careers based on user's score
    const categorizedCareers = {
      safe: [],
      realistic: [],
      aspirational: []
    };

    filteredCareers.forEach(career => {
      const diff = avgScore - career.cutoff;
      
      if (diff >= 50) {
        categorizedCareers.safe.push(career);
      } else if (diff >= -30) {
        categorizedCareers.realistic.push(career);
      } else if (diff >= -100) {
        categorizedCareers.aspirational.push(career);
      }
    });

    // Limit to 7 per category
    Object.keys(categorizedCareers).forEach(key => {
      categorizedCareers[key] = categorizedCareers[key]
        .sort((a, b) => b.cutoff - a.cutoff)
        .slice(0, 7);
    });

    // Render results
    renderResults(categorizedCareers);
  }

  function renderResults(categorizedCareers) {
    const resultsContainer = document.getElementById('copilot-results');
    if (!resultsContainer) return;

    resultsContainer.innerHTML = `
      <!-- Carreras Seguras -->
      <div class="results-category safe">
        <div class="results-category-header">
          <h3 class="results-category-title"><i class="fas fa-shield-alt"></i> Seguras</h3>
          <p class="results-category-subtitle">Alta probabilidad de ingreso</p>
        </div>
        <div class="results-category-list">
          ${renderCareerList(categorizedCareers.safe, 'No hay carreras seguras con tus criterios')}
        </div>
      </div>
      
      <!-- Carreras Realistas -->
      <div class="results-category realistic">
        <div class="results-category-header">
          <h3 class="results-category-title"><i class="fas fa-balance-scale"></i> Realistas</h3>
          <p class="results-category-subtitle">Probabilidad moderada</p>
        </div>
        <div class="results-category-list">
          ${renderCareerList(categorizedCareers.realistic, 'No hay carreras realistas con tus criterios')}
        </div>
      </div>
      
      <!-- Carreras Aspiracionales -->
      <div class="results-category aspirational">
        <div class="results-category-header">
          <h3 class="results-category-title"><i class="fas fa-star"></i> Aspiracionales</h3>
          <p class="results-category-subtitle">Competitivas pero posibles</p>
        </div>
        <div class="results-category-list">
          ${renderCareerList(categorizedCareers.aspirational, 'No hay carreras aspiracionales con tus criterios')}
        </div>
      </div>
    `;
  }

  function renderCareerList(careers, emptyMessage) {
    if (careers.length === 0) {
      return `<div class="results-career"><p class="text-sm text-muted text-center py-3">${emptyMessage}</p></div>`;
    }

    return careers.map(career => `
      <div class="results-career">
        <p class="results-career-name">${career.name}</p>
        <p class="results-career-info">${career.university} • Corte: ${career.cutoff} pts</p>
      </div>
    `).join('');
  }

  // ============================================================
  // Initialize
  // ============================================================
  function init() {
    updateButtons();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
