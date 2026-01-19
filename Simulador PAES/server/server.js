/**
 * SimuPAES API Server
 * Backend simple con Node.js y Express
 */

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, '..')));

// ============================================================
// Base de datos en memoria (para demo, usar DB real en producción)
// ============================================================
let users = [];
let simulations = [];
let sessions = {};

// Cargar datos de ejemplo
const dataPath = path.join(__dirname, '..', 'api', 'data');
const universities = JSON.parse(fs.readFileSync(path.join(dataPath, 'universities.json'), 'utf8'));
const careers = JSON.parse(fs.readFileSync(path.join(dataPath, 'careers.json'), 'utf8'));
const nemTable = JSON.parse(fs.readFileSync(path.join(dataPath, 'nem-table.json'), 'utf8'));

// ============================================================
// Utilidades
// ============================================================
function calculateNEM(promedio) {
  const key = promedio.toFixed(2);
  if (nemTable.table[key]) {
    return nemTable.table[key];
  }
  // Interpolación lineal
  const keys = Object.keys(nemTable.table).map(Number).sort((a, b) => a - b);
  for (let i = 0; i < keys.length - 1; i++) {
    if (promedio >= keys[i] && promedio < keys[i + 1]) {
      const lower = keys[i];
      const upper = keys[i + 1];
      const lowerNem = nemTable.table[lower.toFixed(2)];
      const upperNem = nemTable.table[upper.toFixed(2)];
      const ratio = (promedio - lower) / (upper - lower);
      return Math.round(lowerNem + ratio * (upperNem - lowerNem));
    }
  }
  return 1000;
}

function calculateRanking(miNem, promedioColegio) {
  const diff = miNem - promedioColegio;
  if (diff <= 0) return miNem;
  const bonus = Math.min(diff * 0.6, 150);
  return Math.min(miNem + bonus, 1000);
}

function calculateWeightedScore(scores, weights) {
  let total = 0;
  if (weights.nem > 0) total += (scores.nem || 0) * weights.nem / 100;
  if (weights.ranking > 0) total += (scores.ranking || 0) * weights.ranking / 100;
  if (weights.clec > 0) total += (scores.clec || 0) * weights.clec / 100;
  if (weights.m1 > 0) total += (scores.m1 || 0) * weights.m1 / 100;
  if (weights.m2 > 0) total += (scores.m2 || 0) * weights.m2 / 100;
  if (weights.electiva > 0) {
    const electiveScore = Math.max(scores.ciencias || 0, scores.historia || 0);
    total += electiveScore * weights.electiva / 100;
  }
  return Math.round(total * 10) / 10;
}

function generateToken() {
  return uuidv4();
}

// ============================================================
// Rutas API
// ============================================================

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ---------- Universidades ----------
app.get('/api/universities', (req, res) => {
  const { region, type, search, limit = 50, offset = 0 } = req.query;
  
  let filtered = [...universities.universities];
  
  if (region) {
    filtered = filtered.filter(u => u.region === region);
  }
  
  if (type) {
    filtered = filtered.filter(u => u.type === type);
  }
  
  if (search) {
    const s = search.toLowerCase();
    filtered = filtered.filter(u => 
      u.name.toLowerCase().includes(s) || 
      u.acronym.toLowerCase().includes(s)
    );
  }
  
  const total = filtered.length;
  const data = filtered.slice(parseInt(offset), parseInt(offset) + parseInt(limit));
  
  res.json({
    success: true,
    total,
    limit: parseInt(limit),
    offset: parseInt(offset),
    data
  });
});

app.get('/api/universities/:id', (req, res) => {
  const uni = universities.universities.find(u => u.id === parseInt(req.params.id));
  
  if (!uni) {
    return res.status(404).json({ success: false, error: 'Universidad no encontrada' });
  }
  
  res.json({ success: true, data: uni });
});

// ---------- Carreras ----------
app.get('/api/careers', (req, res) => {
  const { area, region, search, maxCutoff, universityId, limit = 50, offset = 0 } = req.query;
  
  let filtered = [...careers.careers];
  
  if (area) {
    filtered = filtered.filter(c => c.area === area);
  }
  
  if (region) {
    filtered = filtered.filter(c => c.region === region);
  }
  
  if (universityId) {
    filtered = filtered.filter(c => c.universityId === parseInt(universityId));
  }
  
  if (maxCutoff) {
    filtered = filtered.filter(c => c.cutoff <= parseInt(maxCutoff));
  }
  
  if (search) {
    const s = search.toLowerCase();
    filtered = filtered.filter(c => 
      c.name.toLowerCase().includes(s) || 
      c.university.toLowerCase().includes(s)
    );
  }
  
  // Ordenar por puntaje de corte descendente
  filtered.sort((a, b) => b.cutoff - a.cutoff);
  
  const total = filtered.length;
  const data = filtered.slice(parseInt(offset), parseInt(offset) + parseInt(limit));
  
  res.json({
    success: true,
    total,
    limit: parseInt(limit),
    offset: parseInt(offset),
    data
  });
});

