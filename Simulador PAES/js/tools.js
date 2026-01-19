/**
 * Tools JavaScript - Herramientas (NEM, Ranking, Universidades, Carreras)
 * SimuPAES - Simulador de Puntajes PAES
 */

(function() {
  'use strict';

  // ============================================================
  // Tabla NEM Oficial (Simplificada)
  // Promedio -> Puntaje NEM
  // ============================================================
  const nemTable = {
    4.00: 208, 4.01: 212, 4.02: 216, 4.03: 220, 4.04: 224,
    4.05: 228, 4.06: 232, 4.07: 236, 4.08: 240, 4.09: 244,
    4.10: 248, 4.11: 252, 4.12: 256, 4.13: 260, 4.14: 264,
    4.15: 268, 4.16: 272, 4.17: 276, 4.18: 280, 4.19: 284,
    4.20: 288, 4.21: 292, 4.22: 296, 4.23: 300, 4.24: 304,
    4.25: 308, 4.26: 312, 4.27: 316, 4.28: 320, 4.29: 324,
    4.30: 328, 4.31: 332, 4.32: 336, 4.33: 340, 4.34: 344,
    4.35: 348, 4.36: 352, 4.37: 356, 4.38: 360, 4.39: 364,
    4.40: 368, 4.41: 372, 4.42: 376, 4.43: 380, 4.44: 384,
    4.45: 388, 4.46: 392, 4.47: 396, 4.48: 400, 4.49: 404,
    4.50: 408, 4.51: 412, 4.52: 416, 4.53: 420, 4.54: 424,
    4.55: 428, 4.56: 432, 4.57: 436, 4.58: 440, 4.59: 444,
    4.60: 448, 4.61: 452, 4.62: 456, 4.63: 460, 4.64: 464,
    4.65: 468, 4.66: 472, 4.67: 476, 4.68: 480, 4.69: 484,
    4.70: 488, 4.71: 492, 4.72: 496, 4.73: 500, 4.74: 504,
    4.75: 508, 4.76: 512, 4.77: 516, 4.78: 520, 4.79: 524,
    4.80: 528, 4.81: 532, 4.82: 536, 4.83: 540, 4.84: 544,
    4.85: 548, 4.86: 552, 4.87: 556, 4.88: 560, 4.89: 564,
    4.90: 568, 4.91: 572, 4.92: 576, 4.93: 580, 4.94: 584,
    4.95: 588, 4.96: 592, 4.97: 596, 4.98: 600, 4.99: 604,
    5.00: 608, 5.01: 612, 5.02: 616, 5.03: 620, 5.04: 624,
    5.05: 628, 5.06: 632, 5.07: 636, 5.08: 640, 5.09: 644,
    5.10: 648, 5.11: 651, 5.12: 654, 5.13: 657, 5.14: 660,
    5.15: 663, 5.16: 666, 5.17: 669, 5.18: 672, 5.19: 675,
    5.20: 678, 5.21: 681, 5.22: 684, 5.23: 687, 5.24: 690,
    5.25: 693, 5.26: 696, 5.27: 699, 5.28: 702, 5.29: 705,
    5.30: 708, 5.31: 711, 5.32: 714, 5.33: 717, 5.34: 720,
    5.35: 723, 5.36: 726, 5.37: 729, 5.38: 732, 5.39: 735,
    5.40: 738, 5.41: 741, 5.42: 744, 5.43: 747, 5.44: 750,
    5.45: 753, 5.46: 756, 5.47: 759, 5.48: 762, 5.49: 765,
    5.50: 768, 5.51: 771, 5.52: 774, 5.53: 777, 5.54: 780,
    5.55: 783, 5.56: 786, 5.57: 789, 5.58: 792, 5.59: 795,
    5.60: 798, 5.61: 801, 5.62: 804, 5.63: 807, 5.64: 810,
    5.65: 813, 5.66: 816, 5.67: 819, 5.68: 822, 5.69: 825,
    5.70: 828, 5.71: 831, 5.72: 834, 5.73: 837, 5.74: 840,
    5.75: 843, 5.76: 846, 5.77: 849, 5.78: 852, 5.79: 855,
    5.80: 858, 5.81: 861, 5.82: 864, 5.83: 867, 5.84: 870,
    5.85: 873, 5.86: 876, 5.87: 879, 5.88: 882, 5.89: 885,
    5.90: 888, 5.91: 891, 5.92: 894, 5.93: 897, 5.94: 900,
    5.95: 903, 5.96: 906, 5.97: 909, 5.98: 912, 5.99: 915,
    6.00: 918, 6.01: 921, 6.02: 924, 6.03: 927, 6.04: 930,
    6.05: 933, 6.06: 936, 6.07: 939, 6.08: 942, 6.09: 945,
    6.10: 948, 6.11: 951, 6.12: 954, 6.13: 957, 6.14: 960,
    6.15: 963, 6.16: 966, 6.17: 969, 6.18: 972, 6.19: 975,
    6.20: 978, 6.21: 981, 6.22: 984, 6.23: 987, 6.24: 990,
    6.25: 993, 6.26: 996, 6.27: 999, 6.28: 1000, 6.29: 1000,
    6.30: 1000, 6.40: 1000, 6.50: 1000, 6.60: 1000, 6.70: 1000,
    6.80: 1000, 6.90: 1000, 7.00: 1000
  };

  // ============================================================
  // Universities Data
  // ============================================================
  const universities = [
    { id: 1, name: 'Universidad de Chile', acronym: 'UCH', region: 'rm', type: 'estatal', avgCutoff: 720 },
    { id: 2, name: 'Pontificia Universidad Católica de Chile', acronym: 'PUC', region: 'rm', type: 'cruch', avgCutoff: 740 },
    { id: 3, name: 'Universidad de Santiago de Chile', acronym: 'USACH', region: 'rm', type: 'estatal', avgCutoff: 680 },
    { id: 4, name: 'Universidad de Concepción', acronym: 'UDEC', region: 'biobio', type: 'cruch', avgCutoff: 670 },
    { id: 5, name: 'Universidad Católica de Valparaíso', acronym: 'PUCV', region: 'valparaiso', type: 'cruch', avgCutoff: 650 },
    { id: 6, name: 'Universidad Técnica Federico Santa María', acronym: 'USM', region: 'valparaiso', type: 'cruch', avgCutoff: 700 },
    { id: 7, name: 'Universidad de Valparaíso', acronym: 'UV', region: 'valparaiso', type: 'estatal', avgCutoff: 620 },
    { id: 8, name: 'Universidad Austral de Chile', acronym: 'UACH', region: 'los-lagos', type: 'cruch', avgCutoff: 610 },
    { id: 9, name: 'Universidad Católica del Norte', acronym: 'UCN', region: 'coquimbo', type: 'cruch', avgCutoff: 590 },
    { id: 10, name: 'Universidad de La Frontera', acronym: 'UFRO', region: 'araucania', type: 'estatal', avgCutoff: 580 },
    { id: 11, name: 'Universidad de Talca', acronym: 'UTAL', region: 'maule', type: 'estatal', avgCutoff: 600 },
    { id: 12, name: 'Universidad del Bío-Bío', acronym: 'UBB', region: 'biobio', type: 'estatal', avgCutoff: 570 },
    { id: 13, name: 'Universidad de La Serena', acronym: 'ULS', region: 'coquimbo', type: 'estatal', avgCutoff: 560 },
    { id: 14, name: 'Universidad de Magallanes', acronym: 'UMAG', region: 'magallanes', type: 'estatal', avgCutoff: 520 },
    { id: 15, name: 'Universidad de Antofagasta', acronym: 'UA', region: 'antofagasta', type: 'estatal', avgCutoff: 540 },
    { id: 16, name: 'Universidad de Atacama', acronym: 'UDA', region: 'atacama', type: 'estatal', avgCutoff: 510 },
    { id: 17, name: 'Universidad de Playa Ancha', acronym: 'UPLA', region: 'valparaiso', type: 'estatal', avgCutoff: 530 },
    { id: 18, name: 'Universidad Metropolitana de Ciencias de la Educación', acronym: 'UMCE', region: 'rm', type: 'estatal', avgCutoff: 550 },
    { id: 19, name: 'Universidad de Los Lagos', acronym: 'ULAGOS', region: 'los-lagos', type: 'estatal', avgCutoff: 500 },
    { id: 20, name: 'Universidad Arturo Prat', acronym: 'UNAP', region: 'tarapaca', type: 'estatal', avgCutoff: 490 },
    { id: 21, name: 'Universidad Diego Portales', acronym: 'UDP', region: 'rm', type: 'privada', avgCutoff: 660 },
    { id: 22, name: 'Universidad Adolfo Ibáñez', acronym: 'UAI', region: 'rm', type: 'privada', avgCutoff: 680 },
    { id: 23, name: 'Universidad de los Andes', acronym: 'UANDES', region: 'rm', type: 'privada', avgCutoff: 670 },
    { id: 24, name: 'Universidad del Desarrollo', acronym: 'UDD', region: 'rm', type: 'privada', avgCutoff: 650 },
    { id: 25, name: 'Universidad Mayor', acronym: 'UMAYOR', region: 'rm', type: 'privada', avgCutoff: 580 },
  ];

  // ============================================================
  // Careers Data (Sample)
  // ============================================================
  const careers = [
    { id: 1, name: 'Medicina', university: 'Universidad de Chile', region: 'rm', area: 'salud', cutoff: 825, vacancies: 150 },
    { id: 2, name: 'Medicina', university: 'PUC', region: 'rm', area: 'salud', cutoff: 820, vacancies: 120 },
    { id: 3, name: 'Medicina', university: 'Universidad de Concepción', region: 'biobio', area: 'salud', cutoff: 788, vacancies: 100 },
    { id: 4, name: 'Derecho', university: 'PUC', region: 'rm', area: 'derecho', cutoff: 780, vacancies: 200 },
    { id: 5, name: 'Derecho', university: 'Universidad de Chile', region: 'rm', area: 'derecho', cutoff: 770, vacancies: 220 },
    { id: 6, name: 'Ingeniería Civil', university: 'Universidad de Chile', region: 'rm', area: 'ingenieria', cutoff: 762, vacancies: 500 },
    { id: 7, name: 'Ingeniería Civil', university: 'PUC', region: 'rm', area: 'ingenieria', cutoff: 758, vacancies: 480 },
    { id: 8, name: 'Arquitectura', university: 'Universidad de Chile', region: 'rm', area: 'arte', cutoff: 755, vacancies: 100 },
    { id: 9, name: 'Ingeniería Comercial', university: 'PUC', region: 'rm', area: 'negocios', cutoff: 745, vacancies: 450 },
    { id: 10, name: 'Odontología', university: 'Universidad de Valparaíso', region: 'valparaiso', area: 'salud', cutoff: 742, vacancies: 60 },
    { id: 11, name: 'Ingeniería Civil Industrial', university: 'USACH', region: 'rm', area: 'ingenieria', cutoff: 698, vacancies: 180 },
    { id: 12, name: 'Psicología', university: 'PUC', region: 'rm', area: 'humanidades', cutoff: 720, vacancies: 150 },
    { id: 13, name: 'Periodismo', university: 'Universidad de Chile', region: 'rm', area: 'humanidades', cutoff: 670, vacancies: 80 },
    { id: 14, name: 'Arquitectura', university: 'Universidad del Bío-Bío', region: 'biobio', area: 'arte', cutoff: 680, vacancies: 70 },
    { id: 15, name: 'Medicina Veterinaria', university: 'Universidad Austral', region: 'los-lagos', area: 'salud', cutoff: 678, vacancies: 80 },
    { id: 16, name: 'Ingeniería Informática', university: 'USACH', region: 'rm', area: 'tecnologia', cutoff: 705, vacancies: 200 },
    { id: 17, name: 'Bioquímica', university: 'Universidad de Chile', region: 'rm', area: 'ciencias', cutoff: 695, vacancies: 60 },
    { id: 18, name: 'Ingeniería Comercial', university: 'Universidad de Talca', region: 'maule', area: 'negocios', cutoff: 650, vacancies: 150 },
    { id: 19, name: 'Enfermería', university: 'Universidad de La Frontera', region: 'araucania', area: 'salud', cutoff: 598, vacancies: 150 },
    { id: 20, name: 'Pedagogía en Matemáticas', university: 'Universidad de Concepción', region: 'biobio', area: 'educacion', cutoff: 580, vacancies: 50 },
    { id: 21, name: 'Contador Auditor', university: 'Universidad de Valparaíso', region: 'valparaiso', area: 'negocios', cutoff: 620, vacancies: 100 },
    { id: 22, name: 'Kinesiología', university: 'Universidad de Magallanes', region: 'magallanes', area: 'salud', cutoff: 610, vacancies: 40 },
    { id: 23, name: 'Psicología', university: 'Universidad de La Serena', region: 'coquimbo', area: 'humanidades', cutoff: 640, vacancies: 80 },
    { id: 24, name: 'Ingeniería Civil', university: 'Universidad de Concepción', region: 'biobio', area: 'ingenieria', cutoff: 720, vacancies: 250 },
    { id: 25, name: 'Derecho', university: 'Universidad de Valparaíso', region: 'valparaiso', area: 'derecho', cutoff: 710, vacancies: 120 },
    { id: 26, name: 'Trabajo Social', university: 'Universidad de Chile', region: 'rm', area: 'cs-sociales', cutoff: 620, vacancies: 100 },
    { id: 27, name: 'Sociología', university: 'PUC', region: 'rm', area: 'cs-sociales', cutoff: 680, vacancies: 80 },
    { id: 28, name: 'Diseño', university: 'Universidad de Chile', region: 'rm', area: 'arte', cutoff: 650, vacancies: 60 },
    { id: 29, name: 'Agronomía', university: 'Universidad de Chile', region: 'rm', area: 'agropecuaria', cutoff: 630, vacancies: 120 },
    { id: 30, name: 'Ingeniería Forestal', university: 'Universidad Austral', region: 'los-lagos', area: 'agropecuaria', cutoff: 580, vacancies: 50 },
  ];

  // ============================================================
  // NEM Calculator
  // ============================================================
  const calcNemBtn = document.getElementById('calc-nem-btn');
  const promedioInput = document.getElementById('promedio-notas');
  const nemResult = document.getElementById('nem-result');
  const nemScoreEl = document.getElementById('nem-score');

  if (calcNemBtn && promedioInput) {
    calcNemBtn.addEventListener('click', () => {
      const promedio = parseFloat(promedioInput.value);
      
      if (!promedio || promedio < 4.0 || promedio > 7.0) {
        if (window.Notifications) {
          window.Notifications.show('El promedio debe estar entre 4.0 y 7.0', 'error');
        }
        return;
      }

      // Round to nearest 0.01
      const roundedPromedio = Math.round(promedio * 100) / 100;
      
      // Find NEM score
      let nemScore = calculateNEM(roundedPromedio);
      
      // Show result
      if (nemResult && nemScoreEl) {
        nemScoreEl.textContent = nemScore;
        nemResult.style.display = 'flex';
        nemResult.classList.add('animate-scale-in');
      }
    });
  }

  function calculateNEM(promedio) {
    // Look up exact value first
    const exactKey = promedio.toFixed(2);
    if (nemTable[parseFloat(exactKey)]) {
      return nemTable[parseFloat(exactKey)];
    }
    
    // Interpolate between values
    const promedios = Object.keys(nemTable).map(Number).sort((a, b) => a - b);
    
    for (let i = 0; i < promedios.length - 1; i++) {
      if (promedio >= promedios[i] && promedio < promedios[i + 1]) {
        const lower = promedios[i];
        const upper = promedios[i + 1];
        const lowerNem = nemTable[lower];
        const upperNem = nemTable[upper];
        
        // Linear interpolation
        const ratio = (promedio - lower) / (upper - lower);
        return Math.round(lowerNem + ratio * (upperNem - lowerNem));
      }
    }
    
    // Default for 7.0
    return 1000;
  }

  // ============================================================
  // Ranking Calculator
  // ============================================================
  const calcRankingBtn = document.getElementById('calc-ranking-btn');
  const miNemInput = document.getElementById('mi-nem');
  const promedioColegioInput = document.getElementById('promedio-colegio');
  const rankingResult = document.getElementById('ranking-result');
  const rankingScoreEl = document.getElementById('ranking-score');
  const rankingBonusEl = document.getElementById('ranking-bonus');

  if (calcRankingBtn && miNemInput && promedioColegioInput) {
    calcRankingBtn.addEventListener('click', () => {
      const miNem = parseFloat(miNemInput.value);
      const promedioColegio = parseFloat(promedioColegioInput.value);
      
      if (!miNem || miNem < 100 || miNem > 1000) {
        if (window.Notifications) {
          window.Notifications.show('El puntaje NEM debe estar entre 100 y 1000', 'error');
        }
        return;
      }
      
      if (!promedioColegio || promedioColegio < 100 || promedioColegio > 1000) {
        if (window.Notifications) {
          window.Notifications.show('El promedio del colegio debe estar entre 100 y 1000', 'error');
        }
        return;
      }

      // Calculate ranking
      const rankingScore = calculateRanking(miNem, promedioColegio);
      const bonus = rankingScore - miNem;
      
      // Show result
      if (rankingResult && rankingScoreEl && rankingBonusEl) {
        rankingScoreEl.textContent = Math.round(rankingScore);
        
        if (bonus > 0) {
          rankingBonusEl.textContent = `Bonificación: +${Math.round(bonus)} puntos sobre tu NEM`;
          rankingBonusEl.style.color = 'var(--color-success)';
        } else {
          rankingBonusEl.textContent = 'Tu ranking es igual a tu NEM';
          rankingBonusEl.style.color = 'var(--color-gray-500)';
        }
        
        rankingResult.style.display = 'flex';
        rankingResult.classList.add('animate-scale-in');
      }
    });
  }

  function calculateRanking(miNem, promedioColegio) {
    // Simplified ranking formula
    // If student is above school average, they get a bonus
    const diff = miNem - promedioColegio;
    
    if (diff <= 0) {
      // Below or at average: ranking = NEM
      return miNem;
    }
    
    // Above average: bonus proportional to difference, max 150 points
    const bonusMultiplier = 0.6; // Simplified factor
    const bonus = Math.min(diff * bonusMultiplier, 150);
    
    return Math.min(miNem + bonus, 1000);
  }

  // ============================================================
  // Universities List
  // ============================================================
  const universityList = document.getElementById('university-list');
  const filterRegion = document.getElementById('filter-region');
  const filterTipo = document.getElementById('filter-tipo');
  const filterSearch = document.getElementById('filter-search');
  const loadMoreUnisBtn = document.getElementById('load-more-unis');

  let displayedUniversities = 10;

  if (universityList) {
    renderUniversities();
    
    // Filter event listeners
    if (filterRegion) filterRegion.addEventListener('change', () => { displayedUniversities = 10; renderUniversities(); });
    if (filterTipo) filterTipo.addEventListener('change', () => { displayedUniversities = 10; renderUniversities(); });
    if (filterSearch) filterSearch.addEventListener('input', window.debounce(() => { displayedUniversities = 10; renderUniversities(); }, 300));
    
    if (loadMoreUnisBtn) {
      loadMoreUnisBtn.addEventListener('click', () => {
        displayedUniversities += 10;
        renderUniversities();
      });
    }
  }

  function renderUniversities() {
    if (!universityList) return;

    let filtered = [...universities];
    
    // Apply filters
    if (filterRegion && filterRegion.value) {
      filtered = filtered.filter(u => u.region === filterRegion.value);
    }
    
    if (filterTipo && filterTipo.value) {
      filtered = filtered.filter(u => u.type === filterTipo.value);
    }
    
    if (filterSearch && filterSearch.value) {
      const search = filterSearch.value.toLowerCase();
      filtered = filtered.filter(u => 
        u.name.toLowerCase().includes(search) || 
        u.acronym.toLowerCase().includes(search)
      );
    }

    // Limit displayed
    const toDisplay = filtered.slice(0, displayedUniversities);

    // Render
    universityList.innerHTML = toDisplay.map(uni => `
      <div class="university-card">
        <div class="university-logo">${uni.acronym.substring(0, 2)}</div>
        <div class="university-info">
          <p class="university-name">${uni.name}</p>
          <p class="university-location">
            <i class="fas fa-map-marker-alt"></i> 
            ${getRegionName(uni.region)} • ${getTypeName(uni.type)}
          </p>
        </div>
        <div class="university-score">
          <p class="university-score-value">${uni.avgCutoff}</p>
          <p class="university-score-label">Prom. corte</p>
        </div>
      </div>
    `).join('');

    // Update load more button
    if (loadMoreUnisBtn) {
      loadMoreUnisBtn.style.display = filtered.length > displayedUniversities ? '' : 'none';
    }
  }

  // ============================================================
  // Careers Table
  // ============================================================
  const careersTbody = document.getElementById('careers-tbody');
  const searchCarrera = document.getElementById('search-carrera');
  const filterArea = document.getElementById('filter-area');
  const filterPuntaje = document.getElementById('filter-puntaje');
  const loadMoreCareersBtn = document.getElementById('load-more-careers');

  let displayedCareers = 15;

  if (careersTbody) {
    renderCareers();
    
    // Filter event listeners
    if (searchCarrera) searchCarrera.addEventListener('input', window.debounce(() => { displayedCareers = 15; renderCareers(); }, 300));
    if (filterArea) filterArea.addEventListener('change', () => { displayedCareers = 15; renderCareers(); });
    if (filterPuntaje) filterPuntaje.addEventListener('change', () => { displayedCareers = 15; renderCareers(); });
    
    if (loadMoreCareersBtn) {
      loadMoreCareersBtn.addEventListener('click', () => {
        displayedCareers += 15;
        renderCareers();
      });
    }
  }

  function renderCareers() {
    if (!careersTbody) return;

    let filtered = [...careers];
    
    // Apply filters
    if (searchCarrera && searchCarrera.value) {
      const search = searchCarrera.value.toLowerCase();
      filtered = filtered.filter(c => 
        c.name.toLowerCase().includes(search) || 
        c.university.toLowerCase().includes(search)
      );
    }
    
    if (filterArea && filterArea.value) {
      filtered = filtered.filter(c => c.area === filterArea.value);
    }
    
    if (filterPuntaje && filterPuntaje.value) {
      const maxPuntaje = parseInt(filterPuntaje.value);
      filtered = filtered.filter(c => c.cutoff <= maxPuntaje);
    }

    // Sort by cutoff descending
    filtered.sort((a, b) => b.cutoff - a.cutoff);

    // Limit displayed
    const toDisplay = filtered.slice(0, displayedCareers);

    // Render
    careersTbody.innerHTML = toDisplay.map(career => `
      <tr>
        <td><strong>${career.name}</strong></td>
        <td>${career.university}</td>
        <td>${getRegionName(career.region)}</td>
        <td><span class="badge badge-primary">${career.cutoff}</span></td>
        <td>${career.vacancies}</td>
      </tr>
    `).join('');

    // Update load more button
    if (loadMoreCareersBtn) {
      loadMoreCareersBtn.style.display = filtered.length > displayedCareers ? '' : 'none';
    }
  }

  // ============================================================
  // Helper Functions
  // ============================================================
  function getRegionName(code) {
    const regions = {
      'rm': 'R. Metropolitana',
      'valparaiso': 'Valparaíso',
      'biobio': 'Biobío',
      'araucania': 'La Araucanía',
      'los-lagos': 'Los Lagos',
      'coquimbo': 'Coquimbo',
      'ohiggins': "O'Higgins",
      'maule': 'Maule',
      'magallanes': 'Magallanes',
      'antofagasta': 'Antofagasta',
      'atacama': 'Atacama',
      'tarapaca': 'Tarapacá'
    };
    return regions[code] || code;
  }

  function getTypeName(code) {
    const types = {
      'estatal': 'Estatal',
      'cruch': 'CRUCH Privada',
      'privada': 'Privada Adscrita'
    };
    return types[code] || code;
  }

})();
