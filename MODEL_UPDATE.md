# Actualización del Modelo de IA - Qwen 2.5 VL 72B

## 📋 Resumen de Cambios

El sistema ha sido actualizado para utilizar el modelo **Qwen 2.5 VL 72B Instruct** en lugar de Google Gemma 3 27B, con el nuevo endpoint regional de Nebius Token Factory.

## 🔄 Cambios Realizados

### 1. Backend (api/index.py)

#### Endpoint de Nebius Token Factory
- **Anterior**: `https://api.tokenfactory.nebius.com/v1/`
- **Nuevo**: `https://api.tokenfactory.us-central1.nebius.com/v1/`
- **Región**: US Central (menor latencia para América)

#### Modelo de IA
- **Anterior**: `google/gemma-3-27b-it`
- **Nuevo**: `dedicated/Qwen/Qwen2.5-VL-72B-Instruct-DBRGDp`
- **Tipo**: Vision Language (VL) - Modelo multimodal
- **Tamaño**: 72B parámetros
- **Versión**: Instruct (optimizado para instrucciones)
- **Prefijo**: `dedicated/` (endpoint dedicado)

#### Configuración del Modelo
```python
response = client.chat.completions.create(
    model="dedicated/Qwen/Qwen2.5-VL-72B-Instruct-DBRGDp",
    max_tokens=4000,
    temperature=0.5,
    top_p=0.9,
    presence_penalty=0,
    extra_body={
        "top_k": 50
    },
    messages=[
        {"role": "system", "content": SUPERPROMPT},
        {"role": "user", "content": f"Genera una rúbrica para {request.asignatura}, {request.curso}"}
    ]
)
```

### 2. Frontend (src/App.tsx)

#### Interfaz de Usuario
- **Botón de modo IA**: Actualizado de "IA con Gemma 3" a "IA con Qwen 2.5 VL"
- **Descripción**: "Generación dinámica con Qwen 2.5 VL 72B"
- **Botón de generar**: "Generar con IA (Qwen 2.5 VL)"
- **Etiqueta de resultado**: "Generado con Qwen 2.5 VL"
- **Footer**: "Powered by Qwen 2.5 VL 72B via Nebius Token Factory"

### 3. Documentación (README.md)

#### Sección de Características
- Actualizada para reflejar el nuevo modelo
- Añadida mención al endpoint regional US Central

#### Sección de Tecnologías
- **Modelo de IA**: Qwen 2.5 VL 72B (Vision Language)
- **Endpoint regional**: US Central (api.tokenfactory.us-central1.nebius.com)

## 🎯 Ventajas del Nuevo Modelo

### Qwen 2.5 VL 72B
1. **Mayor capacidad**: 72B parámetros vs 27B de Gemma 3
2. **Multimodal**: Capacidad de procesar imágenes y texto (aunque solo usamos texto)
3. **Mejor comprensión**: Modelo más reciente con mejor entendimiento del contexto
4. **Optimizado para instrucciones**: Versión "Instruct" especializada en seguir instrucciones complejas
5. **Endpoint dedicado**: Mayor rendimiento y consistencia

### Endpoint US Central
1. **Menor latencia**: Para usuarios en América
2. **Mayor disponibilidad**: Distribución regional
3. **Mejor rendimiento**: Servidores optimizados para la región

## 📊 Comparativa de Modelos

| Característica | Gemma 3 27B | Qwen 2.5 VL 72B |
|----------------|-------------|-----------------|
| Parámetros | 27B | 72B |
| Tipo | Texto | Vision Language (multimodal) |
| Versión | it (instruct-tuned) | Instruct |
| Endpoint | Global | US Central (dedicado) |
| Latencia | Variable | Optimizada para América |
| Capacidad de contexto | Alta | Muy alta |

## 🔧 Configuración Técnica

### Parámetros del Modelo
- **max_tokens**: 4000 (máximo de tokens de salida)
- **temperature**: 0.5 (balance entre creatividad y consistencia)
- **top_p**: 0.9 (nucleus sampling)
- **top_k**: 50 (limitación de vocabulario)
- **presence_penalty**: 0 (sin penalización por repetición)

### Estructura de Mensajes
```python
messages=[
    {"role": "system", "content": SUPERPROMPT},
    {"role": "user", "content": f"Genera una rúbrica para {asignatura}, {curso}"}
]
```

## ✅ Verificación del Sistema

### Build Exitoso
```
✓ 287 módulos transformados
✓ Sin errores de TypeScript
✓ Code-splitting optimizado
✓ Build completado en 12.03s
```

### Archivos Modificados
1. `api/index.py` - Backend con nuevo modelo y endpoint
2. `src/App.tsx` - Frontend con referencias actualizadas
3. `README.md` - Documentación actualizada