app.get('/api/careers/:id', (req, res) => {
  const career = careers.careers.find(c => c.id === parseInt(req.params.id));
  
  if (!career) {
    return res.status(404).json({ success: false, error: 'Carrera no encontrada' });
  }
  
  res.json({ success: true, data: career });
});

// ---------- Cálculos ----------
app.post('/api/calculate/nem', (req, res) => {
  const { promedio } = req.body;
  
  if (!promedio || promedio < 4.0 || promedio > 7.0) {
    return res.status(400).json({ 
      success: false, 
      error: 'El promedio debe estar entre 4.0 y 7.0' 
    });
  }
  
  const nemScore = calculateNEM(parseFloat(promedio));
  
  res.json({
    success: true,
    data: {
      promedio: parseFloat(promedio),
      nem: nemScore
    }
  });
});

app.post('/api/calculate/ranking', (req, res) => {
  const { miNem, promedioColegio } = req.body;
  
  if (!miNem || miNem < 100 || miNem > 1000) {
    return res.status(400).json({ 
      success: false, 
      error: 'El NEM debe estar entre 100 y 1000' 
    });
  }
  
  if (!promedioColegio || promedioColegio < 100 || promedioColegio > 1000) {
    return res.status(400).json({ 
      success: false, 
      error: 'El promedio del colegio debe estar entre 100 y 1000' 
    });
  }
  
  const rankingScore = calculateRanking(parseFloat(miNem), parseFloat(promedioColegio));
  const bonus = rankingScore - miNem;
  
  res.json({
    success: true,
    data: {
      miNem: parseFloat(miNem),
      promedioColegio: parseFloat(promedioColegio),
      ranking: Math.round(rankingScore),
      bonus: Math.round(bonus)
    }
  });
});

app.post('/api/calculate/score', (req, res) => {
  const { scores, weights, careerId } = req.body;
  
  if (!scores || !scores.nem || !scores.ranking || !scores.clec || !scores.m1) {
    return res.status(400).json({ 
      success: false, 
      error: 'Faltan puntajes obligatorios (NEM, Ranking, CLEC, M1)' 
    });
  }
  
  // Si se especifica una carrera, usar sus ponderaciones
  let finalWeights = weights;
  let career = null;
  
  if (careerId) {
    career = careers.careers.find(c => c.id === parseInt(careerId));
    if (career) {
      finalWeights = career.weights;
    }
  }
  
  if (!finalWeights) {
    return res.status(400).json({ 
      success: false, 
      error: 'Faltan las ponderaciones' 
    });
  }
  
  const totalWeights = Object.values(finalWeights).reduce((a, b) => a + b, 0);
  if (totalWeights !== 100) {
    return res.status(400).json({ 
      success: false, 
      error: 'Las ponderaciones deben sumar 100%' 
    });
  }
  
  const weightedScore = calculateWeightedScore(scores, finalWeights);
  
  const result = {
    scores,
    weights: finalWeights,
    weightedScore,
    breakdown: {
      nem: Math.round((scores.nem || 0) * finalWeights.nem / 100 * 10) / 10,
      ranking: Math.round((scores.ranking || 0) * finalWeights.ranking / 100 * 10) / 10,
      clec: Math.round((scores.clec || 0) * finalWeights.clec / 100 * 10) / 10,
      m1: Math.round((scores.m1 || 0) * finalWeights.m1 / 100 * 10) / 10,
      m2: Math.round((scores.m2 || 0) * finalWeights.m2 / 100 * 10) / 10,
      electiva: Math.round(Math.max(scores.ciencias || 0, scores.historia || 0) * finalWeights.electiva / 100 * 10) / 10
    }
  };
  
  if (career) {
    result.career = career;
    result.probability = weightedScore >= career.cutoff ? 'Alta' : 
                         weightedScore >= career.cutoff - 30 ? 'Media' : 
                         weightedScore >= career.cutoff - 60 ? 'Baja' : 'Muy Baja';
  }
  
  res.json({ success: true, data: result });
});

