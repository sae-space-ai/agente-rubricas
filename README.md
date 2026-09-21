# Arquitecto de Rúbricas Musicales

Aplicación web para generar rúbricas de evaluación de las Enseñanzas Profesionales de Música en Extremadura, España (Decreto 58/2022).

## Características

- **Modo Local**: Rúbricas predefinidas basadas en el currículo oficial
- **Modo IA**: Generación dinámica con Qwen 3.0 a través de Nebius Token Factory
- **7 Asignaturas**: Lenguaje Musical, Instrumento Principal, Coro, Música de Cámara, Armonía, Historia de la Música, Coro/Instrumento Complementario
- **4 Niveles de Logro**: Inicial, En Desarrollo, Adquirido, Avanzado
- **Exportación**: Impresión y exportación a PDF

## Estructura del Proyecto

```
mi-agente-rubricas/
├── api/
│   └── index.py          # Backend FastAPI
├── src/
│   ├── App.tsx           # Componente principal
│   ├── components/
│   │   └── RubricRenderer.tsx  # Renderizador de rúbricas IA
│   ├── data/
│   │   └── curriculum.ts       # Datos del currículo oficial
│   ├── services/
│   │   └── api.ts              # Servicio de comunicación con API
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── index.html
├── vercel.json           # Configuración de Vercel
├── requirements.txt      # Dependencias Python
└── .env.example          # Variables de entorno
```

## Configuración

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```
NEBIUS_API_KEY=tu_api_key_de_nebius
```

### Backend (FastAPI)

El backend utiliza:
- **FastAPI** para la API REST
- **OpenAI SDK** para comunicarse con Nebius Token Factory
- **Qwen 3.0** como modelo de IA generativa

Endpoints:
- `POST /api/generar-rubrica` - Genera una rúbrica
- `GET /api/health` - Estado del servicio

### Frontend (React + Vite)

El frontend utiliza:
- **React 18** con TypeScript
- **Tailwind CSS v4** para estilos
- **Vite** como build tool

## Despliegue en Vercel

### 1. Preparar el repositorio

```bash
git init
git add .
git commit -m "Arquitecto de Rúbricas Musicales con Qwen y Nebius"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/mi-agente-rubricas.git
git push -u origin main
```

### 2. Configurar Vercel

1. Importa el repositorio en [Vercel](https://vercel.com)
2. Añade la variable de entorno `NEBIUS_API_KEY` en el panel de Vercel
3. Despliega el proyecto

### 3. Probar la API

```bash
curl -X POST https://tu-proyecto.vercel.app/api/generar-rubrica \
  -H "Content-Type: application/json" \
  -d '{"asignatura": "Orquesta", "curso": "3º"}'
```

## Desarrollo Local

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build
```

## Marco Normativo

Basado en el **Decreto 58/2022** de la Junta de Extremadura, por el que se establece el currículo de las enseñanzas artísticas profesionales de Música.

## Licencia

Proyecto educativo de código abierto.
