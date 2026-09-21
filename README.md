# Arquitecto de Rúbricas Musicales

Sistema inteligente de generación de rúbricas de evaluación para las Enseñanzas Profesionales de Música en Extremadura, basado en la Programación Didáctica 2026/2027.

## 🎯 Características

- **3 Materias específicas**: Música de Cámara, Banda y Orquesta
- **12 Criterios de evaluación** (CO-01 a CO-12)
- **7 Competencias** (CM-1 a CM-7)
- **4 Niveles de logro**: Inicial, En desarrollo, Adecuado, Consolidado
- **Exportación múltiple**: Excel (XLSX), Word (DOCX) y PDF
- **IA integrada**: Google Gemma 3 27B via Nebius Token Factory
- **Validación automática**: Regla crítica para Música de Cámara (solo 4º, 5º, 6º)

## 📚 Marco Normativo

### Decreto 111/2007, de 22 de mayo
Establece el currículo de las **Enseñanzas Profesionales de Música** de régimen especial en Extremadura.

### Programación Didáctica 2026/2027
Define la estructura específica para:
- **Música de Cámara**: Solo en 4º, 5º y 6º curso
- **Banda**: Todos los cursos (1º a 6º)
- **Orquesta**: Todos los cursos (1º a 6º)

## 🎼 Estructura Curricular

### Materias y Cursos

| Materia | Cursos Disponibles |
|---------|-------------------|
| Música de Cámara | 4º, 5º, 6º |
| Banda | 1º, 2º, 3º, 4º, 5º, 6º |
| Orquesta | 1º, 2º, 3º, 4º, 5º, 6º |

### Competencias (CM-1 a CM-7)

- **CM-1**: Ejecución instrumental
- **CM-2**: Competencia rítmica y de coordinación
- **CM-3**: Competencia auditiva y de ajuste sonoro
- **CM-4**: Competencia de interpretación musical
- **CM-5**: Competencia de interacción musical
- **CM-6**: Competencia de análisis y resolución musical
- **CM-7**: Competencia de transferencia musical

### Criterios de Evaluación (CO-01 a CO-12)

- **CO-01**: Preparación
- **CO-02**: Ritmo y coordinación
- **CO-03**: Escucha y ajuste
- **CO-04**: Afinación y sonido
- **CO-05**: Articulación y dinámica
- **CO-06**: Balance y función
- **CO-07**: Interpretación y discurso
- **CO-08**: Adaptación
- **CO-09**: Continuidad
- **CO-10**: Resolución de problemas
- **CO-11**: Autonomía y responsabilidad
- **CO-12**: Revisión y transferencia

### Niveles de Logro

| Nivel | Nombre | Descripción |
|-------|--------|-------------|
| 1 | Inicial | Dependencia del profesor, errores frecuentes, falta de autonomía |
| 2 | En desarrollo | Comprensión básica con apoyo puntual del profesor |
| 3 | Adecuado | Acción autónoma en situaciones habituales |
| 4 | Consolidado | Anticipación, flexibilidad, resolución de situaciones nuevas y transferibilidad |

### Sistema de Puntuación

- Cada criterio se puntúa de 1 a 4
- Puntuación máxima = Número de criterios × 4
- Nota final = (Total suma × 10) / Puntuación máxima

## 🚀 Instalación y Uso

### Requisitos Previos

- Node.js 18+ y npm
- Cuenta en Nebius Token Factory
- API Key de Nebius

### Instalación

```bash
# Clonar el repositorio
git clone <url-del-repositorio>
cd mi-agente-rubricas

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env y añadir tu NEBIUS_API_KEY
```

### Desarrollo Local

```bash
# Iniciar servidor de desarrollo
npm run dev

# La aplicación estará disponible en http://localhost:3000
```

### Build para Producción

```bash
# Generar build de producción
npm run build

# Los archivos se generan en dist/
```

## 🌐 Despliegue en Vercel

### Paso 1: Preparar el Repositorio

```bash
# Inicializar git (si no lo has hecho)
git init
git add .
git commit -m "Initial commit"

# Crear rama main
git branch -M main

# Añadir remoto
git remote add origin https://github.com/TU_USUARIO/mi-agente-rubricas.git
git push -u origin main
```

### Paso 2: Configurar Vercel

