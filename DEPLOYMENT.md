# Instrucciones de Despliegue

## 📋 Requisitos Previos

- Cuenta de GitHub
- Cuenta de Vercel (gratuita)
- API Key de Nebius Token Factory
- Node.js 18+ instalado localmente

## 🚀 Paso 1: Preparar el Repositorio en GitHub

### 1.1 Crear el repositorio

```bash
# Inicializar git (si no lo has hecho)
git init

# Añadir todos los archivos
git add .

# Primer commit
git commit -m "Initial commit: Arquitecto de Rúbricas Musicales"

# Crear rama main
git branch -M main

# Añadir remoto (reemplaza TU_USUARIO con tu usuario de GitHub)
git remote add origin https://github.com/TU_USUARIO/mi-agente-rubricas.git

# Push a GitHub
git push -u origin main
```

### 1.2 Verificar archivos importantes

Asegúrate de que estos archivos están en tu repositorio:

- ✅ `package.json` - Dependencias de Node.js
- ✅ `requirements.txt` - Dependencias de Python
- ✅ `vercel.json` - Configuración de Vercel
- ✅ `api/index.py` - Backend FastAPI
- ✅ `.gitignore` - Archivos ignorados
- ✅ `README.md` - Documentación

## 🔧 Paso 2: Configurar Vercel

### 2.1 Importar proyecto

1. Ve a [https://vercel.com/new](https://vercel.com/new)
2. Haz clic en "Import Git Repository"
3. Selecciona tu repositorio `mi-agente-rubricas`
4. Vercel detectará automáticamente que es un proyecto Vite

### 2.2 Configurar variables de entorno

**IMPORTANTE**: Antes de desplegar, configura las variables de entorno:

1. En la página de configuración del proyecto en Vercel
2. Ve a **Settings** → **Environment Variables**
3. Añade la siguiente variable:

```
NEBIUS_API_KEY = tu_api_key_aqui
```

**¿Dónde obtener la API Key?**
- Ve a [https://nebius.com/services/token-factory](https://nebius.com/services/token-factory)
- Crea una cuenta o inicia sesión
- Genera una API key en el dashboard

### 2.3 Configurar Framework

Vercel debería detectar automáticamente:
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

Si no lo detecta, configúralo manualmente.

### 2.4 Desplegar

1. Haz clic en **Deploy**
2. Espera a que el despliegue se complete (2-3 minutos)
3. Una vez completado, recibirás una URL como: `https://mi-agente-rubricas.vercel.app`

## ✅ Paso 3: Verificar el Despliegue

### 3.1 Probar el frontend

Abre tu URL de Vercel en el navegador:
```
https://tu-proyecto.vercel.app
```

Deberías ver la interfaz del Arquitecto de Rúbricas Musicales.

### 3.2 Probar la API

Verifica que la API esté funcionando:

```bash
# Health check
curl https://tu-proyecto.vercel.app/api/health
```

Deberías recibir una respuesta JSON con el estado de la API.

### 3.3 Probar generación de rúbricas

```bash
# Generar una rúbrica de prueba
curl -X POST https://tu-proyecto.vercel.app/api/generar-rubrica \
  -H "Content-Type: application/json" \
  -d '{"asignatura": "Lenguaje Musical", "curso": "1º"}'
```

## 🐛 Solución de Problemas Comunes

### Error: "Module not found: Can't resolve 'xlsx'"

**Causa**: Dependencias no instaladas correctamente

**Solución**:
```bash
npm install
npm run build
```

### Error: "NEBIUS_API_KEY not found"

**Causa**: Variable de entorno no configurada en Vercel

**Solución**:
1. Ve a Vercel Dashboard → Tu Proyecto → Settings → Environment Variables
2. Añade `NEBIUS_API_KEY` con tu clave
3. Redeploy el proyecto

### Error: "Function failed to load"

**Causa**: Problema con la función serverless de Python

**Solución**:
1. Verifica que `requirements.txt` esté en la raíz del repositorio
2. Verifica que `api/index.py` exista
3. Revisa los logs de la función en Vercel Dashboard → Functions

### Error: "404 Not Found" en rutas de API

**Causa**: Configuración incorrecta de rewrites en vercel.json

**Solución**:
Verifica que `vercel.json` tenga esta configuración:
```json
{
  "rewrites": [
    { "source": "/api/(.*)", "destination": "/api" },
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### Error: "Build failed" en Vercel

**Causa**: Error en el proceso de build

**Solución**:
1. Revisa los logs de build en Vercel
2. Prueba el build localmente: `npm run build`
3. Verifica que no haya errores de TypeScript: `npm run typecheck`

## 🔄 Actualizaciones Automáticas

Vercel está configurado para desplegar automáticamente cuando hagas push a la rama `main`:

```bash
# Hacer cambios
git add .
git commit -m "feat: nueva funcionalidad"
git push origin main
```

Vercel detectará el push y desplegará automáticamente la nueva versión.

## 📊 Monitoreo

### Logs de la aplicación

1. Ve a Vercel Dashboard → Tu Proyecto
2. Haz clic en **Deployments** para ver el historial
3. Haz clic en un deployment para ver los logs

### Logs de funciones serverless

1. Ve a Vercel Dashboard → Tu Proyecto → Functions
2. Haz clic en `api/index.py`
3. Verás los logs de ejecución de la función

### Métricas

Vercel proporciona métricas automáticas:
- Uso de bandwidth
- Número de requests
- Tiempos de respuesta
- Errores

## 🔐 Seguridad

### Variables de entorno

- **NUNCA** subas tu archivo `.env` a GitHub
- Usa variables de entorno de Vercel para producción
- El archivo `.gitignore` ya excluye `.env`

### API Key de Nebius

- Mantén tu API key secreta
- No la compartas en commits o PRs
- Rota la key si crees que ha sido comprometida

## 📞 Soporte

Si encuentras problemas:

1. Revisa la documentación en `README.md`
2. Consulta los logs en Vercel
3. Abre un issue en GitHub
4. Verifica que todas las dependencias estén actualizadas

## ✅ Checklist Final

Antes de considerar el despliegue completado:

- [ ] Repositorio creado en GitHub
- [ ] Todos los archivos subidos
- [ ] Variable `NEBIUS_API_KEY` configurada en Vercel
- [ ] Proyecto desplegado en Vercel
- [ ] Frontend accesible desde la URL
- [ ] API responde en `/api/health`
- [ ] Generación de rúbricas funciona
- [ ] Exportación a Excel/Word/PDF funciona
- [ ] No hay errores en la consola del navegador
- [ ] No hay errores en los logs de Vercel

---

**¡Felicidades! Tu Arquitecto de Rúbricas Musicales está ahora en producción.**
