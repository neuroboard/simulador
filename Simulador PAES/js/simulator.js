/**
 * Simulator JavaScript - Calculadora de Puntajes PAES
 * SimuPAES - Simulador de Puntajes PAES
 */

(function() {
  'use strict';

  // ============================================================
  // Configuración de Ponderaciones por Carrera
  // ============================================================
  const careerWeights = {
    'medicina-uchile': {
      name: 'Medicina - U. de Chile',
      nem: 10, ranking: 20, clec: 15, m1: 25, m2: 10, electiva: 20,
      cutoff: 825
    },
    'derecho-puc': {
      name: 'Derecho - PUC',
      nem: 10, ranking: 20, clec: 30, m1: 20, m2: 0, electiva: 20,
      cutoff: 780
    },
    'ing-civil-uchile': {
      name: 'Ing. Civil - U. de Chile',
      nem: 10, ranking: 20, clec: 10, m1: 35, m2: 15, electiva: 10,
      cutoff: 762
    },
    'ing-comercial-puc': {
      name: 'Ing. Comercial - PUC',
      nem: 10, ranking: 20, clec: 15, m1: 35, m2: 10, electiva: 10,
      cutoff: 745
    },
    'arquitectura-uchile': {
      name: 'Arquitectura - U. de Chile',
      nem: 10, ranking: 30, clec: 15, m1: 30, m2: 0, electiva: 15,
      cutoff: 680
    },
    'psicologia-puc': {
      name: 'Psicología - PUC',
      nem: 10, ranking: 25, clec: 25, m1: 20, m2: 0, electiva: 20,
      cutoff: 720
    },
    'odontologia-uchile': {
      name: 'Odontología - U. de Chile',
      nem: 10, ranking: 20, clec: 15, m1: 25, m2: 0, electiva: 30,
      cutoff: 790
    },
    'enfermeria-puc': {
      name: 'Enfermería - PUC',
      nem: 10, ranking: 25, clec: 20, m1: 20, m2: 0, electiva: 25,
      cutoff: 650
    },
    'periodismo-uchile': {
      name: 'Periodismo - U. de Chile',
      nem: 10, ranking: 25, clec: 35, m1: 15, m2: 0, electiva: 15,
      cutoff: 670
    },
    'pedagogia-puc': {
      name: 'Pedagogía - PUC',
      nem: 10, ranking: 30, clec: 25, m1: 20, m2: 0, electiva: 15,
      cutoff: 600
    }
  };

  // ============================================================
  // DOM Elements
  // ============================================================
  const form = document.getElementById('simulator-form');
  const carreraSelect = document.getElementById('carrera');
  const customWeightsDiv = document.getElementById('custom-weights');
  const weightsTotalSpan = document.getElementById('weights-total');
  
  // Result elements
  const resultScore = document.getElementById('result-score');
  const resultsIndicator = document.getElementById('results-indicator');

  // ============================================================
  // Event Listeners
  // ============================================================
  if (form) {
    // Form submit
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      calculateScore();
    });

    // Career selection change
    if (carreraSelect) {
      carreraSelect.addEventListener('change', () => {
        const selectedCareer = carreraSelect.value;
        
        if (selectedCareer && careerWeights[selectedCareer]) {
          // Apply career weights
          const weights = careerWeights[selectedCareer];
          document.getElementById('pond-nem').value = weights.nem;
          document.getElementById('pond-ranking').value = weights.ranking;
          document.getElementById('pond-clec').value = weights.clec;
          document.getElementById('pond-m1').value = weights.m1;
          document.getElementById('pond-m2').value = weights.m2;
          document.getElementById('pond-electiva').value = weights.electiva;
          
          updateWeightsTotal();
        }
      });
    }

    // Weight inputs change
    const weightInputs = document.querySelectorAll('[id^="pond-"]');
    weightInputs.forEach(input => {
      input.addEventListener('input', updateWeightsTotal);
    });
  }

  // ============================================================
  // Update Weights Total
  // ============================================================
  function updateWeightsTotal() {
    const nem = parseInt(document.getElementById('pond-nem').value) || 0;
    const ranking = parseInt(document.getElementById('pond-ranking').value) || 0;
    const clec = parseInt(document.getElementById('pond-clec').value) || 0;
    const m1 = parseInt(document.getElementById('pond-m1').value) || 0;
    const m2 = parseInt(document.getElementById('pond-m2').value) || 0;
    const electiva = parseInt(document.getElementById('pond-electiva').value) || 0;
    
    const total = nem + ranking + clec + m1 + m2 + electiva;
    
    if (weightsTotalSpan) {
      weightsTotalSpan.textContent = total + '%';
      weightsTotalSpan.style.color = total === 100 ? 'var(--color-success)' : 'var(--color-error)';
    }
    
    return total;
  }

  // ============================================================
  // Calculate Score
  // ============================================================
  function calculateScore() {
    // Get input values
    const nem = parseFloat(document.getElementById('nem').value) || 0;
    const ranking = parseFloat(document.getElementById('ranking').value) || 0;
    const clec = parseFloat(document.getElementById('clec').value) || 0;
    const m1 = parseFloat(document.getElementById('m1').value) || 0;
    const m2 = parseFloat(document.getElementById('m2').value) || 0;
    const ciencias = parseFloat(document.getElementById('ciencias').value) || 0;
    const historia = parseFloat(document.getElementById('historia').value) || 0;

    // Validate required fields
    if (!nem || !ranking || !clec || !m1) {
      if (window.Notifications) {
        window.Notifications.show('Por favor completa todos los campos obligatorios.', 'error');
      }
      return;
    }

    // Validate ranges
    if (nem < 100 || nem > 1000 || ranking < 100 || ranking > 1000 || 
        clec < 100 || clec > 1000 || m1 < 100 || m1 > 1000) {
      if (window.Notifications) {
        window.Notifications.show('Los puntajes deben estar entre 100 y 1000.', 'error');
      }
      return;
    }

    // Get weights
    const weights = {
      nem: parseInt(document.getElementById('pond-nem').value) || 0,
      ranking: parseInt(document.getElementById('pond-ranking').value) || 0,
      clec: parseInt(document.getElementById('pond-clec').value) || 0,
      m1: parseInt(document.getElementById('pond-m1').value) || 0,
      m2: parseInt(document.getElementById('pond-m2').value) || 0,
      electiva: parseInt(document.getElementById('pond-electiva').value) || 0
    };

    // Validate weights total
    const totalWeights = Object.values(weights).reduce((a, b) => a + b, 0);
    if (totalWeights !== 100) {
      if (window.Notifications) {
        window.Notifications.show('Las ponderaciones deben sumar 100%.', 'warning');
      }
    }

    // Determine elective score (best of available)
    const electiveScore = Math.max(ciencias || 0, historia || 0);

    // Calculate weighted score
    const calculations = {
      nem: (nem * weights.nem / 100),
      ranking: (ranking * weights.ranking / 100),
      clec: (clec * weights.clec / 100),
      m1: (m1 * weights.m1 / 100),
      m2: weights.m2 > 0 ? (m2 * weights.m2 / 100) : 0,
      electiva: weights.electiva > 0 ? (electiveScore * weights.electiva / 100) : 0
    };

    const totalScore = Object.values(calculations).reduce((a, b) => a + b, 0);

    // Update results display
    updateResultsDisplay(totalScore, calculations, weights);

    // Save to history
    saveToHistory({
      date: new Date().toISOString(),
      scores: { nem, ranking, clec, m1, m2, ciencias, historia },
      weights,
      result: totalScore
    });
  }

  // ============================================================
  // Update Results Display
  // ============================================================
  function updateResultsDisplay(totalScore, calculations, weights) {
    // Update main score
    if (resultScore) {
      resultScore.textContent = Math.round(totalScore);
      resultScore.classList.add('animate-scale-in');
      setTimeout(() => resultScore.classList.remove('animate-scale-in'), 300);
    }

    // Update breakdown
    document.getElementById('calc-nem').textContent = calculations.nem.toFixed(1);
    document.getElementById('calc-ranking').textContent = calculations.ranking.toFixed(1);
    document.getElementById('calc-clec').textContent = calculations.clec.toFixed(1);
    document.getElementById('calc-m1').textContent = calculations.m1.toFixed(1);
    document.getElementById('calc-electiva').textContent = (calculations.m2 + calculations.electiva).toFixed(1);

    // Update breakdown labels with actual weights
    const breakdownRows = document.querySelectorAll('.breakdown-row');
    const labels = ['NEM', 'Ranking', 'C. Lectora', 'Matemática 1', 'Electiva'];
    const weightValues = [weights.nem, weights.ranking, weights.clec, weights.m1, weights.m2 + weights.electiva];
    
    breakdownRows.forEach((row, index) => {
      const label = row.querySelector('span:first-child');
      if (label && labels[index]) {
        label.textContent = `${labels[index]} (${weightValues[index]}%)`;
      }
    });

    // Update indicator
    updateIndicator(totalScore);

    // Show and update comparison table
    const comparisonTable = document.querySelector('.comparison-details');
    if (comparisonTable) {
      comparisonTable.classList.add('is-visible');
      // Open the details element
      comparisonTable.setAttribute('open', '');
    }
    updateComparisonTable(totalScore);
    
    // Scroll to comparison table
    if (comparisonTable) {
      setTimeout(() => {
        comparisonTable.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 200);
    }
  }

  // ============================================================
  // Update Indicator
  // ============================================================
  function updateIndicator(score) {
    if (!resultsIndicator) return;

    let icon, text, bgClass;

    if (score >= 750) {
      icon = 'fas fa-check-circle';
      text = '¡Excelente! Tienes opciones en carreras competitivas.';
      bgClass = 'indicator-success';
    } else if (score >= 650) {
      icon = 'fas fa-thumbs-up';
      text = 'Buen puntaje. Tienes muchas opciones disponibles.';
      bgClass = 'indicator-info';
    } else if (score >= 550) {
      icon = 'fas fa-exclamation-triangle';
      text = 'Puntaje moderado. Revisa tus opciones de postulación.';
      bgClass = 'indicator-warning';
    } else {
      icon = 'fas fa-exclamation-circle';
      text = 'Considera opciones con menor puntaje de corte.';
      bgClass = 'indicator-danger';
    }

    resultsIndicator.className = 'results-indicator-compact ' + bgClass;
    resultsIndicator.innerHTML = `<i class="${icon}"></i><span>${text}</span>`;
  }

  // ============================================================
  // Update Comparison Table
  // ============================================================
  function updateComparisonTable(userScore) {
    const tableRows = document.querySelectorAll('#comparison-table tr');
    
    tableRows.forEach(row => {
      const cutoffCell = row.querySelector('td:nth-child(3) strong');
      const statusCell = row.querySelector('td:last-child');
      
      if (cutoffCell && statusCell) {
        const cutoff = parseFloat(cutoffCell.textContent);
        const diff = userScore - cutoff;
        
        let badge;
        if (diff >= 50) {
          badge = '<span class="badge badge-success">Seguro</span>';
        } else if (diff >= 0) {
          badge = '<span class="badge badge-primary">Posible</span>';
        } else if (diff >= -30) {
          badge = '<span class="badge badge-warning">Competitivo</span>';
        } else {
          badge = '<span class="badge badge-error">Muy competitivo</span>';
        }
        
        statusCell.innerHTML = badge;
      }
    });
  }

  // ============================================================
  // Save to History (Local Storage)
  // ============================================================
  function saveToHistory(simulation) {
    if (!window.Storage) return;
    
    const history = window.Storage.get('simulationHistory', []);
    history.unshift(simulation);
    
    // Keep only last 10 simulations
    if (history.length > 10) {
      history.pop();
    }
    
    window.Storage.set('simulationHistory', history);
  }

  // ============================================================
  // Initialize
  // ============================================================
  function init() {
    updateWeightsTotal();
    
    // Load last simulation if exists
    if (window.Storage) {
      const history = window.Storage.get('simulationHistory', []);
      if (history.length > 0) {
        const last = history[0];
        // Optionally pre-fill form with last values
      }
    }
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
