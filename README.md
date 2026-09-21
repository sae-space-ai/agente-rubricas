# Arquitecto de Rúbricas Musicales

Aplicación web para generar rúbricas de evaluación de las Enseñanzas Artísticas de Música en Extremadura, España, basada en los Decretos 110/2007, 111/2007 y 54/2022.

## 🎯 Características

- **Dos niveles de enseñanza**: Enseñanzas Elementales y Profesionales
- **Tres decretos oficiales**: 110/2007, 111/2007 y 54/2022 de Extremadura
- **Generación dual**: Modo local (datos predefinidos) y modo IA (Qwen 3.0)
- **Exportación múltiple**: Excel (XLSX), Word (DOCX) y PDF
- **7 asignaturas**: Lenguaje Musical, Instrumento Principal, Coro, Música de Cámara, Armonía, Historia de la Música, Instrumento Complementario

## 🚀 Despliegue en Vercel

### Paso 1: Preparar el repositorio

```bash
# Clonar el repositorio
git clone https://github.com/TU_USUARIO/mi-agente-rubricas.git
cd mi-agente-rubricas

# Instalar dependencias
npm install

# Verificar que funciona localmente
npm run dev
```

### Paso 2: Configurar Vercel

1. **Crear cuenta en Vercel**: [https://vercel.com](https://vercel.com)

2. **Importar proyecto desde GitHub**:
   - Ve a [https://vercel.com/new](https://vercel.com/new)
   - Selecciona tu repositorio de GitHub
   - Vercel detectará automáticamente que es un proyecto Vite

3. **Configurar variables de entorno**:
   - En el dashboard de Vercel, ve a **Settings** → **Environment Variables**
   - Añade la variable `NEBIUS_API_KEY` con tu clave de API de Nebius Token Factory
   - Obtén tu API key en: [https://nebius.com/services/token-factory](https://nebius.com/services/token-factory)

4. **Desplegar**:
   - Haz clic en **Deploy**
   - Vercel construirá automáticamente el proyecto

### Paso 3: Verificar el despliegue

Una vez desplegado, tu aplicación estará disponible en:
- **Frontend**: `https://tu-proyecto.vercel.app`
- **API Health Check**: `https://tu-proyecto.vercel.app/api/health`
- **Generar Rúbrica**: `https://tu-proyecto.vercel.app/api/generar-rubrica`

## 🛠️ Desarrollo Local

### Requisitos

- Node.js 18+ 
- Python 3.9+
- npm o yarn

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/TU_USUARIO/mi-agente-rubricas.git
cd mi-agente-rubricas

# Instalar dependencias de Node.js
npm install

# Instalar dependencias de Python
pip install -r requirements.txt

# Configurar variables de entorno
cp .env.example .env
# Edita .env y añade tu NEBIUS_API_KEY

# Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

### Comandos disponibles

```bash
# Desarrollo
npm run dev          # Inicia el servidor de desarrollo
npm run build        # Construye para producción
npm run preview      # Previsualiza la build de producción
npm run typecheck    # Verifica tipos TypeScript
```

## 📋 Estructura del Proyecto

```
mi-agente-rubricas/
├── api/
│   └── index.py              # Backend FastAPI (Vercel Serverless Function)
├── src/
│   ├── App.tsx               # Componente principal React
│   ├── components/
│   │   ├── ExportButtons.tsx     # Botones de exportación
│   │   └── RubricRenderer.tsx    # Renderizador de rúbricas IA
│   ├── data/
│   │   └── curriculum.ts         # Datos del currículo oficial
│   ├── services/
│   │   ├── api.ts                # Servicio de comunicación con API
│   │   └── exportService.ts      # Servicio de exportación
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

## 📚 Marco Normativo

### Decreto 110/2007, de 22 de mayo
Regula el currículo de las **Enseñanzas Elementales de Música**:
- Duración: 4 cursos
- Asignaturas: Lenguaje Musical, Instrumento, Coro (3º y 4º)
- Evaluación: "Apto" / "No Apto"

### Decreto 54/2022, de 18 de mayo
Modifica el Decreto 110/2007:
- Adaptación a la LOMLOE
- Incorporación de la especialidad de Órgano

### Decreto 111/2007, de 22 de mayo
Establece el currículo de las **Enseñanzas Profesionales de Música**:
- Duración: 6 cursos
- Asignaturas comunes: Instrumento, Música de Cámara, Coro, Lenguaje Musical
- Otras: Armonía, Historia de la Música, Instrumento Complementario
- Evaluación: Inicial, En Desarrollo, Adquirido, Avanzado

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
- **Qwen 3.0** (Qwen3-30B-A3B-Instruct-2507)

### Despliegue
- **Vercel** para hosting y serverless functions

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

### Error de build en Vercel
- Verifica que `package.json` tenga el script `build`
- Asegúrate de que `vercel.json` esté en la raíz del repositorio
- Revisa los logs de build en el dashboard de Vercel

### La API no responde
- Verifica que `requirements.txt` esté en la raíz
- Comprueba que `api/index.py` exista
- Revisa los logs de la función serverless en Vercel

## 📝 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📧 Contacto

Para preguntas o soporte, abre un issue en GitHub.

---

**Desarrollado para las Enseñanzas Artísticas de Música de Extremadura**