// ---------- Autenticación (Demo) ----------
app.post('/api/auth/register', (req, res) => {
  const { nombre, apellido, email, password } = req.body;
  
  if (!nombre || !apellido || !email || !password) {
    return res.status(400).json({ 
      success: false, 
      error: 'Todos los campos son obligatorios' 
    });
  }
  
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ 
      success: false, 
      error: 'El email ya está registrado' 
    });
  }
  
  const user = {
    id: uuidv4(),
    nombre,
    apellido,
    email,
    password, // En producción, hashear con bcrypt
    plan: 'free',
    createdAt: new Date().toISOString()
  };
  
  users.push(user);
  
  const token = generateToken();
  sessions[token] = user.id;
  
  res.json({
    success: true,
    data: {
      user: { id: user.id, nombre, apellido, email, plan: user.plan },
      token
    }
  });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ 
      success: false, 
      error: 'Email y contraseña son obligatorios' 
    });
  }
  
  const user = users.find(u => u.email === email && u.password === password);
  
  if (!user) {
    return res.status(401).json({ 
      success: false, 
      error: 'Credenciales inválidas' 
    });
  }
  
  const token = generateToken();
  sessions[token] = user.id;
  
  res.json({
    success: true,
    data: {
      user: { id: user.id, nombre: user.nombre, apellido: user.apellido, email: user.email, plan: user.plan },
      token
    }
  });
});

app.post('/api/auth/logout', (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (token && sessions[token]) {
    delete sessions[token];
  }
  
  res.json({ success: true });
});

// Middleware de autenticación
function authenticate(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (!token || !sessions[token]) {
    return res.status(401).json({ success: false, error: 'No autenticado' });
  }
  
  const userId = sessions[token];
  const user = users.find(u => u.id === userId);
  
  if (!user) {
    return res.status(401).json({ success: false, error: 'Usuario no encontrado' });
  }
  
  req.user = user;
  next();
}

// ---------- Simulaciones del usuario ----------
app.get('/api/user/simulations', authenticate, (req, res) => {
  const userSimulations = simulations.filter(s => s.userId === req.user.id);
  res.json({ success: true, data: userSimulations });
});

app.post('/api/user/simulations', authenticate, (req, res) => {
  const { scores, weights, result, careerId } = req.body;
  
  const simulation = {
    id: uuidv4(),
    userId: req.user.id,
    scores,
    weights,
    result,
    careerId,
    createdAt: new Date().toISOString()
  };
  
  simulations.push(simulation);
  
  res.json({ success: true, data: simulation });
});

app.delete('/api/user/simulations/:id', authenticate, (req, res) => {
  const index = simulations.findIndex(s => s.id === req.params.id && s.userId === req.user.id);
  
  if (index === -1) {
    return res.status(404).json({ success: false, error: 'Simulación no encontrada' });
  }
  
  simulations.splice(index, 1);
  res.json({ success: true });
});

// ---------- Metadatos ----------
app.get('/api/metadata/regions', (req, res) => {
  res.json({ success: true, data: universities.regions });
});

app.get('/api/metadata/areas', (req, res) => {
  res.json({ success: true, data: careers.areas });
});

app.get('/api/metadata/nem-table', (req, res) => {
  res.json({ success: true, data: nemTable });
});

// ---------- Error handling ----------
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, error: 'Error interno del servidor' });
});

// 404 para rutas API no encontradas
app.use('/api/*', (req, res) => {
  res.status(404).json({ success: false, error: 'Endpoint no encontrado' });
});

// ============================================================
// Iniciar servidor
// ============================================================
app.listen(PORT, () => {
  console.log(`
  ╔═══════════════════════════════════════════════════════════╗
  ║                                                           ║
  ║   SimuPAES API Server                                     ║
  ║   Servidor ejecutándose en http://localhost:${PORT}         ║
  ║                                                           ║
  ║   Endpoints disponibles:                                  ║
  ║   - GET  /api/universities                               ║
  ║   - GET  /api/careers                                     ║
  ║   - POST /api/calculate/nem                              ║
  ║   - POST /api/calculate/ranking                          ║
  ║   - POST /api/calculate/score                            ║
  ║   - POST /api/auth/register                              ║
  ║   - POST /api/auth/login                                 ║
  ║                                                           ║
  ╚═══════════════════════════════════════════════════════════╝
  `);
});

module.exports = app;
