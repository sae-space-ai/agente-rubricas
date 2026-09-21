# Guía de Contribución

¡Gracias por tu interés en contribuir al Arquitecto de Rúbricas Musicales!

## 🚀 Cómo Contribuir

### Reportar Bugs

1. Verifica que el bug no haya sido reportado previamente en [Issues](https://github.com/TU_USUARIO/mi-agente-rubricas/issues)
2. Abre un nuevo issue usando la plantilla de bug report
3. Incluye:
   - Descripción clara del problema
   - Pasos para reproducir
   - Comportamiento esperado vs actual
   - Capturas de pantalla si es aplicable
   - Entorno (navegador, sistema operativo, versión)

### Sugerir Mejoras

1. Abre un nuevo issue con la etiqueta "enhancement"
2. Describe la mejora propuesta
3. Explica por qué sería útil
4. Proporciona ejemplos si es posible

### Contribuir Código

1. **Fork** el repositorio
2. **Crea una rama** para tu feature:
   ```bash
   git checkout -b feature/nombre-de-tu-feature
   ```
3. **Haz tus cambios** siguiendo las convenciones del proyecto
4. **Commit** tus cambios:
   ```bash
   git commit -m 'Add some feature'
   ```
5. **Push** a la rama:
   ```bash
   git push origin feature/nombre-de-tu-feature
   ```
6. **Abre un Pull Request**

## 📝 Convenciones de Código

### TypeScript/React

- Usa TypeScript estricto
- Nombra componentes en PascalCase
- Nombra archivos de componentes en PascalCase
- Usa hooks funcionales
- Mantén los componentes pequeños y enfocados
- Comenta código complejo

### Python

- Sigue PEP 8
- Usa type hints
- Documenta funciones con docstrings
- Nombra variables y funciones en snake_case

### Commits

Usa conventional commits:

- `feat:` Nueva funcionalidad
- `fix:` Corrección de bugs
- `docs:` Cambios en documentación
- `style:` Cambios de formato (sin cambios en lógica)
- `refactor:` Refactorización de código
- `test:` Añadir o modificar tests
- `chore:` Tareas de mantenimiento

Ejemplos:
```
feat: añadir exportación a PDF
fix: corregir error en cálculo de indicadores
docs: actualizar README con instrucciones de despliegue
```

## 🧪 Tests

Antes de enviar un PR:

```bash
# Verificar tipos
npm run typecheck

# Construir el proyecto
npm run build

# Verificar que no hay errores
```

## 📚 Documentación

- Actualiza el README si añades nuevas funcionalidades
- Documenta funciones y componentes complejos
- Incluye ejemplos de uso cuando sea relevante

## 🔍 Proceso de Revisión

1. Un mantenedor revisará tu PR
2. Se pueden solicitar cambios
3. Una vez aprobado, se fusionará en la rama principal
4. Tu contribución aparecerá en la siguiente versión

## 💬 Comunicación

- Usa los issues para discusiones técnicas
- Sé respetuoso y constructivo
- Acepta críticas y sugerencias

## 📄 Licencia

Al contribuir, aceptas que tus contribuciones se licencien bajo la licencia MIT del proyecto.

---

¡Gracias por ayudar a mejorar este proyecto!