1. Ir a [vercel.com](https://vercel.com) e importar el repositorio
2. Configurar las variables de entorno:
   - `NEBIUS_API_KEY`: Tu clave API de Nebius Token Factory
3. Desplegar el proyecto

### Paso 3: Verificar el Despliegue

- **Frontend**: `https://tu-proyecto.vercel.app`
- **API Health**: `https://tu-proyecto.vercel.app/api/health`

## 📖 Uso de la Aplicación

### Modo Local (Datos Predefinidos)

1. Seleccionar el **Modo de Generación**: "Datos Locales"
2. Elegir la **Materia**: Música de Cámara, Banda o Orquesta
3. Seleccionar el **Curso**: Según la materia elegida
4. Hacer clic en **"Generar Rúbrica"**
5. La rúbrica se genera instantáneamente con los 12 criterios y 4 niveles

### Modo IA (Gemma 3)

1. Seleccionar el **Modo de Generación**: "IA con Gemma 3"
2. Elegir la **Materia** y el **Curso**
3. Hacer clic en **"Generar con IA"**
4. La IA genera una rúbrica personalizada basada en el superprompt

### Exportación de Rúbricas

Una vez generada la rúbrica en modo local, puedes exportarla en 3 formatos:

- **🟢 Excel (XLSX)**: Hoja de cálculo con todos los datos
- **🔵 Word (DOCX)**: Documento formateado profesionalmente
- **🔴 PDF**: Documento con tablas y formato optimizado

## 🛠️ Estructura del Proyecto

```
mi-agente-rubricas/
├── api/
│   └── index.py              # Backend FastAPI con Gemma 3
├── src/
│   ├── App.tsx               # Componente principal
│   ├── components/
│   │   ├── ExportButtons.tsx     # Botones de exportación
│   │   └── RubricRenderer.tsx    # Renderizador de rúbricas IA
│   ├── data/
│   │   └── curriculum.ts         # Datos del currículo (materias, criterios, competencias)
│   ├── services/
│   │   ├── api.ts                # Servicio de comunicación con API
│   │   └── exportService.ts      # Servicio de exportación (XLSX, DOCX, PDF)
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── index.html
├── package.json
├── requirements.txt          # Dependencias Python
├── tsconfig.json
├── vercel.json               # Configuración de Vercel
└── vite.config.js
```

## 🔧 Tecnologías

### Frontend
- **React 18** con TypeScript
- **Tailwind CSS v4** para estilos
- **Vite** como build tool
- **SheetJS** para exportación Excel
- **docx** para exportación Word
- **jsPDF** para exportación PDF

### Backend
- **FastAPI** para la API REST
- **Python 3.9+**
- **OpenAI SDK** para comunicación con Nebius
- **Google Gemma 3 27B** como modelo de IA

### Despliegue
- **Vercel** para hosting y serverless functions

## 📝 Documentación Adicional

- [DEPLOYMENT.md](DEPLOYMENT.md) - Guía detallada de despliegue
- [TESTING_EXPORTS.md](TESTING_EXPORTS.md) - Guía de prueba de exportaciones
- [CONTRIBUTING.md](CONTRIBUTING.md) - Guía para contribuidores
- [CHANGELOG.md](CHANGELOG.md) - Registro de cambios

## 🐛 Solución de Problemas

### Error: "NEBIUS_API_KEY not found"
- Verifica que la variable de entorno esté configurada en Vercel
- En desarrollo local, asegúrate de tener un archivo `.env` con la clave

### Error: "Module not found"
```bash
# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
```

### La API no responde
- Verifica que `requirements.txt` esté en la raíz
- Comprueba que `api/index.py` exista
- Revisa los logs de la función serverless en Vercel

## 📄 Licencia

Este proyecto está bajo la licencia MIT.

## 👥 Contribuciones

Las contribuciones son bienvenidas. Por favor, lee [CONTRIBUTING.md](CONTRIBUTING.md) para detalles sobre nuestro código de conducta y el proceso para enviar pull requests.

## 📧 Contacto

Para preguntas o soporte, abre un issue en GitHub.

---

**Desarrollado para las Enseñanzas Profesionales de Música de Extremadura**  
**Programación Didáctica 2026/2027 - Música de Cámara, Banda y Orquesta**
