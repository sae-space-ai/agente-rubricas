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
│   └── index.py              # Backend FastAPI (Vercel Serverless Function)
├── src/
│   ├── App.tsx               # Componente principal React
│   ├── components/
│   │   └── RubricRenderer.tsx  # Renderizador de rúbricas generadas por IA
│   ├── data/
│   │   └── curriculum.ts       # Datos del currículo oficial (Decreto 58/2022)
│   ├── services/
│   │   └── api.ts              # Servicio de comunicación con API FastAPI
│   ├── index.css               # Estilos globales con Tailwind CSS
│   ├── main.tsx                # Punto de entrada React
│   └── vite-env.d.ts           # Tipos de Vite
├── index.html                  # HTML principal
├── vercel.json                 # Configuración de Vercel
├── requirements.txt            # Dependencias Python (FastAPI)
├── .env.example                # Ejemplo de variables de entorno
├── package.json                # Dependencias Node.js
├── tsconfig.json               # Configuración TypeScript
└── vite.config.js              # Configuración Vite
```

## Configuración

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
NEBIUS_API_KEY=tu_api_key_de_nebius
VITE_API_URL=  # Dejar vacío para producción (Vercel)
```

### Backend (FastAPI)

El backend utiliza:
- **FastAPI** para la API REST
- **OpenAI SDK** para comunicarse con Nebius Token Factory
- **Qwen 3.0** (Qwen3-30B-A3B-Instruct-2507) como modelo de IA generativa

**Endpoints:**
- `POST /api/generar-rubrica` - Genera una rúbrica personalizada
- `GET /api/health` - Estado del servicio

**Nota importante:** En Vercel, las funciones Python en el directorio `api/` montan automáticamente las rutas con el prefijo `/api/`. Por lo tanto, las rutas definidas en el código son relativas a esa base.

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
2. Añade la variable de entorno `NEBIUS_API_KEY` en el panel de Vercel:
   - Ve a Settings → Environment Variables
   - Añade `NEBIUS_API_KEY` con tu clave de Nebius Token Factory
3. Despliega el proyecto

### 3. Probar la API

```bash
curl -X POST https://tu-proyecto.vercel.app/api/generar-rubrica \
  -H "Content-Type: application/json" \
  -d '{"asignatura": "Orquesta", "curso": "3º"}'
```

## Desarrollo Local

### Frontend

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build
```

### Backend (opcional para desarrollo local)

```bash
# Crear entorno virtual
python -m venv venv
source venv/bin/activate  # En Windows: venv\Scripts\activate

# Instalar dependencias
pip install -r requirements.txt

# Ejecutar el servidor
uvicorn api.index:app --reload
```

## Arquitectura Técnica

### Flujo de Datos

1. **Modo Local:**
   - Usuario selecciona asignatura y curso
   - Frontend genera rúbrica desde datos predefinidos (`curriculum.ts`)
   - No requiere conexión a API

2. **Modo IA:**
   - Usuario selecciona asignatura y curso (o escribe personalizados)
   - Frontend envía petición a `/api/generar-rubrica`
   - Vercel reescribe la ruta a `api/index.py`
   - FastAPI procesa la petición y llama a Nebius Token Factory
   - Qwen 3.0 genera la rúbrica personalizada
   - Frontend renderiza la rúbrica con formato markdown

### Tecnologías

- **Frontend:** React 18, TypeScript, Tailwind CSS v4, Vite
- **Backend:** FastAPI, Python 3.9+
- **IA:** Qwen 3.0 (Qwen3-30B-A3B-Instruct-2507) via Nebius Token Factory
- **Despliegue:** Vercel (frontend + serverless functions)

## Marco Normativo

Basado en el **Decreto 58/2022** de la Junta de Extremadura, por el que se establece el currículo de las enseñanzas artísticas profesionales de Música.

## Correcciones Realizadas

Se han corregido los siguientes errores en el ecosistema:

1. **`src/App.tsx`:** Corregido el problema de búsqueda de asignatura (comparaba `id` con `nombre`)
2. **`src/App.tsx`:** Eliminadas variables no usadas (`displayAsignatura`, `displayCurso`)
3. **`src/components/RubricRenderer.tsx`:** Cambiado tipo de retorno de `JSX.Element` a `ReactNode` para compatibilidad con React 18
4. **`tsconfig.json`:** Agregados tipos de Vite client (`"types": ["vite/client"]`)
5. **`vercel.json`:** Corregida configuración de rewrites para evitar conflictos
6. **`api/index.py`:** Corregidas rutas de la API (eliminada duplicación de prefijo `/api/`)

## Licencia

Proyecto educativo de código abierto.

## Créditos

- **Decreto 58/2022:** Junta de Extremadura
- **Modelo IA:** Qwen 3.0 (Alibaba Cloud)
- **Plataforma IA:** Nebius Token Factory