### Archivos Sin Cambios
- `src/data/curriculum.ts` - Datos del currículo (sin cambios)
- `src/services/exportService.ts` - Servicio de exportación (sin cambios)
- `src/components/ExportButtons.tsx` - Botones de exportación (sin cambios)
- `vercel.json` - Configuración de Vercel (sin cambios)

## 🚀 Despliegue

### Pasos para Desplegar la Actualización

1. **Commit de cambios**:
```bash
git add .
git commit -m "Update: Cambiar a Qwen 2.5 VL 72B con endpoint US Central"
git push origin main
```

2. **Vercel detectará automáticamente**:
   - Cambios en `api/index.py`
   - Cambios en el frontend
   - Reconstruirá el proyecto

3. **Verificar el despliegue**:
   - Frontend: `https://tu-proyecto.vercel.app`
   - API Health: `https://tu-proyecto.vercel.app/api/health`
   - Debería mostrar: `"model": "dedicated/Qwen/Qwen2.5-VL-72B-Instruct-DBRGDp"`

## 🧪 Pruebas Recomendadas

### 1. Verificar el Endpoint de Health
```bash
curl https://tu-proyecto.vercel.app/api/health
```

Respuesta esperada:
```json
{
  "status": "ok",
  "service": "Arquitecto de Rúbricas Musicales API",
  "model": "dedicated/Qwen/Qwen2.5-VL-72B-Instruct-DBRGDp",
  "endpoint": "https://api.tokenfactory.us-central1.nebius.com/v1/",
  ...
}
```

### 2. Probar Generación con IA
1. Seleccionar modo "IA con Qwen 2.5 VL"
2. Elegir materia y curso
3. Generar rúbrica
4. Verificar que la respuesta sea coherente y completa

### 3. Comparar Calidad
- Generar la misma rúbrica con modo local y modo IA
- Comparar la calidad y detalle de los descriptores
- Verificar que se sigan los 12 criterios y 4 niveles

## 📝 Notas Importantes

### Modelo Vision Language (VL)
Aunque Qwen 2.5 VL es un modelo multimodal (puede procesar imágenes), en nuestra implementación solo usamos su capacidad de texto. Esto significa:
- ✅ Funciona perfectamente para generación de texto
- ✅ Mayor capacidad de comprensión del contexto
- ⚠️ No estamos aprovechando su capacidad de visión (no es necesario para rúbricas)

### Endpoint Dedicado
El prefijo `dedicated/` indica que es un endpoint dedicado, lo que significa:
- ✅ Mayor consistencia en las respuestas
- ✅ Mejor rendimiento
- ⚠️ Posible costo adicional (verificar en Nebius)

### Temperatura 0.5
Hemos mantenido la temperatura en 0.5 para:
- ✅ Balance entre creatividad y consistencia
- ✅ Respuestas predecibles pero no repetitivas
- ✅ Adecuado para contenido educativo

## 🔍 Solución de Problemas

### Error: "Model not found"
- Verificar que la API key tenga acceso al modelo `dedicated/Qwen/Qwen2.5-VL-72B-Instruct-DBRGDp`
- Contactar con Nebius si el modelo no está disponible en tu plan

### Error: "Endpoint not reachable"
- Verificar la URL del endpoint: `https://api.tokenfactory.us-central1.nebius.com/v1/`
- Comprobar la conectividad de red
- Verificar que la región US Central esté disponible para tu cuenta

### Respuestas de baja calidad
- Ajustar `temperature` (probar 0.3 para más consistencia)
- Ajustar `top_p` (probar 0.95 para más variedad)
- Revisar el SUPERPROMPT para asegurar claridad

## 📚 Recursos Adicionales

- [Documentación de Nebius Token Factory](https://docs.nebius.com/token-factory)
- [Modelos disponibles en Nebius](https://nebius.com/models)
- [Qwen 2.5 VL en Hugging Face](https://huggingface.co/Qwen/Qwen2.5-VL-72B-Instruct)

## ✅ Checklist de Actualización

- [x] Backend actualizado con nuevo modelo
- [x] Endpoint cambiado a US Central
- [x] Frontend actualizado con nuevas referencias
- [x] Documentación actualizada
- [x] Build exitoso sin errores
- [ ] Despliegue en Vercel (pendiente de push)
- [ ] Pruebas de generación con IA (pendiente)
- [ ] Verificación de calidad de respuestas (pendiente)

---

**Última actualización**: 2026
**Modelo**: Qwen 2.5 VL 72B Instruct
**Endpoint**: US Central (dedicated)
**Estado**: ✅ Listo para desplegar
