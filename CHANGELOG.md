# Changelog

Todos los cambios notables en este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto sigue [Semantic Versioning](https://semver.org/lang/es/).

## [1.0.0] - 2024

### Añadido
- Integración completa con los Decretos 110/2007, 111/2007 y 54/2022 de Extremadura
- Selector de nivel de enseñanza (Elemental/Profesional)
- Generación de rúbricas en modo local con datos predefinidos
- Generación de rúbricas con IA usando Qwen 3.0 via Nebius Token Factory
- Exportación a Excel (XLSX)
- Exportación a Word (DOCX)
- Exportación a PDF
- 7 asignaturas completas con competencias y criterios
- Niveles de logro diferenciados por nivel de enseñanza
- Interfaz responsiva con Tailwind CSS
- Backend con FastAPI en Vercel Serverless Functions
- Documentación completa para GitHub y Vercel
- GitHub Actions para CI/CD
- Sistema de contribución con guías claras

### Características Técnicas
- React 18 con TypeScript
- Tailwind CSS v4
- Vite como build tool
- FastAPI para el backend
- Code-splitting para optimización
- Lazy loading de librerías de exportación

### Decretos Implementados
- **Decreto 110/2007**: Enseñanzas Elementales de Música
- **Decreto 54/2022**: Modificación del 110/2007 (LOMLOE + Órgano)
- **Decreto 111/2007**: Enseñanzas Profesionales de Música

[1.0.0]: https://github.com/TU_USUARIO/mi-agente-rubricas/releases/tag/v1.0.0
