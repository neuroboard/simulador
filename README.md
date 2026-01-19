# SimuPAES - Simulador de Puntajes PAES 2025

![SimuPAES](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

SimuPAES es una plataforma web completa para simular puntajes del proceso de admisión universitaria en Chile. Incluye herramientas para calcular puntajes ponderados, NEM, Ranking, y un copiloto de postulación que genera recomendaciones personalizadas.

## 📋 Características

### Frontend
- **Simulador de Puntajes PAES**: Calcula tu puntaje ponderado con ponderaciones personalizables o predefinidas por carrera
- **Copiloto de Postulación**: Wizard interactivo que genera recomendaciones de carreras (Seguras, Realistas, Aspiracionales)
- **Calculadora NEM**: Convierte tu promedio de notas al puntaje NEM oficial
- **Simulador de Ranking**: Estima tu puntaje ranking basado en el promedio de tu colegio
- **Buscador de Carreras**: Filtra entre más de 50 carreras con puntajes de corte actualizados
- **Explorador de Universidades**: Lista de 50 universidades del sistema
- **Sistema de Planes**: Gratis y PRO con tabla comparativa
- **Autenticación**: Login y registro con validaciones

### Backend (Opcional)
- API RESTful con Node.js y Express
- Endpoints para cálculos, universidades, carreras y autenticación
- Base de datos de ejemplo incluida

## 🚀 Inicio Rápido

### Opción 1: Solo Frontend (Sin servidor)

El frontend funciona completamente sin necesidad de servidor. Simplemente abre el archivo `index.html` en tu navegador.

```bash
# Navega a la carpeta del proyecto
cd "Simulador PAES"

# Abre index.html en tu navegador
# En macOS:
open index.html

# En Linux:
xdg-open index.html

# En Windows:
start index.html
```

### Opción 2: Con Servidor Backend

Para habilitar funcionalidades adicionales como persistencia de datos y API:

```bash
# 1. Navega a la carpeta del servidor
cd "Simulador PAES/server"

# 2. Instala las dependencias
npm install

# 3. Inicia el servidor
npm start

# 4. Abre http://localhost:3000 en tu navegador
```

Para desarrollo con auto-reload:
```bash
npm run dev
```

## 📁 Estructura del Proyecto

```
Simulador PAES/
├── index.html              # Página principal
├── simulador.html          # Simulador de puntajes
├── copiloto.html           # Copiloto de postulación
├── herramientas.html       # Calculadora NEM, Ranking, buscadores
├── planes.html             # Planes y precios
├── login.html              # Inicio de sesión
├── register.html           # Registro de usuario
├── terminos.html           # Términos y condiciones
├── contacto.html           # Formulario de contacto
│
├── css/
│   ├── styles.css          # Archivo principal (importa todos)
│   ├── variables.css       # Variables CSS (colores, fuentes, espaciado)
│   ├── base.css            # Reset y estilos base
│   ├── components.css      # Componentes reutilizables
│   ├── layout.css          # Header, footer, navegación
│   ├── utilities.css       # Clases de utilidad
│   └── pages.css           # Estilos específicos por página
│
├── js/
│   ├── main.js             # Funcionalidades generales
│   ├── simulator.js        # Lógica del simulador
│   ├── copilot.js          # Lógica del wizard
│   ├── tools.js            # Calculadoras NEM/Ranking
│   ├── auth.js             # Login y registro
│   └── contact.js          # Formulario de contacto
│
├── img/
│   └── favicon.svg         # Icono del sitio
│
├── api/
│   └── data/
│       ├── universities.json   # 50 universidades de ejemplo
│       ├── careers.json        # 50 carreras de ejemplo
│       └── nem-table.json      # Tabla NEM oficial
│
├── server/
│   ├── package.json        # Dependencias del servidor
│   └── server.js           # API Node.js/Express
│
└── README.md               # Este archivo
```

## 🔧 Tecnologías Utilizadas

### Frontend
- HTML5 semántico
- CSS3 con Custom Properties (variables)
- JavaScript ES6+ (Vanilla JS)
- Google Fonts (Plus Jakarta Sans, Inter)
- Font Awesome 6 (iconos)

### Backend (opcional)
- Node.js
- Express.js
- CORS
- UUID

## 📊 Datos de Ejemplo

### Universidades (50)
El archivo `api/data/universities.json` contiene:
- Universidades estatales CRUCH
- Universidades privadas tradicionales CRUCH  
- Universidades privadas adscritas
- Datos: nombre, sigla, región, tipo, puntaje promedio de corte

### Carreras (50)
El archivo `api/data/careers.json` contiene:
- Carreras de distintas áreas (Salud, Ingeniería, Derecho, etc.)
- Datos: nombre, universidad, región, área, puntaje de corte, vacantes, ponderaciones

### Tabla NEM
El archivo `api/data/nem-table.json` contiene:
- Conversión completa de promedio (4.0 - 7.0) a puntaje NEM (208 - 1000)
- Basado en tabla oficial del DEMRE

## 🔌 API Endpoints

Si utilizas el servidor backend, estos son los endpoints disponibles:

### Universidades
- `GET /api/universities` - Lista de universidades con filtros
- `GET /api/universities/:id` - Detalle de una universidad

### Carreras
- `GET /api/careers` - Lista de carreras con filtros
- `GET /api/careers/:id` - Detalle de una carrera

### Cálculos
- `POST /api/calculate/nem` - Calcular puntaje NEM
- `POST /api/calculate/ranking` - Calcular puntaje Ranking
- `POST /api/calculate/score` - Calcular puntaje ponderado

### Autenticación
- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/logout` - Cerrar sesión

### Simulaciones (requiere autenticación)
- `GET /api/user/simulations` - Lista de simulaciones guardadas
- `POST /api/user/simulations` - Guardar simulación
- `DELETE /api/user/simulations/:id` - Eliminar simulación

### Metadatos
- `GET /api/metadata/regions` - Lista de regiones
- `GET /api/metadata/areas` - Lista de áreas de estudio
- `GET /api/metadata/nem-table` - Tabla NEM completa

## ➕ Extender la Base de Datos

### Agregar Universidades
Edita `api/data/universities.json` y añade objetos con el formato:

```json
{
  "id": 51,
  "name": "Nueva Universidad",
  "acronym": "NU",
  "region": "rm",
  "type": "privada",
  "website": "https://nu.cl",
  "avgCutoff": 600
}
```

### Agregar Carreras
Edita `api/data/careers.json` y añade objetos con el formato:

```json
{
  "id": 51,
  "code": "51001",
  "name": "Nueva Carrera",
  "universityId": 1,
  "university": "Universidad de Chile",
  "region": "rm",
  "area": "ingenieria",
  "cutoff": 700,
  "vacancies": 100,
  "duration": 5,
  "weights": {
    "nem": 10,
    "ranking": 20,
    "clec": 20,
    "m1": 30,
    "m2": 0,
    "electiva": 20
  }
}
```

### Regiones Disponibles
- `rm`: Región Metropolitana
- `valparaiso`: Valparaíso
- `biobio`: Biobío
- `araucania`: La Araucanía
- `los-lagos`: Los Lagos
- `coquimbo`: Coquimbo
- `ohiggins`: O'Higgins
- `maule`: Maule
- `magallanes`: Magallanes
- `antofagasta`: Antofagasta
- `atacama`: Atacama
- `tarapaca`: Tarapacá

### Áreas de Estudio
- `salud`: Salud
- `ingenieria`: Ingeniería y Tecnología
- `ciencias`: Ciencias Básicas
- `humanidades`: Humanidades
- `cs-sociales`: Ciencias Sociales
- `derecho`: Derecho
- `educacion`: Educación
- `arte`: Arte, Arquitectura y Diseño
- `agropecuaria`: Agropecuaria
- `negocios`: Administración y Negocios
- `tecnologia`: Tecnología e Informática

## 🎨 Personalización

### Cambiar Colores
Edita `css/variables.css` para modificar los colores principales:

```css
:root {
  --color-primary: #1a56db;      /* Color principal */
  --color-primary-dark: #1e40af; /* Color principal oscuro */
  --color-secondary: #0f766e;    /* Color secundario */
  --color-accent: #f59e0b;       /* Color de acento */
}
```

### Cambiar Fuentes
Modifica la importación en `css/styles.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=TuFuente:wght@400;500;600;700&display=swap');
```

Y actualiza las variables en `css/variables.css`:

```css
:root {
  --font-primary: 'TuFuente', sans-serif;
}
```

## 📱 Responsive Design

El sitio está diseñado con enfoque mobile-first y es completamente responsivo:
- **Mobile**: < 640px
- **Tablet**: 640px - 1023px
- **Desktop**: >= 1024px

## ⚠️ Notas Importantes

1. **Datos de Ejemplo**: Los puntajes de corte y datos mostrados son referenciales y se basan en procesos anteriores. Siempre consulta las fuentes oficiales del DEMRE.

2. **Sin Backend por Defecto**: El frontend funciona de forma independiente. El backend es opcional para funcionalidades avanzadas.

3. **Almacenamiento Local**: Sin backend, los datos se guardan en localStorage del navegador.

4. **Producción**: Para un entorno de producción, se recomienda:
   - Usar una base de datos real (MongoDB, PostgreSQL)
   - Implementar autenticación segura (JWT, bcrypt)
   - Configurar HTTPS
   - Usar variables de entorno

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para cambios importantes:
1. Abre un issue para discutir el cambio
2. Crea un fork del repositorio
3. Realiza tus cambios en una rama nueva
4. Envía un pull request

## 📞 Contacto

Para consultas o sugerencias, usa el formulario de contacto en la página o escribe a contacto@simupaes.cl

---

**SimuPAES** - Planifica tu futuro académico 🎓
